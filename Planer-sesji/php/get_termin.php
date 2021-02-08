<?php

require 'connect.php';
$data = array();
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
  $login = $request->login;
  $sql = "SELECT id from mistrzowie where mistrzowie.login = '$login'";

  if($result = mysqli_query($con,$sql))
  {
    if (mysqli_num_rows($result) > 0)
    {
      while($row = mysqli_fetch_assoc($result))
      {
        $id_mistrzowie = $row['id'];
      }
     }
     else
     {
        http_response_code(430);
        //echo "ERROR: Could not able to execute $sql. " . mysqli_error($con);
     }
   }

  $sql = "SELECT * from termin where termin.id_mistrzowie = '$id_mistrzowie'";
  if($result = mysqli_query($con,$sql))
  {
    if (mysqli_num_rows($result) > 0)
    {
      $cr = 0;
      while($row = mysqli_fetch_array($result))
      {
    	$data[$cr] = $row;
        $cr++;
      }
      echo json_encode(['data'=>$data]);
    }
  }
  else
  {
    http_response_code(404);
  }
}
