const chatDiv = document.getElementById("chat");

document.getElementById("fileInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    chatDiv.innerHTML = "";
    parseChat(event.target.result);
  };

  reader.readAsText(file);
});

function parseChat(text) {
  const lines = text.split("\n");

  let currentMessage = "";

  lines.forEach(line => {
    // Detect new message line
    const isNewMsg = line.match(/^\d{1,2}\/\d{1,2}\/\d{2,4},/);

    if (isNewMsg) {
      processMessage(currentMessage);
      currentMessage = line;
    } else {
      // Multiline message support
      currentMessage += " " + line;
    }
  });

  processMessage(currentMessage);
}

function processMessage(line) {
  if (!line) return;

  const match = line.match(/^(.+?) - (.*?): (.*)$/);

  if (!match) return;

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

function createMessage(time, message, side) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", side);

  msgDiv.innerHTML = `
    <div>${message}</div>
    <div class="time">${time}</div>
  `;

  chatDiv.appendChild(msgDiv);
}
