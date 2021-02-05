<?php

require 'connect.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  $id = $request->id;
  $id_druzyna = $request->id_druzyna;

  $sql = "UPDATE termin t SET t.id_druzyna = ? WHERE t.id = ? AND id_druzyna IS NULL";
  if($stmt = mysqli_prepare($con,$sql))
  {
     mysqli_stmt_bind_param($stmt, "ii", $id_druzyna, $id);
     mysqli_stmt_execute($stmt);
     if(mysqli_stmt_affected_rows($stmt) > 0)
     {
         http_response_code(201);
     }
     else
     {
        http_response_code(420);//jesli brak takiego terminu, lub ktos inny juz zajal termin
     }
        mysqli_stmt_close($stmt);
   }
   else
   {
      http_response_code(404);
   }
}
