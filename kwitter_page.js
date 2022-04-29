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
username = localStorage.getItem("username");
roomname = localStorage.getItem("roomname");

function getData() {
    firebase.database().ref("/" + roomname).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4>" + name + "<img class='tick' scr='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-success' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                like_span = "<span class='glyphicon glyphicon-thumbs-up'> Like:- " + like + "</span></button><hr>"
                da_span = "<div>" + like_button + like_span + "</div>";
                row = name_with_tag + message_with_tag + da_span;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("roomname");
    window.location = "index.html";
}

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(roomname).push({
        name: username,
        message: msg,
        like: 0,
        dislike: 0
    })
    document.getElementById("msg").value = "";
}

function updateLike(message_id) {
    console.log("clicked on like button:- " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(roomname).child(message_id).update({
        like: updated_likes
    });
}