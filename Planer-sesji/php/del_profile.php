<?php

require 'connect.php';
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
 
  $login = $request->login;
  
  // Delete.

  $sql = "DELETE FROM mistrzowie WHERE login = ?";

  if($stmt = mysqli_prepare($con, $sql))
  {
    mysqli_stmt_bind_param($stmt, "s",  $login);
    mysqli_stmt_execute($stmt);
    if(mysqli_stmt_affected_rows($stmt) > 0)
    {
       http_response_code(204);
    }
    else
    {
       if(mysqli_errno($con) == 1451)
       {  
          http_response_code(450); //gdy nie moze zmienic rodzica, klucz obcy dopisany gdzies
       }
       else
       {
           $sql = "DELETE FROM gracze WHERE login = ?";

  	   if($stmt = mysqli_prepare($con, $sql))
     	   {
    	      mysqli_stmt_bind_param($stmt, "s",  $login);
    	      mysqli_stmt_execute($stmt);
    	      if(mysqli_stmt_affected_rows($stmt) > 0)
    	      {
       	         http_response_code(204);
    	      }
    	      else
    	      {
          	 http_response_code(423);// brak wykonania zapytania - rozne przyczyny, m.in sql err, nieistniejace id, niepasujace id itp
    	      }
     	      mysqli_stmt_close($stmt);
  	   }
  	   else
  	   {
    	      http_response_code(422);
  	   }
       }
    }
     mysqli_stmt_close($stmt);
  }
  else
  {
     http_response_code(422);
  }
}
