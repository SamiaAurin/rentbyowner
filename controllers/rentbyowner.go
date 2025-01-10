package controllers

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
    "strings"
    "github.com/beego/beego/v2/server/web"
)

type PropertyController struct {
    web.Controller
}

type RawResponse map[string]interface{}

type Property struct {
    ID            string    `json:"ID"`
    Amenities     []string  `json:"Amenities"`
    Reviews       int       `json:"Reviews"`
    FeatureImage  string    `json:"FeatureImage"`
    Price         float64   `json:"Price"`
    PropertyName  string    `json:"PropertyName"`
    PropertyType  string    `json:"PropertyType"`
    ReviewScore   float64   `json:"ReviewScore"`
    Categories    [2]string `json:"Categories"`
    PartnerURL    string    `json:"PartnerURL"`
    StarRating    int       `json:"StarRating"`
}

func (c *PropertyController) ShowProperties() {
    c.TplName = "rentbyowner.tpl"
    c.Render()
}

func (c *PropertyController) GetProperties() {
    search := c.GetString("search")
    if search == "" {
        search = "Dhaka"
    }
    
    // First API Call
    firstAPIURL := fmt.Sprintf("http://beta-mda.refine.lefttravel.com/v1/location?keyword=%s", search)
    req1, _ := http.NewRequest("GET", firstAPIURL, nil)
    
    client := &http.Client{}
    resp1, err := client.Do(req1)
    if err != nil {
        c.Data["json"] = map[string]interface{}{"error": "Failed to fetch location data"}
        c.ServeJSON()
        return
    }
    defer resp1.Body.Close()

    body1, _ := ioutil.ReadAll(resp1.Body)
    var firstAPIResp RawResponse
    if err := json.Unmarshal(body1, &firstAPIResp); err != nil {
        c.Data["json"] = map[string]interface{}{"error": fmt.Sprintf("Failed to decode first API response: %v", err)}
        c.ServeJSON()
        return
    }

    geoInfo, ok := firstAPIResp["GeoInfo"].(map[string]interface{})
    if !ok {
        c.Data["json"] = map[string]interface{}{"error": "Invalid GeoInfo structure"}
        c.ServeJSON()
        return
    }

    locationSlug, ok := geoInfo["LocationSlug"].(string)
    if !ok {
        c.Data["json"] = map[string]interface{}{"error": "Invalid LocationSlug"}
        c.ServeJSON()
        return
    }

    // Format LocationSlug for second API
    formattedSlug := strings.ReplaceAll(locationSlug, "/", ":")
    //fmt.Printf("Formatted Slug: %s\n", formattedSlug)

    // Second API Call with required headers
    secondAPIURL := fmt.Sprintf(
        "http://beta-mda.refine.lefttravel.com/v1/category/details/%s?order=1&page=1&limit=100&feeds=11-12-24&items=1&locations=BD&device=desktop",
        formattedSlug,
    )
    
    req2, _ := http.NewRequest("GET", secondAPIURL, nil)
    
    // Add the specific required headers
    req2.Header.Set("Accept-Language", "en-US")
    req2.Header.Set("Origin", "rentbyowner.com")
    
    resp2, err := client.Do(req2)
    if err != nil {
        c.Data["json"] = map[string]interface{}{"error": "Failed to fetch category data"}
        c.ServeJSON()
        return
    }
    defer resp2.Body.Close()

    body2, _ := ioutil.ReadAll(resp2.Body)
    //fmt.Printf("Second API Response: %s\n", string(body2))

    var secondAPIResp RawResponse
    if err := json.Unmarshal(body2, &secondAPIResp); err != nil {
        c.Data["json"] = map[string]interface{}{"error": fmt.Sprintf("Failed to decode second API response: %v", err)}
        c.ServeJSON()
        return
    }

    result, ok := secondAPIResp["Result"].(map[string]interface{})
    if !ok {
        c.Data["json"] = map[string]interface{}{
            "error": "Invalid Result structure",
            "response": secondAPIResp,
        }
        c.ServeJSON()
        return
    }
    
    itemIDsInterface, ok := result["ItemIDs"].([]interface{})
    if !ok {
        c.Data["json"] = map[string]interface{}{
            "error": "Invalid ItemIDs structure",
            "result": result,
        }
        c.ServeJSON()
        return
    }

    var itemIDs []string
    for _, id := range itemIDsInterface {
        if strID, ok := id.(string); ok {
            itemIDs = append(itemIDs, strID)
        }
    }

    if len(itemIDs) == 0 {
        c.Data["json"] = map[string]interface{}{
            "error": "No property IDs found",
            "response": secondAPIResp,
        }
        c.ServeJSON()
        return
    }
    // CountryCode from GeoInfo
    countryCode, ok := geoInfo["CountryCode"].(string)
    if !ok {
        c.Data["json"] = map[string]interface{}{
            "error": "Invalid or missing CountryCode",
        }
        c.ServeJSON()
        return
    }

    // Third API Call
    thirdAPIURL := fmt.Sprintf(
        "http://beta-mda.refine.lefttravel.com/v1/property/bookmark?propertyIdList=%s&countryCode=%s&locations=BD&device=desktop",
        strings.Join(itemIDs, ","),
        countryCode,
    )
    fmt.Printf("Third API: %s\n", thirdAPIURL)

    req3, _ := http.NewRequest("GET", thirdAPIURL, nil)
    // Use the same headers for consistency
    req3.Header.Set("Accept-Language", "en-US")
    req3.Header.Set("Origin", "rentbyowner.com")
    
    resp3, err := client.Do(req3)
    if err != nil {
        c.Data["json"] = map[string]interface{}{"error": "Failed to fetch property details"}
        c.ServeJSON()
        return
    }
    defer resp3.Body.Close()

    var propertyDetails RawResponse
    if err := json.NewDecoder(resp3.Body).Decode(&propertyDetails); err != nil {
        c.Data["json"] = map[string]interface{}{"error": fmt.Sprintf("Failed to decode third API response: %v", err)}
        c.ServeJSON()
        return
    }
    

    filteredProperties := []Property{}
    for _, item := range propertyDetails["Items"].([]interface{}) {
        property := item.(map[string]interface{})["Property"].(map[string]interface{})

        // Select any 3 amenities
        amenities := []string{}
        count := 0
        for _, amenity := range property["Amenities"].(map[string]interface{}) {
            if count < 3 {
                amenities = append(amenities, amenity.(string))
                count++
            } else {
                break
            }
        }

        // Safely extract values with type assertions and checks
        reviews := 0
        if val, ok := property["Counts"].(map[string]interface{})["Reviews"].(float64); ok {
            reviews = int(val)
        }

        featureImage := ""
        if val, ok := property["FeatureImage"].(string); ok {
            featureImage = val
        }

        price := 0.0
        if val, ok := property["Price"].(float64); ok {
            price = val
        }

        propertyName := ""
        if val, ok := property["PropertyName"].(string); ok {
            propertyName = val
        }

        propertyType := ""
        if val, ok := property["PropertyType"].(string); ok {
            propertyType = val
        }

        reviewScore := 0.0
        if val, ok := property["ReviewScore"].(float64); ok {
            reviewScore = val
        }
        
		// Extract last two values from Categories -> Display
        categories := [2]string{"", ""}
        if geoInfo, ok := item.(map[string]interface{})["GeoInfo"].(map[string]interface{}); ok {
            if categoriesList, ok := geoInfo["Categories"].([]interface{}); ok {
                for _, category := range categoriesList {
                    if display, ok := category.(map[string]interface{})["Display"].([]interface{}); ok {
                        if len(display) >= 2 {
                            categories[0] = strings.Title(display[len(display)-1].(string))
                            categories[1] = strings.Title(display[len(display)-2].(string))
                        }
                    }
                }
            }
        }

        // Extract Partner URL
        partnerURL := "null"
        if partner, ok := item.(map[string]interface{})["Partner"].(map[string]interface{}); ok {
            if url, ok := partner["URL"].(string); ok {
                partnerURL = url
            }
        }

        // Extract StarRating
        starRating := 0
        if star, ok := property["StarRating"].(float64); ok {
            starRating = int(star)
        }

        filteredProperty := Property{
            ID:           item.(map[string]interface{})["ID"].(string),
            Amenities:    amenities,
            Reviews:      reviews,
            FeatureImage: featureImage,
            Price:        price,
            PropertyName: propertyName,
            PropertyType: propertyType,
            ReviewScore:  reviewScore,
            Categories:   categories,
            PartnerURL:   partnerURL,
            StarRating:   starRating,
        }

        filteredProperties = append(filteredProperties, filteredProperty)
    }

    // Return the JSON response
    c.Data["json"] = map[string]interface{}{
        "success":    true,
        "properties": filteredProperties,
    }
    c.ServeJSON()
	c.TplName = "rentbyowner.tpl"
    c.Render()
}
