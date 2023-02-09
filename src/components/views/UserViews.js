import { Outlet, Route, Routes } from "react-router-dom"
import { GeneratePlaylist } from "../GeneratePlaylist/GeneratePlaylist"
import { SongList } from "../MusicCatalog/SongList"
import { NewTagForm } from "../Tags/NewTagForm"
import { TagList } from "../Tags/TagList"
import "./UserViews.css"
import { HomePage } from "../Index/HomePage"

export const UserViews = () => {
	return (
            
        <Routes>
            <Route path="/" element={
                <>                       
                    
                    <Outlet />
                </>
            }>
                <Route index element={ <HomePage /> }/>  
                <Route path="musiccatalog" element={ <SongList /> } />
                <Route path="addtag" element={ <NewTagForm /> } />
                <Route path="managetags" element={ <TagList /> } />
                <Route path="generateplaylist" element={ <GeneratePlaylist /> } />
                
            </Route>
            
        </Routes>
            
    )
}

//