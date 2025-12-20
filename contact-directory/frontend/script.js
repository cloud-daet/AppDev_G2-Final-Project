const API_URL = "http://localhost:5000/api/contacts";

const form = document.getElementById("contact-form");
const list = document.getElementById("contact-list");

form.addEventListener("submit", async e => {
  e.preventDefault();

  const contact = {
    name: name.value,
    phone: phone.value,
    email: email.value
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
  list.innerHTML = "";
  const res = await fetch(API_URL);
  const data = await res.json();

  data.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.name} - ${c.phone}`;
    list.appendChild(li);
  });
}

loadContacts();
