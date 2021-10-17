let thisPic;

function copyPic(thisElement, thisPic){
  document.getElementById("0").src = thisPic;

  document.getElementsByClassName("selected")[0].classList.remove("selected");
  thisElement.classList.add("selected");
}

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function alertmsg()
{
  alert("This album is EMPTY!! Find one first to add photos in this album!!!");
}
