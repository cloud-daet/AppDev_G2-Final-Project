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

const editModal = document.getElementById("edit-modal");
const deleteModal = document.getElementById("delete-modal");

let editingId = null;
let deletingId = null;

// ADD
form.addEventListener("submit", async e => {
  e.preventDefault();

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nameInput.value,
      phone: phoneInput.value,
      email: emailInput.value
    })
  });

  form.reset();
  loadContacts();
  updateFooterMessage();
});

// LOAD
async function loadContacts() {
  const res = await fetch(API_URL);
  allContacts = await res.json();
  allContacts.forEach((c, i) => c._originalIndex = i);
  applyFiltersAndSort();
}

// FILTER + SORT
function applyFiltersAndSort() {
  let data = [...allContacts];

  if (searchInput.value)
    data = data.filter(c => c.name.toLowerCase().includes(searchInput.value.toLowerCase()));

  if (searchMailInput.value)
    data = data.filter(c => (c.email || "").toLowerCase().includes(searchMailInput.value.toLowerCase()));

  if (searchNumberInput.value)
    data = data.filter(c => c.phone.includes(searchNumberInput.value));

  if (sortMode === 1) data.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortMode === 2) data.sort((a, b) => b.name.localeCompare(a.name));
  else if (sortMode === 3) data.sort((a, b) => b._originalIndex - a._originalIndex);
  else data.sort((a, b) => a._originalIndex - b._originalIndex);

  renderTable(data);
}

// RENDER
function renderTable(data) {
  tableBody.innerHTML = "";
  document.getElementById("total-count").textContent = `Total contacts: ${data.length}`;

  if (!data.length) {
    for (let i = 0; i < 3; i++)
      tableBody.innerHTML += `<tr><td colspan="4">No contacts yet</td></tr>`;
    return;
  }

  data.forEach(c => {
    tableBody.innerHTML += `
      <tr>
        <td>${c.name}</td>
        <td>${c.phone}</td>
        <td>${c.email || "-"}</td>
        <td>
          <button onclick="editContact('${c._id}','${c.name}','${c.phone}','${c.email || ""}')">Edit</button>
          <button onclick="deleteContact('${c._id}')">Delete</button>
        </td>
      </tr>`;
  });
}

// SORT
sortBtn.addEventListener("click", () => {
  sortMode = (sortMode + 1) % 4;
  sortBtn.textContent = ["Sort: Oldest", "Sort: A-Z", "Sort: Z-A", "Sort: Recent"][sortMode];
  applyFiltersAndSort();
});

// SEARCH
[searchInput, searchMailInput, searchNumberInput].forEach(i =>
  i.addEventListener("input", applyFiltersAndSort)
);

// FOOTER
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

function updateFooterMessage() {
  document.getElementById("footer-message").textContent =
    footerMessages[Math.floor(Math.random() * footerMessages.length)];
}

document.addEventListener("DOMContentLoaded", () => {
  updateFooterMessage();
  loadContacts();
});
