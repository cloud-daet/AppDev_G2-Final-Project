const API_URL = "http://localhost:5000/api/contacts";

const form = document.getElementById("contact-form");
const tableBody = document.getElementById("contact-body");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");

const searchInput = document.getElementById("search");

let allContacts = [];

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

// 🔍 LIVE SEARCH
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

// Delete contact
async function deleteContact(id) {
  if (!confirm("Delete this contact?")) return;

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  loadContacts();
}

// Edit contact
async function editContact(id, oldName, oldPhone, oldEmail) {
  const name = prompt("Edit name:", oldName);
  if (name === null) return;

  const phone = prompt("Edit phone:", oldPhone);
  if (phone === null) return;

  const email = prompt("Edit email:", oldEmail);

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, email })
  });

  loadContacts();
}

loadContacts();
