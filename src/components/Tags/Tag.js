//gets the tag info from taglist and gives the info for each tag

export const Tag = ({ tags, setTags, tagId, tagName, tagDescription, tagIsFavorite }) => {
    
    const handleDeleteButtonClick = () => {
        return fetch(`http://localhost:8088/tags/${tagId}`, {
            method: "DELETE"

        })
        .then (() => {
            setTags()
            window.location.reload();
        }) 
    }
    
    return <>
        <div className="tag">
            <div className="tagName"><div className="taglabel">Mood Name: </div>{tagName}</div>
            <div className="tagDecription"><div className="taglabel">Description: </div>{tagDescription}</div>
            <div className="tagFavorite"><div className="taglabel">Favorite: </div>{tagIsFavorite ? "Yes" : "No"}</div>
            <button onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)}
                className="btn btn-primary">Delete Mood
            </button>
        </div>
    </>
}

