<?php

require 'connect.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{

    $request = json_decode($postdata);
    $login = $request->login;
    $password = $request->password;

$sql = SELECT  from movies_list where stream > 1500000 group by cid;

if($result = mysqli_query($con,$sql))
{
  while($row = mysqli_fetch_assoc($result))
  {
    $cars[$cr]['id']    = $row['id'];
    $cars[$cr]['model'] = $row['model'];
    $cars[$cr]['price'] = $row['price'];
    $cr++;
  }

   if (password_verify('rasmuslerdorf', $hash)) {
       echo 'Password is valid!';
  //echo json_encode(['data'=>$cars]);
   } else {
       echo 'Invalid password.';
   }

}
else
{
  http_response_code(404);
}
}
