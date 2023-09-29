<?php
include "./DbConnect.php";

try {

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case "GET":
            $sql = "SELECT id, name, email, mobile FROM users";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if (isset($path[3]) && is_numeric($path[3])) {
                $sql .= " WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $path[3]);
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                if (!$user) {
                    sendResponse(404, 'User not found.');
                } else {
                    sendResponse(200, $user);
                }
            } else {
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                sendResponse(200, $users);
            }
            break;

        case "POST":
            $user = json_decode(file_get_contents('php://input'));

            if (!$user || !isset($user->name) || !isset($user->email) || !isset($user->mobile)) {
                sendResponse(400, 'Invalid request payload.');
                exit;
            }

            // Validate and sanitize user input
            $name = filter_var($user->name, FILTER_SANITIZE_STRING);
            $email = filter_var($user->email, FILTER_VALIDATE_EMAIL);
            $mobile = filter_var($user->mobile, FILTER_SANITIZE_STRING);

            if (!$name || !$email || !$mobile) {
                sendResponse(400, 'Invalid user data.');
                exit;
            }

            $sql = "INSERT INTO users(name, email, mobile, created_at) VALUES(:name, :email, :mobile, :created_at)";
            $stmt = $conn->prepare($sql);
            $created_at = date('Y-m-d');
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':mobile', $mobile);
            $stmt->bindParam(':created_at', $created_at);

            if ($stmt->execute()) {
                sendResponse(201, 'Record created successfully.');
            } else {
                sendResponse(500, 'Failed to create record.');
            }
            break;

        case "PUT":
            $user = json_decode(file_get_contents('php://input'));

            if (!$user || !isset($user->id) || !isset($user->name) || !isset($user->email) || !isset($user->mobile)) {
                sendResponse(400, 'Invalid request payload.');
                exit;
            }

            // Validate and sanitize user input
            $id = filter_var($user->id, FILTER_VALIDATE_INT);
            $name = filter_var($user->name, FILTER_SANITIZE_STRING);
            $email = filter_var($user->email, FILTER_VALIDATE_EMAIL);
            $mobile = filter_var($user->mobile, FILTER_SANITIZE_STRING);

            if (!$id || !$name || !$email || !$mobile) {
                sendResponse(400, 'Invalid user data.');
                exit;
            }

            $sql = "UPDATE users SET name = :name, email = :email, mobile = :mobile, updated_at = :updated_at WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $updated_at = date('Y-m-d');
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':mobile', $mobile);
            $stmt->bindParam(':updated_at', $updated_at);

            if ($stmt->execute()) {
                sendResponse(200, 'Record updated successfully.');
            } else {
                sendResponse(500, 'Failed to update record.');
            }
            break;

        case "DELETE":
            $path = explode('/', $_SERVER['REQUEST_URI']);

            if (!isset($path[3]) || !is_numeric($path[3])) {
                sendResponse(400, 'Invalid user ID.');
                exit;
            }

            $id = filter_var($path[3], FILTER_VALIDATE_INT);

            if (!$id) {
                sendResponse(400, 'Invalid user ID.');
                exit;
            }

            $sql = "DELETE FROM users WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                sendResponse(200, 'Record deleted successfully.');
            } else {
                sendResponse(500, 'Failed to delete record.');
            }
            break;

        default:
            sendResponse(405, 'Method Not Allowed');
            break;
    }
} catch (PDOException $e) {
    sendResponse(500, 'Database Connection Error: ' . $e->getMessage());
    exit;
}
?>
