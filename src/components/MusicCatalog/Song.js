import {  useEffect, useState } from "react"

export const Song = ({ songName, albumName, artist, featuringName, songId, tags }) => {
    const localMyVersionUser = localStorage.getItem("my_version_user")
    const myVersionUserObject = JSON.parse(localMyVersionUser)
    
    const [taggedSong, setTaggedSong] = useState({
        userId: myVersionUserObject.id,
        songId: songId,
        tagId: 0
    })

    const [chosenTag, setChosenTag] =useState([])

    useEffect(
    () => {
        fetch(`http://localhost:8088/taggedSongs?songId=${songId}&userId=${myVersionUserObject.id}&_expand=tag`)
        .then(response =>response.json())
        .then((data) => {
            setChosenTag(data)
        })
    },
    []
    )

    const handleSaveButtonClick = () => {
           
        return fetch(`http://localhost:8088/taggedSongs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
                body: JSON.stringify(taggedSong)
        })
        .then(response =>response.json())
        .then ((data) => {
            setChosenTag(data)
        })

    }

    const handleDeleteButtonClick = () => {
        
        return fetch(`http://localhost:8088/taggedSongs/${chosenTag[0].id}`, {
            method: "DELETE"

        })
            .then (() => {
                setChosenTag([])
            })          
    }
    
    return <>
    <div className="song">
                    <div className="songName">Track Name: {songName}</div>
                    <div className="albumName">Album: {albumName}</div>
                    <div className="artist">Artist: {artist}</div>
                    <div className="featuring">Featuring: {featuringName}</div>
                    {chosenTag.length 
                        ? <><div className="currentTag">Current Tag: {chosenTag[0]?.tag?.name}</div>
                        <button onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)}
                            className="btn btn-primary">
                                Delete Tag
                            </button></>
                        : <><select className="tagDropdown" onChange={
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
                        <button 
                            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                                className="btn btn-primary">
                                Save Tag
                        </button>
                        </>
                        }
                    
                    </div>
    </>
}





// const canClose = () => {
//     if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "") {
//         return <button onClick={closeTicket} className="ticket__finish">Close Ticket</button>
//     }
//     else {
//         return ""
//     }
// }


// const deleteButton = () => {
//     if (!currentUser.staff) {
//         return <button onClick={() => {
//             fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
//                 method: "DELETE"
//             })
//                 .then(() => {
//                     getAllTickets()
//                 })
//         }} className="ticket__delete">Delete</button>
//     }
//     else {
//         return ""
//     }
// }









