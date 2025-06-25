<?php
require_once 'conexao.php';


?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consultas - Sala</title>
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

        <main class="content center-content">
            <h2>Cadastro de Áreas</h2>
            <section class="form-section">
                <h3>Adicionar Nova Área</h3>
                <form id="areaForm">
                    <input type="hidden" id="areaId" value="">
                    <div class="input-group">
                        <label for="areaNome">Nome da Área:</label>
                        <input type="text" id="areaNome" placeholder="Ex: Tecnologia da Informação" required>
                    </div>
                    <button type="submit" id="btnSalvarArea">Salvar Área</button>
                    <button type="button" id="btnCancelarEdicaoArea" style="display: none;">Cancelar Edição</button>
                </form>
            </section>

            <section class="list-section">
                <h3>Áreas Cadastradas</h3>
                <div class="search-bar">
                    <input type="text" id="searchAreaInput" placeholder="Buscar área...">
                    <button id="searchAreaButton">Buscar</button>
                </div>
                <table id="areasTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome da Área</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="areasTableBody">
                        </tbody>
                </table>
                <p id="noAreasMessage" style="text-align: center; display: none;">Nenhuma área cadastrada ainda.</p>
            </section>
        </main>
    </div>
    <script src="scripts.js"></script>
</body>
</html>