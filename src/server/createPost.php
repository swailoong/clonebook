<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Credentials: true');
    include("database.php");
    session_start();

    $createContent = $_POST["createContent"];
    $createContentImg = $_POST["createContentImg"];
    $user = $_SESSION["username"];
    $pic = $_SESSION["pic"];

    $sql = "INSERT INTO postdb (user, user_img, post_content, post_img) VALUES ('$user', '$pic', '$createContent', '$createContentImg')";

    try{
        mysqli_query($conn, $sql);
        echo "new post created";
    }
    catch(mysqli_sql_exception){
        echo "oops! please try again later!";
    }

    mysqli_close($conn);
?>