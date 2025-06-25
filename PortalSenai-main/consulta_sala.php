<?php
include "conexao.php";

$data_inicial = $_GET['data_inicial'] ?? date('Y-m-d');
$data_final = $_GET['data_final'] ?? date('Y-m-d');
$numero_sala = $_GET['sala'] ?? '';
$ordem = $_GET['ordem'] ?? 'data_aula';

$sql = "
    SELECT data_aula, dia_semana, numero_sala, periodo, descricao_evento
    FROM horario_sala_consulta
    WHERE data_aula BETWEEN ? AND ?
";
$params = [$data_inicial, $data_final];
$types = "ss";

if (!empty($numero_sala)) {
    $sql .= " AND numero_sala = ?";
    $types .= "sss";
    $params[] = $numero_sala;
}

$sql .= " ORDER BY $ordem, FIELD(periodo, 'Manhã', 'Tarde', 'Noite')";

$stmt = $conn->prepare($sql);
$stmt->bind_param($types, ...$params);
$stmt->execute();
$res = $stmt->get_result();

$eventos = [];
foreach ($res as $row) {
    $data = $row['data_aula'];
    $sala = $row['numero_sala'];
    $dia = $row['dia_semana'];
    $periodo = strtolower($row['periodo']);
    $descricao = $row['descricao_evento'];

    $key = $data . '_' . $sala;

    if (!isset($eventos[$key])) {
        $eventos[$key] = [
            'data' => $data,
            'dia' => $dia,
            'sala' => $sala,
            'manhã' => '',
            'tarde' => '',
            'noite' => ''
        ];
    }
    $eventos[$key][$periodo] = $descricao;
}
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
<h2>Consulta Sala</h2>
<form method="GET">
    Data Inicial: <input type="date" name="data_inicial" value="<?= $data_inicial ?>">
    Data Final: <input type="date" name="data_final" value="<?= $data_final ?>">

    Ordem:
    <select name="ordem">
        <option value="data_aula" <?= $ordem == 'data_aula' ? 'selected' : '' ?>>Data</option>
        <option value="numero_sala" <?= $ordem == 'numero_sala' ? 'selected' : '' ?>>Sala</option>
    </select>

    Sala:
    <select name="sala">
        <option value="">- Selecione -</option>
        <?php
        $salas = $conn->query("SELECT DISTINCT numero_sala FROM horario_sala_consulta ORDER BY numero_sala");
        while ($s = $salas->fetch_assoc()) {
            $sel = $s['numero_sala'] == $numero_sala ? 'selected' : '';
            echo "<option value='{$s['numero_sala']}' $sel>{$s['numero_sala']}</option>";
        }
        ?>
    </select>

    <button type="submit">Filtrar</button>
</form>

<br>
<table border="1">
    <tr>
        <th>Aula</th>
        <th>Data</th>
        <th>Dia</th>
        <th>Sala</th>
        <th>Manhã</th>
        <th>Tarde</th>
        <th>Noite</th>
    </tr>
    <?php foreach ($eventos as $item): ?>
        <tr>
            <td>0</td>
            <td><?= date('d/m/Y', strtotime($item['data'])) ?></td>
            <td><?= $item['dia'] ?></td>
            <td><?= $item['sala'] ?></td>
            <td><?= $item['manhã'] ?></td>
            <td><?= $item['tarde'] ?></td>
            <td><?= $item['noite'] ?></td>
        </tr>
    <?php endforeach; ?>
</table>

<?php $conn->close(); ?>
