import { useEffect, useState } from "react"
import { Tag } from "./Tag"

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
            tags.map(tag => <Tag key={`tag--${tag.id}`}
                tagId = {tag.id}
                tagName = {tag.name}
                tagIsFavorite = {tag.isFavorite}
                />)    
        }
    </div>
}