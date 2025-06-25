<?php
session_start();
ob_start(); 
include 'conexao.php';

$mensagem = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'], $_POST['senha'])) {
    $email = $_POST['email'];
    $senhaDigitada = $_POST['senha'];

    $stmt = $conn->prepare("SELECT id, nome, senha FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 1) {
        $usuario = $resultado->fetch_assoc();

        if ($senhaDigitada === $usuario['senha']) {
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['usuario_nome'] = $usuario['nome'];
            header("Location: professor.php");
            exit;
        } else {
            $mensagem = "❌ Senha incorreta.";
        }
    } else {
        $mensagem = "❌ Usuário não encontrado.";
    }

    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Login - NETNÚCLEO</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
    }

    header {
      background-color: #2e2e2e;
      color: white;
      padding: 20px;
      text-align: center;
      font-weight: bold;
      font-size: 24px;
    }

    .container {
      background-color: white;
      max-width: 400px;
      margin: 60px auto;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    h2 {
      text-align: center;
      color: #333;
    }

    form {
      display: flex;
      flex-direction: column;
    }

    input[type="email"], input[type="password"] {
      padding: 10px;
      margin: 10px 0;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    button {
      padding: 10px;
      background-color: #0072c6;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
    }

    .mensagem {
      text-align: center;
      color: red;
      margin-top: 15px;
    }
  </style>
</head>
<body>
  <header>NETNÚCLEO - HORTO</header>
  <div class="container">
    <h2>Login</h2>
    <form method="POST">
      <input type="email" name="email" placeholder="E-mail" required />
      <input type="password" name="senha" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>
    <?php if (!empty($mensagem)) : ?>
      <div class="mensagem"><?php echo $mensagem; ?></div>
    <?php endif; ?>
  </div>
</body>
</html>