var firebaseConfig = {
    apiKey: "AIzaSyDTiVhWui5iZXPj176knuZA3AtzO2lCX3o",
    authDomain: "quitegram.firebaseapp.com",
    databaseURL: "https://quitegram-default-rtdb.firebaseio.com",
    projectId: "quitegram",
    storageBucket: "quitegram.appspot.com",
    messagingSenderId: "18632113781",
    appId: "1:18632113781:web:b827da8daefc0da1d0023c"
};
firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE
var user_name = localStorage.getItem("username");
document.getElementById("user-name").innerHTML = "GOOD TO SEE YOU, " + user_name;

function getData() {
    firebase.database().ref("/").on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            //Start code
            console.log("ROOM NAME:- " + Room_names);
            row = "<div class='room-name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
            //End code
        });
    });
}
getData();

function addRoom() {
    roomname = document.getElementById("roomname").value;
    firebase.database().ref("/").child(roomname).update({
        purpouse: "adding room name"
    });
    localStorage.setItem("roomname", roomname);
    window.location = "kwitter_page.html";
}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("roomname");
    window.location = "index.html";
}

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("roomname", name)
    window.location = "kwitter_page.html"
}