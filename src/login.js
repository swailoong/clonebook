import $ from "jquery";
import { useContext,useState,useEffect } from 'react';
import { AuthContext } from './AuthContext';
import './login.css'

function Login() {

  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [result, setResult] = useState("");
  const [show, setShow] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = $(e.target);
    $.ajax({
        type: "POST",
        url: form.attr("action"),
        xhrFields: {
            withCredentials: true
        },
        data: form.serialize(),
        success(data) {
            setResult(data);
        },
    });
};

function handleLogout(){
    logout()
    setResult("")
  }

const toggleShowLogin = () => {
    setShow(prev => !prev)
}

useEffect(()=>{
    result.includes("You are logged in!") && login()
},[result])

  return (
        <div>
            {show? (
            <div id="login">
                <h1 id="loginTitle">Login Page
                    <button id="loginHide" onClick={toggleShowLogin}>hide</button>
                </h1>
                <form
                    id="loginForm" 
                    method="post" 
                    action="http://localhost:8080/src/server/login.php"
                    onSubmit={(event) => handleSubmit(event)}
                >
                    <label for="loginUsername">Username:
                        <input 
                            name="loginUsername" 
                            id="loginUsername" 
                            type="text"
                            required
                        />
                    </label>
                    <label for="loginPassword">Password:
                        <input 
                            name="loginPassword" 
                            id="loginPassword" 
                            type="password"
                            required
                        />
                    </label>
                        <button type="submit" id="loginSubmit">login</button>
                </form>
                <p>{result}</p>
            </div>) : 
            !isLoggedIn ? 
            <button id="loginShow" onClick={toggleShowLogin}>Login</button> : 
            <button id="logout" onClick={handleLogout} action="http://localhost:8080/src/server/logout.php">logout</button>}
        </div>
  )
}

export default Login;