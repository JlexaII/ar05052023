<?php
/* $host = 'localhost'; 
$user = 'angrybzk_trip';      
$pass = '0jXilv&g';         
$dbname = 'angrybzk_trip'; */     
$host = 'localhost'; 
$user = 'root';      
$pass = '';         
$dbname = 'treep'; 
$conn = new mysqli($host, $user, $pass, $dbname) or die(mysqli_error($conn));
mysqli_query($conn, "SET NAMES 'utf8'");
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
//mysqli_close($conn);
?>