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