package routers

import (
	"rentbyowner/controllers"

	"github.com/beego/beego/v2/server/web"
)

func init() {
    web.Router("/properties", &controllers.PropertyController{}, "get:GetProperties")
    web.Router("/showproperties", &controllers.PropertyController{}, "get:ShowProperties")
}
