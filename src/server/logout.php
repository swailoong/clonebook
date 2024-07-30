<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Credentials: true');
    session_start();
    include("database.php");
?>

<?php
    session_destroy();
?>