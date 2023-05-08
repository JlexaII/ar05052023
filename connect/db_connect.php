<?php
$host = '127.0.0.1'; // имя хоста
$user = 'root';      // имя пользователя
$pass = '';          // пароль
$dbname = 'treep';      // имя базы данных   
$conn = new mysqli($host, $user, $pass, $dbname) or die(mysqli_error($conn));
mysqli_query($conn, "SET NAMES 'utf8'");
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
//mysqli_close($conn);
?>