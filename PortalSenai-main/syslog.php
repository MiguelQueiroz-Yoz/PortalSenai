<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administração - Log do Sistema</title>
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
                            <a href="#" class="dropbtn">Movimentação</a>
                            <div class="dropdown-content">
                                <a href="lancamento_aulas.php">Lançamento de Aulas</a>
                            </div>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropbtn">Consultas</a>
                            <div class="dropdown-content">
                                <a href="consulta_horario.php">Horário</a>
                                <a href="consulta_instrutor.php">Instrutor</a>
                                <a href="consulta_sala.php">Sala</a>
                                <a href="materias_a_lancar.php">Matérias a Lançar</a>
                                <a href="materias_por_turma.php">Matérias por Turma</a>
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
            <h2>Log do Sistema</h2>
            <section class="form-section">
                <h3>Filtrar Eventos do Log</h3>
                <div class="input-group">
                    <label for="filtroLogDataInicio">Data Início:</label>
                    <input type="date" id="filtroLogDataInicio">
                </div>
                <div class="input-group">
                    <label for="filtroLogDataFim">Data Fim:</label>
                    <input type="date" id="filtroLogDataFim">
                </div>
                <div class="input-group">
                    <label for="filtroLogTipo">Tipo de Evento:</label>
                    <select id="filtroLogTipo">
                        <option value="">Todos os Tipos</option>
                        <option value="LOGIN">Login</option>
                        <option value="CADASTRO">Cadastro</option>
                        <option value="EDICAO">Edição</option>
                        <option value="EXCLUSAO">Exclusão</option>
                        <option value="ERRO">Erro</option>
                        </select>
                </div>
                <div class="input-group">
                    <label for="filtroLogUsuario">Usuário:</label>
                    <input type="text" id="filtroLogUsuario" placeholder="Nome de usuário">
                </div>
                <button id="btnBuscarLogs">Buscar Logs</button>
            </section>

            <section class="list-section">
                <h3>Registros do Sistema</h3>
                <table id="syslogTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data/Hora</th>
                            <th>Usuário</th>
                            <th>Tipo</th>
                            <th>Ação/Detalhes</th>
                            <th>IP</th>
                        </tr>
                    </thead>
                    <tbody id="syslogTableBody">
                        </tbody>
                </table>
                <p id="noLogsMessage" style="text-align: center; display: none;">Nenhum registro de log encontrado com os filtros aplicados.</p>
            </section>
        </main>
    </div>
    <script src="scripts.js"></script>
</body>
</html>