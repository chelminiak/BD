<?php

require 'connect.php';
$postdata = file_get_contents("php://input");
$data = array();

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  $login = $request->login;
  $sql = "SELECT druzyna.* from druzyna,gracze where druzyna.l_czlonkow < druzyna.max_l_czlonkow AND (druzyna.system = gracze.system OR druzyna.system = gracze.system2 OR druzyna.system = gracze.system3) AND gracze.login = '$login' AND NOT gracze.id_druzyna <=> druzyna.id AND NOT gracze.id_druzyna2 <=> druzyna.id AND NOT gracze.id_druzyna3 <=> druzyna.id AND NOT gracze.id_druzyna4 <=> druzyna.id";


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
    else{
      http_response_code(435);
    }
  }
  else
  {
    http_response_code(404);
  }
}
