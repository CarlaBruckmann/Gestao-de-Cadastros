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
});
