<?php

require 'connect.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  $id = $request->id;
  $sql = "SELECT * FROM druzyna d where d.id = ?";
  if($stmt = mysqli_prepare($con,$sql))
  {
     mysqli_stmt_bind_param($stmt, "i", $id);
     mysqli_stmt_bind_result($stmt, $id, $id_mistrzowie, $l_czlonkow, $max_l_czlonkow, $system, $l_odbytych_sesji, $nazwa);
     mysqli_stmt_execute($stmt);
     mysqli_stmt_store_result($stmt);
     if (mysqli_stmt_num_rows($stmt) > 0)
     {
         mysqli_stmt_fetch($stmt);
         $data = [id=>$id, id_mistrzowie=>$id_mistrzowie, l_czlonkow=>$l_czlonkow, max_l_czlonkow=>$max_l_czlonkow, system=>$system, l_odbytych_sesji=>$l_odbytych_sesji, nazwa=>$nazwa]; //tak zwaracac wiecej niz jedno pole
         mysqli_stmt_close($stmt);
         echo json_encode(['data'=>$data]);
     }
     else
     {
        http_response_code(420);
     }
   }
   else
   {
      http_response_code(404);
   }
}
