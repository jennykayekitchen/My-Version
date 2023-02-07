
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { MyVersion } from "./components/MyVersion"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <MyVersion />
        
    </BrowserRouter>
)

