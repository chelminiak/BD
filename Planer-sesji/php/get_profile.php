<?php

require 'connect.php';
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
  $login= $request->login;
  $sql = "SELECT * FROM mistrzowie WHERE login = ?";
  if($stmt = mysqli_prepare($con,$sql))
  {
     mysqli_stmt_bind_param($stmt, "s",  $login);
     mysqli_stmt_bind_result($stmt, $id, $login, $haslo, $system, $system2, $system3, $l_poprowadzonych, $imie, $oplata_za_sesje, $staz, $minimalny_staz_gracza, $email, $miasto);
     mysqli_stmt_execute($stmt);
     mysqli_stmt_store_result($stmt);
     if (mysqli_stmt_num_rows($stmt) > 0)
     {
         mysqli_stmt_fetch($stmt);
             $data = [id=>$id, login=>$login, haslo=>$haslo, system=>$system, system2=>$system2, system3=>$system3, l_poprowadzonych=>$l_poprowadzonych, imie=>$imie, oplata_za_sesje=>$oplata_za_sesje, staz=>$staz, minimalny_staz_gracza=>$minimalny_staz_gracza, email=>$email, miasto=>$miasto]; //tak zwaracac wiecej niz jedno pole
         mysqli_stmt_close($stmt);
         echo json_encode(['data'=>$data]);
     }
     else
     {
        $sql = "SELECT * FROM gracze WHERE login = ?";
        if($stmt = mysqli_prepare($con,$sql))
        {
           mysqli_stmt_bind_param($stmt, "s",  $login);
           mysqli_stmt_bind_result($stmt, $id, $id_druzyna, $id_druzyna2, $id_druzyna3, $id_druzyna4, $login, $haslo, $system, $system2, $system3, $l_odbytych_sesji, $imie, $staz, $email, $miasto);
           mysqli_stmt_execute($stmt);
           mysqli_stmt_store_result($stmt);
           if (mysqli_stmt_num_rows($stmt) > 0)
           {
              mysqli_stmt_fetch($stmt);
              $data = [id=>$id, id_druzyna=>$id_druzyna, id_druzyna2=>$id_druzyna2, id_druzyna3=>$id_druzyna3, id_druzyna4=>$id_druzyna4, login=>$login, haslo=>$haslo, system=>$system, system2=>$system2, system3=>$system3, l_odbytych_sesji=>$l_odbytych_sesji, imie=>$imie, staz=>$staz, email=>$email, miasto=>$miasto]; //tak zwaracac wiecej niz jedno pole
              mysqli_stmt_close($stmt);
              echo json_encode(['data'=>$data]);
           }
           else
           {  
              http_response_code(420);//gracz nie istnieje lub bledny login
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

