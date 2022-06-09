function verificarCPF(strCpf) {
  if (!/[0-9]{11}/.test(strCpf)) return false;
  if (strCpf === "00000000000") return false;

  var soma = 0;

  for (var i = 1; i <= 9; i++) {
    soma += parseInt(strCpf.substring(i - 1, i)) * (11 - i);
  }

  var resto = soma % 11;

  if (resto === 10 || resto === 11 || resto < 2) {
    resto = 0;
  } else {
    resto = 11 - resto;
  }

  if (resto !== parseInt(strCpf.substring(9, 10))) {
    return false;
  }

  soma = 0;

  for (var i = 1; i <= 10; i++) {
    soma += parseInt(strCpf.substring(i - 1, i)) * (12 - i);
  }
  resto = soma % 11;

  if (resto === 10 || resto === 11 || resto < 2) {
    resto = 0;
  } else {
    resto = 11 - resto;
  }

  if (resto !== parseInt(strCpf.substring(10, 11))) {
    return false;
  }

  return true;
}

function validarNome() {
  var strCpf = document.getElementById("form_cpf").value;
  if (!verificarCPF(strCpf)) {
    labelcpf.setAttribute("style", "color: red");
    labelcpf.innerHTML = "<strong>CPF INVALIDO</strong>";
    return false;
  } else {
    labelcpf.setAttribute("style", "color: green");
    labelcpf.innerHTML = "<strong>CPF</strong>";
  }
  document.getElementById("frm").submit();
}

let labelcpf = document.querySelector("#labelcpf");

let labelcpfcnpj = document.querySelector("#labelcpfcnpj");

let labelcnpj = document.querySelector("#labelcnpj");

function _cnpj(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, "");
  if (cnpj == "") return false;
  if (cnpj.length != 14) return false;
  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  )
    return false;
  tamanho = cnpj.length - 2;
  numeros = cnpj.substring(0, tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return false;
  return true;
}

function validarCNPJ() {
  var cnpj = document.getElementById("form_cnpj").value;
  if (!_cnpj(cnpj)) {
    labelcnpj.setAttribute("style", "color: red");
    labelcnpj.innerHTML = "<strong>CNPJ INVALIDO</strong>";
    alert("CNPJ INVALIDO")
    return false;
  } else {
    labelcnpj.setAttribute("style", "color: green");
    labelcnpj.innerHTML = "<strong>CNPJ</strong>";
  }
}

// --------------------------------------------------------------

function verifica_cpf_cnpj ( valor ) {

  valor = valor.toString();
  

  valor = valor.replace(/[^0-9]/g, '');


  if ( valor.length === 11 ) {
      return 'CPF';
  } 
  

  else if ( valor.length === 14 ) {
      return 'CNPJ';
  } 

  else {
      return false;
  }
  
}


function calc_digitos_posicoes( digitos, posicoes = 10, soma_digitos = 0 ) {

  digitos = digitos.toString();

  for ( var i = 0; i < digitos.length; i++  ) {

      soma_digitos = soma_digitos + ( digitos[i] * posicoes );


      posicoes--;

      if ( posicoes < 2 ) {
          posicoes = 9;
      }
  }

  soma_digitos = soma_digitos % 11;

  if ( soma_digitos < 2 ) {
      soma_digitos = 0;
  } else {

      soma_digitos = 11 - soma_digitos;
  }

  var cpf = digitos + soma_digitos;

  return cpf;
  
} 

function valida_cpf( valor ) {


  valor = valor.toString();
  
  valor = valor.replace(/[^0-9]/g, '');

  var digitos = valor.substr(0, 9);

  var novo_cpf = calc_digitos_posicoes( digitos );

  var novo_cpf = calc_digitos_posicoes( novo_cpf, 11 );


  if ( novo_cpf === valor ) {
      return true;
  } else {
      return false;
  }
  
} 

function valida_cnpj ( valor ) {

  valor = valor.toString();
  
  valor = valor.replace(/[^0-9]/g, '');

  var cnpj_original = valor;

  var primeiros_numeros_cnpj = valor.substr( 0, 12 );

  var primeiro_calculo = calc_digitos_posicoes( primeiros_numeros_cnpj, 5 );

  var segundo_calculo = calc_digitos_posicoes( primeiro_calculo, 6 );

  var cnpj = segundo_calculo;

  if ( cnpj === cnpj_original ) {
      return true;
  }
  
  return false;
  
}

function valida_cpf_cnpj ( valor ) {

  var valida = verifica_cpf_cnpj( valor );

  valor = valor.toString();
  
  valor = valor.replace(/[^0-9]/g, '');


  if ( valida === 'CPF' ) {
      return valida_cpf( valor );
  } 

  else if ( valida === 'CNPJ' ) {

      return valida_cnpj( valor );
  } 
  
  else {
      return false;
  }
  
} 


function valida_cpfcnpj() {
  var valor = document.getElementById("form_cnpjcpf").value;
  if (!valida_cpf_cnpj(valor)) {
    labelcnpj.setAttribute("style", "color: red");
    labelcnpj.innerHTML = "<strong>CNPJ/CPF INVALIDO</strong>";
    return false;
  } else {
    labelcnpj.setAttribute("style", "color: green");
    labelcnpj.innerHTML = "<strong>CNPJ/CPF</strong>";
  }
}


function formata_cpf_cnpj( valor ) {

  var formatado = false;
  
  var valida = verifica_cpf_cnpj( valor );

  valor = valor.toString();
  
  valor = valor.replace(/[^0-9]/g, '');

  if ( valida === 'CPF' ) {
  
      if ( valida_cpf( valor ) ) {
      
          formatado  = valor.substr( 0, 3 ) + '.';
          formatado += valor.substr( 3, 3 ) + '.';
          formatado += valor.substr( 6, 3 ) + '-';
          formatado += valor.substr( 9, 2 ) + '';
          
      }
      
  }

  else if ( valida === 'CNPJ' ) {
  
      if ( valida_cnpj( valor ) ) {
      
          formatado  = valor.substr( 0,  2 ) + '.';
          formatado += valor.substr( 2,  3 ) + '.';
          formatado += valor.substr( 5,  3 ) + '/';
          formatado += valor.substr( 8,  4 ) + '-';
          formatado += valor.substr( 12, 14 ) + '';
          
      }
      
  } 

  return formatado;
  
}