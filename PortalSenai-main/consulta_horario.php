<?php
include "conexao.php";

$data_inicial = $_GET['data_inicial'] ?? date('Y-m-d');
$data_final = $_GET['data_final'] ?? date('Y-m-d');
$periodo = $_GET['periodo'] ?? '';
$instrutor = $_GET['instrutor'] ?? '';
$turma = $_GET['turma'] ?? '';

$sql = "SELECT * FROM aulas WHERE data_aula BETWEEN ? AND ?";
$params = [$data_inicial, $data_final];
$types = "ss";

if (!empty($periodo)) {
    $sql .= " AND periodo = ?";
    $types .= "s";
    $params[] = $periodo;
}
if (!empty($instrutor)) {
    $sql .= " AND nome_instrutor = ?";
    $types .= "s";
    $params[] = $instrutor;
}
if (!empty($turma)) {
    $sql .= " AND nome_turma = ?";
    $types .= "s";
    $params[] = $turma;
}

$stmt = $conn->prepare($sql);
$stmt->bind_param($types, ...$params);
$stmt->execute();
$resultado = $stmt->get_result();
?>
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
<h2>Consulta por Horário</h2>
<form method="GET">
    Data Inicial: <input type="date" name="data_inicial" value="<?= $data_inicial ?>">
    Data Final: <input type="date" name="data_final" value="<?= $data_final ?>">

    Período:
    <select name="periodo">
        <option value="">-</option>
        <option value="Manhã" <?= $periodo == "Manhã" ? "selected" : "" ?>>Manhã</option>
        <option value="Tarde" <?= $periodo == "Tarde" ? "selected" : "" ?>>Tarde</option>
        <option value="Noite" <?= $periodo == "Noite" ? "selected" : "" ?>>Noite</option>
    </select>

    Instrutor:
    <select name="instrutor">
        <option value="">-</option>
        <?php
        $res = $conn->query("SELECT DISTINCT nome_instrutor FROM aulas ORDER BY nome_instrutor");
        while ($row = $res->fetch_assoc()) {
            $sel = $row['nome_instrutor'] == $instrutor ? "selected" : "";
            echo "<option value='{$row['nome_instrutor']}' $sel>{$row['nome_instrutor']}</option>";
        }
        ?>
    </select>

    Turma:
    <select name="turma">
        <option value="">-</option>
        <?php
        $res = $conn->query("SELECT DISTINCT nome_turma FROM aulas WHERE nome_turma IS NOT NULL ORDER BY nome_turma");
        while ($row = $res->fetch_assoc()) {
            $sel = $row['nome_turma'] == $turma ? "selected" : "";
            echo "<option value='{$row['nome_turma']}' $sel>{$row['nome_turma']}</option>";
        }
        ?>
    </select>

    <button type="submit">Filtrar</button>
</form>

<table border="1">
    <tr>
        <th>Aula</th>
        <th>Data</th>
        <th>Dia</th>
        <th>Instrutor</th>
        <th>Matéria</th>
        <th>Sala</th>
        <th>Turma</th>
        <th>Curso</th>
        <th>Tipo</th>
        <th>Período</th>
    </tr>
    <?php while ($aula = $resultado->fetch_assoc()): ?>
        <tr style="background-color: <?= $aula['nome_instrutor'] == 'SIDINEY' ? '#f7f7aa' : ($aula['nome_instrutor'] == 'KLEBER' ? '#e0e0e0' : '#f7bdbd') ?>">
            <td><?= $aula['id_aula'] ?></td>
            <td><?= date('d/m/Y', strtotime($aula['data_aula'])) ?></td>
            <td><?= $aula['dia_semana'] ?></td>
            <td><?= $aula['nome_instrutor'] ?></td>
            <td><?= $aula['nome_materia'] ?></td>
            <td><?= $aula['numero_sala'] ?></td>
            <td><?= $aula['nome_turma'] ?></td>
            <td><?= $aula['nome_curso'] ?></td>
            <td><?= $aula['tipo_aula'] ?></td>
            <td><?= $aula['periodo'] ?></td>
        </tr>
    <?php endwhile; ?>
</table>

<?php $conn->close(); ?>
