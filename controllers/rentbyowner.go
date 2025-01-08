package controllers

import (
	"encoding/json"
    "fmt"
    "net/http"
    "strings"
   
	"github.com/beego/beego/v2/server/web"
)

type ShowController struct {
	web.Controller
}


type GeoInfo struct { 
    LocationSlug   string      `json:"LocationSlug"`
}

type LocationResponse struct {
    Keyword string  `json:"Keyword"`
    GeoInfo GeoInfo `json:"GeoInfo"`
}

type CategoryResult struct {
    Count         int      `json:"Count"`
    ItemIDs       []string `json:"ItemIDs"`
}

type CategoryResponse struct {
    GeoInfo GeoInfo        `json:"GeoInfo"`
    Result  CategoryResult `json:"Result"`
}

func (c *ShowController) ShowPage() {
  
    locationURL := "http://beta-mda.refine.lefttravel.com/v1/location?keyword=Dhaka"
    locationResp, err := http.Get(locationURL)
    if err != nil {
        c.Data["Error"] = "Failed to fetch location data"
        c.TplName = "rentbyowner.tpl"
        return
    }
    defer locationResp.Body.Close()

    var locationData models.LocationResponse
    if err := json.NewDecoder(locationResp.Body).Decode(&locationData); err != nil {
        c.Data["Error"] = "Failed to decode location data"
        c.TplName = "rentbyowner.tpl"
        return
    }

    // Format LocationSlug for second API
    formattedSlug := strings.ReplaceAll(locationData.GeoInfo.LocationSlug, "/", ":")

    // Second API call - Get category details
    categoryURL := fmt.Sprintf(
        "http://beta-mda.refine.lefttravel.com/v1/category/details/%s?order=1&page=1&limit=192&feeds=11-12-24&items=1&locations=BD&device=desktop",
        formattedSlug,
    )
    
    categoryResp, err := http.Get(categoryURL)
    if err != nil {
        c.Data["Error"] = "Failed to fetch category details"
        c.TplName = "rentbyowner.tpl"
        return
    }
    defer categoryResp.Body.Close()

    var categoryData models.CategoryResponse
    if err := json.NewDecoder(categoryResp.Body).Decode(&categoryData); err != nil {
        c.Data["Error"] = "Failed to decode category details"
        c.TplName = "rentbyowner.tpl"
        return
    }

    // Pass data to template
    c.Data["LocationData"] = locationData
    c.Data["CategoryData"] = categoryData
    c.Data["ItemIDs"] = categoryData.Result.ItemIDs
    c.TplName = "rentbyowner.tpl"
}





