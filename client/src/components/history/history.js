import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logout from "../logout/logout";
import axios from "axios";
import "./history.css"


const History = () => {
    const [list, setList] = useState([]);
    useEffect(() => {
        let token = localStorage.getItem("Authorization");
        axios({
            url: "http://localhost:5000/comment",
            method: "GET",
            headers: { authorization: token }
        }).then((res) => {
            console.log(res);
            setList(res.data)
            // navigate("/publish")
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
            {/* <hr></hr> */}
            <aside>
                <Link to="/publish">Publish Content</Link><br></br>
                <Link to="/comment">Comments</Link><br></br>
                <Link to="/history">History</Link>
            </aside>
            <section>
                <div className="overflow1">
                    {list.map((k)=>{
                        return(
                            <div>
                                <h1>{k.mailid}</h1>
                                <p>{k.publish}</p>
                            </div>
                        )
                    })}
                </div>
                

            </section>

        </div>

    )
}

export default History;