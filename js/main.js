let nameAgeList = [];
let sortedList = [];
let innerSelectedTr = '';
let sortOrderDesc = true;

function compareAge(a, b) {
    if (a.age < b.age) {
        return -1;
    }
    if (a.age > b.age) {
        return 1;
    }
    return 0;
}

function remove(name) {
    const userResponse = confirm(' Deseja apagar esta linha?');
    if (userResponse) {
        nameAgeList = nameAgeList.filter((i) => i.name !== name);
        sortedList = sortedList.filter((i) => i.name !== name);
        populateTable();
    }
}

const insertData = () => {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const alreadyInList = nameAgeList.filter((i) => i['name'] === name);

    if (alreadyInList.length <= 0) {
        nameAgeList.push({ name, age });
        sortedList = nameAgeList.sort((a, b) => compareAge(b, a));
        populateTable();
    }
};

function populateTable() {
    document.getElementById('tableBody').innerHTML = '';
    for (let i = 0; i < sortedList.length; i++)
        document.getElementById('tableBody').innerHTML += `<tr id="tr-${i}">
        <td contentEditable="false" >${sortedList[i].name}</td>
        <td contentEditable="false">${sortedList[i].age}</td>
        <td><button class="btn btn-primary" onclick="enableUpdate('${i}')">Editar</button></td>
        <td><button class="btn btn-danger" onclick="remove('${sortedList[i].name}')">X</button></td>
      </tr>`;
}

function enableUpdate(index) {
    const tr = document.getElementById(`tr-${index}`);
    innerSelectedTr = tr.innerHTML;
    tr.innerHTML = `
    <td><input class="form-control" id="name${index}" type="text" value="${sortedList[index].name}"/></td>
    <td><input class="form-control" id="age${index}" type="text" value="${sortedList[index].age}"/></td>
    <td><button class="btn btn-primary" onclick="update('${index}')">Salvar</button></td>
    <td><button class="btn btn-danger" onclick="cancel('${index}')">Cancelar</button></td>`;
}

function cancel(index) {
    document.getElementById(`tr-${index}`).innerHTML = innerSelectedTr;
    innerSelectedTr = '';
}

function update(index) {
    const selected = sortedList[index];
    selected.name = document.getElementById('name' + index).value;
    selected.age = document.getElementById('age' + index).value;

    sortedList[index] = selected;
    sortedList = sortedList.sort((a, b) => compareAge(b, a));
    populateTable();
}

function sortOrder() {
    if (sortOrderDesc) {
        sortOrderDesc = false;
        sortedList = sortedList.sort((a, b) => compareAge(a, b));
    } else {
        sortOrderDesc = true;
        sortedList = sortedList.sort((a, b) => compareAge(b, a));
    }
    populateTable();
}
