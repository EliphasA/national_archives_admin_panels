<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

    $host = "localhost";
    $dbname = "national_archives_admin_panel";
    $user = 'root';
    $password = '';

    if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
        exit();
    }

    // Function to send the response
    function sendResponse($status, $message) {
        http_response_code($status);
        echo json_encode(['status' => $status, 'message' => $message]);
    }
    
    // Connecting to the database
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

?>