import "./App.css";
// import Contact from "./components/contact/contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/signup";
import Login from "./components/login/login";
import Logout from "./components/logout/logout";
import Publish from "./components/publish/publish";
import Landing from "./components/landing/landing";
import History from "./components/history/history";
import Comment from "./components/comments/comment";
// import Protected from "./components/protected/protected";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" exact element={<Login />}></Route>
          <Route path="/landing" exact element={<Landing />}></Route>
          <Route path="/comment" exact element={<Comment />}></Route>
          <Route path="/history" exact element={<History />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/publish" element={<Publish />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;