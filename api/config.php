<?php
  header("Access-Control-Allow-Origin: *");

 //MySql server and database info
  $db = "UNAM";
  $host = "localhost";
  $db_user = 'root';
  $db_password = '';
 
  //connecting to database
  $conn = mysqli_connect($host, $db_user, $db_password, $db);
?>