# 📇 Contact Directory App  
AppDev Final Project – Group 2

---

## 📌 Project Overview

This is a full-stack **Contact Directory** web application built with:

- Node.js + Express.js (Backend API)
- MongoDB Atlas (Database)
- Vanilla HTML, CSS, JavaScript (Frontend)
- Render.com (Deployment)

### Key Features
- Add new contacts  
- Edit existing contacts  
- Delete contacts  
- Live search by name, phone, and email  
- Sort contacts (A–Z, Z–A, most recent)  
- Responsive frontend UI  
- Persistent storage via MongoDB Atlas  

All features are accessible through a browser-based interface.

---

## 🚀 Live Demo

Deployed using Render.com:  
https://appdev-g2-final-project.onrender.com/

---

## 🧰 Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Hosting | Render |

---

## 🧪 How to Use

### Home Page
After loading the app, you will see:
- A form to add contacts
- Search filters
- Sort button
- Contacts table
- Total contact count
- Edit and Delete buttons

---

### ➕ Adding a Contact
1. Enter **Name** and **Phone** (required)
2. Optionally enter **Email**
3. Click **Add Contact**
4. The contact is saved and displayed in the table

---

### ✏️ Editing a Contact
1. Click **Edit** beside a contact
2. A modal window opens
3. Update the fields
4. Click **Save**

---

### 🗑️ Deleting a Contact
1. Click **Delete**
2. A confirmation modal appears
3. Click **Delete** to confirm

---

### 🔍 Searching
Live search is available by:
- Name
- Phone number
- Email address

The table updates automatically as you type.

---

### 🔁 Sorting
Click the **Sort** button to cycle through:
1. Oldest
2. A–Z
3. Z–A
4. Most Recent

---

## 🛠️ Running Locally

### Prerequisites
- Node.js installed
- npm installed
- MongoDB Atlas account (Free Tier)

---

### Step 1 — Clone the Repository
```
git clone https://github.com/cloud-daet/AppDev_G2-Final-Project.git
cd AppDev_G2-Final-Project/contact-directory/backend
```

---

### Step 2 — Install Dependencies
```
npm install
```

---

### Step 3 — Environment Variables
Copy the example file:
```
cp .env.example .env
```

Edit `.env` and set:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

Example MongoDB URI:
```
mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

---

### Step 4 — Run the Development Server
```
npm run dev
```

Open in browser:
```
[http://localhost:5000](http://localhost:5000)
```

---

## 📦 Deployment (Render.com)

1. Push your code to GitHub
2. Go to https://render.com
3. Click **New → Web Service**
4. Connect your GitHub repository
5. Set environment variables:
   - `PORT = 5000`
   - `MONGO_URI = MongoDB Atlas URI`
6. Build Command:

```
npm install
```

7. Start Command:

```
node server.js
```

8. Deploy

Render will provide a public URL for your application.

---

## 🗄️ Database Hosting (MongoDB Atlas)

1. Sign up at https://www.mongodb.com/atlas
2. Create a **Free Cluster**
3. Whitelist IP: `0.0.0.0/0`
4. Create a database user
5. Copy the connection string
6. Paste it into `.env`

---

## 🔒 Security Notes

- Never commit `.env`
- Only commit `.env.example`
- MongoDB credentials must remain private

---

## 👨‍👩‍👧‍👦 Team Members

- Cloud Daet
- Emmanuel Bongalon
- Kendrick Almazan

**Honrable Mentions**
- GitCopilot & ChatGPT (for helping us keep our sanity intact)

---

## 📹 Video Demonstration

**YouTube Link: ** [paste link here]

---

## 📤 Submission Checklist

- GitHub repository link
- Live deployed URL
- Video demonstration link
- README with instructions and usage

---

This project was developed as part of our **AppDev Final Project**.
