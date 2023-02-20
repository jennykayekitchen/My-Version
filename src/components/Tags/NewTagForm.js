import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Tag.css"

export const NewTagForm = () => {
    //Using the useNavigation() hook so you can redirect the user at a specific time in a function
    const navigate = useNavigate()
    
    //brings user out of local storage to add to tag and can be used to determine if admin or not
    const localMyVersionUser = localStorage.getItem("my_version_user")
    const myVersionUserObject = JSON.parse(localMyVersionUser)

    //sets up the correct default properties we're creating to the initial state of the tag object
    const [tag, update] = useState({
        "name": "",
        "userId": null,
        "description": "",

    })

    //adds the new tag to the database (POST) when the user clicks save
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // builds the object that will be saved with info that is submitted 
        const tagToSendToAPI = {
            name: tag.name,
            userId: myVersionUserObject.id,
            description: tag.description,
        }
        //POST fetch call that sends the tag object to save in the database then navigates back to the list of tags when that's done
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

    //new tag form
    return (
        <div className="tag_page">
        <form className="tagForm">
            <div className="page_title_tagForm"><h2>Add a Mood</h2></div>
                <em className="tape"></em>
            <div className="tagFormOptions">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="tagname"><div className="taglabel">Mood Name:</div></label>
                    {/* creates text box for user to input the name of their tag, then assigns that as tag.name */}
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What's the vibe?"
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
                    <label htmlFor="tagdescription"><div className="taglabel">Mood Description:</div></label>
                    {/* creates text box for user to input the name of their tag, then assigns that as tag.name */}
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Use your words."
                        value={tag.description}
                        onChange={
                            (event) => {
                                const copy = {...tag}
                                copy.description = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Mood
            </button>
            </div>
        </form>
        </div>
    )
}