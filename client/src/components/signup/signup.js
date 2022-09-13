import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupState, setSignupState] = useState({});
  const navigate = useNavigate();
  const handleUserAdd = () => {
    if (signupState.password === signupState.cpassword) {
      axios({
        url: "http://localhost:5000/signup",
        method: "POST",
        headers: {},
        data: { mailid: signupState.mailid, password: signupState.password },
      })
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => {
          alert("Email is already present.");
        });
    } else {
      alert("password did not match");
    }
  };

  return (
    <>
      <div className="outer-box-signup">
        
        <form>
          <div className="box-signup">
            
            <div className="item-signup">
              <p>Create new Account</p>
            </div>
            <div className="item-signup">
              <input
                id="mailid"
                type="email"
                placeholder="Email-ID"
                name="mailid"
                onChange={(e) => {
                  setSignupState({ ...signupState, mailid: e.target.value });
                }}
              />
            </div>
            <div className="item-signup">
              <input
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => {
                  setSignupState({ ...signupState, password: e.target.value });
                }}
              />
            </div>
            <div className="item-signup">
              <input
                id="password"
                type="password"
                placeholder="Confirm Password"
                name="cpassword"
                onChange={(e) => {
                  setSignupState({ ...signupState, cpassword: e.target.value });
                }}
              />
            </div>
            <div className="item-signup">
              <button type="button" onClick={handleUserAdd}>
                Submit
              </button>
            </div>
            
          </div>
        </form>
        
      </div>
    </>
  );
};
export default Signup;