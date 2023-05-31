import { UserNav } from "./UserNav"
import { AdminNav } from "./AdminNav"
import "./NavBar.css"

export const NavBar = () => {
    const localMyVersionUser = localStorage.getItem("my_version_user")
    const myVersionUserObject = JSON.parse(localMyVersionUser)

    if (myVersionUserObject?.admin) {
        return <AdminNav />
    }
    else {
        return <UserNav />
    }
}

