package routers

import (
	"rentbyowner/controllers"

	"github.com/beego/beego/v2/server/web"
)

func init() {
	// Route for showing properties dynamically
	web.Router("/properties", &controllers.PropertyController{}, "get:ShowProperties")
}
