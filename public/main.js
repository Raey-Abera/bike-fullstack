var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
var contain;//holding api results

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

fetch('http://api.citybik.es/v2/networks')
.then(res=>res.json())
.then(response => {
  console.log(response.networks)
  const usCities = []
  for(let i = 0; i < response.networks.length; i++){
    if(response.networks[i].location.country.includes('US')){
      usCities.push(response.networks[i])
    }
  }
  console.log(usCities)
  // call the function  here and pass in usCities -- functionName(usCities)
  locate(usCities)
})

// create a function here ex function functionName(usCities){/ Make fetch call in here /}
// inside this function make a fetch call
function locate(usCities){
  const bostonURL = usCities[63].href
  fetch('http://api.citybik.es'+ bostonURL)
  .then(res => res.json())
  .then(response => {
    console.log(response)
  })
}

console.log('hello world')
