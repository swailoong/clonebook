import $ from "jquery";
import { useState } from 'react';
import './Register.css'

function Register(){
    
    const [showRegister, setShowRegister] = useState(false)
    const [result, setResult] = useState("");
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

    const toggleShowRegister = () =>{
      setShowRegister(prev => !prev)
      setResult("")
    }

    return (
        <div>
        {showRegister ? (
        <div id="register">
        <h1 id="registerTitle">Register Page<button id="registerHide" onClick={toggleShowRegister}>hide</button></h1>
        
        <form 
            method="post" 
            action="http://localhost:8000/src/server/register.php"
            onSubmit={(event) => handleSubmit(event)}
            id="registerForm"
        >
            <label for="registerUsername">Username:
          <input 
            name="registerUsername" 
            id="registerUsername" 
            type="text"
            required
          />
        </label>
        <label for="registerPassword">Password:
          <input 
            name="registerPassword" 
            id="registerPassword" 
            type="password"
            required
          />
        </label>
        <button type="submit" id="registerSubmit">register</button>
        </form>
        <h1>{result}</h1>
        </div>) : <button id="registerShow" onClick={toggleShowRegister}>Register</button>}
        </div>
    )
}

export default Register;