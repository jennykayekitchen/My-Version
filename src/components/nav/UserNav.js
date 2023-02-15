import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const UserNav = () => {
    //hook that gives you access to the navigate function in react and this commands the DOM to navigate somewhere at that moment in the function
    //useNavigate is different from Link since link tells the DOM where to go if the user clicks the link
    const navigate = useNavigate()

    //links across the nav bar for the user's view that go to the "home.com/example" which then renders that component
    return (
        <>
            <div className="nav">
                <h1 className="logo"><a href="/">My Version</a></h1>
                <ul className="main-nav">
                    <li className="navbar__item active">
                        <Link className="navbar__link" to="/addtag">Create a Mood</Link>
                    </li>
                    <li className="navbar__item active">
                        <Link className="navbar__link" to="/managetags">Manage Moods</Link>
                    </li>
                    <li className="navbar__item active">
                        <Link className="navbar__link" to="/musiccatalog">Browse Music</Link>
                    </li>
                    <li className="navbar__item active">
                        <Link className="navbar__link" to="/generateplaylist">Generate Playlist</Link>
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
            </div>
        </>
    )
}

