
import { UserNav } from "./UserNav"
import { AdminNav } from "./AdminNav"
import "./NavBar.css"

export const NavBar = () => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    if (honeyUserObject.admin) {
        return <AdminNav />
    }
    else {
        return <UserNav />
    }
}

