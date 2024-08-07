import logo from './logo.svg';
import './styles/App.css';
import $ from "jquery";
import { useContext,useState,useEffect } from 'react';
import { AuthContext } from './AuthContext';

function App() {
  const [result,setResult] = useState("")
  const [create,setCreate] = useState("")
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <h1>Please login to see the posts.</h1>;
  }

  function handleCreate(e){
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
    <div>
      <h3 id="createPostTitle">Create a post</h3>
      <form
        id="createPostForm" 
        method="post" 
        action="http://localhost:8080/src/server/createPost.php" 
        onSubmit={handleCreate}>
          <textarea type="text" name="createContent" id="createContent" placeholder='what is in your mind?'></textarea>
          <input type="text" name="createContentImg" id="createContentImg" placeholder='Image URL goes here'></input>
          <input type="submit"></input>
      </form>
      <p id="createPostDesc">{create}</p>
      <form 
        method="post" 
        action="http://localhost:8080/src/server/posts.php"
        onSubmit={(event) => handleSubmit(event)}
      >
        <button type="submit" id="postSubmit">refresh posts</button>
      </form>
      {isLoggedIn && result && result.length > 0 && result.map((element, index) => (
        <div className="posts" key={index}>
          <div className="posts-userDiv">
            <img 
            className="posts-userImg" 
            src={element.userImg ? element.userImg : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
            width="30px"
            height="30px">
            </img>
            <p className="posts-user">{element.user}</p>
            <p className="date-created">
              {
              `${Math.floor((Date.now() - new Date((element.date).split(" ").join("T")).getTime())/1000/60/60/24)}days`
              }
            </p>
          </div>
          <h1 className='posts-content'>{element.content}</h1>
          {element.contentImg && 
          <img 
            className='posts-img' 
            src={element.contentImg} 
            alt="Post Content">
          </img>
          }
        </div>
      ))}
      <h1>{result.content}</h1>
      <img src={result.contentImg} width="300px"></img>
    </div>
  );
}

export default App;
