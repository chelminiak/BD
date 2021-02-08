<?php
require_once 'connect.php';
// Get the posted data.
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

    $max_people = $request->max_people;
    $system = $request->system;
    $num_sessions = $request->num_sessions;
    $name = $request->name;
    $sql = "INSERT INTO druzyna (druzyna.id_mistrzowie,druzyna.l_czlonkow,druzyna.max_l_czlonkow,druzyna.system,druzyna.l_odbytych_sesji,druzyna.nazwa) VALUES ('$id_mistrzowie', 0,'$max_people','$system','$num_sessions','$name')";

   //true podawac jako 1, false = 0
  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
  }
  else
  {
    http_response_code(422);
    //echo "ERROR: Could not able to execute $sql. " . mysqli_error($con);
  }
}
