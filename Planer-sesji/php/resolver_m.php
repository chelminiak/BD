<?php

require 'connect.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  $id= $request->id;
  $sql = "SELECT imie from mistrzowie m where m.id =?";

  if($stmt = mysqli_prepare($con,$sql))
  {
     mysqli_stmt_bind_param($stmt, "s", $id);
     mysqli_stmt_bind_result($stmt, $name); //dodac po przecinku kolejne paramtry jak chcesz zwrocic wiecej niz 1
     mysqli_stmt_execute($stmt);
     mysqli_stmt_store_result($stmt);
     if (mysqli_stmt_num_rows($stmt) > 0)
     {
         mysqli_stmt_fetch($stmt);
         mysqli_stmt_close($stmt);
         //$data = [$id,$name]; //tak zwaracac wiecej niz jedno pole
         //echo json_encode(['data'=>$data]);
         //
         echo json_encode($name);

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
