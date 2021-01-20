<?php

require 'connect.php';
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  $login = $request->login;
  $id = $request->id;
  $sql = "SELECT id from mistrzowie where mistrzowie.login = '$login'";// pamietaj ze jest masa loginow identycznych aktualnie w bd, testowane dla id-mistrzowie = 3 - zwraca 3 wiersze i testowane dla login= 'acas' 1 wiersz

  if($result = mysqli_query($con,$sql))
  {
    if (mysqli_num_rows($result) > 0)
    {
      while($row = mysqli_fetch_assoc($result))
      {
        $id_mistrzowie = $row['id'];
      }
     }
     else
     {
        http_response_code(430);
     }
   }
  // Extract, validate and sanitize the id.
//      $id_mistrzowie = 3;
//      $id = 4;
  if(!$id)
  {
    return http_response_code(400);
  }
  // Delete.
  $sql = "DELETE FROM lokalizacja WHERE lokalizacja.id = '$id' AND lokalizacja.id_mistrzowie = '$id_mistrzowie'";

  if($stmt = mysqli_prepare($con, $sql))
  {
    mysqli_stmt_execute($stmt);
    if(mysqli_stmt_affected_rows($stmt) > 0)
    {
        http_response_code(204);
    }
    else
    {
      return http_response_code(423);
    }
  }
  else
  {
       return http_response_code(422);
  }
}
