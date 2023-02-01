import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const NewTagForm = () => {
    //Using the useNavigation() hook so you can redirect the user when needed
    const navigate = useNavigate()
    
    //brings user out of local storage to add to tag and can be used to determine if admin or not
    const localMyVersionUser = localStorage.getItem("my_version_user")
    const myVersionUserObject = JSON.parse(localMyVersionUser)

    //sets up the correct default properties we're creating to the initial state of the tag object
    const [tag, update] = useState({
        "name": "",
        "userId": null,
        "isFavorite": false

    })

    //adds the new tag to the database (POST) when the user clicks save
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const tagToSendToAPI = {
            name: tag.name,
            userId: myVersionUserObject.id,
            isFavorite: tag.isFavorite
        }

        return fetch(`http://localhost:8088/tags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tagToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/managetags")
            })
    }

    return (
        <form className="tagForm">
            <h2 className="tagForm__title">Add a New Tag</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="tagName">Tag name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter tag name."
                        value={tag.name}
                        onChange={
                            (event) => {
                                const copy = {...tag}
                                copy.name = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="favorite">Favorite:</label>
                    <input type="checkbox"
                        value={tag.favorite}
                        onChange={
                            (event) => {
                                const copy = {...tag}
                                copy.isFavorite = event.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Tag
            </button>
        </form>
    )
}