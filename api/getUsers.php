<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

// MySql server and database info
$db = "user";
$host = "localhost";
$db_user = 'root';
$db_password = '';

//connecting to the database
$link = mysqli_connect($host, $db_user, $db_password, $db);

// Check if the connection was successful
if ($link === false) {
    echo json_encode(array("error" => "Database Connection Error: " . mysqli_connect_error()));
    exit;
}

// Retrieve records from the database
$query = "SELECT * FROM Authentication";
$result = mysqli_query($link, $query);

if (!$result) {
    echo json_encode(array("error" => "Failed to retrieve records."));
    exit;
}

$data = array();
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

mysqli_close($link);

echo json_encode($data);
?>