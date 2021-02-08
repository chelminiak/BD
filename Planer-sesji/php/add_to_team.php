<?php

require 'connect.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  $id = $request->id;
  $login = $request->login;
  $sql = "SELECT add_player(?,?)";
  if($stmt = mysqli_prepare($con,$sql))
  {
     mysqli_stmt_bind_param($stmt, "is", $id, $login);
     mysqli_stmt_bind_result($stmt, $f_output);
     mysqli_stmt_execute($stmt);
     mysqli_stmt_store_result($stmt);
     mysqli_stmt_fetch($stmt);
     mysqli_stmt_close($stmt);
     $sql = "UPDATE druzyna d SET d.l_czlonkow = d.l_czlonkow + 1 WHERE d.id =?";
     if($stmt = mysqli_prepare($con,$sql))
     {
        mysqli_stmt_bind_param($stmt, "i", $id);
        if($f_output == 1)
        {
           mysqli_stmt_execute($stmt);
           if(mysqli_stmt_affected_rows($stmt) > 0)
           {
              http_response_code(201);
           }
           else//brak dopasowania do wiersza idk what happened
           {
              http_response_code(405);
           }
        }
        elseif($f_output == 2)
        {
           mysqli_stmt_execute($stmt);
           if(mysqli_stmt_affected_rows($stmt) > 0)
           {
              http_response_code(201);
           }
           else
           {
              http_response_code(405);
           }
        }
        elseif($f_output == 3)
        {
           mysqli_stmt_execute($stmt);
           if(mysqli_stmt_affected_rows($stmt) > 0)
           {
              http_response_code(201);
           }
           else
           {
              http_response_code(405);
           }
        }
        elseif($f_output == 4)
        {
           mysqli_stmt_execute($stmt);
           if(mysqli_stmt_affected_rows($stmt) > 0)
           {
              http_response_code(201);
           }
           else
           {
              http_response_code(405);
           }
        }
        elseif($f_output == -1)//jesli druzyna jest pelna
        {
           http_response_code(430);
        }
        else //jesli jest juz w druzynie lub nie moze do wiekszej liczby dolaczyc
        {
           http_response_code(420);
        }
        mysqli_stmt_close($stmt);
     }
   }
   else//cos zle z zapytaniem UPDATE
   {
      http_response_code(404);
   }
}
