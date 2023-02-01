import { useEffect, useState } from "react"
//import { useNavigate } from "react-router-dom"

export const Song = ({ songName, albumName, artist, featuringName, songId, tags }) => {
    const localMyVersionUser = localStorage.getItem("my_version_user")
    const myVersionUserObject = JSON.parse(localMyVersionUser)
    
    const [taggedSong, setTaggedSong] = useState({
        userId: myVersionUserObject.id,
        songId: songId,
        tagId: 0
    })

    const handleSaveButtonClick = (event) => {
        //event.preventDefault()
        
      
   
        return fetch(`http://localhost:8088/taggedSongs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
                body: JSON.stringify(taggedSong)
        })

    }
    
    // function to determine what song's current tag is?
    const hasTag = () => {
        if (taggedSong.songId === songId) {
            return <div className="currentTag">Current Tag: {taggedSong.id}</div>
        }
        else {
            return ""
        }
    }

    return <>
    <div className="song">
                    <div className="songName">Track Name: {songName}</div>
                    <div className="albumName">Album: {albumName}</div>
                    <div className="artist">Artist: {artist}</div>
                    <div className="featuring">Featuring: {featuringName}</div>
                    <select className="tagDropdown" onChange={
                        (event) => {
                            const copy = {...taggedSong}
                            copy.tagId = parseInt(event.target.value)
                            setTaggedSong(copy)
                        }
                    }>
                        <option value="0" >Select Tag</option>
                        {tags.map(
                            (tag) => {
                                return <option key={tag.id} 
                                value={tag.id}
                                >{tag.name}</option>
                            }
                            )}
                    </select>
                    {hasTag()}
                    <button 
                        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                            className="btn btn-primary">
                            Save Tag
                    </button>
                    </div>
    </>
}

//if taggedSong.id === song.id then ?



// const canClose = () => {
//     if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "") {
//         return <button onClick={closeTicket} className="ticket__finish">Close Ticket</button>
//     }
//     else {
//         return ""
//     }
// }