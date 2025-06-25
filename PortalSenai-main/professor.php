<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NETNÚCLEO - HORTO - Painel do Professor</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
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
                                <a href="consulta_horario.php">Horário</a>
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

        <main class="content center-content">
    <h2>Painel do Professor</h2>

    <section class="profile-summary">
        <p>Bem-vindo(a) ao NETNÚCLEO - HORTO!</p>
    </section>

    <section class="consultas-rapidas">
        <h2 style="text-align: center;">Consultas Rápidas</h2>
        <div class="central-buttons">
            <a href="consulta_horario.php" class="consulta-btn">
                <i class="fas fa-clock"></i> Consulta de Horário
            </a>
            <a href="consulta_sala.php" class="consulta-btn">
                <i class="fas fa-door-open"></i> Consulta de Sala
            </a>
            <a href="consulta_instrutor.php" class="consulta-btn">
                <i class="fas fa-chalkboard-teacher"></i> Consulta de Instrutor
            </a>
        </div>
    </section>
</main>
    <script src="scripts.js"></script>
</body>
</html>