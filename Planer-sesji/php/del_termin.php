<?php

require 'connect.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  $login = $request->login;
  $id = $request->id;

  $sql = "SELECT id from mistrzowie where mistrzowie.login = ?";
  if($stmt = mysqli_prepare($con,$sql))
  {
     mysqli_stmt_bind_param($stmt, "s",  $login);
     mysqli_stmt_bind_result($stmt, $id_mistrzowie);
     mysqli_stmt_execute($stmt);
     mysqli_stmt_store_result($stmt);
     if (mysqli_stmt_num_rows($stmt) > 0)
     {
         mysqli_stmt_fetch($stmt);
         mysqli_stmt_close($stmt);
     }
     else
     {
        http_response_code(430);
     }
  }

  // Delete.
  
  $sql = "DELETE FROM termin WHERE termin.id = ? AND termin.id_mistrzowie = '$id_mistrzowie'";

  if($stmt = mysqli_prepare($con, $sql))
  {
    mysqli_stmt_bind_param($stmt, "i",  $id);
    mysqli_stmt_execute($stmt);
    if(mysqli_stmt_affected_rows($stmt) > 0)
    {
        http_response_code(204);
    }
    else
    {    
       http_response_code(423);// brak wykonania zapytania - rozne przyczyny, m.in sql err
    }
     mysqli_stmt_close($stmt);
  }
  else
  {
     http_response_code(422);
  }
}
