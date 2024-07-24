<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include("database.php");
    
    $loginUsername = $_POST["loginUsername"];
    $loginPassword = $_POST["loginPassword"];

    $sql = "SELECT * FROM users WHERE user ='$loginUsername'";
    $result = mysqli_query($conn, $sql);

    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_assoc($result)){
            $hash = password_hash($loginPassword, PASSWORD_DEFAULT);
            if(password_verify($loginPassword,$row["password"])){
                echo "You are logged in!";
            }   else{
                echo "Incorrect password!";
            }
            echo $row["user"];
        }
    } else {
        echo "no user found";
    }

    mysqli_close($conn);
?>