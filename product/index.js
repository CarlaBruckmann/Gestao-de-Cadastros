const produtoForm = document.getElementById("produto_form");
produtoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let codigo = document.getElementById("produto_cod").value;
  let produto = document.getElementById("produto_nome").value;
  let quantidade = document.getElementById("produto_qtd").value;
  let valor = document.getElementById("produto_valor").value;
  let loja = document.getElementById("produto_loja").value;
  

  let produtoData = {
    codigo,
    produto,
    quantidade,
    valor,
    loja,
  };

  let convertProdutoData = JSON.stringify(produtoData);
  localStorage.setItem("produto", convertProdutoData);

  
  let mensagem = document.getElementById('mensagem');
  mensagem.innerHTML = 'Carregando..'
  document.getElementById("produto_cod").value = '';
  document.getElementById("produto_nome").value = '';
  document.getElementById("produto_qtd").value = '';
  document.getElementById("produto_valor").value = '';
  document.getElementById("produto_loja").value = '';
  
  setTimeout(() => {
      mensagem.innerHTML = 'Cadastro efetuado com sucesso!'   
  }, 1000) 
});
