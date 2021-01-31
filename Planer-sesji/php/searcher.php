<?php

require 'connect.php';
$postdata = file_get_contents("php://input");
$data = array();

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  $login = $request->login;
  $sql = "SELECT druzyna.* from druzyna,gracze where druzyna.l_czlonkow < druzyna.max_l_czlonkow AND (druzyna.system = gracze.system OR druzyna.system = gracze.system2 OR druzyna.system = gracze.system3) AND gracze.login = '$login'";


  //$sql = "SELECT * from druzyna where druzyna.id_mistrzowie = '$id_mistrzowie'";
  if($result = mysqli_query($con,$sql))
  {
    if (mysqli_num_rows($result) > 0)
    {
      while($row = mysqli_fetch_array($result))
      {
        //echo "cosik";
        //echo $row;
        //echo $row['id'];
        //echo  $data;
        $data = $row;
      }
      echo json_encode($data);//można dać np $data['id'];
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
