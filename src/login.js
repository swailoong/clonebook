import $ from "jquery";
import { useContext,useState,useEffect } from 'react';
import { AuthContext } from './AuthContext';

function Login() {

  const { login } = useContext(AuthContext);
  const [result, setResult] = useState("");
  const [show, setShow] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = $(e.target);
    $.ajax({
        type: "POST",
        url: form.attr("action"),
        data: form.serialize(),
        success(data) {
            setResult(data);
        },
    });
};

useEffect(()=>{
    result && login()
},[result])

  return (
        <div className="login">
            <h1>Login Page</h1>
            <form 
                method="post" 
                action="http://localhost:8000/src/server/login.php"
                onSubmit={(event) => handleSubmit(event)}
            >
                <label for="loginUsername">Username:
                    <input 
                        name="loginUsername" 
                        id="loginUsername" 
                        type="text"
                    />
                </label>
                <label for="loginPassword">Password:
                    <input 
                        name="loginPassword" 
                        id="loginPassword" 
                        type="password"
                    />
                </label>
                    <button type="submit" id="loginSubmit">login</button>
            </form>
            <h1>{result}</h1>
        </div>
  )
}

export default Login;