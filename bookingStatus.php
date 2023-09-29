<?php

header("Access-Control-Allow-Origin: *");

//MySql server and database info
$db = "mindsina_Archive_Booking";
$host = "localhost";
$db_user = 'root';
$db_password = '';

//connecting to database
$link = mysqli_connect($host, $db_user, $db_password, $db);

$id = "";

if (isset($_REQUEST["id"])){
    $id = $_REQUEST["id"];
}


$method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {

        case "PUT":
                    $user = json_decode(file_get_contents('php://input'));

                    // if (!$user || !isset($user->id) || !isset($user->name) || !isset($user->email) || !isset($user->mobile)) {
                    //     sendResponse(400, 'Invalid request payload.');
                    //     exit;
                    // }

                    // // Validate and sanitize user input
                    // $id = filter_var($user->id, FILTER_VALIDATE_INT);
                    // $name = filter_var($user->name, FILTER_SANITIZE_STRING);
                    // $email = filter_var($user->email, FILTER_VALIDATE_EMAIL);
                    // $mobile = filter_var($user->mobile, FILTER_SANITIZE_STRING);

                    // if (!$id || !$name || !$email || !$mobile) {
                    //     sendResponse(400, 'Invalid user data.');
                    //     exit;
                    // }

                    $sql = "UPDATE mindsina_archive_booking.Booked_Collection SET Booking_Status = 'Approved' WHERE Reference_Number = :id";
                    $stmt = $conn->prepare($sql);

                    if ($stmt->execute()) {
                        sendResponse(200, 'Record updated successfully.');
                    } else {
                        sendResponse(500, 'Failed to update record.');
                    }
                    break;
            }

$res = mysqli_query($link, $sql);
  $numrows = mysqli_num_rows($res);
  if($numrows > 0){
     $bDetails = array();
     while($obj = mysqli_fetch_object($res)){
     $bDetails[] = $obj;
      }
    
  }
 

  mysqli_close($link);
  
  header('Content-Type: application/json');

  echo json_encode($bDetails);
