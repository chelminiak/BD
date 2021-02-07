?php

require 'connect.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  $request = json_decode($postdata);
  $experience = $request->experience;
  $system = $request->system;
  $system2 = $request->system2;
  $system3 = $request->system3;
  $name = $request->name;
  $email = $request->email;
  $city = $request->city;
  $money = $request->money;
  $min = $request->min;
  $login = $request->login;

  $sql = "UPDATE gracze g SET g.system = '$system',g.system2 = '$system2',g.system3 = '$system3',g.imie = '$name',g.staz = '$experience',g.email = '$email',g.miasto = '$city' WHERE g.login = ?";
  if($stmt = mysqli_prepare($con,$sql))
  {
     mysqli_stmt_bind_param($stmt, "s", $login);
     mysqli_stmt_execute($stmt);
     if(mysqli_stmt_affected_rows($stmt) > 0)
     {
         http_response_code(201);
         mysqli_stmt_close($stmt);
     }
     else
     {
        $sql = "UPDATE mistrzowie m SET m.system = '$system', m.system2 = '$system2', m.system3 = '$system3', m.imie = '$name', m.oplata_za_sesje = '$money', m.staz = '$experience', m.minimalny_staz_gracza = '$min', m.email = '$email', m.miasto = '$city' WHERE m.login = ?";
        if($stmt = mysqli_prepare($con,$sql))
        {
           mysqli_stmt_bind_param($stmt, "s", $login);
           mysqli_stmt_execute($stmt);
           if(mysqli_stmt_affected_rows($stmt) > 0)
           {
              http_response_code(201);
              mysqli_stmt_close($stmt);
           }
           else
           {
         //     echo $sql;
        //      echo mysqli_error($con);
               mysqli_stmt_close($stmt);
               http_response_code(420);
           }
        }
        else
        {
           http_response_code(404);
        }
     }
   }
   else
   {
      http_response_code(404);
   }
}
