import { useEffect, useState } from "react"
import { Tag } from "./Tag"
import "./Tag.css"

export const TagList = () => {
    //fetches all the tags and sets them tags
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
    
    //sends the tag info as props to tag
    return <div className="tag_page">
    <div className="manage_tags">
        <em className="tape"></em>
        <div className="page_title_manage_tags"><h2>Currently Saved Moods</h2></div>
        <div className="tags">
        {
            tags.map(tag => <Tag key={`tag--${tag.id}`}
                tagName = {tag.name}
                tagIsFavorite = {tag.isFavorite}
                tagDescription = {tag.description}
                />)    
        }
        </div>
    </div>
    </div>
}