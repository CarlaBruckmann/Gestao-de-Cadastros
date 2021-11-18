//LocalStorage
const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_Product")) ?? [];
const setLocalStorage = (dbProduct) =>
  localStorage.setItem("db_Product", JSON.stringify(dbProduct));

//CRUD - CREATE READ UPDATE DELETE
//Delete
const deleteProduct = (index) => {
  const dbProduct = readProduct();
  dbProduct.splice(index, 1);
  setLocalStorage(dbProduct);
};
//Update
const updateProduct = (index, product) => {
  const dbProduct = readProduct();
  dbProduct[index] = product;
  setLocalStorage(dbProduct);
};
//Read
const readProduct = () => getLocalStorage();
//Create
const createProduct = (product) => {
  const dbProduct = getLocalStorage();
  dbProduct.push(product);
  setLocalStorage(dbProduct);
};

const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};

//Layout
const saveProduct = () => {
  if (isValidFields()) {
    const product = {
      cod: document.getElementById("productCod").value,
      name: document.getElementById("productName").value,
      qtd: document.getElementById("productQtd").value,
      price: document.getElementById("productPrice").value,
      store: document.getElementById("productStore").value
    };
    const index = document.getElementById('productCod').dataset.index
    if(index == 'new'){
      createProduct(product);
      updateTable()
    }else{
      updateProduct(index,product)
      updateTable()
    }
  }
};

const createRow = (product, index) => {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td class="pt-4">${product.cod}</td>
    <td class="pt-4">${product.name}</td>
    <td class="pt-4">${product.qtd}</td>
    <td class="pt-4">${product.price}</td>
    <td class="pt-4">${product.store}</td>
    <td>
      <button id="edit-${index}" class="button is-warning is-outlined is-rounded td-buttons m-1">
        Editar
      </button>
        <button id="delete-${index}" class="button is-danger is-outlined is-rounded m-1">
        Excluir
      </button>
    </td>
  `
  document.querySelector('#tableProduct>tbody').appendChild(newRow)
};

const clearTable = () => {
  const rows = document.querySelectorAll('#tableProduct>tbody tr')
  rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
  const dbProduct = readProduct();
  clearTable();
  dbProduct.forEach(createRow);
};

const fillFields = (product) => {
  document.getElementById('productCod').value = product.cod
  document.getElementById("productName").value = product.name
  document.getElementById("productQtd").value = product.qtd
  document.getElementById("productPrice").value = product.price
  document.getElementById("productStore").value = product.store
  document.getElementById('productCod').dataset.index = product.index
}

const editProduct = (index) => {
  const product = readProduct()[index]
  product.index = index
  fillFields(product)
  openModal()
}

const editDelete = (event) => {
  if (event.target.type == 'submit') {

    const [action, index] = event.target.id.split('-')

    if (action == 'edit'){
      editProduct(index)
    } else {
      const product = readProduct()[index]
      const response = confirm(`Deseja realmente excluir o produto ${product.name}?`)
      if(response){
        deleteProduct(index)
        updateTable()
      }
    }
  }
}

updateTable();

//CRUD Events
document.getElementById("saveProduct")
  .addEventListener("click", saveProduct);
document.querySelector('#tableProduct>tbody')
  .addEventListener('click', editDelete)