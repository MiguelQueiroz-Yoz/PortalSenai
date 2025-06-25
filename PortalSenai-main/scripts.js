// Function to consult instructors
function consultarInstrutores() {
    const nomeInstrutor = document.getElementById('consultaInstrutorNome').value;
    const areaAtuacao = document.getElementById('consultaInstrutorArea').value;
    const tableBody = document.getElementById('consultaInstrutoresTableBody');
    const noInstrutoresMessage = document.getElementById('noConsultaInstrutoresMessage');

    tableBody.innerHTML = '';
    noInstrutoresMessage.style.display = 'none';

    let url = 'consulta_instrutor.php?fetch_data=true';
    if (nomeInstrutor) {
        url += `&nome=${encodeURIComponent(nomeInstrutor)}`;
    }
    if (areaAtuacao) {
        url += `&area=${encodeURIComponent(areaAtuacao)}`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                data.forEach(instrutor => {
                    const row = tableBody.insertRow();
                    row.insertCell(0).textContent = instrutor.id_instrutor;
                    row.insertCell(1).textContent = instrutor.nome_instrutor;
                    row.insertCell(2).textContent = instrutor.email_instrutor;
                    row.insertCell(3).textContent = instrutor.nome_area;
                });
            } else {
                noInstrutoresMessage.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Erro ao consultar instrutores:', error);
            noInstrutoresMessage.textContent = 'Erro ao carregar instrutores. Tente novamente mais tarde.';
            noInstrutoresMessage.style.display = 'block';
        });
}

// Function to load areas for instructor consultation dropdown
function carregarAreasParaConsulta() {
    fetch('consulta_areas.php') // Assuming you have a consulta_areas.php to fetch areas
        .then(response => response.json())
        .then(areas => {
            const selectElement = document.getElementById('consultaInstrutorArea');
            areas.forEach(area => {
                const option = document.createElement('option');
                option.value = area.nome_area;
                option.textContent = area.nome_area;
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar áreas:', error));
}


// Function to consult rooms
function consultarSalas() {
    const nomeSala = document.getElementById('consultaSalaNome').value;
    const capacidadeMin = document.getElementById('consultaSalaCapacidadeMin').value;
    const tableBody = document.getElementById('consultaSalasTableBody');
    const noSalasMessage = document.getElementById('noConsultaSalasMessage');

    tableBody.innerHTML = '';
    noSalasMessage.style.display = 'none';

    let url = 'consulta_sala.php?fetch_data=true';
    if (nomeSala) {
        url += `&nome=${encodeURIComponent(nomeSala)}`;
    }
    if (capacidadeMin) {
        url += `&capacidadeMin=${encodeURIComponent(capacidadeMin)}`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                data.forEach(sala => {
                    const row = tableBody.insertRow();
                    row.insertCell(0).textContent = sala.id_sala;
                    row.insertCell(1).textContent = sala.nome_sala;
                    row.insertCell(2).textContent = sala.capacidade;
                });
            } else {
                noSalasMessage.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Erro ao consultar salas:', error);
            noSalasMessage.textContent = 'Erro ao carregar salas. Tente novamente mais tarde.';
            noSalasMessage.style.display = 'block';
        });
}

// Function to consult schedules
function filtrarHorarios() {
    const dataAula = document.getElementById('dataAula').value;
    const instrutor = document.getElementById('instrutor').value;
    const turma = document.getElementById('turma').value;
    const mostrarEncerradas = document.getElementById('encerradas').checked; // Get checkbox status

    const tableBody = document.getElementById('horariosTableBody');
    const noHorariosMessage = document.getElementById('noHorariosMessage');

    tableBody.innerHTML = '';
    noHorariosMessage.style.display = 'none';

    let url = 'consulta_horario.php?fetch_data=true';
    if (dataAula) {
        url += `&data=${encodeURIComponent(dataAula)}`;
    }
    if (instrutor) {
        url += `&instrutor=${encodeURIComponent(instrutor)}`;
    }
    if (turma) {
        url += `&turma=${encodeURIComponent(turma)}`;
    }
    if (mostrarEncerradas) { // Append if checkbox is checked
        url += `&encerradas=true`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                data.forEach(horario => {
                    const row = tableBody.insertRow();
                    row.insertCell(0).textContent = horario.data_aula;
                    // For the 'Período' column, you need to combine hora_inicio_aula and hora_fim_aula
                    row.insertCell(1).textContent = `${horario.hora_inicio_aula} - ${horario.hora_fim_aula}`;
                    row.insertCell(2).textContent = horario.nome_instrutor;
                    row.insertCell(3).textContent = horario.nome_turma;
                    // The 'Horário' column in your image seems to be a combination of Periodo and other info,
                    // but your PHP query for consulta_horario.php provides `hora_inicio_aula` and `hora_fim_aula`.
                    // Let's assume 'Horário' in the table refers to the start and end times.
                    row.insertCell(4).textContent = `${horario.hora_inicio_aula} - ${horario.hora_fim_aula}`;
                });
            } else {
                noHorariosMessage.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Erro ao consultar horários:', error);
            noHorariosMessage.textContent = 'Erro ao carregar horários. Tente novamente mais tarde.';
            noHorariosMessage.style.display = 'block';
        });
}

// Function to load instructors for schedule consultation dropdown
function carregarInstrutoresParaConsultaHorario() {
    fetch('consulta_instrutor.php?fetch_data=true') // Reusing the instructor endpoint
        .then(response => response.json())
        .then(instrutores => {
            const selectElement = document.getElementById('instrutor');
            instrutores.forEach(instrutor => {
                const option = document.createElement('option');
                option.value = instrutor.nome_instrutor; // Use name for value
                option.textContent = instrutor.nome_instrutor;
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar instrutores para horário:', error));
}

// Function to load classes (turmas) for schedule consultation dropdown
function carregarTurmasParaConsultaHorario() {
    // Assuming you have a 'consulta_turmas.php' or similar to fetch turmas
    fetch('consulta_turma.php?fetch_data=true') // Assuming a consulta_turma.php
        .then(response => response.json())
        .then(turmas => {
            const selectElement = document.getElementById('turma');
            turmas.forEach(turma => {
                const option = document.createElement('option');
                option.value = turma.nome_turma; // Use turma name for value
                option.textContent = turma.nome_turma;
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar turmas para horário:', error));
}


// Event listeners to load data when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // For instrutor consultation
    consultarInstrutores();
    carregarAreasParaConsulta();

    // For sala consultation (if on consulta_sala.php)
    // You might want to wrap these in checks to ensure they only run on the relevant page
    if (document.getElementById('consultaSalasTableBody')) {
        consultarSalas();
    }

    // For horario consultation (if on consulta_horario.php)
    if (document.getElementById('horariosTableBody')) {
        filtrarHorarios(); // Initial load
        carregarInstrutoresParaConsultaHorario();
        carregarTurmasParaConsultaHorario(); // Ensure this function is called
    }
});