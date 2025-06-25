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
            <h2>Cadastro de Instrutores</h2>
            <section class="form-section">
                <h3>Adicionar Novo Instrutor</h3>
                <form id="instrutorForm">
                    <input type="hidden" id="instrutorId" value="">
                    <div class="input-group">
                        <label for="instrutorNome">Nome Completo:</label>
                        <input type="text" id="instrutorNome" placeholder="Ex: João Silva" required>
                    </div>
                    <div class="input-group">
                        <label for="instrutorEmail">E-mail:</label>
                        <input type="email" id="instrutorEmail" placeholder="exemplo@senai.com" required>
                    </div>
                    <div class="input-group">
                        <label for="instrutorArea">Área de Atuação:</label>
                        <select id="instrutorArea" required>
                            <option value="">Selecione uma Área</option>
                            </select>
                    </div>
                    <button type="submit" id="btnSalvarInstrutor">Salvar Instrutor</button>
                    <button type="button" id="btnCancelarEdicaoInstrutor" style="display: none;">Cancelar Edição</button>
                </form>
            </section>
            <section class="list-section">
                <h3>Instrutores Cadastrados</h3>
                <div class="search-bar">
                    <input type="text" id="searchInstrutorInput" placeholder="Buscar instrutor...">
                    <button id="searchInstrutorButton">Buscar</button>
                </div>
                <table id="instrutoresTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Área</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="instrutoresTableBody">
                        </tbody>
                </table>
                <p id="noInstrutoresMessage" style="text-align: center; display: none;">Nenhum instrutor cadastrado ainda.</p>
            </section>
        </main>
    </div>
    <script src="scripts.js"></script>
</body>
</html>