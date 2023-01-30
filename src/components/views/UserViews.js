import { Outlet, Route, Routes } from "react-router-dom"
import { SongList } from "../MusicCatalog/SongList"
import { NewTagForm } from "../Tags/NewTagForm"
import { TagList } from "../Tags/TagList"



export const UserViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>My Version</h1>

                    <Outlet />
                </>
            }>

                <Route path="musiccatalog" element={ <SongList /> } />
                <Route path="addtag" element={ <NewTagForm /> } />
                <Route path="managetags" element={ <TagList /> } />
                
            </Route>
        </Routes>
    )
}