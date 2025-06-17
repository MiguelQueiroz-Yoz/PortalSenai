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

// ==================== CADASTRO ====================
const cadastroForm = document.getElementById("cadastroForm");

if (cadastroForm) {
  cadastroForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nomeCompleto = document.getElementById("nomeCompleto").value.trim();
    const email = document.getElementById("email").value.trim();
    const ddd = document.getElementById("ddd").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const newUsername = document.getElementById("newUsername").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const cadastroMessage = document.getElementById("cadastroMessage");

    cadastroMessage.textContent = "";

    if (newPassword !== confirmPassword) {
      cadastroMessage.textContent = "As senhas não coincidem!";
      cadastroMessage.style.color = "red";
      return;
    }

    // Validar formato de e-mail básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      cadastroMessage.textContent = "Por favor, insira um e-mail válido.";
      cadastroMessage.style.color = "red";
      return;
    }

    // Validar DDD (apenas números, 2 dígitos)
    const dddRegex = /^\d{2}$/;
    if (!dddRegex.test(ddd)) {
      cadastroMessage.textContent = "DDD inválido. Deve conter 2 dígitos numéricos.";
      cadastroMessage.style.color = "red";
      return;
    }

    // Validar Telefone (apenas números, 9 dígitos)
    const telefoneRegex = /^\d{9}$/;
    if (!telefoneRegex.test(telefone)) {
      cadastroMessage.textContent = "Telefone inválido. Deve conter 9 dígitos numéricos.";
      cadastroMessage.style.color = "red";
      return;
    }

    // Carregar contas existentes
    let contas = JSON.parse(localStorage.getItem("contas")) || [];

    // Verificar se o nome de usuário ou e-mail já existem
    const usuarioExistente = contas.some(
      (conta) => conta.username === newUsername || conta.email === email
    );

    if (usuarioExistente) {
      cadastroMessage.textContent = "Nome de usuário ou e-mail já cadastrados.";
      cadastroMessage.style.color = "red";
      return;
    }

    // Adicionar nova conta (por padrão, vamos adicionar como "aluno" aqui)
    contas.push({
      nomeCompleto: nomeCompleto,
      email: email,
      ddd: ddd,
      telefone: telefone,
      username: newUsername,
      senha: newPassword,
      tipo: 'aluno' // Pode ser 'aluno' ou 'professor'
    });
    localStorage.setItem("contas", JSON.stringify(contas));

    cadastroMessage.textContent = "Cadastro realizado com sucesso! Redirecionando para o login...";
    cadastroMessage.style.color = "green";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  });

  // Toggle de visibilidade da senha no cadastro
  const toggleNewPassword = document.getElementById("toggleNewPassword");
  const newPasswordInput = document.getElementById("newPassword");
  const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  if (toggleNewPassword && newPasswordInput) {
    toggleNewPassword.addEventListener("click", function () {
      if (newPasswordInput.type === "password") {
        newPasswordInput.type = "text";
        toggleNewPassword.classList.remove("fa-eye");
        toggleNewPassword.classList.add("fa-eye-slash");
      } else {
        newPasswordInput.type = "password";
        toggleNewPassword.classList.remove("fa-eye-slash");
        toggleNewPassword.classList.add("fa-eye");
      }
    });
  }

  if (toggleConfirmPassword && confirmPasswordInput) {
    toggleConfirmPassword.addEventListener("click", function () {
      if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text";
        toggleConfirmPassword.classList.remove("fa-eye");
        toggleConfirmPassword.classList.add("fa-eye-slash");
      } else {
        confirmPasswordInput.type = "password";
        toggleConfirmPassword.classList.remove("fa-eye-slash");
        toggleConfirmPassword.classList.add("fa-eye");
      }
    });
  }

  // Preenchimento de DDD
  const inputDdd = document.getElementById("ddd");
  const dddRegiaoSpan = document.getElementById("dddRegiao");

  if (inputDdd) {
    inputDdd.addEventListener("input", function() {
      const ddd = this.value;
      let regiao = "";

      // Mapeamento simples de DDDs para regiões (exemplo)
      switch (ddd) {
        case "11": regiao = "São Paulo - SP"; break;
        case "21": regiao = "Rio de Janeiro - RJ"; break;
        case "31": regiao = "Belo Horizonte - MG"; break;
        case "41": regiao = "Curitiba - PR"; break;
        case "51": regiao = "Porto Alegre - RS"; break;
        case "61": regiao = "Brasília - DF"; break;
        case "71": regiao = "Salvador - BA"; break;
        case "81": regiao = "Recife - PE"; break;
        case "92": regiao = "Manaus - AM"; break;
        default: regiao = ""; break;
      }

      if (regiao) {
        dddRegiaoSpan.textContent = `Região: ${regiao}`;
        dddRegiaoSpan.style.color = "var(--text-secondary)";
      } else if (ddd.length === 2) {
        dddRegiaoSpan.textContent = "DDD não reconhecido.";
        dddRegiaoSpan.style.color = "orange";
      } else {
        dddRegiaoSpan.textContent = "";
      }
    });
  }
}

// ==================== RECUPERAR SENHA ====================
const etapa1 = document.getElementById("etapa-1");
const etapa2 = document.getElementById("etapa-2");
const etapa3 = document.getElementById("etapa-3");

const inputEmailRecuperar = document.getElementById("emailRecuperar");
const btnEnviarCodigo = document.getElementById("btn-enviar-codigo");
const msgEmailInvalido = document.getElementById("msg-email-invalido");

const inputCodigoVerificar = document.getElementById("codigoVerificar");
const btnVerificarCodigo = document.getElementById("btn-verificar-codigo");
const msgCodigoInvalido = document.getElementById("msg-codigo-invalido");

const inputNovaSenha = document.getElementById("novaSenha");
const forcaSenhaTexto = document.getElementById("texto-forca-senha");
const btnAlterarSenha = document.getElementById("btn-alterar-senha");

const progressFill = document.getElementById("progress-fill");

let codigoGerado = "";
let emailEmUso = ""; // Armazena o email para uso na etapa 3

function setProgress(percentage) {
  if (progressFill) {
    progressFill.style.width = percentage + "%";
  }
}

if (btnEnviarCodigo) {
  btnEnviarCodigo.addEventListener("click", () => {
    emailEmUso = inputEmailRecuperar.value.trim();
    msgEmailInvalido.style.display = "none";

    if (!emailEmUso) {
      msgEmailInvalido.textContent = "Por favor, digite seu e-mail.";
      msgEmailInvalido.style.display = "block";
      return;
    }

    let contas = JSON.parse(localStorage.getItem("contas")) || [];
    const usuarioExiste = contas.some(conta => conta.email.toLowerCase() === emailEmUso.toLowerCase());

    if (!usuarioExiste) {
      msgEmailInvalido.textContent = "E-mail não encontrado.";
      msgEmailInvalido.style.display = "block";
      return;
    }

    // Gerar um código de 6 dígitos
    codigoGerado = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Código de recuperação (simulado):", codigoGerado); // Apenas para fins de teste
    alert("Código de recuperação enviado para " + emailEmUso + "\nCódigo: " + codigoGerado); // Em um sistema real, isso enviaria um e-mail

    etapa1.style.display = "none";
    etapa2.style.display = "block";
    setProgress(50);
  });
}

if (btnVerificarCodigo) {
  btnVerificarCodigo.addEventListener("click", () => {
    const codigoDigitado = inputCodigoVerificar.value.trim();
    msgCodigoInvalido.style.display = "none";

    if (codigoDigitado === codigoGerado) {
      etapa2.style.display = "none";
      etapa3.style.display = "block";
      setProgress(100);
    } else {
      msgCodigoInvalido.textContent = "Código inválido. Tente novamente.";
      msgCodigoInvalido.style.display = "block";
    }
  });
}

if (inputNovaSenha) {
  inputNovaSenha.addEventListener("input", () => {
    const senha = inputNovaSenha.value;
    let forca = 0;

    if (senha.length >= 6) forca++;
    if (senha.match(/[a-z]/)) forca++;
    if (senha.match(/[A-Z]/)) forca++;
    if (senha.match(/\d/)) forca++;
    if (senha.match(/[^a-zA-Z0-9]/)) forca++;

    let texto = "Muito Fraca";
    let cor = "red";

    if (forca >= 5) {
      texto = "Forte";
      cor = "green";
    } else if (forca >= 3) {
      texto = "Média";
      cor = "orange";
    } else if (forca >= 1) {
      texto = "Fraca";
      cor = "red";
    }

    forcaSenhaTexto.textContent = texto;
    forcaSenhaTexto.style.color = cor;
  });
}

if (btnAlterarSenha) {
  btnAlterarSenha.addEventListener("click", () => {
    const novaSenha = inputNovaSenha.value.trim();
    const forcaAtual = forcaSenhaTexto.textContent.trim();
    
    if (!novaSenha) {
      alert("Digite uma nova senha.");
      return;
    }
    
    if (forcaAtual !== "Forte") {
      alert("A senha precisa ser forte para ser definida.");
      return;
    }
    
    let contas = JSON.parse(localStorage.getItem("contas")) || [];
    contas = contas.map(c => {
      if (c.email.toLowerCase() === emailEmUso.toLowerCase()) {
        return { ...c, senha: novaSenha };
      } else {
        return c;
      }
    });
    localStorage.setItem("contas", JSON.stringify(contas));
    
    alert("Senha alterada com sucesso! Redirecionando para o login...");
    window.location.href = "index.html";
  });
}

const btnCopiar = document.getElementById("btn-copiar");
const spanCodigoGerado = document.getElementById("codigo-gerado"); // Certifique-se que você tenha um elemento com esse ID
const msgCopiado = document.getElementById("msg-codigo-copiado");

if (btnCopiar) {
  btnCopiar.addEventListener("click", () => {
    const codigo = spanCodigoGerado.textContent.trim(); // Assumindo que o código está neste span
    if (codigo && codigo !== "-") {
      navigator.clipboard.writeText(codigo)
        .then(() => {
          msgCopiado.style.display = "block";
          setTimeout(() => {
            msgCopiado.style.display = "none";
          }, 2000);
        })
        .catch(err => {
          console.error('Falha ao copiar texto: ', err);
          alert('Erro ao copiar código.');
        });
    }
  });
}
