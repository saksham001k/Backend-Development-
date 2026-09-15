const noteForm = document.getElementById("noteForm");
const noteInput = document.getElementById("noteInput");
const searchInput = document.getElementById("searchInput");
const notesList = document.getElementById("notesList");

function getNotes() {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
    const query = searchInput.value.toLowerCase();
    const notes = getNotes().filter(note => note.text.toLowerCase().includes(query));
    notesList.innerHTML = notes.map(note => `
        <article class="note">
            <p>${escapeHtml(note.text)}</p>
            <small>Created: ${new Date(note.createdAt).toLocaleString()}</small><br>
            <button onclick="editNote(${note.id})">Edit</button>
            <button class="delete" onclick="deleteNote(${note.id})">Delete</button>
        </article>
    `).join("") || "<p>No notes found.</p>";
}

function escapeHtml(text) {
    const element = document.createElement("div");
    element.textContent = text;
    return element.innerHTML;
}

noteForm.addEventListener("submit", event => {
    event.preventDefault();
    const text = noteInput.value.trim();
    if (!text) return;
    const notes = getNotes();
    notes.push({ id: Date.now(), text, createdAt: new Date().toISOString(), updatedAt: null });
    saveNotes(notes);
    noteInput.value = "";
    renderNotes();
});

function editNote(id) {
    const notes = getNotes();
    const note = notes.find(item => item.id === id);
    if (!note) return;
    const changedText = window.prompt("Edit note:", note.text);
    if (changedText && changedText.trim()) {
        note.text = changedText.trim();
        note.updatedAt = new Date().toISOString();
        saveNotes(notes);
        renderNotes();
    }
}

function deleteNote(id) {
    saveNotes(getNotes().filter(note => note.id !== id));
    renderNotes();
}

searchInput.addEventListener("input", renderNotes);
renderNotes();
