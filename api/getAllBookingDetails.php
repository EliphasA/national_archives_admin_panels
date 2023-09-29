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

$sql = "SELECT Reference_Number,Address,Institution,Topic,Book_Date,Time,Booking_Status FROM mindsina_archive_booking.Booked_Collection;

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
