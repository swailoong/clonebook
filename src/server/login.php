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