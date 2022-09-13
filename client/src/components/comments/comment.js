import { Link} from "react-router-dom";
import { useEffect, useState } from "react";
import Logout from "../logout/logout";
import axios from "axios";
import "./comment.css"


const Comment = () => {
    const [input, setInput] = useState("")
    const [list, setList] = useState([]);
    // const handleList = (e) => {
    //     if (!input) {

    //     } else {
    //         setList([...list, input]);
    //         setInput("")
    //     }

    // }
    const handleInput = (e) => {
        setInput(e.target.value)
    }
    const [posts, setPosts] = useState([]);
    // const navigate=useNavigate()
    // const navigate=useNavigate()
    // const handleClick = () => {
    //     navigate("/publish")
    // }
    useEffect(() => {
        let token = localStorage.getItem("Authorization");
        // console.log(input)
        axios({
            url: "http://localhost:5000/publish",
            method: "GET",
            headers: { authorization: token }
        }).then((res) => {
            console.log(res);
            setPosts(res.data)
            // navigate("/publish")
        }).catch((err) => {
            alert("error while publish");
        });

    })
    useEffect(() => {
        let token = localStorage.getItem("Authorization");
        // console.log(input)
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
    const handleComment = () => {
        let token = localStorage.getItem("Authorization");
        // console.log(input)
        axios({
            url: "http://localhost:5000/comment",
            method: "POST",
            headers: {authorization: token},
            data: { publish: input }
        }).then((res) => {
            console.log(res);
            // navigate("/publish")
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
            {/* <hr></hr> */}
            <aside>
                <Link to="/publish">Publish Content</Link><br></br>
                <Link to="/comment">Comments</Link><br></br>
                <Link to="/history">History</Link>
            </aside>
            <section>
                <div className="overflow">
                    {/* <input name="publish" id="publish"  value={input} onChange={handleInput}></input> */}
                    {/* <textarea name="publish" id="address" cols="158" rows="30" value={input} onChange={handleInput}></textarea> */}
                    {posts.map((k) => {
                        return (
                            <div>
                                <h1>{k.mailid}</h1>
                                <p>{k.publish}</p>
                            </div>
                        )
                    })}
                </div>
                <div id="under1">
                    <span>likes</span>
                    <span>comments</span>
                </div>
                <div id="ifeild">
                    <input name="comment" id="comment" placeholder="comment..." value={input} onChange={handleInput}></input>
                    <button id="btn" onClick={handleComment}>Add</button>
                </div>
                <div>
                    <div className="underflow">
                        {/* <input name="publish" id="publish"  value={input} onChange={handleInput}></input> */}
                        {/* <textarea name="publish" id="address" cols="158" rows="30" value={input} onChange={handleInput}></textarea> */}
                        {list.map((d) => {
                            return (
                                <div>
                                    <h1>{d.mailid}</h1>
                                    <p>{d.publish}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </section>

        </div>

    )
}

export default Comment;