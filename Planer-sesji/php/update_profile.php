<?php

require 'connect.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
  //Brakuje walidacji czy dana zostala wyslana
  //na razie traktuje ze wszystkie poszly
  $login = $request->login;
  $system = $request->system;
  $system2 = $request->system2;
  $system3 = $request->system3;
  $imie = $request->imie;
  $staz = $request->staz;
  $email = $request->email;
  $miasto = $request->miasto;

  $sql = "UPDATE gracze g SET g.system = '$system',g.system2 = '$system2',g.system3 = '$system3',g.imie = '$imie',g.staz = '$staz',g.email = '$email',g.miasto = '$email' WHERE g.login =?";
  if($stmt = mysqli_prepare($con,$sql))
  {
     mysqli_stmt_bind_param($stmt, "s", $login);
     mysqli_stmt_execute($stmt);
     if(mysqli_stmt_affected_rows($stmt) > 0)
     {
         http_response_code(201);
     }
     else
     {
        http_response_code(420);
     }
        mysqli_stmt_close($stmt);
   }
   else
   {
      http_response_code(404);
   }
}
