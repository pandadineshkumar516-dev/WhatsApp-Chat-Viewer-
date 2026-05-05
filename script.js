const chatDiv = document.getElementById("chat");

document.getElementById("fileInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    chatDiv.innerHTML = ""; // clear old chat
    parseChat(event.target.result);
  };

  reader.readAsText(file);
});

function parseChat(text) {
  const lines = text.split("\n");

  lines.forEach(line => {
    // Match WhatsApp format
    const match = line.match(/^(\d{1,2}\/\d{1,2}\/\d{2,4},\s[\d:apm\s]+)\s-\s(.*?):\s([\s\S]*)$/);

    if (match) {
      const time = match[1];
      let sender = match[2].trim();
      const message = match[3];

      if (!sender) sender = "Other";

      let side = "left";

      if (sender.toLowerCase().includes("pagluu")) {
        side = "right";
      }

      createMessage(time, message, side);
    }
  });
}

function createMessage(time, message, side) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", side);

  msgDiv.innerHTML = `
    <div>${message}</div>
    <div class="time">${time}</div>
  `;

  chatDiv.appendChild(msgDiv);
}
