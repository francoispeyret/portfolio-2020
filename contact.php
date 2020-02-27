<?php

header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json");

$success = false;
$alert = "Please use correctly the form.";

if($_POST) {
    $email = trim($_POST['email']);
    $message = trim($_POST['message']);

    if($email == '' || !preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/", $email)) {
        $success = false;
        $alert = 'Your email is invalid or empty';
    } elseif (strlen($message) < 10 ) {
        $success = false;
        $alert = 'Write more than 10 characters';
    } else {

        $to = "contact@francoispeyret.fr";
        $subject = "New contact message from ". $email;
        $headers = "From:contact@francoispeyret.fr";

        try {
            $success = true;
            $alert = 'Your message has been sent succesfully!';
            mail($to, $subject, $message, $headers);
        } catch (Exception $e) {
            $success = false;
            $alert = 'An error due to server, try again later.';
        }
    }
}

$response = [
    "success" => $success,
    "alert" => $alert
];

// RESPONSE
echo json_encode($response); 

?>