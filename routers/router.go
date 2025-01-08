package routers

import (
	 "rentbyowner/controllers"
	"github.com/beego/beego/v2/server/web"
)

func init() {

	// Route to show the page
	web.Router("/", &controllers.ShowController{}, "get:ShowPage")
	
}