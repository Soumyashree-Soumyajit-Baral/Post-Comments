import { Link } from "react-router-dom";
import { useState } from "react";
import Logout from "../logout/logout";
import axios from "axios";
import "./publish.css"


const Publish = () => {
    const [input, setInput] = useState("");
    
    const handleInput = (e) => {
        setInput(e.target.value)
    }
    const handlePublish = () => {
        let token = localStorage.getItem("Authorization");
        console.log(input)
        axios({
            url: "http://localhost:5000/publish",
            method: "POST",
            headers: {authorization: token},
            data: { publish: input }
        }).then((res) => {
            console.log(res);
            
        }).catch((err) => {
            alert("error while publish");
        });
        setInput("")
    }



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
                    <div>
                        
                        <textarea name="publish" id="address" cols="158" rows="30" value={input} onChange={handleInput}></textarea>
                    </div>
                    <div id="under">
                        <button className="under-spam">Edit</button>
                        <button className="under-spam" onClick={handlePublish}>Save</button>
                        <button id="right" >Publish</button>
                    </div>

                </section>

            </div>

        )
    }

    export default Publish;