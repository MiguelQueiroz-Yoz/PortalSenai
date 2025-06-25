<?php
include "conexao.php";

$data_inicial = $_GET['data_inicial'] ?? date('Y-m-d');
$data_final = $_GET['data_final'] ?? date('Y-m-d');
$id_instrutor = $_GET['id_instrutor'] ?? '';

$instrutores = [];
$res_instrutores = $conn->query("
    SELECT DISTINCT i.id_instrutor, i.nome_instrutor 
    FROM instrutores i
    INNER JOIN horario_instrutor_consulta h ON i.id_instrutor = h.id_instrutor
    ORDER BY i.nome_instrutor
");

while ($row = $res_instrutores->fetch_assoc()) {
    $instrutores[] = $row;
}

$eventos = [];

if (!empty($id_instrutor)) {
    $stmt = $conn->prepare("
        SELECT data_aula, dia_semana, periodo, observacoes
        FROM horario_instrutor_consulta
        WHERE data_aula BETWEEN ? AND ? AND id_instrutor = ?
        ORDER BY data_aula, FIELD(periodo, 'Manhã', 'Tarde', 'Noite')
    ");
    $stmt->bind_param("ssi", $data_inicial, $data_final, $id_instrutor);
    $stmt->execute();
    $res = $stmt->get_result();

    while ($linha = $res->fetch_assoc()) {
        $data = $linha['data_aula'];
        $dia = $linha['dia_semana'];
        $periodo = strtolower($linha['periodo']);
        $obs = $linha['observacoes'];

        if (!isset($eventos[$data])) {
            $eventos[$data] = [
                'dia' => $dia,
                'manhã' => '',
                'tarde' => '',
                'noite' => ''
            ];
        }
        $eventos[$data][$periodo] = $obs;
    }
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
<h2>Consulta de Instrutor</h2>

<form method="GET">
    Data Inicial:
    <input type="date" name="data_inicial" value="<?= $data_inicial ?>">

    Data Final:
    <input type="date" name="data_final" value="<?= $data_final ?>">

    Instrutor:
    <select name="id_instrutor" required>
        <option value="">- Selecione -</option>
        <?php foreach ($instrutores as $inst): ?>
            <option value="<?= $inst['id_instrutor'] ?>" <?= ($inst['id_instrutor'] == $id_instrutor) ? 'selected' : '' ?>>
                <?= $inst['nome_instrutor'] ?>
            </option>
        <?php endforeach; ?>
    </select>

    <button type="submit">Filtrar</button>
</form>

<br>

<table border="1" width="100%">
    <tr>
        <th>Aula (ID)</th>
        <th>Data</th>
        <th>Dia</th>
        <th>Manhã</th>
        <th>Tarde</th>
        <th>Noite</th>
    </tr>

    <?php if (!empty($eventos)): ?>
        <?php foreach ($eventos as $data => $info): ?>
            <tr>
                <td><?= $id_instrutor ?></td>
                <td><?= date('d/m/Y', strtotime($data)) ?></td>
                <td><?= $info['dia'] ?></td>
                <td><?= $info['manhã'] ?></td>
                <td><?= $info['tarde'] ?></td>
                <td><?= $info['noite'] ?></td>
            </tr>
        <?php endforeach; ?>
    <?php elseif (!empty($id_instrutor)): ?>
        <tr>
            <td colspan="6" align="center"><em>Nenhum evento encontrado para esse instrutor nesse período.</em></td>
        </tr>
    <?php else: ?>
        <tr>
            <td colspan="6" align="center"><em>Selecione um instrutor para exibir os dados.</em></td>
        </tr>
    <?php endif; ?>
</table>

<?php $conn->close(); ?>