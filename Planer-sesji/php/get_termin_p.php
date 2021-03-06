<?php

require 'connect.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  $login= $request->login;
  $sql = "SELECT t.* from termin t,gracze g,druzyna d where (d.id = g.id_druzyna OR  d.id = g.id_druzyna2 OR d.id = g.id_druzyna3 OR d.id = g.id_druzyna4) AND d.id IS NOT NULL AND t.id_druzyna = d.id AND g.login =?";
  if($stmt = mysqli_prepare($con,$sql))
  {
     mysqli_stmt_bind_param($stmt, "s", $login);
     mysqli_stmt_bind_result($stmt, $id, $id_druzyna, $id_mistrzowie, $id_lokalizacja, $system, $czas_start, $czas_stop);
     mysqli_stmt_execute($stmt);
     mysqli_stmt_store_result($stmt);
     if (mysqli_stmt_num_rows($stmt) > 0)
     {
         $cr = 0;
         while(mysqli_stmt_fetch($stmt))
         {
             $data[$cr] = [id=>$id, id_druzyna=>$id_druzyna, id_mistrzowie=>$id_mistrzowie, id_lokalizacja=>$id_lokalizacja, system=>$system, czas_start=>$czas_start, czas_stop=>$czas_stop]; //tak zwaracac wiecej niz jedno pole
             $cr++;
         }
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
