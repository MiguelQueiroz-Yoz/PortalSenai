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

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const msg = document.getElementById("loginMessage");

    if (tentativasLogin >= 3 && !checkboxHumano.checked) {
      msg.style.color = "red";
      msg.textContent = "Confirme que você não é um robô.";
      return;
    }

    let contas = JSON.parse(localStorage.getItem("contas")) || [];
    const contaEncontrada = contas.find(c => c.user === username && c.senha === password);

    if (contaEncontrada) {
      msg.style.color = "green";
      msg.textContent = "Login bem-sucedido!";
      localStorage.setItem("usuarioLogado", JSON.stringify(contaEncontrada));

      setTimeout(() => {
        const email = contaEncontrada.email.toLowerCase();
        if (email.endsWith("@aluno.com.br")) {
          window.location.href = "home.html";
        } else if (email.endsWith("@professor.com.br")) {
          window.location.href = "professor.html";
        } else {
          alert("Domínio de e-mail não reconhecido.");
        }
      }, 1000);
    } else {
      tentativasLogin++;
      msg.style.color = "red";
      msg.textContent = "Usuário ou senha incorretos.";

      if (tentativasLogin === 3) {
        divVerificacao.style.display = "block";
      }
    }
  });
}



// ==================== MOSTRAR/OCULTAR SENHA ====================
function togglePasswordVisibility(inputId, toggleId) {
  const input = document.getElementById(inputId);
  const toggle = document.getElementById(toggleId);

  if (toggle && input) {
    toggle.addEventListener('click', function () {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      toggle.classList.toggle('fa-eye');
      toggle.classList.toggle('fa-eye-slash');
    });
  }
}

if (document.getElementById('password')) {
  togglePasswordVisibility('password', 'toggleLoginPassword');
}

if (document.getElementById('newPassword')) {
  togglePasswordVisibility('newPassword', 'toggleNewPassword');
}

if (document.getElementById('confirmPassword')) {
  togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');
}

// ==================== RECUPERAR: Fluxo por etapas ====================
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const etapa1 = document.getElementById("etapa-1");
    const etapa2 = document.getElementById("etapa-2");
    const etapa3 = document.getElementById("etapa-3");

    const progressFill = document.getElementById("progress-fill");

    const inputEmail = document.getElementById("emailRecuperar");
    const btnEnviarCodigo = document.getElementById("btn-enviar-codigo");

    const inputCodigo = document.getElementById("codigoVerificar");
    const btnVerificarCodigo = document.getElementById("btn-verificar-codigo");
    const msgCodigoInvalido = document.getElementById("msg-codigo-invalido");

    const inputNovaSenha = document.getElementById("novaSenha");
    const forcaSenhaTexto = document.getElementById("texto-forca-senha");
    const btnAlterarSenha = document.getElementById("btn-alterar-senha");
    const msgSucesso = document.getElementById("msg-sucesso");

    const spanCodigoGerado = document.getElementById("codigo-gerado");
    const btnCopiar = document.getElementById("btn-copiar-codigo");
    const msgCopiado = document.getElementById("msg-codigo-copiado");

    let contas = JSON.parse(localStorage.getItem("contas")) || [];

    let codigoAtual = null;
    let emailEmUso = null;

    if (progressFill) progressFill.style.width = "33%";

    if (btnEnviarCodigo) {
      btnEnviarCodigo.addEventListener("click", () => {
        const email = inputEmail.value.trim();
        if (!email) {
          alert("Por favor, insira um e-mail válido.");
          return;
        }

        const contaEncontrada = contas.find(c => c.email.toLowerCase() === email.toLowerCase());
        if (!contaEncontrada) {
          alert("E-mail não cadastrado.");
          return;
        }

        codigoAtual = Math.floor(100000 + Math.random() * 900000).toString();
        emailEmUso = email;

        alert("Código enviado (simulação): " + codigoAtual);

        etapa1.style.display = "none";
        etapa2.style.display = "block";
        progressFill.style.width = "66%";
      });
    }

    if (btnVerificarCodigo) {
      btnVerificarCodigo.addEventListener("click", () => {
        const codigoDigitado = inputCodigo.value.trim();
        if (codigoDigitado === codigoAtual) {
          etapa2.style.display = "none";
          etapa3.style.display = "block";
          progressFill.style.width = "100%";

          spanCodigoGerado.textContent = codigoAtual;
          msgCodigoInvalido.style.display = "none";
        } else {
          msgCodigoInvalido.style.display = "block";
        }
      });
    }

    if (inputNovaSenha) {
      inputNovaSenha.addEventListener("input", () => {
        const senha = inputNovaSenha.value;
        let forca = "Fraca";

        const temMaiusc = /[A-Z]/.test(senha);
        const temNumero = /\d/.test(senha);
        const temSimbolo = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

        if (senha.length >= 8 && temMaiusc && temNumero && temSimbolo) {
          forca = "Forte";
        } else if (senha.length >= 6 && ((temMaiusc && temNumero) || (temNumero && temSimbolo))) {
          forca = "Média";
        }

        

        forcaSenhaTexto.textContent = forca;
        if (forca === "Forte") {
          forcaSenhaTexto.style.color = "green";
        } else if (forca === "Média") {
          forcaSenhaTexto.style.color = "orange";
        } else {
          forcaSenhaTexto.style.color = "red";
        }
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
    
    

    if (btnCopiar) {
      btnCopiar.addEventListener("click", () => {
        const codigo = spanCodigoGerado.textContent.trim();
        if (codigo && codigo !== "-") {
          navigator.clipboard.writeText(codigo)
            .then(() => {
              msgCopiado.style.display = "block";
              setTimeout(() => {
                msgCopiado.style.display = "none";
              }, 2000);
            })
            .catch(err => console.error(err));
        }
      });
    }
  });
})();
