const socket = io();
const editor = document.getElementById("editor");
const divEditor = document.getElementById("div-editor");
let _userId = null;

// setup socket listeners
socket.on("connect", () => {
  console.log("Connected");
});

socket.on("user-connected", ({ userId }) => {
  console.log(`User connected, id: ${userId}`);
  _userId = userId;
});

socket.on("user-disconnected", ({ userId }) => {
  console.log(`User disconnected, id: ${userId}`);
});

socket.on("message", (data) => {
  if (typeof data === "string") {
    editor.value = data;
    divEditor.innerHTML = data;
    return;
  }

  if (typeof data === "object") {
    const { type, payload } = data;
    console.log({ data });
    setSelectionRange(payload);
  }
});

// editor listeners
editor.addEventListener("keyup", (event) => {
  const currentText = editor.value;
  console.log("sending message", currentText);
  socket.send(currentText);
});

editor.addEventListener("mouseup", (event) => {
  const { selectionStart, selectionEnd } = editor;
  if (selectionEnd - selectionStart === 0) {
    setCursorPosition();
    return;
  }

  const selection = {
    start: selectionStart,
    end: selectionEnd,
  };
  sendMessage("user-selected-text", selection);
});

divEditor.addEventListener("mouseup", (e) => {
  console.log(document.getSelection());
});

// send actions
function sendMessage(type, payload) {
  socket.send({
    type,
    payload,
  });
}

// process actions
function setSelectionRange(selection) {
  const { start, end } = selection;
  console.log("setting selection", start, end);
  editor.setSelectionRange(start, end);
}

function setCursorPosition(position) {}
