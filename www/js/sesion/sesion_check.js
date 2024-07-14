const userID = localStorage.getItem("ID_User");

alert(userID);
if (userID){
    window.location.href = "main.html"
}