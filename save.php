<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $age = $_POST['age'];

    $data = "$name, $age\n";

    file_put_contents('data/clients.txt', $data, FILE_APPEND);

    echo "<script>window.location.href = 'index.html';</script>";
    exit;
}
?>
