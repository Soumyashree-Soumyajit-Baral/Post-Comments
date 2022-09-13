import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logout from "../logout/logout";
import axios from "axios";
import "./landing.css"


const Landing = () => {
    const [posts, setPosts] = useState([]);
    const navigate=useNavigate()
    // const navigate=useNavigate()
    const handleClick = () => {
        navigate("/publish")
    }
    useEffect(() => {
        let token = localStorage.getItem("Authorization");
        axios({
            url: "http://localhost:5000/publish",
            method: "GET",
            headers: { authorization: token }
        }).then((res) => {
            console.log(res);
            setPosts(res.data)
            
        }).catch((err) => {
            alert("error while publish");
        });

    })



    return (
        <div id="main">
            <Logout></Logout>
            <header>
                <div>
                    <h2>10x Academy</h2>
                </div>

            </header>
            
            <aside>
                <Link to="/publish">Publish Content</Link><br></br>
                <Link to="/comment">Comments</Link><br></br>
                <Link to="/history">History</Link>
            </aside>
            <section>
                <div className="overflow5">
                    {posts.map((k)=>{
                        return(
                            <div>
                                <h1>{k.mailid}</h1>
                                <p>{k.publish}</p>
                            </div>
                        )
                    })}
                </div>
                <div id="under">
                    <button className="under-spam">Edit</button>
                    <button className="under-spam">Save</button>
                    <button onClick={handleClick}>Publish</button>
                    
                </div>

            </section>

        </div>

    )
}

export default Landing;