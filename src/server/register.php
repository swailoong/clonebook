<?php
    header('Access-Control-Allow-Origin: https://clonebook-iota.vercel.app/');
    include("database.php");

    $registerUsername = $_POST["registerUsername"];
    $registerPassword = $_POST["registerPassword"];
    $hash = password_hash($registerPassword, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (user , password) VALUES ('$registerUsername', '$hash')";

    try{
        mysqli_query($conn, $sql);
        echo "User is now registered";
    }
    catch(mysqli_sql_exception){
        echo "username / password is missing";
    }

    mysqli_close($conn);
?>