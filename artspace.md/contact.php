<?php

$nume = $_POST['nume'];
$email = $_POST['email'];
$mesaj = $_POST['mesaj'];

file_put_contents(__DIR__ . "/mesaje.txt",
"Nume: $nume | Email: $email | Mesaj: $mesaj\n",
FILE_APPEND);

echo "Mesaj trimis cu succes!";

?>