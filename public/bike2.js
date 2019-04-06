// Your server setup goes here
// database initialization and whatnot

// request is a package that lets you make api requests in node
// Add it to your package.json and npm install
const request = require('request')

// This part basically just replaces fetch in your code with request
request.get('http://api.citybik.es/v2/networks')
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
  locate(usCities)
})

// create a function here ex function functionName(usCities){/ Make fetch call in here /}
// inside this function make a fetch call
function locate(usCities){
  const bostonURL = usCities[63].href
  request.get('http://api.citybik.es/' + bostonURL)
  .then(res => res.json())
  .then(response => {
    const {network:{stations}} = response;
    console.log(stations);

    stations.forEach( station => {
	  var stationDocument = {}
      stationDocument.name = station.name
      stationDocument.free_bikes = station.free_bikes

      console.log("Bikes: ",stationDocument);
	  // add whatever else you want to to this document and themn post it to your mongo collection
    })
  })
}

// Your routes and whatever else go down here
