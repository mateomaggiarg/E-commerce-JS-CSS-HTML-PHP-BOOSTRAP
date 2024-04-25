<?php

include 'conexion_be.php';


    $nombre_completo = $_POST["nombre_completo"];
    $correo = $_POST["correo"];
    $usuario = $_POST["usuario"];
    $contrasena = $_POST["contrasena"];

    $query = "INSERT INTO usuarios(nombre_completo, correo, usuario, contrasena) 
              VALUES('$nombre_completo', '$correo', '$usuario', '$contrasena')";


    $ejecutar = mysqli_query($conexion, $query); 

    if($ejecutar){
        echo '
            <script>
                alert("Usuario almacenado exitosamente");
                window.location = "../home.html";
                </script>
        ';
    
    }else{
        echo '
            <script>
                alert("Error");
                window.location = "../index.php";
                </script>
        ';
    }
    
    mysqli_close($conexion);
?>