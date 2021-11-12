//Modal
let modal = document.getElementById("modal");
let fields = document.querySelectorAll(".modal-field");

document.getElementById("openModal").addEventListener("click", openModal);
document.getElementById("closeModal").addEventListener("click", closeModal);
function openModal() {
  modal.classList.add("is-active");
}
function closeModal() {
  modal.classList.remove("is-active");
  fields.forEach((field) => (field.value = ""));
}

//LocalStorage
const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_Client")) ?? [];
const setLocalStorage = (dbClient) =>
  localStorage.setItem("db_Client", JSON.stringify(dbClient));

//CRUD - CREATE READ UPDATE DELETE
//Delete
const deleteClient = (index) => {
  const dbClient = readClient();
  dbClient.splice(index, 1);
  setLocalStorage(dbClient);
};
//Update
const updateClient = (index, client) => {
  const dbClient = readClient();
  dbClient[index] = client;
  setLocalStorage(dbClient);
};
//Read
const readClient = () => getLocalStorage();
//Create
const createClient = (client) => {
  const dbClient = getLocalStorage();
  dbClient.push(client);
  setLocalStorage(dbClient);
};

const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};

//Layout
const saveClient = () => {
  if (isValidFields()) {
    const client = {
      name: document.getElementById("clientName").value,
      cpf: document.getElementById("clientCpf").value,
      tel: document.getElementById("clientTel").value,
      email: document.getElementById("clientEmail").value,
      city: document.getElementById("clientCity").value,
      uf: document.getElementById("clientUf").value
    };
    createClient(client);
    updateTable()
  }
};

const createRow = (client) => {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td class="pt-4">${client.name}</td>
    <td class="pt-4">${client.cpf}</td>
    <td class="pt-4">${client.tel}</td>
    <td class="pt-4">${client.email}</td>
    <td class="pt-4">${client.city}</td>
    <td class="pt-4">${client.uf}</td>
    <td>
      <button class="button is-warning is-outlined is-rounded td-buttons m-1" data-action="edit">
        Editar
      </button>
        <button class="button is-danger is-outlined is-rounded m-1" data-action="delete">
        Excluir
      </button>
    </td>
  `
  document.querySelector('#tableClient>tbody').appendChild(newRow)
};

const clearTable = () => {
  const rows = document.querySelectorAll('#tableClient>tbody tr')
  rows.forEach(row => row.parentNode.removeChild(row))

}

const updateTable = () => {
  const dbClient = readClient();
  clearTable();
  dbClient.forEach(createRow);
};

const editDelete = (event) => {
  if (event.target.type == 'submit') {
    console.log(event.target.dataset.action)
  }
}

updateTable();

//CRUD Events
document.getElementById("saveClient").addEventListener("click", saveClient);
document.querySelector('#tableClient>tbody')
  .addEventListener('click', editDelete)
