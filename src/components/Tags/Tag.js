//gets the tag info from taglist and gives the info for each tag
export const Tag = ({ tagName, tagDescription, tagIsFavorite }) => {
    return <>
        <div className="tag">
            <div className="tagName"><div className="taglabel">Mood Name: </div>{tagName}</div>
            <div className="tagDecription"><div className="taglabel">Description: </div>{tagDescription}</div>
            <div className="tagFavorite"><div className="taglabel">Favorite: </div>{tagIsFavorite ? "Yes" : "No"}</div>
        </div>
    </>
}