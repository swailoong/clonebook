<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include("database.php");

    $createContent = $_POST["createContent"];
    $createContentImg = $_POST["createContentImg"];

    $sql = "INSERT INTO postdb (post_content , post_img) VALUES ('$createContent', '$createContentImg')";

    try{
        mysqli_query($conn, $sql);
        echo "new post created";
    }
    catch(mysqli_sql_exception){
        echo "oops! please try again later!";
    }

    mysqli_close($conn);
?>