import $ from "jquery";
import { useState } from 'react';
import './styles/Profile.css'

function Profile(){
    
    const [showProfile, setShowProfile] = useState(false)
    const [result, setResult] = useState("");
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

    const toggleShowProfile = () =>{
      setShowProfile(prev => !prev)
      setResult("")
    }

    return (
        <div>
        {showProfile ? (
        <div id="profile">
        <h1 id="profileTitle">profile<button id="profileHide" onClick={toggleShowProfile}>hide</button></h1>
        
        <form 
            method="post" 
            action="http://localhost:8080/src/server/profile.php"
            onSubmit={(event) => handleSubmit(event)}
            id="profileForm"
        >
            <label for="profilePic">Change Profile Picture URL:
          <input 
            name="profilePic" 
            id="profilePic" 
            type="text"
            required
          />
        </label>
        <input type="submit" id="profileSubmit"></input>
        </form>
        <p>{result}</p>
        </div>) : <button id="profileShow" onClick={toggleShowProfile}>profile</button>}
        </div>
    )
}

export default Profile;