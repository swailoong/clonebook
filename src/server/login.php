<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: true');
    session_destroy();
    session_start();
    include("database.php");
    
    $loginUsername = $_POST["loginUsername"];
    $loginPassword = $_POST["loginPassword"];

    $sql = "SELECT * FROM users WHERE user ='$loginUsername'";
    $result = mysqli_query($conn, $sql);

    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_assoc($result)){
            if(password_verify($loginPassword,$row["password"])){
                echo "You are logged in!";
                $_SESSION['username'] = $row['user'];
                $_SESSION['pic'] = $row['pic'];
            }   else{
                echo "Incorrect password!";
            }
        }
    } else {
        echo "no user found";
    }

    mysqli_close($conn);
?>