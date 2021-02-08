<?php

require 'connect.php';
$data = array();
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  $id= $request->id;
  $sql = "SELECT * from lokalizacja l where l.id ='$id'";

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
