import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const AdminNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            Under Construction
            {
                localStorage.getItem("honey_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("honey_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}