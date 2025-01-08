package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/beego/beego/v2/server/web"
)

type PropertyController struct {
	web.Controller
}

type FirstAPIResponse struct {
	GeoInfo struct {
		LocationSlug string `json:"LocationSlug"`
	} `json:"GeoInfo"`
}

type SecondAPIResponse struct {
	Result struct {
		ItemIDs []string `json:"ItemIDs"`
	} `json:"Result"`
}

type ThirdAPIResponse struct {
	Items []struct {
		ID       string `json:"ID"`
		Property struct {
			Amenities    map[string]string `json:"Amenities"`
			Counts       struct {
				Reviews int `json:"Reviews"`
			} `json:"Counts"`
			FeatureImage string  `json:"FeatureImage"`
			Price        float64 `json:"Price"`
			PropertyName string  `json:"PropertyName"`
			PropertyType string  `json:"PropertyType"`
			ReviewScore  float64 `json:"ReviewScore"`
		} `json:"Property"`
	} `json:"Items"`
}

// ShowProperties fetches and displays properties dynamically
func (c *PropertyController) ShowProperties() {
	search := c.GetString("search") // Get the 'search' parameter
	order := c.GetString("order")   // Get the 'order' parameter

	// Call the external APIs dynamically
	apiURL1 := "http://beta-mda.refine.lefttravel.com/v1/location?keyword=" + search
	resp1, err := http.Get(apiURL1)
	if err != nil {
		c.CustomAbort(500, "Failed to fetch location data")
	}
	defer resp1.Body.Close()

	var locationData map[string]interface{}
	json.NewDecoder(resp1.Body).Decode(&locationData)

	// Extract LocationSlug
	locationSlug, ok := locationData["GeoInfo"].(map[string]interface{})["LocationSlug"].(string)
	if !ok {
		c.CustomAbort(500, "Invalid location data")
	}

	// Call the second API using LocationSlug
	apiURL2 := "http://beta-mda.refine.lefttravel.com/v1/category/details/" + locationSlug +
		"?order=" + order + "&page=1&limit=192&feeds=11-12-24&items=1&locations=BD&device=desktop"
	resp2, err := http.Get(apiURL2)
	if err != nil {
		c.CustomAbort(500, "Failed to fetch property data")
	}
	defer resp2.Body.Close()

	var propertyData map[string]interface{}
	json.NewDecoder(resp2.Body).Decode(&propertyData)

	// Extract ItemIDs from the second API response
	itemIDs, ok := propertyData["Result"].(map[string]interface{})["ItemIDs"].([]interface{})
	if !ok {
		c.CustomAbort(500, "Invalid property data")
	}

	// Call the third API to get property details
	apiURL3 := "http://beta-mda.refine.lefttravel.com/v1/property/bookmark?propertyIdList="
	for _, id := range itemIDs {
		apiURL3 += id.(string) + ","
	}
	apiURL3 = apiURL3[:len(apiURL3)-1] + "&countryCode=US&locations=BD&device=desktop"

	resp3, err := http.Get(apiURL3)
	if err != nil {
		c.CustomAbort(500, "Failed to fetch property details")
	}
	defer resp3.Body.Close()

	var propertyDetails map[string]interface{}
	json.NewDecoder(resp3.Body).Decode(&propertyDetails)

	
	c.Data["json"] = propertyDetails
	c.ServeJSON()
	
	// Otherwise, render the template
	c.TplName = "rentbyowner.tpl"
}

func fetchFirstAPI(url string) FirstAPIResponse {
	var result FirstAPIResponse
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("Error calling first API:", err)
		return result
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	json.Unmarshal(body, &result)
	return result
}

func fetchSecondAPI(url string) SecondAPIResponse {
	var result SecondAPIResponse
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("Error calling second API:", err)
		return result
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	json.Unmarshal(body, &result)
	return result
}

func fetchThirdAPI(url string) ThirdAPIResponse {
	var result ThirdAPIResponse
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("Error calling third API:", err)
		return result
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	json.Unmarshal(body, &result)
	return result
}
