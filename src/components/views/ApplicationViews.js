import { UserViews } from "./UserViews"

export const ApplicationViews = () => {

    const localMyVersionUser = localStorage.getItem("my_version_user")
    const myVersionUserObject = JSON.parse(localMyVersionUser)

    if (myVersionUserObject.admin) {
        return "Under Construction"
    }
    else {
        return <UserViews />
    }
}

