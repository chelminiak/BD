<?php
require_once 'connect.php';
// Get the posted data.
$postdata = file_get_contents("php://input");


if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
    $request = json_decode($postdata);
    $experience = $request->experience;
    $login = $request->login;
    $password = $request->password;
    $system = $request->system;
    $system2 = $request->system2;
    $system3 = $request->system3;
    $name = $request->name;
    $email = $request->email;
    $city = $request->city;
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "SELECT * from gracze, mistrzowie where gracze.login = '$login' OR mistrzowie.login = '$login'";

    if($result = mysqli_query($con,$sql))
    {
      if (mysqli_num_rows($result) == 0)
      {
        $sql = "INSERT INTO gracze (gracze.login,gracze.haslo, gracze.system, gracze.system2, gracze.system3, gracze.l_odbytych_sesji, gracze.imie,gracze.staz,gracze.email,gracze.miasto) VALUES ('$login','$hashed_password','$system','$system2','$system3',0,'$name','$experience','$email','$city')";

        if(mysqli_query($con,$sql))
        {
          http_response_code(201);
        }
        else
        {
          http_response_code(422);
          //echo "ERROR: Could not able to execute $sql. " . mysqli_error($con);
        }
       }
       else{
          http_response_code(423);
       }
    }
}
