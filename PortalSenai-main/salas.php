<?php
include "conexao.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $numero_sala = $_POST['numero_sala'];
    $capacidade = $_POST['capacidade'];
    $localizacao = $_POST['localizacao'];

    $sql = "INSERT INTO salas (numero_sala, capacidade, localizacao)
            VALUES ('$numero_sala', '$capacidade', '$localizacao')";

    if ($conn->query($sql) === TRUE) {
        echo "✅ Sala cadastrada com sucesso!";
    } else {
        echo "Erro: " . $conn->error;
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consultas - Sala</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
        }

        .dashboard-container {
            max-width: 1000px;
            margin: auto;
            padding: 20px;
        }

        form {
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
        }

        form input[type="text"],
        form input[type="number"] {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        form input[type="submit"] {
        background-color: #005baa; 
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        }

        form input[type="submit"]:hover {
            background-color: #004080;  
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
        }

        th, td {
            padding: 12px;
            border-bottom: 1px solid #ccc;
            text-align: center;
        }

        th {
            background-color: #FFFFFF;
            color: white;
        }

        h2 {
            text-align: center;
            color: #333;
        }

        .professor-header {
            background-color: #FFFFFF;
            color: white;
            padding: 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
        }

        .logo img {
            height: 50px;
        }

        .title {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
        }

        .main-nav ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            gap: 15px;
        }

        .main-nav a {
            color: white;
            text-decoration: none;
            font-weight: 500;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            background-color: white;
            box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
            z-index: 1;
            min-width: 160px;
        }

        .dropdown-content a {
            color: black;
            padding: 10px;
            display: block;
        }

        .dropdown:hover .dropdown-content {
            display: block;
        }

        .header-right {
            display: flex;
            align-items: center;
        }

        .theme-toggle-button {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: blue;
        }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <header class="professor-header">
            <div class="header-left">
                <div class="logo">
                    <img src="logo-senai.png" alt="SESI SENAI">
                </div>
            </div>
            <div class="header-center">
                <div class="title">NETNÚCLEO - HORTO</div>
                <nav class="main-nav">
                    <ul>
                        <li class="dropdown">
                            <a href="#" class="dropbtn">Cadastros</a>
                            <div class="dropdown-content">
                                <a href="instrutores.php">Instrutores</a>
                                <a href="salas.php">Salas</a>
                                <a href="areas.php">Áreas</a>
                                <a href="cursos.php">Cursos</a>
                                <a href="turmas.php">Turmas</a>
                            </div>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropbtn">Consultas</a>
                            <div class="dropdown-content">
                                <a href="consulta_horario.php">Horários</a>
                                <a href="consulta_instrutor.php">Instrutor</a>
                                <a href="consulta_sala.php">Sala</a>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="header-right">
                <button id="theme-toggle" class="theme-toggle-button" title="Alternar Tema">
                    🌙
                </button>
            </div>
        </header>

        <h2>Cadastro de Sala</h2>
        <form method="POST">
            Número da Sala: <input type="text" name="numero_sala" required><br><br>
            Capacidade: <input type="text" name="capacidade"><br><br>
            Localização: <input type="text" name="localizacao"><br><br>
            <input type="submit" value="Cadastrar Sala">
        </form>
    </div>
</body>
</html>
