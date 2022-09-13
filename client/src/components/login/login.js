import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [loginState, setLogin] = useState({});
    const navigate = useNavigate();
    const handleLogin = () => {
        axios({
            url: "http://localhost:5000/login",
            method: "POST",
            headers: {},
            data: { mailid: loginState.mailid, password: loginState.password },
        })
            .then((loginData) => {
                localStorage.setItem("Authorization", loginData.data.authToken);
                navigate("/landing");
            })
            .catch((err) => {
                alert("Invalid Details");
            });
    };
    return (
        <>
            <div className="outer-box-login">
                
                <form>
                    <div className="box-login">
                        
                        <div className="item-login">
                            <p>Enter your credentials to access your acccount</p>
                        </div>
                        <div className="item-login">
                            <input
                                id="mailid"
                                type="email"
                                placeholder="Email-ID"
                                name="mailid"
                                onChange={(e) => {
                                    setLogin({ ...loginState, mailid: e.target.value });
                                }}
                            />
                        </div>
                        <div className="item-login">
                            <input
                                id="password"
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={(e) => {
                                    setLogin({ ...loginState, password: e.target.value });
                                }}
                            />
                        </div>
                        <div className="item-login">
                            <button type="button" onClick={handleLogin}>
                                Login
                            </button>
                        </div>
                        <div className="item-login">
                            <div className=' sign-btn ' onClick={() => navigate("/signup")}> Sign-up</div>
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </form>
                
            </div>
        </>
    );
};

export default Login;