<?php
include("./config.php");

#creating a request method object
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        $type = $_REQUEST["type"];

        switch ($type) {
            case "login":
                //checking if the user is already logged in
                if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
                    echo json_encode(array("message" => "success"));
                }

                # getting user details from request
                $email = trim($_POST['email']);
                $password = trim(($_POST['password']));

                $query = "SELECT * FROM users where email='{$email}'";

                $hashed_password = "";
                $id = "";
                $name = "";
                $email = "";
                $user_password = "";
                $user_type = "";
                $profile = "";

                $result = $conn->query($query);
                if ($result->num_rows > 0) {
                    while ($row = mysqli_fetch_array($result)) {
                        $user_password = $row['password'];
                        $id = $row['id'];
                        $name = $row['name'];
                        $email = $row['email'];
                        $user_type = $row['user_type'];
                        $profile = $row['profile'];
                    }

                    if ($password == $user_password) {
                        $user_data = array($id, $name, $email, $user_type, $profile);

                        echo json_encode(array("message" => "success", "userData" => $user_data));
                    } else {
                        echo json_encode(array("message" => "failed"));
                    }

                    // if (password_verify($password, $hashed_password)) {
                    //     $user_data = array($id,$name,$email,$user_type,$profile);

                    //     echo json_encode(array("message" => "success","userData"=>$user_data));
                    // }
                } else {
                    echo json_encode(array("message" => "failed"));
                }

                break;
            case "inser_image":
                #getting data from backend
                $heading = trim($_POST['heading']);
                $description = trim($_POST['description']);

                #getting data from the database
                $check_image = "SELECT * FROM gallery where image_heading='{$heading}'";
                $check_image_result = $conn->query($check_image);

                #checking if customer's email already exists
                if ($check_image_result->num_rows > 0) {
                    echo json_encode(array("message" => "image_exist"));
                } else {

                    //image properties
                    $img_name = $_FILES['image']['name'];
                    $img_size = $_FILES['image']['size'];
                    $tmp_name = $_FILES['image']['tmp_name'];

                    if ($img_size > 50000000) {
                        echo json_encode(array("message" => "file_size_err"));
                    }
                    if ($img_size === 0) {
                        echo json_encode(array("message" => "empty_file"));
                    } else {
                        $img_ext = pathinfo($img_name, PATHINFO_EXTENSION);
                        $img_ext_loc = strtolower($img_ext);

                        $allowed_ext = array("jpg", "jpeg", "png", "webp");
                        if (in_array($img_ext_loc, $allowed_ext)) {
                            $image_url = uniqid("GALLERY-", true) . '.' . $img_ext_loc;
                            $profile_upload_path = 'gallery/' . $image_url;

                            //inserting into a database
                            $insert_image_query = "INSERT INTO gallery(image,image_heading,image_description)
                                VALUES('{$image_url}','{$heading}','{$description}')";

                            $insert_image = $conn->query($insert_image_query);

                            if ($insert_image) {
                                move_uploaded_file($tmp_name, $profile_upload_path);
                                echo json_encode(array("message" => "success"));
                            }
                        } else {
                            echo json_encode(array("message" => "file_type_err"));
                        }
                    }
                }
                break;
            case "send_email":
                #getting data from backend
                $name = trim($_POST['name']);
                $email = trim($_POST['email']);
                $subject = trim($_POST['subject']);
                $message = trim($_POST['message']);
                $to = "andreaselifasshikongo1@gmail.com";
                $headers = "MIME-Version: 1.0" . "\r\n";
                $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
                $headers .= 'From: ' . $email . '<' . $email . '>' . "\r\n" . 'Reply-To: ' . $email . "\r\n" . 'X-Mailer: PHP/' . phpversion();

                // //sending an email to applicant
                $mail_status = mail($to, $subject, $message, $headers);

                if ($mail_status) {
                    echo json_encode(array("message" => "success"));
                } else {
                    echo json_encode(array("message" => "error"));
                }
                break;
        }

        break;

    case 'GET':
        //quering the database
        $get_image = "SELECT * FROM `gallery` ORDER BY `gallery`.`createdAt` DESC";
        $result = $conn->query($get_image);

        //response data
        $response = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
        }
        echo json_encode($response);

        break;
}