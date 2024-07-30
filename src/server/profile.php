<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Credentials: true');
    session_start();
    include("database.php");

    $profilePic = $_POST["profilePic"];
    $profileUser = $_SESSION["username"];

    $sqlDb = "UPDATE postdb 
            SET user_img = '$profilePic' 
            WHERE user = '$profileUser'";

    $sqlUser = "UPDATE users 
                SET pic = '$profilePic' 
                WHERE user = '$profileUser'";

    try{
        mysqli_query($conn, $sqlDb);
        mysqli_query($conn, $sqlUser);
        $_SESSION['pic'] = $profilePic;
    }
    catch(mysqli_sql_exception){
        echo "please try again later";
    }

    mysqli_close($conn);
?>