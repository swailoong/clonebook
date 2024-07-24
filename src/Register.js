import $ from "jquery";
import { useState } from 'react';

function Register(){
    
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

    return (
        <div id="register">
        <h1>Register Page</h1>
        <form 
            method="post" 
            action="http://localhost:8000/src/server/register.php"
            onSubmit={(event) => handleSubmit(event)}
        >
            <label for="registerUsername">Username:
          <input 
            name="registerUsername" 
            id="registerUsername" 
            type="text"
          />
        </label>
        <label for="registerPassword">Password:
          <input 
            name="registerPassword" 
            id="registerPassword" 
            type="password"
          />
        </label>
        <button type="submit" id="registerSubmit">register</button>
        </form>
        <h1>{result}</h1>
        </div>
    )
}

export default Register;