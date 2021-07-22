const clienteForm = document.getElementById("cliente_form");
clienteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let nome = document.getElementById("cliente_nome").value;
  let cpf = document.getElementById("cliente_cpf").value;
  let telefone = document.getElementById("cliente_tel").value;
  let email = document.getElementById("cliente_email").value;
  let cidade = document.getElementById("cliente_cidade").value;
  let estado = document.getElementById("cliente_UF").value;

  let clienteData = {
    nome,
    cpf,
    telefone,
    email,
    cidade,
    estado,
  };

  let convertClienteData = JSON.stringify(clienteData);
  localStorage.setItem("cliente", convertClienteData);
});
