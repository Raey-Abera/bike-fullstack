let trash = document.getElementsByClassName("fas fa-trash");

document.querySelector("#grabBike").addEventListener("click", getBike)
// document.querySelector("#borrowBike").addEventListener("click", bikeBorrow)

function getBike(e){
  e.preventDefault()
  // let bikes = "I got the value"
let bikes = document.getElementById("choose").value
document.getElementById("totalBikes").innerHTML = bikes;
}

function bikeBorrow(e){
  // alert("connected")
let borrow = document.getElementById("borrows").value
console.log(borrow)
}

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {// messages is the route
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({// body property pulls thing being deleted out of the body property, places it here and deletes
            'name': name,//these match whats in the app.delete
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
