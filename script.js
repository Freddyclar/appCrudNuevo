var selectedRow = null;

// Mostrar alertas
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All Fields
function clearFields() {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rollNo").value = "";
}

// Add Data

document.querySelector("#student-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    // Get Form Values
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rollNo = document.querySelector("#rollNo").value;

    // Validate
    if (firstName == "" || lastName == "" || rollNo == "") {
        showAlert("Por favor completa todos los campos", "danger");
    } 
    else {
        if (selectedRow == null) {
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${rollNo}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Editar</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Borrar</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Estudiante agregado", "success");
        } 
        else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rollNo;
            selectedRow = null;
            showAlert("Información del estudiante editada", "info");
        }

        if (selectedRow) { // Actualizar estudiante existente si selectedRow no es null
            const updatedFirstName = document.querySelector("#firstName").value;
            const updatedLastName = document.querySelector("#lastName").value;
            const updatedRollNo = document.querySelector("#rollNo").value;
        
            // Actualizar los datos en la fila seleccionada
            selectedRow.children[0].textContent = updatedFirstName;
            selectedRow.children[1].textContent = updatedLastName;
            selectedRow.children[2].textContent = updatedRollNo;
        
            // Restablecer selectedRow y el texto del botón (opcional)
            selectedRow = null;
            document.querySelector("#student-form button").textContent = "Agregar";
        }

        clearFields();

        
    }
});

// Edit Data

document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("edit")) {
      selectedRow = target.parentElement.parentElement; // Obtener la fila de la tabla
      document.querySelector("#firstName").value = selectedRow.children[0].textContent;
      document.querySelector("#lastName").value = selectedRow.children[1].textContent;
      document.querySelector("#rollNo").value = selectedRow.children[2].textContent;
  
      
    }
  });


// Delete Data 

document.querySelector("#student-list").addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("delete") && target.parentElement) {
      target.parentElement.parentElement.remove(); // Eliminar solo si parentElement existe
      showAlert("Información del estudiante eliminada", "danger");
    }
  });
  