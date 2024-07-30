<?php
    $allowed_origins = [
        'http://localhost:3000',
        'https://clonebook-iota.vercel.app'
    ];

    $origin = $_SERVER['HTTP_ORIGIN'];

    if (in_array($origin, $allowed_origins)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    } else {
        header('HTTP/1.1 403 Forbidden');
        exit('Forbidden');
    }

    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type');
    
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