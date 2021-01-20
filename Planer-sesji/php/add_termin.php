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
        echo "ERROR: Could not able to execute $sql. " . mysqli_error($con);
     }
   }

    $id = $request->id;
    $system = $request->system;
    $start = $request->start;
    $stop = $request->stop;
    $sql = "INSERT INTO termin(termin.id_mistrzowie, termin.id_lokalizacja, termin.system, termin.czas_start, termin.czas_stop) VALUES ('$id_mistrzowie','$id','$system','$start','$stop')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    echo "Records inserted successfully.";
  }
  else
  {
    http_response_code(422);
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($con);
  }
}
