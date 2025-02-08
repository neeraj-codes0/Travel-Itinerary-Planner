//Fetch from JSON and populate dropdown with data from API 
document.addEventListener("DOMContentLoaded", () => {
    fetch("data/destinations.json")
        .then((response) => response.json())
        .then((data) => {
            const dropdown = document.getElementById("destination-dropdown");
            data.destinations.forEach((destination) => {
                let option = document.createElement("option");
                option.value = destination.name.toLowerCase();
                option.textContent = destination.name;
                dropdown.appendChild(option);
            });
        });
});

//Update Itinerary & Details based on selected destination
document.getElementById("destination-dropdown").addEventListener("change", function () {
    const selected = this.value;
    fetch("data/destinations.json")
        .then((response) => response.json())
        .then((data) => {
            const destination = data.destinations.find((d => d.name.toLowerCase() === selected));
            if(!destination) return;

//Update Destination Details
document.getElementById("destination-details").innerHTML = `<p><strong>Country:</strong>${destinations.country}</p>
<p><strong>Weather:</strong>${destinations.weather}</p>
<p><strong>Activities:</strong>${destinations.activities.join(',')}</p>
<a href="${destinations.map}">View Map</a>`;
        
//Generate Itinerary
const itinerarycontent = document.getElementById("itinerary-content");
itinerarycontent.innerHTML = "";
destinations.activities.forEach((activity,index) => {
    const daydiv = document.createElement("div");
    daydiv.classList.add("itinerary-day");
    daydiv.innerHTML = `<h3>Day ${index + 1}</h3><p>${activity}</p>`;
    itinerarycontent.appendChild(daydiv);
    setTimeout(() => daydiv.classList.add("show"), index * 200);
    });
});
});

//Packing Checklist Functionality
function addChecklistItem() {
    const input = document.getElementById("packing-input");
    if (input.value.trim()==="") return;
    const checklist = document.getElementById("checklist-items");
    const li= document.createElement("li");
    li.textContent = input.value;
    li.addEventListener("click", () => li.classList.add("removed"));
    setTimeout(() => li.remove(), 300);
    checklist.appendChild(li);
    setTimeout(() => li.classList.add("show"), 100);
    input.value = "";
}