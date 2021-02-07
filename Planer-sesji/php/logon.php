<?php

require 'connect.php';

$data = array();

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{

    $request = json_decode($postdata);
    $login = $request->login;
    $password = $request->password;

$sql = "SELECT haslo from gracze where gracze.login =?";
$sql1 = "SELECT haslo from mistrzowie where mistrzowie.login =?";

if($stmt = mysqli_prepare($con,$sql))
{
  mysqli_stmt_bind_param($stmt, "s", $login);
  mysqli_stmt_bind_result($stmt, $hash);
  mysqli_stmt_execute($stmt);
  mysqli_stmt_store_result($stmt);

  if (mysqli_stmt_num_rows($stmt) > 0)
  {
    mysqli_stmt_fetch($stmt);
    mysqli_stmt_close($stmt);

    if (password_verify($password,$hash)) {
        http_response_code(201);
	echo json_encode('player');
    }
    else{
        echo 'Invalid password.';
        http_response_code(301);
    }
   }
   elseif($stmt = mysqli_prepare($con,$sql1))
   { 
      mysqli_stmt_bind_param($stmt, "s", $login);
      mysqli_stmt_bind_result($stmt, $hash);
      mysqli_stmt_execute($stmt);
      mysqli_stmt_store_result($stmt);
 
      if (mysqli_stmt_num_rows($stmt) > 0)
      { 
          mysqli_stmt_fetch($stmt);
          mysqli_stmt_close($stmt);
   
     	  if (password_verify($password, $hash)) {
            http_response_code(201);
	    echo json_encode('master');
          } 
          else
          {
            echo 'Invalid password.';
            http_response_code(300);
          }
       } else{
  	    http_response_code(404);
	    }

    }
      
}

else
{
  http_response_code(404);
}
}

