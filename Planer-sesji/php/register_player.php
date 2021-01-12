<?php
require_once 'connect.php';
// Get the posted data.
$postdata = file_get_contents("php://input");


if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
  //if(trim($request->data->model) === '' || (int)$request->data->price < 1)
  //{
  //return http_response_code(400);
  //}

    $experience = $request->experience;
    $login = $request->login;
    $password = $request->password;
    $system = $request->system;
    $name = $request->name;
    $email = $request->email;
    $hashed_password = password_hash('$password', PASSWORD_DEFAULT);
  // Store.
  $sql = "INSERT INTO gracze (gracze.login,gracze.haslo, gracze.system,gracze.l_odbytych_sesji, gracze.imie,gracze.staz,gracze.email) VALUES ('$login','$hashed_password','$system',0,'$name','$experience','$email')";


  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    echo "Records inserted successfully.";
  }
  else
  {
    http_response_code(422);
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($con);
  }
}
