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

  // Sanitize. $password_hash = password_hash($_POST['passwword'], PASSWORD_DEFAULT);
  $experience = 0;
  $login = mysqli_real_escape_string($con, trim($request->data->login));
  $password = mysqli_real_escape_string($con, trim($request->data->password));
  $system = mysqli_real_escape_string($con, trim($request->data->system));
  $name = mysqli_real_escape_string($con, trim($request->data->name));
  $email = mysqli_real_escape_string($con, trim($request->data->email));
  $experience = mysqli_real_escape_string($con, trim($request->data->experience));
    $login = $request->login;
    $password = $request->password;
    $system = $request->system;
    $name = $request->name;
    $email = 'email';

  // Store.
  $sql = "INSERT INTO mistrzowie (mistrzowie.login,mistrzowie.haslo, mistrzowie.system,mistrzowie.l_poprowadzonych, mistrzowie.imie, mistrzowie.oplata_za_sesje,mistrzowie.email) VALUES ('$login','$password','$system',0,'$name',5,'$email')";


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