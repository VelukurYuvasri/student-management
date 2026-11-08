const API_URL = "http://localhost:8080/api/students";
// Load all students
function loadStudents() {
    fetch(API_URL)
        .then(response => response.json())
        .then(students => {
            const table = document.getElementById("studentTable");
            table.innerHTML = "";

            students.forEach(student => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.course}</td>
                    <td>
                        <button onclick="editStudent(${student.id})">Edit</button>
                        <button onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                `;

                table.appendChild(row);
            });
        })
        .catch(error => console.error("Error loading students:", error));
}

// Add student
document.getElementById("studentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
    .then(response => {
        if (!response.ok) throw new Error("Unable to add student");
        return response.json();
    })
    .then(() => {
        document.getElementById("studentForm").reset();
        loadStudents();
        alert("Student added successfully!");
    })
    .catch(error => alert(error.message));
});

// Edit student
function editStudent(id) {
    const name = prompt("Enter new student name:");
    if (name === null) return;

    const email = prompt("Enter new email:");
    if (email === null) return;

    const course = prompt("Enter new course:");
    if (course === null) return;

    const student = { name, email, course };

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
    .then(response => {
        if (!response.ok) throw new Error("Unable to update student");
        loadStudents();
        alert("Student updated successfully!");
    })
    .catch(error => alert(error.message));
}

// Delete student
function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete this student?")) return;

    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) throw new Error("Unable to delete student");
        loadStudents();
        alert("Student deleted successfully!");
    })
    .catch(error => alert(error.message));
}

// Load students when page opens
loadStudents();
