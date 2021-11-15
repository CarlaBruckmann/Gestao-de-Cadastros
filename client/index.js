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
    const index = document.getElementById('clientName').dataset.index
    if(index == 'new'){
      createClient(client);
      updateTable()
    }else{
      updateClient(index,client)
      updateTable()
    }
  }
};

const createRow = (client, index) => {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td class="pt-4">${client.name}</td>
    <td class="pt-4">${client.cpf}</td>
    <td class="pt-4">${client.tel}</td>
    <td class="pt-4">${client.email}</td>
    <td class="pt-4">${client.city}</td>
    <td class="pt-4">${client.uf}</td>
    <td>
      <button id="edit-${index}" class="button is-warning is-outlined is-rounded td-buttons m-1">
        Editar
      </button>
        <button id="delete-${index}" class="button is-danger is-outlined is-rounded m-1">
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

const fillFields = (client) => {
  document.getElementById('clientName').value = client.name
  document.getElementById("clientCpf").value = client.cpf
  document.getElementById("clientTel").value = client.tel
  document.getElementById("clientEmail").value = client.email
  document.getElementById("clientCity").value = client.city
  document.getElementById("clientUf").value = client.uf
  document.getElementById('clientName').dataset.index = client.index
}

const editClient = (index) => {
  const client = readClient()[index]
  client.index = index
  fillFields(client)
  openModal()
}

const editDelete = (event) => {
  if (event.target.type == 'submit') {

    const [action, index] = event.target.id.split('-')

    if (action == 'edit'){
      editClient(index)
    } else {
      const client = readClient()[index]
      const response = confirm(`Deseja realmente excluir o cliente ${client.name}`)
      if(response){
        deleteClient(index)
        updateTable()
      }
    }
  }
}

updateTable();

//CRUD Events
document.getElementById("saveClient")
  .addEventListener("click", saveClient);
document.querySelector('#tableClient>tbody')
  .addEventListener('click', editDelete)
