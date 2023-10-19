describe("showNotes", () => {
  beforeEach(() => {
    // Set up the DOM elements needed for the test
    document.body.innerHTML = `
      <div id="loginForm"></div>
      <div id="notesArea"></div>
      <ul id="notesList"></ul>
      <input id="noteInput" type="text">
    `;
  });

  afterEach(() => {
    // Clean up the DOM elements after each test
    document.body.innerHTML = "";
    localStorage.clear();
  });

  it("should display notes area and hide login form", () => {
    showNotes();

    const loginForm = document.getElementById("loginForm");
    const notesArea = document.getElementById("notesArea");

    expect(loginForm.style.display).toBe("none");
    expect(notesArea.style.display).toBe("block");
  });

  it("should display user's notes in the notes list", () => {
    // Set up some test data in localStorage
    const userNotes = ["Note 1", "Note 2", "Note 3"];
    localStorage.setItem("userNotes", JSON.stringify({ "testUser": userNotes }));

    showNotes();

    const notesList = document.getElementById("notesList");

    expect(notesList.children.length).toBe(userNotes.length);

    for (let i = 0; i < userNotes.length; i++) {
      expect(notesList.children[i].textContent).toBe(userNotes[i].substring(0, 18));
    }
  });

  it("should display full note in input when note is clicked", () => {
    // Set up some test data in localStorage
    const userNotes = ["Note 1\nThis is the full note", "Note 2", "Note 3"];
    localStorage.setItem("userNotes", JSON.stringify({ "testUser": userNotes }));

    showNotes();

    const notesList = document.getElementById("notesList");
    const noteInput = document.getElementById("noteInput");

    notesList.children[0].click();

    expect(noteInput.value).toBe(userNotes[0]);
  });

  it("should display truncated note as list item text", () => {
    // Set up some test data in localStorage
    const userNotes = ["This is a very long note that should be truncated", "Note 2", "Note 3"];
    localStorage.setItem("userNotes", JSON.stringify({ "testUser": userNotes }));

    showNotes();

    const notesList = document.getElementById("notesList");

    expect(notesList.children[0].textContent).toBe("This is a very long...");
  });
});