function sendMessage() {
    let input = document.getElementById("user-input").value.trim();
    let chatBox = document.getElementById("chat-box");
    if (input === "") return;

    // User Message (Right)
    let userMessage = `<div class='user-message'><span>You: ${input}</span> <img src='user.png' alt='User' class='user-icon'></div>`;
    chatBox.innerHTML += userMessage;
    document.getElementById("user-input").value = "";

    fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
    })
    .then(response => response.json())
    .then(data => {
        // Bot Message (Left)
        let botMessage = `<div class='bot-message'><img src='bot-icon.png.webp' alt='Bot' class='bot-icon'> <span>Sid Bot: ${data.reply}</span></div>`;
        chatBox.innerHTML += botMessage;
    })
    .catch(error => {
        console.error("Error:", error);
    });

    setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 100);
}
