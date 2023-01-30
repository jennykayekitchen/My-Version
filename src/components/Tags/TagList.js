import { useEffect, useState } from "react"

export const TagList = () => {
    const [tags, setTags] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/tags`)
            .then(response => response.json())
            .then((data) => {
                setTags(data)
            })
        },
        []
    )

    return <div className="tags">
        <h2>Currently Saved Tags</h2>
        {
            tags.map(
                (tag) => {
                    return (
                        <div className="tag" key={`tag--${tag.id}`}>
                            <div className="tagName">Tag Name: {tag.name}</div>
                            <div className="tagFavorite">Favorite: {tag.isFavorite ? "Yes" : "No"}</div>
                        </div>
                    )
                }
            )
        }
    </div>
}