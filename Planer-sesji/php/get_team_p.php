<?php

require 'connect.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  $login= 'abcd';//$request->login;
  $sql = "SELECT d.* from druzyna d,gracze g where (d.id = g.id_druzyna OR  d.id = g.id_druzyna2 OR  d.id = g.id_druzyna3 OR  d.id = g.id_druzyna4) AND d.id IS NOT NULL AND g.login =?";
  if($stmt = mysqli_prepare($con,$sql))
  {
     mysqli_stmt_bind_param($stmt, "s", $login);
     mysqli_stmt_bind_result($stmt, $id, $id_mistrzowie, $l_czlonkow, $max_l_czlonkow, $system, $l_odbytych_sesji, $nazwa);
     mysqli_stmt_execute($stmt);
     mysqli_stmt_store_result($stmt);
     if (mysqli_stmt_num_rows($stmt) > 0)
     {
         $cr = 0;
         while(mysqli_stmt_fetch($stmt))
         {
             $data[$cr] = [id=>$id, id_mistrzowie=>$id_mistrzowie, l_czlonkow=>$l_czlonkow, max_l_czlonkow=>$max_l_czlonkow, system=>$system, l_odbytych_sesji=>$l_odbytych_sesji, nazwa=>$nazwa]; //tak zwaracac wiecej niz jedno pole
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
