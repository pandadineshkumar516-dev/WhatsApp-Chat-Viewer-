const chatDiv = document.getElementById("chat");

document.getElementById("fileInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    parseChat(event.target.result);
  };

  reader.readAsText(file);
});

function parseChat(text) {
  const lines = text.split("\n");

  lines.forEach(line => {
    const match = line.match(/^(.+?) - (.*?): (.*)$/);
    if (!match) return;

    const time = match[1];
    const sender = match[2].trim() || "Other";
    const message = match[3];

    let side = sender.toLowerCase().includes("pagluu") ? "right" : "left";

    createMessage(time, sender, message, side);
  });
}

function createMessage(time, sender, message, side) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", side);

  msgDiv.innerHTML = `
    <b>${sender}</b><br>
    ${message}
    <div class="time">${time}</div>
  `;

  chatDiv.appendChild(msgDiv);
}
