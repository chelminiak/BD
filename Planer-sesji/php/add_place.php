<?php
require_once 'connect.php';
// Get the posted data.
$postdata = file_get_contents("php://input");


if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  $login = 'acas';//$request->login;
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

    $address = $request->address;
    $city = $request->city;
    $max_people = $request->max_people;
    $kitchen = $request->kitchen;
    $type = $request->type;
    $floor = $request->floor;
    $elevator = $request->elevator;
    $sql = "INSERT INTO lokalizacja (lokalizacja.id_mistrzowie,lokalizacja.adres,lokalizacja.miasto,lokalizacja.max_liczba_osob,lokalizacja.dostep_kuchni,lokalizacja.rodzaj_miejsca,lokalizacja.pietro,lokalizacja.czy_winda) VALUES ('$id_mistrzowie','$address','$city','$max_people','$kitchen','$type','$floor','$elevator')";

   //true podawac jako 1, false = 0
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
