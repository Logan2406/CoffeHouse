import './App.css'

const Unauthorised = () =>
{
    return(
        <div className="unauth-div">
            <h1>You are not Allowed to View this Page</h1>
            <img src="unauthpage.png"/>
            <h3>Go to Home Page</h3>
            <div className="home-but"><a href="/">Home</a></div>
        </div>
    )
}

export default Unauthorised;