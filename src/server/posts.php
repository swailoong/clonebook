<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include("database.php");
    

    $sql = "SELECT * FROM postdb";
    $result = mysqli_query($conn, $sql);
    

    $data = array();

    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_assoc($result)){
            $data[] = array(
                'id' => $row["id"],
                'user' => $row["user"],
                'userImg' => $row["user_img"],
                'content' => $row["post_content"],
                'contentImg' => $row["post_img"],
                'date' => $row["date_created"],
            );
        }
    }

    echo json_encode($data);

    mysqli_close($conn);
?>