<?php
require_once 'connect.php';
// Get the posted data.
$postdata = file_get_contents("php://input");


if(isset($postdata) && !empty($postdata))
{

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
     $price = 0;
     $hashed_password = password_hash($password, PASSWORD_DEFAULT);

     $sql = "SELECT * from gracze, mistrzowie where gracze.login = '$login' OR mistrzowie.login = '$login'";

     if($result = mysqli_query($con,$sql))
     {
       if (mysqli_num_rows($result) == 0)
       {  
          $sql = "INSERT INTO mistrzowie (mistrzowie.login,mistrzowie.haslo, mistrzowie.system, mistrzowie.system2, mistrzowie.system3, mistrzowie.l_poprowadzonych, mistrzowie.imie, mistrzowie.oplata_za_sesje,mistrzowie.staz,mistrzowie.email,mistrzowie.miasto) VALUES ('$login','$hashed_password','$system','$system2','$system3',0,'$name','$price','$experience','$email','$city')";
        if(mysqli_query($con,$sql))
        {
          http_response_code(201);
          echo "Records inserted successfully.";
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
