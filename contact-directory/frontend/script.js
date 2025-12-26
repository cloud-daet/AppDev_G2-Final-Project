const API_URL = "http://localhost:5000/api/contacts";

const form = document.getElementById("contact-form");
const tableBody = document.getElementById("contact-body");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");

const searchInput = document.getElementById("search");
const searchMailInput = document.getElementById("searchMail");
const searchNumberInput = document.getElementById("searchNumber");

const sortBtn = document.getElementById("sort-toggle");

let allContacts = [];
let sortMode = 0;
// 0 = original
// 1 = A-Z
// 2 = Z-A
// 3 = recent

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

// ADD CONTACT
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
  updateFooterMessage();
});

// LOAD CONTACTS
async function loadContacts() {
  const res = await fetch(API_URL);
  allContacts = await res.json();

  allContacts.forEach((c, i) => c._originalIndex = i);

  applyFiltersAndSort();
}

// FILTER + SORT
function applyFiltersAndSort() {
  let data = [...allContacts];

  const nameQuery = searchInput.value.toLowerCase();
  const mailQuery = searchMailInput.value.toLowerCase();
  const phoneQuery = searchNumberInput.value.toLowerCase();

  if (nameQuery) {
    data = data.filter(c => c.name.toLowerCase().includes(nameQuery));
  }

  if (mailQuery) {
    data = data.filter(c =>
      (c.email || "").toLowerCase().includes(mailQuery)
    );
  }

  if (phoneQuery) {
    data = data.filter(c => c.phone.includes(phoneQuery));
  }

  if (sortMode === 1) {
    data.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortMode === 2) {
    data.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortMode === 3) {
    data.sort((a, b) => b._originalIndex - a._originalIndex);
  } else {
    data.sort((a, b) => a._originalIndex - b._originalIndex);
  }

  renderTable(data);
}

// RENDER TABLE
function renderTable(data) {
  tableBody.innerHTML = "";

  document.getElementById("total-count").textContent =
    `Total contacts: ${data.length}`;

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

// SEARCH EVENTS
searchInput.addEventListener("input", applyFiltersAndSort);
searchMailInput.addEventListener("input", applyFiltersAndSort);
searchNumberInput.addEventListener("input", applyFiltersAndSort);

// SORT TOGGLE
sortBtn.addEventListener("click", () => {
  sortMode = (sortMode + 1) % 4;

  if (sortMode === 1) sortBtn.textContent = "Sort: A to Z";
  else if (sortMode === 2) sortBtn.textContent = "Sort: Z to A";
  else if (sortMode === 3) sortBtn.textContent = "Sort: Recent";
  else sortBtn.textContent = "Sort: Oldest";

  applyFiltersAndSort();
});

// DELETE
function deleteContact(id) {
  deletingId = id;
  deleteModal.classList.remove("hidden");
}

confirmDeleteBtn.addEventListener("click", async () => {
  await fetch(`${API_URL}/${deletingId}`, { method: "DELETE" });
  deleteModal.classList.add("hidden");
  deletingId = null;
  loadContacts();
  updateFooterMessage();
});

cancelDeleteBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  deletingId = null;
});

// EDIT
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
  updateFooterMessage();
});

cancelEditBtn.addEventListener("click", () => {
  editModal.classList.add("hidden");
  editingId = null;
});

document.addEventListener("DOMContentLoaded", () => {
  const footerMessages = [
  "i'm suffering - Cloud 2025",
  "why is this working",
  "Fun Fact: Cloud died 3 times when running \"npm init --y\"",
  "deadline approaching fast, and i am one lazy mf - Cloud",
  "This footer is brought to you by Raid Shadow Leg-",
  "Did you know? Cloud made this footer feature for no reason at all.",
  "If you're reading this, congrats! You've found the secret footer message.",
  "Cloud was here. Now you are too.",
  "This footer message changes randomly. Just like Cloud's motivation",
  "...",
  "Winter (from The Four Seasons) by Antonio Vivaldi",
  "Experience by Ludovico Einaudi is majestic - Cloud",
  "asdfghjklqwertyuiopzxcvbnm - Cloud",
  "cram",
  // you can add more messages here
];

  const footerEl = document.getElementById("footer-message");

  function updateFooterMessage() {
    const randomIndex = Math.floor(Math.random() * footerMessages.length);
    footerEl.textContent = footerMessages[randomIndex];
  }

  // expose globally so other functions can call it
  window.updateFooterMessage = updateFooterMessage;

  updateFooterMessage();
});

loadContacts();
updateFooterMessage();