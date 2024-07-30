<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: true');
    session_start();
    include("database.php");
?>

<?php
    session_destroy();
?>