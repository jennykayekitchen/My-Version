//gets the tag info from taglist and gives the info for each tag
export const Tag = ({ tagName, tagIsFavorite }) => {
    return <>
        <div className="tag">
            <div className="tagName">Mood Name: {tagName}</div>
            <div className="tagFavorite">Favorite: {tagIsFavorite ? "Yes" : "No"}</div>
        </div>
    </>
}