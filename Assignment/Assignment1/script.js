const noteInput = document.getElementById("noteInput");
const addButton = document.getElementById("addButton");
const notesList = document.getElementById("notesList");

function getNotes() {
    return JSON.parse(localStorage.getItem("simpleNotes")) || [];
}

function saveNotes(notes) {
    localStorage.setItem("simpleNotes", JSON.stringify(notes));
}

function showNotes() {
    const notes = getNotes();
    notesList.innerHTML = "";

    notes.forEach((note, index) => {
        const noteBox = document.createElement("div");
        noteBox.className = "note";

        const noteText = document.createElement("p");
        noteText.textContent = note;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", () => deleteNote(index));

        noteBox.appendChild(noteText);
        noteBox.appendChild(deleteButton);
        notesList.appendChild(noteBox);
    });
}

function addNote() {
    const text = noteInput.value.trim();

    if (text === "") {
        alert("Please write a note.");
        return;
    }

    const notes = getNotes();
    notes.push(text);
    saveNotes(notes);
    noteInput.value = "";
    showNotes();
}

function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    showNotes();
}

addButton.addEventListener("click", addNote);
showNotes();
