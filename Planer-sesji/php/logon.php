<?php

require 'connect.php';

$data = array();

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{

    $request = json_decode($postdata);
    $login = $request->login;
    $password = $request->password;

$sql = "SELECT haslo from gracze where gracze.login = '$login'";
$sql1 = "SELECT haslo from mistrzowie where mistrzowie.login = '$login'";

if($result = mysqli_query($con,$sql))
{
  if (mysqli_num_rows($result) > 0)
  {
    while($row = mysqli_fetch_assoc($result))
    {
    //echo $row['login'];
    //echo $row['haslo'];
    $hash = $row['haslo'];
    }
    if (password_verify($password,$hash)) {
        http_response_code(201);
	      echo json_encode('player');
    }
    else{
        echo 'Invalid password.';
        http_response_code(301);
    }
   }
   elseif($result = mysqli_query($con,$sql1))
   {   
      if (mysqli_num_rows($result) > 0)
      {
          while($row = mysqli_fetch_assoc($result))
       	  {
    	    $hash = $row['haslo'];
    	  }
     	  if (password_verify($password, $hash)) {
            http_response_code(201);
	          echo json_encode('master');
          } 
          else
          {
            echo 'Invalid password.';
            http_response_code(300);
          }
       }
    }
      

}

else
{
  http_response_code(404);
}
}

//echo json_encode($data);
