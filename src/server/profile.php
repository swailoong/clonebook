<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    $allowed_origins = [
        'http://localhost:3000',
        'https://clonebook-iota.vercel.app'
    ];

    $origin = $_SERVER['HTTP_ORIGIN'];

    if (in_array($origin, $allowed_origins)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type');
    } else {
        header('HTTP/1.1 403 Forbidden');
        exit('Forbidden');
    }

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        exit(0);
    }

    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'domain' => '', // Set to your domain if needed
        'secure' => true,
        'httponly' => true,
        'samesite' => 'None' // For cross-origin requests
    ]);

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
        echo "picture changed";
    }
    catch(mysqli_sql_exception){
        echo "please try again later";
    }

    mysqli_close($conn);
?>