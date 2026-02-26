# 🎓 College Attendance System

A simple web-based College Attendance System built using **HTML, CSS, and JavaScript** with LocalStorage support.

This project allows teachers to manage students and mark attendance, and students to view their attendance percentage.

---

## 🚀 Features

### 👩‍🏫 Teacher Panel
- Login authentication
- Add new students
- Delete students
- Mark attendance (Present / Absent)
- Subject-wise attendance management
- Export attendance data as CSV file

### 👨‍🎓 Student Panel
- Secure login
- View subject-wise attendance
- Automatic attendance percentage calculation
- Visual percentage indicator (Green ≥ 75%, Red < 75%)

---

## 🔐 Default Login Credentials

### 👩‍🏫 Teacher

Roll No: T001
Password: admin123
Role: Teacher


### 👨‍🎓 Students

Roll No: 101 – 110
Password: 1234
Role: Student


---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Browser LocalStorage (for data persistence)

---

## 📂 Project Structure


College-Attendance-System/
│
├── index.html # Login Page
├── teacher.html # Teacher Dashboard
├── student.html # Student Dashboard
├── style.css # Styling
├── script.js # Complete Logic
└── README.md # Project Documentation


---

## ⚙️ How to Run the Project

### Option 1: Direct Method
1. Download the project
2. Open `index.html` in your browser

### Option 2: Using VS Code Live Server (Recommended)
1. Open project folder in VS Code
2. Install Live Server extension
3. Right click on `index.html`
4. Click **Open with Live Server**

---

## 💾 Data Storage

This project uses **Browser LocalStorage**.

- No backend required
- Data stored locally in browser
- Survives page refresh
- Can be cleared via browser developer tools

---

## 📊 Attendance Calculation Logic


Attendance % = (Present Days / Total Classes) × 100


If percentage:
- ≥ 75% → Green (Safe)
- < 75% → Red (Low Attendance Warning)

---

## 📤 Export Feature

Teacher can export attendance data in CSV format.
The downloaded file includes:

- Roll Number
- Student Name
- Subject
- Date
- Status

---

## 🎯 Project Purpose

This project was developed as:

- Mini Project
