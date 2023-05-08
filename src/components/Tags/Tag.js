import { useState } from "react";

export const Tag = ({ tags, setTags, tagId, tagName, tagDescription }) => {
    // says whether or not the tag is in "edit" mode, set to false when the page loads and will turn to true if user clicks Update Mood
    const [editMode, setEditMode] = useState(false)
    // when in edit mode, it will hold the updated name of the tag, and is originally set to what the current name is
    const [editedTagName, setEditedTagName] = useState(tagName)
    // when in edit mode, will do the same as name, but with the description
    const [editedTagDescription, setEditedTagDescription] = useState(tagDescription)

    // when the delete button is clicked, the tag is deleted
    const handleDeleteButtonClick = () => {
        return fetch(`http://localhost:8088/tags/${tagId}`, {
            method: "DELETE"
        })
        .then (() => {
            // creates a new array that doesn't include the tag that was just deleted
            const updatedTags = tags.filter(tag => tag.id !== tagId);
            // sets the new list of tags to to the array without the deleted tag
            setTags(updatedTags)
        }) 
    }

    // when the Save Changes button is clicked, it sends the updates to the database
    const handleSaveChangesButtonClick = () => {
        // creates a new tag object with the updated name and description that is pulled form the JSX form
        const updatedTag = {
            id: tagId,
            name: editedTagName,
            description: editedTagDescription,
        }
        // updates the database with the new info
        return fetch(`http://localhost:8088/tags/${tagId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTag)
        })
        .then (() => {
            // maps through the saved tags in the database until it finds the matching Id, then updates that
            // tag with the new info
            const updatedTags = tags.map(tag => {
                if (tag.id === tagId) {
                    return updatedTag
                }
                return tag
            });
            setTags(updatedTags)
            // exits edit mode and rerenders everthing
            setEditMode(false)
        }) 
    }
    // when the Cancel button is clicked, it resets everything to what is already in the database then exits edit mode
    const handleCancelEditClick = () => {
        // resets the edited tag name and description to what it was 
        setEditedTagName(tagName)
        setEditedTagDescription(tagDescription)
        // exits edit mode
        setEditMode(false)
    }
    
    // when Edit button is clicked, it sets the edit mode to true, and displays the form for updating the tag
    const handleEditClick = () => {
        // enters edit mode
        setEditMode(true)
    }

    // when the name field is changed, it sets the database to what is in that field
    const handleTagNameChange = (event) => {
        setEditedTagName(event.target.value)
    }

    // when the description field is changed, it sets the database to what is in that field
    const handleTagDescriptionChange = (event) => {
        setEditedTagDescription(event.target.value)
    }

    return (
        <div className="tag">
            {editMode ? (
                <>
                    <div className="tagInput">
                        <div className="taglabel">Mood Name: </div>
                            <input type="text" 
                            value={editedTagName} 
                            onChange={handleTagNameChange} />
                        </div>
                    <div className="tagInput">
                        <div className="taglabel">Description: </div>
                            <input className="tagDescription" type="text" 
                            value={editedTagDescription} 
                            onChange={handleTagDescriptionChange} />
                        </div>
                </>
            ) 
            : (
                <>
                    <div className="tagName">
                        <div className="taglabel">Mood Name: </div>{tagName}
                    </div>
                    <div className="tagDescription">
                        <div className="taglabel">Description: </div>{tagDescription}
                    </div>
                </>
            )}
            {editMode ? (
                <>
                    <div className="buttons">
                        <button 
                            onClick={handleSaveChangesButtonClick} 
                            className="btn btn-primary">Save Changes</button>
                        <button 
                            onClick={handleCancelEditClick} 
                            className="btn btn-secondary">Cancel</button>
                    </div>
                </>
            ) 
            : (
                <>
                    <div className="buttons">
                        <button 
                            onClick={handleEditClick} 
                            className="btn btn-primary">Edit Mood</button>
                        <button 
                            onClick={handleDeleteButtonClick} 
                            className="btn btn-danger">Delete Mood</button>
                    </div>
                </>
            )}
        </div>
    )
}

