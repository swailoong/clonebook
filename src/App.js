import logo from './logo.svg';
import './App.css';
import $ from "jquery";
import { useContext,useState,useEffect } from 'react';
import { AuthContext } from './AuthContext';

function App() {
  const {logout} = useContext(AuthContext)
  const [result,setResult] = useState("")
  const [create,setCreate] = useState("")
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <h1>Please login to see the posts.</h1>;
  }

  function handleLogout(){
    logout()
  }

  function handleCreate(e){
    e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                setCreate(data);
            },
        });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = $(e.target);
    $.ajax({
        type: "POST",
        url: form.attr("action"),
        dataType: "json",
        data: form.serialize(),
        success(data) {
            setResult(data);
        }
    }); 
}; 

  return (
    <div className="post">
      <button onClick={handleLogout}>logout</button>
      <h1>Posts</h1>
      <form 
        method="post" 
        action="http://localhost:8000/src/server/createPost.php" 
        onSubmit={handleCreate}>
          <label>Create a post<input type="text" name="createContent" id="createContent"></input></label>
          <label>Place your image URL<input type="text" name="createContentImg" id="createContentImg"></input></label>
          <input type="submit"></input>
      </form>
      <h1>{create}</h1>
      <form 
        method="post" 
        action="http://localhost:8000/src/server/posts.php"
        onSubmit={(event) => handleSubmit(event)}
      >
        <button type="submit" id="postSubmit">refresh</button>
      </form>
      {result && result.length > 0 && result.map((element, index) => (
        <div key={index}>
          <h1>{element.content}</h1>
          <img src={element.contentImg} alt="Post Content" width="300px"></img>
        </div>
      ))}
      <h1>{result.content}</h1>
      <img src={result.contentImg} width="300px"></img>
    </div>
  );
}

export default App;
