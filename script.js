/* ===============================
   SUBJECT LIST
================================ */
const subjects = ["JAVA","C++","DATA STRUCTURE","PHYSICS","MATHS","CHEMISTRY"];


/* ===============================
   INITIALIZE USERS
================================ */
function initializeUsers() {
    let users = JSON.parse(localStorage.getItem("users"));

    if (!users || !Array.isArray(users) || users.length === 0) {

        const demoUsers = [
            { rollNo: "T001", name: "Teacher", password: "admin123", role: "teacher" }
        ];

        for (let i = 101; i <= 110; i++) {
            demoUsers.push({
                rollNo: String(i),
                name: "Student " + i,
                password: "1234",
                role: "student",
                attendance: {}
            });
        }

        localStorage.setItem("users", JSON.stringify(demoUsers));
    }
}

initializeUsers();


/* ===============================
   GET USERS SAFE
================================ */
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}


/* ===============================
   PAGE PROTECTION
================================ */
(function protectPages() {

    const currentPage = window.location.pathname;
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (currentPage.includes("teacher.html")) {
        if (!loggedUser || loggedUser.role !== "teacher") {
            window.location.href = "index.html";
        }
    }

    if (currentPage.includes("student.html")) {
        if (!loggedUser || loggedUser.role !== "student") {
            window.location.href = "index.html";
        }
    }

})();


/* ===============================
   LOGIN
================================ */
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const rollNo = document.getElementById("rollNo").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;

        const users = getUsers();

        const user = users.find(u =>
            u.rollNo === rollNo &&
            u.password === password &&
            u.role === role
        );

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            window.location.href = role === "teacher" ? "teacher.html" : "student.html";
        } else {
            alert("Invalid Credentials");
        }
    });
}


/* ===============================
   LOGOUT
================================ */
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}


/* ===============================
   TEACHER SECTION
================================ */
function displayStudents() {

    const list = document.getElementById("studentList");
    const rollDropdown = document.getElementById("attendanceRoll");
    const subjectDropdown = document.getElementById("subjectSelect");

    if (!list) return;

    const users = getUsers();

    list.innerHTML = "";
    rollDropdown.innerHTML = "";
    subjectDropdown.innerHTML = "";

    users.filter(u => u.role === "student").forEach(student => {

        const div = document.createElement("div");
        div.className = "student-card";

        div.innerHTML = `
            <b>${student.name}</b> (${student.rollNo})
            <button onclick="deleteStudent('${student.rollNo}')">Delete</button>
        `;

        list.appendChild(div);
        rollDropdown.innerHTML += `<option value="${student.rollNo}">${student.rollNo}</option>`;
    });

    subjects.forEach(sub => {
        subjectDropdown.innerHTML += `<option value="${sub}">${sub}</option>`;
    });
}

if (document.getElementById("studentList")) {
    displayStudents();
}


function addStudent() {

    const roll = document.getElementById("studentRoll").value.trim();
    const name = document.getElementById("studentName").value.trim();

    if (!roll || !name) {
        alert("Fill all fields");
        return;
    }

    const users = getUsers();

    if (users.find(u => u.rollNo === roll)) {
        alert("Roll already exists");
        return;
    }

    users.push({
        rollNo: roll,
        name: name,
        password: "1234",
        role: "student",
        attendance: {}
    });

    localStorage.setItem("users", JSON.stringify(users));
    displayStudents();
    alert("Student Added");
}


function deleteStudent(roll) {

    if (!confirm("Delete student?")) return;

    let users = getUsers();
    users = users.filter(u => u.rollNo !== roll);

    localStorage.setItem("users", JSON.stringify(users));
    displayStudents();
}


function markAttendance(status) {

    const roll = document.getElementById("attendanceRoll").value;
    const subject = document.getElementById("subjectSelect").value;

    const users = getUsers();
    const student = users.find(u => u.rollNo === roll);

    if (!student.attendance[subject]) {
        student.attendance[subject] = [];
    }

    const today = new Date().toISOString().split("T")[0];

    student.attendance[subject].push({
        date: today,
        status: status
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("Attendance Marked");
}


function exportCSV() {

    const users = getUsers();
    let csv = "Roll No,Name,Subject,Date,Status\n";

    users.filter(u => u.role === "student").forEach(student => {
        subjects.forEach(sub => {
            const records = student.attendance[sub] || [];
            records.forEach(r => {
                csv += `${student.rollNo},${student.name},${sub},${r.date},${r.status}\n`;
            });
        });
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "attendance.csv";
    link.click();
}


/* ===============================
   STUDENT DASHBOARD
================================ */
(function loadStudentDashboard() {

    const container = document.getElementById("attendanceData");
    if (!container) return;

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) return;

    const users = getUsers();
    const current = users.find(u => u.rollNo === user.rollNo);
    if (!current) return;

    document.getElementById("welcome").innerText = "Welcome " + current.name;

    subjects.forEach(sub => {

        const records = current.attendance[sub] || [];
        const present = records.filter(r => r.status === "Present").length;
        const total = records.length;
        const percent = total ? ((present / total) * 100).toFixed(2) : 0;

        const div = document.createElement("div");
        div.className = "student-card";

        div.innerHTML = `
            <h4>${sub}</h4>
            Total Classes: ${total}<br>
            Present: ${present}<br>
            Percentage: 
            <span class="${percent >= 75 ? 'green' : 'red'}">
                ${percent}%
            </span>
        `;

        container.appendChild(div);
    });

})();