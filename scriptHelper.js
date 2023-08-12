// Write your helper functions here!

require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    console.log(document.getElementById("missionTarget"))
    let missionTarget = document.getElementById("missionTarget")
    missionTarget.innerHTML =
     `<h2>Mission Destination</h2>
                 <ol>
                     <li>Name:${name} </li>
                     <li>Diameter:${diameter} </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth:${distance} </li>
                     <li>Number of Moons:${moons} </li>
                 </ol>
                 <img src="${imageUrl}">`;
    
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    const pilotStatus = validateInput(pilot);
    const copilotStatus = validateInput(copilot);
    const fuelStatus = validateInput(fuelLevel);
    const cargoStatus = validateInput(cargoMass);
    
  

    if (pilotStatus === "Empty" || copilotStatus === "Empty" ||
        fuelStatus === "Empty" || cargoStatus === "Empty") {    
            alert("All fields are required");
        return;

    } else if (pilotStatus === "Is a Number" || copilotStatus === "Is a Number" || 
        fuelStatus !== "Is a Number" || cargoStatus !== "Is a Number") {
              
        alert("Invalid input. Make sure all fields are entered correctly.");
        return;

    } else { document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById(`pilotStatus`).textContent = `Pilot ${pilot} is ready for launch`
            document.getElementById(`copilotStatus`).textContent = `Co-pilot ${copilot} is ready for launch`
        }
            
        
    if (fuelLevel < 10000 && cargoMass > 10000 ) {
        document.getElementById("cargoStatus").textContent = "Cargo mass too heavy for launch";
        document.getElementById("fuelStatus").textContent = "Fuel level too low for launch";
        document.getElementById("launchStatus").textContent = "Shuttle Not Ready for Launch";
        document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)"; // Red color
    } else if (fuelLevel >= 10000 &&  cargoMass > 10000) {
        document.getElementById("fuelStatus").textContent = "Fuel level high enough for launch";
        document.getElementById("cargoStatus").textContent = "Cargo mass too heavy for launch";
        document.getElementById("launchStatus").textContent = "Shuttle Not Ready for launch";
        document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)"; // Red color
    } else if (fuelLevel < 10000 &&  cargoMass <= 10000) {
        document.getElementById("fuelStatus").textContent = "Fuel level too low for launch";
        document.getElementById("cargoStatus").textContent = "Cargo mass low enough for launch";
        document.getElementById("launchStatus").textContent = "Shuttle Not Ready for launch";
        document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)"; // Red color
    } else { (fuelLevel > 10000 &&  cargoMass <= 10000)  
        document.getElementById("fuelStatus").textContent = "Fuel level high enough for launch";
        document.getElementById("cargoStatus").textContent = "Cargo mass low enough for launch";
        document.getElementById("launchStatus").textContent = "Shuttle is Ready for Launch";
        document.getElementById("launchStatus").style.color = "rgb(65, 159, 106)"; // Green color
        
        return;
    
    }

}
async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json()
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let planetIndex = Math.floor(Math.random()*planets.length)
    return planets[planetIndex]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
