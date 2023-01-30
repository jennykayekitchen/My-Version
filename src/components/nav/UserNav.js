import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const UserNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/musiccatalog">Browse Music</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/addtag">Add a New Tag</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/managetags">Manage Tags</Link>
            </li>

            {
                localStorage.getItem("my_version_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("my_version_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}