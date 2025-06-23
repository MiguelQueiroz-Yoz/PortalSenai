// scripts.js

// ==================== DARK MODE ====================
(function () {
  const toggleBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;

  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    root.setAttribute("data-theme", "dark");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  } else {
    root.removeAttribute("data-theme");
    if (toggleBtn) toggleBtn.textContent = "🌙";
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const novoTema = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      if (novoTema === "dark") {
        root.setAttribute("data-theme", "dark");
        toggleBtn.textContent = "☀️";
      } else {
        root.removeAttribute("data-theme");
        toggleBtn.textContent = "🌙";
      }
      localStorage.setItem("theme", novoTema);
    });
  }
})();

// ==================== LOGIN ====================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  let tentativasLogin = 0;
  const divVerificacao = document.getElementById("verificacao-robot");
  const checkboxHumano = document.getElementById("souHumano");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const messageDisplay = document.getElementById("loginMessage");
    const unidadeSelect = document.getElementById("unidade");

    const username = usernameInput.value;
    const password = passwordInput.value;
    const unidade = unidadeSelect.value;

    messageDisplay.textContent = "";

    if (unidade === "") {
      messageDisplay.textContent = "Por favor, selecione uma unidade.";
      messageDisplay.style.color = "red";
      return;
    }

    if (tentativasLogin >= 3 && !checkboxHumano.checked) {
      messageDisplay.textContent = "Por favor, marque 'Não sou um robô'.";
      messageDisplay.style.color = "red";
      return;
    }

    // Carregar contas do localStorage
    let contas = JSON.parse(localStorage.getItem("contas")) || [];

    // Validar login
    const usuarioEncontrado = contas.find(
      (conta) => conta.username === username && conta.senha === password
    );

    if (usuarioEncontrado) {
      // Redirecionar com base no tipo de usuário
      if (usuarioEncontrado.tipo === 'aluno') {
        window.location.href = "home.html"; // Página do aluno
      } else if (usuarioEncontrado.tipo === 'professor') {
        window.location.href = "professor.html"; // Página do professor
      } else {
        messageDisplay.textContent = "Tipo de usuário desconhecido.";
        messageDisplay.style.color = "red";
      }
    } else {
      tentativasLogin++;
      messageDisplay.textContent = "Usuário ou senha inválidos. Tente novamente.";
      messageDisplay.style.color = "red";
      if (tentativasLogin >= 3) {
        divVerificacao.style.display = "block";
      }
    }
  });

  const toggleLoginPassword = document.getElementById("toggleLoginPassword");
  const passwordInput = document.getElementById("password");

  if (toggleLoginPassword && passwordInput) {
    toggleLoginPassword.addEventListener("click", function () {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleLoginPassword.classList.remove("fa-eye");
        toggleLoginPassword.classList.add("fa-eye-slash");
      } else {
        passwordInput.type = "password";
        toggleLoginPassword.classList.remove("fa-eye-slash");
        toggleLoginPassword.classList.add("fa-eye");
      }
    });
  }
}


// ==================== CADASTRO DE ÁREAS ====================
document.addEventListener('DOMContentLoaded', () => {
  const areaForm = document.getElementById('areaForm');
  const areaNomeInput = document.getElementById('areaNome');
  const areasTableBody = document.querySelector('#areasTable tbody');
  const btnSalvarArea = document.getElementById('btnSalvarArea');
  const btnCancelarEdicao = document.getElementById('btnCancelarEdicao');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const noAreasMessage = document.getElementById('noAreasMessage');

  let areas = JSON.parse(localStorage.getItem('areas')) || [];
  let editingAreaId = null; // Variável para armazenar o ID da área sendo editada

  // Função para gerar um ID único
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Função para salvar as áreas no localStorage
  function saveAreas() {
    localStorage.setItem('areas', JSON.stringify(areas));
  }

  // Função para renderizar a tabela de áreas
  function renderAreas(filter = '') {
    areasTableBody.innerHTML = ''; // Limpa a tabela antes de renderizar
    const filteredAreas = areas.filter(area =>
      area.nome.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredAreas.length === 0) {
      noAreasMessage.style.display = 'block';
      areasTableBody.style.display = 'none'; // Esconde a tabela se não houver resultados
    } else {
      noAreasMessage.style.display = 'none';
      areasTableBody.style.display = ''; // Mostra a tabela
      filteredAreas.forEach(area => {
        const row = areasTableBody.insertRow();
        row.dataset.id = area.id; // Armazena o ID na linha para fácil acesso

        row.innerHTML = `
                    <td>${area.id.substring(0, 5)}...</td> <td>${area.nome}</td>
                    <td class="actions">
                        <button class="edit-btn" data-id="${area.id}">Editar</button>
                        <button class="delete-btn" data-id="${area.id}">Excluir</button>
                    </td>
                `;
      });
    }
  }

  // Evento de submit do formulário
  if (areaForm) {
    areaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = areaNomeInput.value.trim();

      if (nome) {
        if (editingAreaId) {
          // Modo de edição
          areas = areas.map(area =>
            area.id === editingAreaId ? { ...area, nome: nome } : area
          );
          editingAreaId = null; // Reseta o ID de edição
          btnSalvarArea.textContent = 'Salvar Área';
          btnCancelarEdicao.style.display = 'none';
        } else {
          // Modo de adição
          const newArea = {
            id: generateId(),
            nome: nome
          };
          areas.push(newArea);
        }
        saveAreas();
        renderAreas();
        areaForm.reset(); // Limpa o formulário
      } else {
        alert('O nome da área não pode ser vazio!');
      }
    });
  }

  // Delegação de eventos para botões de editar e excluir
  if (areasTableBody) {
    areasTableBody.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-btn')) {
        const idToEdit = e.target.dataset.id;
        const areaToEdit = areas.find(area => area.id === idToEdit);

        if (areaToEdit) {
          areaNomeInput.value = areaToEdit.nome;
          editingAreaId = idToEdit;
          btnSalvarArea.textContent = 'Atualizar Área';
          btnCancelarEdicao.style.display = 'inline-block'; // Mostra o botão de cancelar
          window.scrollTo(0, 0); // Rola para o topo para focar no formulário
        }
      } else if (e.target.classList.contains('delete-btn')) {
        const idToDelete = e.target.dataset.id;
        if (confirm('Tem certeza que deseja excluir esta área?')) {
          areas = areas.filter(area => area.id !== idToDelete);
          saveAreas();
          renderAreas();
        }
      }
    });
  }

  // Evento para o botão Cancelar Edição
  if (btnCancelarEdicao) {
    btnCancelarEdicao.addEventListener('click', () => {
      editingAreaId = null;
      areaForm.reset();
      btnSalvarArea.textContent = 'Salvar Área';
      btnCancelarEdicao.style.display = 'none';
    });
  }

  // Evento de busca (com botão e ao digitar)
  if (searchInput && searchButton) {
    searchButton.addEventListener('click', () => {
      renderAreas(searchInput.value);
    });

    searchInput.addEventListener('keyup', () => {
      renderAreas(searchInput.value);
    });
  }

  // Renderiza as áreas na primeira carga da página
  renderAreas();
});

// ==================== CADASTRO DE MODALIDADES ====================
document.addEventListener('DOMContentLoaded', () => {
  const modalidadeForm = document.getElementById('modalidadeForm');
  const modalidadeNomeInput = document.getElementById('modalidadeNome');
  const modalidadesTableBody = document.querySelector('#modalidadesTableBody');
  const btnSalvarModalidade = document.getElementById('btnSalvarModalidade');
  const btnCancelarEdicaoModalidade = document.getElementById('btnCancelarEdicaoModalidade');
  const searchModalidadeInput = document.getElementById('searchModalidadeInput');
  const searchModalidadeButton = document.getElementById('searchModalidadeButton');
  const noModalidadesMessage = document.getElementById('noModalidadesMessage');

  let modalidades = JSON.parse(localStorage.getItem('modalidades')) || [];
  let editingModalidadeId = null; // Variável para armazenar o ID da modalidade sendo editada

  // Função para gerar um ID único (reaproveitando a que já existe ou criando uma nova se essa parte for separada)
  // function generateId() {
  //     return Date.now().toString(36) + Math.random().toString(36).substr(2);
  // }
  // A função generateId() já foi definida anteriormente no scripts.js, então não precisamos redeclarar.

  // Função para salvar as modalidades no localStorage
  function saveModalidades() {
    localStorage.setItem('modalidades', JSON.stringify(modalidades));
  }

  // Função para renderizar a tabela de modalidades
  function renderModalidades(filter = '') {
    if (!modalidadesTableBody) return; // Garante que estamos na página correta

    modalidadesTableBody.innerHTML = ''; // Limpa a tabela antes de renderizar
    const filteredModalidades = modalidades.filter(modalidade =>
      modalidade.nome.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredModalidades.length === 0) {
      noModalidadesMessage.style.display = 'block';
      modalidadesTableBody.style.display = 'none'; // Esconde a tabela se não houver resultados
    } else {
      noModalidadesMessage.style.display = 'none';
      modalidadesTableBody.style.display = ''; // Mostra a tabela
      filteredModalidades.forEach(modalidade => {
        const row = modalidadesTableBody.insertRow();
        row.dataset.id = modalidade.id; // Armazena o ID na linha para fácil acesso

        row.innerHTML = `
                    <td>${modalidade.id.substring(0, 5)}...</td> <td>${modalidade.nome}</td>
                    <td class="actions">
                        <button class="edit-btn" data-id="${modalidade.id}">Editar</button>
                        <button class="delete-btn" data-id="${modalidade.id}">Excluir</button>
                    </td>
                `;
      });
    }
  }

  // Evento de submit do formulário
  if (modalidadeForm) {
    modalidadeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = modalidadeNomeInput.value.trim();

      if (nome) {
        if (editingModalidadeId) {
          // Modo de edição
          modalidades = modalidades.map(modalidade =>
            modalidade.id === editingModalidadeId ? { ...modalidade, nome: nome } : modalidade
          );
          editingModalidadeId = null; // Reseta o ID de edição
          btnSalvarModalidade.textContent = 'Salvar Modalidade';
          btnCancelarEdicaoModalidade.style.display = 'none';
        } else {
          // Modo de adição
          const newModalidade = {
            id: generateId(), // Reutiliza a função generateId do escopo global
            nome: nome
          };
          modalidades.push(newModalidade);
        }
        saveModalidades();
        renderModalidades();
        modalidadeForm.reset(); // Limpa o formulário
      } else {
        alert('O nome da modalidade não pode ser vazio!');
      }
    });
  }

  // Delegação de eventos para botões de editar e excluir
  if (modalidadesTableBody) {
    modalidadesTableBody.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-btn')) {
        const idToEdit = e.target.dataset.id;
        const modalidadeToEdit = modalidades.find(modalidade => modalidade.id === idToEdit);

        if (modalidadeToEdit) {
          modalidadeNomeInput.value = modalidadeToEdit.nome;
          editingModalidadeId = idToEdit;
          btnSalvarModalidade.textContent = 'Atualizar Modalidade';
          btnCancelarEdicaoModalidade.style.display = 'inline-block'; // Mostra o botão de cancelar
          window.scrollTo(0, 0); // Rola para o topo para focar no formulário
        }
      } else if (e.target.classList.contains('delete-btn')) {
        const idToDelete = e.target.dataset.id;
        if (confirm('Tem certeza que deseja excluir esta modalidade?')) {
          modalidades = modalidades.filter(modalidade => modalidade.id !== idToDelete);
          saveModalidades();
          renderModalidades();
        }
      }
    });
  }

  // Evento para o botão Cancelar Edição
  if (btnCancelarEdicaoModalidade) {
    btnCancelarEdicaoModalidade.addEventListener('click', () => {
      editingModalidadeId = null;
      modalidadeForm.reset();
      btnSalvarModalidade.textContent = 'Salvar Modalidade';
      btnCancelarEdicaoModalidade.style.display = 'none';
    });
  }

  // Evento de busca (com botão e ao digitar)
  if (searchModalidadeInput && searchModalidadeButton) {
    searchModalidadeButton.addEventListener('click', () => {
      renderModalidades(searchModalidadeInput.value);
    });

    searchModalidadeInput.addEventListener('keyup', () => {
      renderModalidades(searchModalidadeInput.value);
    });
  }

  // Renderiza as modalidades na primeira carga da página
  renderModalidades();
});


// ==================== CADASTRO DE MODALIDADES ====================
document.addEventListener('DOMContentLoaded', () => {
  const modalidadeForm = document.getElementById('modalidadeForm');
  const modalidadeNomeInput = document.getElementById('modalidadeNome');
  const modalidadesTableBody = document.getElementById('modalidadesTableBody');
  const btnSalvarModalidade = document.getElementById('btnSalvarModalidade');
  const btnCancelarEdicaoModalidade = document.getElementById('btnCancelarEdicaoModalidade');
  const searchModalidadeInput = document.getElementById('searchModalidadeInput');
  const searchModalidadeButton = document.getElementById('searchModalidadeButton');
  const noModalidadesMessage = document.getElementById('noModalidadesMessage');

  let modalidades = JSON.parse(localStorage.getItem('modalidades')) || [];
  let editingModalidadeId = null;

  function saveModalidades() {
    localStorage.setItem('modalidades', JSON.stringify(modalidades));
  }

  function renderModalidades(searchTerm = '') {
    modalidadesTableBody.innerHTML = '';
    const filteredModalidades = modalidades.filter(modalidade =>
      modalidade.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredModalidades.length === 0) {
      noModalidadesMessage.style.display = 'block';
      return;
    } else {
      noModalidadesMessage.style.display = 'none';
    }

    filteredModalidades.forEach(modalidade => {
      const row = modalidadesTableBody.insertRow();
      row.innerHTML = `
        <td>${modalidade.id.substring(0, 8)}</td>
        <td>${modalidade.nome}</td>
        <td class="actions">
          <button class="edit-btn" data-id="${modalidade.id}">Editar</button>
          <button class="delete-btn" data-id="${modalidade.id}">Excluir</button>
        </td>
      `;
    });
  }

  // Adicionar ou Atualizar Modalidade
  if (modalidadeForm) {
    modalidadeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = modalidadeNomeInput.value.trim();

      if (!nome) {
        alert('Por favor, insira o nome da modalidade.');
        return;
      }

      if (editingModalidadeId) {
        // Edição
        modalidades = modalidades.map(modalidade =>
          modalidade.id === editingModalidadeId ? { ...modalidade, nome } : modalidade
        );
        editingModalidadeId = null;
        btnSalvarModalidade.textContent = 'Salvar Modalidade';
        btnCancelarEdicaoModalidade.style.display = 'none';
      } else {
        // Novo cadastro
        const newModalidade = {
          id: Date.now().toString(), // ID simples baseado no timestamp
          nome: nome
        };
        modalidades.push(newModalidade);
      }

      saveModalidades();
      modalidadeForm.reset();
      renderModalidades();
    });
  }

  // Editar e Excluir Modalidade
  if (modalidadesTableBody) {
    modalidadesTableBody.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-btn')) {
        const idToEdit = e.target.dataset.id;
        const modalidadeToEdit = modalidades.find(modalidade => modalidade.id === idToEdit);
        if (modalidadeToEdit) {
          modalidadeNomeInput.value = modalidadeToEdit.nome;
          editingModalidadeId = idToEdit;
          btnSalvarModalidade.textContent = 'Atualizar Modalidade';
          btnCancelarEdicaoModalidade.style.display = 'inline-block'; // Mostra o botão de cancelar
          window.scrollTo(0, 0); // Rola para o topo para focar no formulário
        }
      } else if (e.target.classList.contains('delete-btn')) {
        const idToDelete = e.target.dataset.id;
        if (confirm('Tem certeza que deseja excluir esta modalidade?')) {
          modalidades = modalidades.filter(modalidade => modalidade.id !== idToDelete);
          saveModalidades();
          renderModalidades();
        }
      }
    });
  }

  // Evento para o botão Cancelar Edição
  if (btnCancelarEdicaoModalidade) {
    btnCancelarEdicaoModalidade.addEventListener('click', () => {
      editingModalidadeId = null;
      modalidadeForm.reset();
      btnSalvarModalidade.textContent = 'Salvar Modalidade';
      btnCancelarEdicaoModalidade.style.display = 'none';
    });
  }

  // Evento de busca (com botão e ao digitar)
  if (searchModalidadeInput && searchModalidadeButton) {
    searchModalidadeButton.addEventListener('click', () => {
      renderModalidades(searchModalidadeInput.value);
    });

    searchModalidadeInput.addEventListener('keyup', (e) => {
      renderModalidades(searchModalidadeInput.value);
    });
  }

  // Renderiza as modalidades ao carregar a página
  renderModalidades();
});

// ==================== CONSULTA HORÁRIOS ====================

document.addEventListener('DOMContentLoaded', () => {
  const instrutores = ['Carlos Silva', 'Ana Souza', 'Marcos Lima'];
  const turmas = ['ADS2024-1', 'MEC2024-2', 'ELE2024-3'];

  const instrutorSelect = document.getElementById('instrutor');
  const turmaSelect = document.getElementById('turma');

  // Preencher selects
  instrutores.forEach(instrutor => {
      const opt = document.createElement('option');
      opt.value = instrutor;
      opt.textContent = instrutor;
      instrutorSelect.appendChild(opt);
  });

  turmas.forEach(turma => {
      const opt = document.createElement('option');
      opt.value = turma;
      opt.textContent = turma;
      turmaSelect.appendChild(opt);
  });
});

// Função para simular dados e filtrar
function filtrarHorarios() {
  const dataInicial = document.getElementById('dataInicial').value;
  const dataFinal = document.getElementById('dataFinal').value;
  const periodo = document.getElementById('periodo').value;
  const instrutor = document.getElementById('instrutor').value;
  const turma = document.getElementById('turma').value;
  const encerradas = document.getElementById('encerradas').checked;

  const tabelaBody = document.querySelector('#tabelaHorarios tbody');
  tabelaBody.innerHTML = '';

  // Simulação de dados
  const horarios = [
      { data: '2024-06-20', periodo: 'Manhã', instrutor: 'Carlos Silva', turma: 'ADS2024-1', horario: '08:00 - 12:00', encerrada: false },
      { data: '2024-06-21', periodo: 'Tarde', instrutor: 'Ana Souza', turma: 'MEC2024-2', horario: '13:00 - 17:00', encerrada: true },
      { data: '2024-06-22', periodo: 'Noite', instrutor: 'Marcos Lima', turma: 'ELE2024-3', horario: '18:00 - 22:00', encerrada: false },
  ];

  const filtrados = horarios.filter(h => {
      const dentroData = (!dataInicial || h.data >= dataInicial) && (!dataFinal || h.data <= dataFinal);
      const matchPeriodo = !periodo || h.periodo === periodo;
      const matchInstrutor = !instrutor || h.instrutor === instrutor;
      const matchTurma = !turma || h.turma === turma;
      const matchEncerrada = encerradas ? true : !h.encerrada;

      return dentroData && matchPeriodo && matchInstrutor && matchTurma && matchEncerrada;
  });

  if (filtrados.length === 0) {
      const row = tabelaBody.insertRow();
      const cell = row.insertCell(0);
      cell.colSpan = 5;
      cell.textContent = 'Nenhum horário encontrado.';
      cell.style.textAlign = 'center';
  } else {
      filtrados.forEach(h => {
          const row = tabelaBody.insertRow();
          row.insertCell(0).textContent = h.data;
          row.insertCell(1).textContent = h.periodo;
          row.insertCell(2).textContent = h.instrutor;
          row.insertCell(3).textContent = h.turma;
          row.insertCell(4).textContent = h.horario;
      });
  }
}
// scripts.js (Adicione este código ao final do seu arquivo scripts.js)

// ==================== RELATÓRIOS ====================
document.addEventListener('DOMContentLoaded', () => {
  const btnGerarRelatorio = document.getElementById('btnGerarRelatorio');
  const tipoRelatorioSelect = document.getElementById('tipoRelatorio');
  const resultadoRelatorioSection = document.getElementById('resultadoRelatorio');
  const tabelaRelatorioHead = document.querySelector('#tabelaRelatorio thead tr');
  const tabelaRelatorioBody = document.querySelector('#tabelaRelatorio tbody');
  const noResultsRelatorio = document.getElementById('noResultsRelatorio');

  if (btnGerarRelatorio) {
      btnGerarRelatorio.addEventListener('click', () => {
          const tipo = tipoRelatorioSelect.value;
          tabelaRelatorioHead.innerHTML = '';
          tabelaRelatorioBody.innerHTML = '';
          noResultsRelatorio.style.display = 'none';
          resultadoRelatorioSection.style.display = 'block'; // Mostra a seção de resultados

          let dados = [];
          let headers = [];

          switch (tipo) {
              case 'aulas_por_instrutor':
                  headers = ['Instrutor', 'Total de Aulas', 'Horas Lecionadas'];
                  dados = [
                      { instrutor: 'Carlos Silva', aulas: 15, horas: 60 },
                      { instrutor: 'Ana Souza', aulas: 12, horas: 48 },
                      { instrutor: 'Marcos Lima', aulas: 18, horas: 72 }
                  ];
                  break;
              case 'atividades_por_turma':
                  headers = ['Turma', 'Atividades Concluídas', 'Atividades Pendentes'];
                  dados = [
                      { turma: 'ADS2024-1', concluidas: 8, pendentes: 2 },
                      { turma: 'MEC2024-2', concluidas: 10, pendentes: 1 },
                      { turma: 'ELE2024-3', concluidas: 7, pendentes: 3 }
                  ];
                  break;
              case 'salas_disponiveis':
                  headers = ['Sala', 'Capacidade', 'Disponibilidade (Hoje)'];
                  dados = [
                      { sala: 'Sala 101', capacidade: 30, disponibilidade: 'Livre' },
                      { sala: 'Sala 102', capacidade: 25, disponibilidade: 'Ocupada' },
                      { sala: 'Laboratório A', capacidade: 20, disponibilidade: 'Livre' }
                  ];
                  break;
              default:
                  noResultsRelatorio.textContent = 'Por favor, selecione um tipo de relatório válido.';
                  noResultsRelatorio.style.display = 'block';
                  resultadoRelatorioSection.style.display = 'none'; // Esconde a seção se não houver tipo válido
                  return;
          }

          // Adiciona os cabeçalhos da tabela
          headers.forEach(headerText => {
              const th = document.createElement('th');
              th.textContent = headerText;
              tabelaRelatorioHead.appendChild(th);
          });

          // Adiciona os dados à tabela
          if (dados.length > 0) {
              dados.forEach(item => {
                  const row = tabelaRelatorioBody.insertRow();
                  if (tipo === 'aulas_por_instrutor') {
                      row.insertCell(0).textContent = item.instrutor;
                      row.insertCell(1).textContent = item.aulas;
                      row.insertCell(2).textContent = item.horas;
                  } else if (tipo === 'atividades_por_turma') {
                      row.insertCell(0).textContent = item.turma;
                      row.insertCell(1).textContent = item.concluidas;
                      row.insertCell(2).textContent = item.pendentes;
                  } else if (tipo === 'salas_disponiveis') {
                      row.insertCell(0).textContent = item.sala;
                      row.insertCell(1).textContent = item.capacidade;
                      row.insertCell(2).textContent = item.disponibilidade;
                  }
              });
          } else {
              noResultsRelatorio.textContent = 'Nenhum dado encontrado para este relatório.';
              noResultsRelatorio.style.display = 'block';
          }
      });
  }
});

