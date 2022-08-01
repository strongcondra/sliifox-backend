import { UserController } from "./controller/UserController"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
},{
    method: "post",
    route: "/users/orderSave",
    controller: UserController,
    action: "orderSave"
},{
    method: "post",
    route: "/users/addressSave",
    controller: UserController,
    action: "addressSave"
},{
    method: "post",
    route: "/users/UserRegister",
    controller: UserController,
    action: "usersave"
},{
    method: "post",
    route: "/users/UserLogin",
    controller: UserController,
    action: "userlogin"
}]