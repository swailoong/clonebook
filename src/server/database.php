<?php 
    // start XAMPP control panel
    // connect to MySQL & Apache
    // run MySQL admin
    // create a database
    // get below info from user accounts

    $db_server = "localhost";
    $db_user = "root";
    $db_pass = "";
    $db_name = "react-app";
    $conn = "";
    
    try{
        $conn = mysqli_connect($db_server, $db_user, $db_pass, $db_name);
    }
    catch(mysqli_sql_exception){
    }

    if($conn){
    }
?>