const API_URL = "http://localhost:5000/api/contacts";

const form = document.getElementById("contact-form");
const tableBody = document.getElementById("contact-body");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");

const searchInput = document.getElementById("search");

let allContacts = [];

const editModal = document.getElementById("edit-modal");
const editName = document.getElementById("edit-name");
const editPhone = document.getElementById("edit-phone");
const editEmail = document.getElementById("edit-email");
const saveEditBtn = document.getElementById("save-edit");
const cancelEditBtn = document.getElementById("cancel-edit");

let editingId = null;

const deleteModal = document.getElementById("delete-modal");
const confirmDeleteBtn = document.getElementById("confirm-delete");
const cancelDeleteBtn = document.getElementById("cancel-delete");

let deletingId = null;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const contact = {
    name: nameInput.value,
    phone: phoneInput.value,
    email: emailInput.value
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact)
  });

  form.reset();
  loadContacts();
});

async function loadContacts() {
  const res = await fetch(API_URL);
  allContacts = await res.json();
  renderTable(allContacts);
}

function renderTable(data) {
  tableBody.innerHTML = "";

  document.getElementById("total-count").textContent =
    `Total contacts: ${data.length}`;

  // show empty rows if no data
  if (data.length === 0) {
    for (let i = 0; i < 3; i++) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="4">No contacts yet</td>`;
      tableBody.appendChild(row);
    }
    return;
  }

  data.forEach(c => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${c.name}</td>
      <td>${c.phone}</td>
      <td>${c.email || "-"}</td>
      <td>
        <button onclick="editContact('${c._id}', '${c.name}', '${c.phone}', '${c.email || ""}')">Edit</button>
        <button onclick="deleteContact('${c._id}')">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// LIVE SEARCH
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  if (query === "") {
    renderTable(allContacts);
    return;
  }

  const filtered = allContacts.filter(c =>
    c.name.toLowerCase().includes(query)
  );

  renderTable(filtered);
});

const searchMailInput = document.getElementById("searchMail");
searchMailInput.addEventListener("input", () => {
  const query = searchMailInput.value.toLowerCase();

  if (query === "") {
    renderTable(allContacts);
    return;
  }

  const filtered = allContacts.filter(c =>
    c.email.toLowerCase().includes(query)
  );

  renderTable(filtered);
});

// LIVE SEARCH BY PHONE NUMBER
const searchNumberInput = document.getElementById("searchNumber");
searchNumberInput.addEventListener("input", () => {
  const query = searchNumberInput.value.toLowerCase();

  if (query === "") {
    renderTable(allContacts);
    return;
  }

  const filtered = allContacts.filter(c =>
    c.phone.toLowerCase().includes(query)
  );

  renderTable(filtered);
});

// Delete contact
function deleteContact(id) {
  deletingId = id;
  deleteModal.classList.remove("hidden");
}

// Edit contact
function editContact(id, name, phone, email) {
  editingId = id;

  editName.value = name;
  editPhone.value = phone;
  editEmail.value = email;

  editModal.classList.remove("hidden");
}

saveEditBtn.addEventListener("click", async () => {
  await fetch(`${API_URL}/${editingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: editName.value,
      phone: editPhone.value,
      email: editEmail.value
    })
  });

  editModal.classList.add("hidden");
  editingId = null;
  loadContacts();
});

cancelEditBtn.addEventListener("click", () => {
  editModal.classList.add("hidden");
  editingId = null;
});

confirmDeleteBtn.addEventListener("click", async () => {
  await fetch(`${API_URL}/${deletingId}`, {
    method: "DELETE"
  });

  deleteModal.classList.add("hidden");
  deletingId = null;
  loadContacts();
});

cancelDeleteBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  deletingId = null;
});

loadContacts();
