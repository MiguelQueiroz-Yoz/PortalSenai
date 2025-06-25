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
            <h2>Cadastro de Turmas</h2>
            <section class="form-section">
                <h3>Adicionar Nova Turma</h3>
                <form id="turmaForm">
                    <input type="hidden" id="turmaId" value="">
                    <div class="input-group">
                        <label for="turmaNome">Nome da Turma:</label>
                        <input type="text" id="turmaNome" placeholder="Ex: TADS 2024-1" required>
                    </div>
                    <div class="input-group">
                        <label for="turmaCursoSelect">Curso:</label>
                        <select id="turmaCursoSelect" required>
                            <option value="">Selecione um Curso</option>
                            </select>
                    </div>
                    <div class="input-group">
                        <label for="turmaInstrutorSelect">Instrutor Principal:</label>
                        <select id="turmaInstrutorSelect" required>
                            <option value="">Selecione um Instrutor</option>
                            </select>
                    </div>
                    <div class="input-group">
                        <label for="turmaSalaSelect">Sala Principal:</label>
                        <select id="turmaSalaSelect" required>
                            <option value="">Selecione uma Sala</option>
                            </select>
                    </div>
                    <div class="input-group">
                        <label for="turmaModalidadeSelect">Modalidade:</label>
                        <select id="turmaModalidadeSelect" required>
                            <option value="">Selecione uma Modalidade</option>
                            </select>
                    </div>
                    <div class="input-group">
                        <label for="turmaAreaSelect">Área:</label>
                        <select id="turmaAreaSelect" required>
                            <option value="">Selecione uma Área</option>
                            </select>
                    </div>
                    <div class="input-group">
                        <label for="turmaDataInicio">Data de Início:</label>
                        <input type="date" id="turmaDataInicio" required>
                    </div>
                    <div class="input-group">
                        <label for="turmaDataFim">Data de Fim:</label>
                        <input type="date" id="turmaDataFim" required>
                    </div>
                    <button type="submit" id="btnSalvarTurma">Salvar Turma</button>
                    <button type="button" id="btnCancelarEdicaoTurma" style="display: none;">Cancelar Edição</button>
                </form>
            </section>

            <section class="list-section">
                <h3>Turmas Cadastradas</h3>
                <div class="search-bar">
                    <input type="text" id="searchTurmaInput" placeholder="Buscar turma...">
                    <button id="searchTurmaButton">Buscar</button>
                </div>
                <table id="turmasTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome da Turma</th>
                            <th>Curso</th>
                            <th>Instrutor</th>
                            <th>Sala</th>
                            <th>Modalidade</th>
                            <th>Área</th>
                            <th>Início</th>
                            <th>Fim</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="turmasTableBody">
                        </tbody>
                </table>
                <p id="noTurmasMessage" style="text-align: center; display: none;">Nenhuma turma cadastrada ainda.</p>
            </section>
        </main>
    </div>
    <script src="scripts.js"></script>
</body>
</html>