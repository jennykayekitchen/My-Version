import "./HomePage.css"

export const HomePage = () => {
    return <div className="home_page">
        <div className="mobile-image"></div>
        <div className="container">
            <div className="card1"><div className="cardWords">Step One</div><div className="cardTitle"><a href="/addtag"><h2>Set the Mood</h2></a></div></div>
            <div className="card2"><div className="cardWords">Step Two</div><div className="cardTitle"><a href="/musiccatalog"><h2>Pick the Songs</h2></a></div></div>
            <div className="card3"><div className="cardWords">Step Three</div><div className="cardTitle"><a href="/generateplaylist"><h2>Hit Play</h2></a></div></div>
        </div>
    </div>
}