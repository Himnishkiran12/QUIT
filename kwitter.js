function login() {
    username = document.getElementById("username").value;
    if (username == "") {
        username = "IDIOT";
    }
    username.toUpperCase();
    localStorage.setItem("username", username);
    window.location = "kwitter_room.html";
}