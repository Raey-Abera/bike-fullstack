fetch('http://api.citybik.es/v2/networks')
.then(res=>res.json())
.then(response => {
  // console.log(response.networks)
  const usCities = []
  for(let i = 0; i < response.networks.length; i++){
    if(response.networks[i].location.country.includes('US')){
      usCities.push(response.networks[i])
    }
  }
  // console.log('derp', usCities)
  // call the function  here and pass in usCities -- functionName(usCities)
console.log(usCities)
  locate(usCities)
})

// create a function here ex function functionName(usCities){/ Make fetch call in here /}
// inside this function make a fetch call
function locate(usCities){
  const bostonURL = usCities[63].href
  fetch('http://api.citybik.es/' + bostonURL)
  .then(res => res.json())
  .then(response => {
    const {network:{stations}} = response;
    console.log(stations);
    const ul = document.querySelector('.stations');

    stations.forEach( station => {
      const li = document.createElement('li');
      const freeBikeLi = document.createElement('li')
      // const icon = document.createElement('SPAN')
      li.innerText = station.name
      // icon.innerText = 'random'
      freeBikeLi.innerText = `Free Bikes: ${station.free_bikes}`

      ul.appendChild(li)
      // ul.appendChild(icon)
      ul.appendChild(freeBikeLi)
    })

  })
}
