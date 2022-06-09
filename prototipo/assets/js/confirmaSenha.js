let btn = document.querySelector("#verSenha");
let btnConfirm = document.querySelector("#verConfirmSenha");

let nome = document.querySelector("#nome");
let labelNome = document.querySelector("#labelNome");
let valiNome = false;

let telefone = document.querySelector("#telefone");
let labelTell = document.querySelector("#labelTell");
let valiTelefone = false;

let cpf = document.querySelector("#cpf");
let cnpj = document.querySelector("#cnpj");

let email = document.querySelector("#email");
let labelEmail = document.querySelector("#labelEmail");
let valiEmail = false;

let senha = document.querySelector("#senha");
let labelSenha = document.querySelector("#labelSenha");
let valiSenha = false;

let confirmSenha = document.querySelector("#confirmSenha");
let labelConfirmSenha = document.querySelector("#labelConfirmSenha");
let valiConfirmSenha = false;

let msgSuccess = document.querySelector("#msgSuccess");
let msgError = document.querySelector("#msgError");

nome.addEventListener("keyup", () => {
  if (nome.value.length <= 4) {
    labelNome.setAttribute("style", "color: red");
    labelNome.innerHTML =
      "<strong>Nome completo  *Insira no minimo 5 caracteres</strong>";
    valiNome = false;
  } else {
    labelNome.setAttribute("style", "color: green");
    labelNome.innerHTML = "<strong>Nome completo</strong>";
    valiNome = true;
  }
});

email.addEventListener("keyup", () => {
  if (email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1) {
    labelEmail.setAttribute("style", "color: red");
    labelEmail.innerHTML =
      "<strong>Email  *Preencha o campo corretamente</strong>";
    valiEmail = false;
  } else {
    labelEmail.setAttribute("style", "color: green");
    labelEmail.innerHTML = "<strong>Email</strong>";
    valiEmail = true;
  }
});

telefone.addEventListener("keyup", () => {
  if (telefone.value.length <= 13) {
    labelTell.setAttribute("style", "color: red");
    labelTell.innerHTML =
      "<strong>Telefone  *Preencha o campo corretamente</strong>";
    valiTelefone = false;
  } else {
    labelTell.setAttribute("style", "color: green");
    labelTell.innerHTML = "<strong>Telefone</strong>";
    valiTelefone = true;
  }
});

senha.addEventListener("keyup", () => {
  if (senha.value.length <= 7) {
    labelSenha.setAttribute("style", "color: red");
    labelSenha.innerHTML =
      "<strong>Senha *Insira no minimo 8 caracteres</strong>";
    valiSenha = false;
  } else {
    labelSenha.setAttribute("style", "color: green");
    labelSenha.innerHTML = "<strong>Senha</strong>";
    valiSenha = true;
  }
});

confirmSenha.addEventListener("keyup", () => {
  if (confirmSenha.value != senha.value) {
    labelConfirmSenha.setAttribute("style", "color: red");
    labelConfirmSenha.innerHTML =
      "<strong>Senha *Senha não corresponde</strong>";
    valiConfirmSenha = false;
  } else {
    labelConfirmSenha.setAttribute("style", "color: green");
    labelConfirmSenha.innerHTML = "<strong>Senha</strong>";
    valiConfirmSenha = true;
  }
});

btn.addEventListener("click", () => {
  let inputSenha = document.querySelector("#senha");

  if (inputSenha.getAttribute("type") == "password") {
    inputSenha.setAttribute("type", "text");
  } else {
    inputSenha.setAttribute("type", "password");
  }
});

btnConfirm.addEventListener("Click", () => {
  let inputConfimSenha = document.querySelector("#conformSenha");

  if (inputConfimSenha.getAnimations("type") == "password") {
    inputConfimSenha.setAttribute("type", "text");
  } else {
    inputConfimSenha.setAttribute("type", "password");
  }
});

function cadastrar() {
  var senha = formuser.senha.value;
  var rep_senha = formuser.rep_senha.value;

  if (senha == "" || senha.length <= 7) {
    labelSenha.setAttribute("style", "color: red");
    labelSenha.innerHTML =
      "<strong>Senha *Insira no minimo 8 caracteres</strong>";
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML =
      "<strong> Preencha todos os campos corretamente </strong>";
    formuser.senha.focus();
    return false;
  }

  if (rep_senha == "" || rep_senha.length <= 7) {
    labelConfirmSenha.setAttribute("style", "color: red");
    labelConfirmSenha.innerHTML =
      "<strong>Confirma Senha *Insira no minimo 8 caracteres</strong>";
    formuser.rep_senha.focus();
    return false;
  }

  if (senha != rep_senha) {
    labelConfirmSenha.setAttribute("style", "color: red");
    labelConfirmSenha.innerHTML = "<strong>Senhas não correspondem</strong>";

    formuser.senha.focus();
    return false;
  }

  if (valiNome == false) {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "<strong> Preencha o nome corretamente </strong>";
    return false;
  }

  if (valiCJ == false) {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "<strong> Preencha o CPF/CNPJ corretamente </strong>";
    return false;
  }

  if (valiTelefone == false) {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "<strong> Preencha o telefone corretamente </strong>";
    return false;
  }

  if (valiEmail == false) {
    labelEmail.setAttribute("style", "color: red");
    labelEmail.innerHTML = "<strong> Preencha o Email corretamente </strong>";
    return false;
  }
}

function validaFormato(element) {
  var strDocument = element.value.replace(/\D/g, "");
  var sizeStrDocument = strDocument.length;
  var RegExp =
    /(^[\d]{3}[\d]{3}[\d]{3}[\d]{2}$)|(^[\d]{2}[\d]{3}[\d]{3}[\d]{4}[\d]{2}$)/;
  var divResultado = document.getElementById("divResultado");

  if (RegExp.test(strDocument) == true) {
    if (sizeStrDocument == 11) {
      if (!validaCPF(strDocument)) {
        divResultado.setAttribute("style", "color: red");
        divResultado.innerHTML = "<strong>Este não é um CPF válido!</strong>";
        element.select();
        return false;
      } else {
        divResultado.setAttribute("style", "color: green");
        divResultado.innerHTML = "<strong>Este é um CPF válido!</strong>";
        element.value = mascaraCPF(strDocument);
        return true;
      }
    }
    if (sizeStrDocument == 14) {
      if (!validaCNPJ(strDocument)) {
        divResultado.setAttribute("style", "color: red");
        divResultado.innerHTML = "<strong>Este não é um CPF válido!</strong>";
        element.select();
        return false;
      } else {
        divResultado.setAttribute("style", "color: green");
        divResultado.innerHTML = "<strong>Este é um CPF válido!</strong>";
        element.value = mascaraCPF(strDocument);
        return true;
      }
    }
  } else {
    strDocument == ""
      ? (divResultado.innerHTML = "")
      : (divResultado.innerH =
          "'" +
          strDocument +
          "' <strong>Não tem o formato de um CPF ou um CNPJ válidos!</strong>");
    return false;
  }
}

// Função que valida o CPF
function validaCPF(strDocument) {
  var soma;
  var resto;
  soma = 0;

  // Elimina CPF's invalidos conhecidos
  if (
    strDocument == "00000000000" ||
    strDocument == "11111111111" ||
    strDocument == "22222222222" ||
    strDocument == "33333333333" ||
    strDocument == "44444444444" ||
    strDocument == "55555555555" ||
    strDocument == "66666666666" ||
    strDocument == "77777777777" ||
    strDocument == "88888888888" ||
    strDocument == "99999999999"
  )
    return false;

  for (i = 1; i <= 9; i++)
    soma = soma + parseInt(strDocument.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(strDocument.substring(9, 10))) return false;

  soma = 0;
  for (i = 1; i <= 10; i++)
    soma = soma + parseInt(strDocument.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(strDocument.substring(10, 11))) return false;
  return true;
}

// Função que valida o CNPJ
function validaCNPJ(CNPJ) {
  var validaArray = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  var primeiroDigito = new Number();
  var segundoDigito = new Number();
  var digito = Number(eval(CNPJ.charAt(12) + CNPJ.charAt(13)));

  for (i = 0; i < validaArray.length; i++) {
    primeiroDigito += i > 0 ? CNPJ.charAt(i - 1) * validaArray[i] : 0;
    segundoDigito += CNPJ.charAt(i) * validaArray[i];
  }
  primeiroDigito = primeiroDigito % 11 < 2 ? 0 : 11 - (primeiroDigito % 11);
  segundoDigito = segundoDigito % 11 < 2 ? 0 : 11 - (segundoDigito % 11);

  resultado = primeiroDigito * 10 + segundoDigito == digito ? true : false;
  return resultado;
}

// Função de mascara para o CPF
function mascaraCPF(CPF) {
  return (
    CPF.substring(0, 3) +
    "." +
    CPF.substring(3, 6) +
    "." +
    CPF.substring(6, 9) +
    "-" +
    CPF.substring(9, 11)
  );
}

//	Função de mascara para o CNPJ
function mascaraCNPJ(CNPJ) {
  return (
    CNPJ.substring(0, 2) +
    "." +
    CNPJ.substring(2, 5) +
    "." +
    CNPJ.substring(5, 8) +
    "/" +
    CNPJ.substring(8, 12) +
    "-" +
    CNPJ.substring(12, 14)
  );
}

// Função que bloqueia teclas não numéricas
function apenasNumeros(e) {
  if (document.all) {
    var evt = event.keyCode;
  } else {
    var evt = e.charCode;
  }
  if (evt < 20 || (evt > 47 && evt < 58)) {
    return true;
  }
  return false;
}
