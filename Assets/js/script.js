//Filtering Destinations based on India/Abroad selection
function filterDestinations() {
    const selectedOption = document.querySelector('input[name="india-abroad"]:checked').value;
    const dropdown = document.getElementById('destination-dropdown');
    const options = dropdown.querySelectorAll('option');

    options.forEach(option => {
      if (selectedOption === 'both' || option.dataset.location === selectedOption) {
        option.style.display = 'block';
      } else {
        option.style.display = 'none';
      }
    });
  }

//Calculating Trip Duration
function calculateDays() {
    const startDateInput = document.getElementById('start-date').value;
    const endDateInput = document.getElementById('end-date').value;
    const daysCountElement = document.getElementById('days-count');

    if (!startDateInput || !endDateInput) {
        daysCountElement.textContent = 0;
        return;
    }

    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight to compare only dates

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        daysCountElement.textContent = "Invalid date(s) entered";
        return;
    }

    if (startDate < today) {
        daysCountElement.textContent = "Start date cannot be in the past";
        return;
    }

    if (endDate < startDate) {
        daysCountElement.textContent = "End date cannot be before start date";
        return;
    }

    const timeDifference = endDate - startDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24) + 1; // Adding 1 to include the start date
    daysCountElement.textContent = daysDifference;
}

// Fetch and display destination details
async function loadDestinationDetails() {
    const dropdown = document.getElementById('destination-dropdown');
    const selectedDestination = dropdown.value;
    const detailsContainer = document.getElementById('destination-details-content');

    if (selectedDestination === 'none') {
        detailsContainer.innerHTML = '<p>Please select a destination.</p>';
        return;
    }

    try {
        const response = await fetch('Data/destinations.json');
        const data = await response.json();
        let destination, countryName;
        for (const country of data.countries) {
            destination = country.destinations.find(dest => dest.name.toLowerCase().replace(/ /g, '-') === selectedDestination);
            if (destination) {
                countryName = country.name;
                break;
            }
        }

        if (!destination) {
            detailsContainer.innerHTML = '<p>Destination details not found.</p>';
            return;
        }

        detailsContainer.innerHTML = `
            <h3>${destination.name}</h3>
            <p>Country: ${countryName}</p>
            <p>Activities: ${destination.activities.join(', ')}</p>
            <p>Weather: ${destination.weather}</p>
            <a href="${destination.map}" target="_blank">View Map</a>
        `;
    } catch (error) {
        detailsContainer.innerHTML = '<p>Error fetching destination details.</p>';
    }
    // Show generate itinerary button after loading details
    document.getElementById('2').style.display = 'block';

}

// Generate day-wise itinerary for the selected location based on trip duration
async function generateDayWiseItinerary() {
    const dropdown = document.getElementById('destination-dropdown');
    const selectedDestination = dropdown.value;
    const startDateInput = document.getElementById('start-date').value;
    const endDateInput = document.getElementById('end-date').value;
    const itineraryContainer = document.getElementById('itinerary-content');

    if (selectedDestination === 'none') {
        itineraryContainer.innerHTML = '<p>Please select a destination.</p>';
        return;
    }

    if (!startDateInput || !endDateInput) {
        itineraryContainer.innerHTML = '<p>Please select both start and end dates.</p>';
        return;
    }

    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        itineraryContainer.innerHTML = '<p>Invalid date(s) entered.</p>';
        return;
    }

    if (startDate < today) {
        itineraryContainer.innerHTML = '<p>Start date cannot be in the past.</p>';
        return;
    }

    if (endDate < startDate) {
        itineraryContainer.innerHTML = '<p>End date cannot be before start date.</p>';
        return;
    }

    const timeDifference = endDate - startDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24) + 1;

    try {
        const response = await fetch('Data/destinations.json');
        const data = await response.json();
        let destination;
        for (const country of data.countries) {
            destination = country.destinations.find(dest => dest.name.toLowerCase().replace(/ /g, '-') === selectedDestination);
            if (destination) break;
        }

        if (!destination) {
            itineraryContainer.innerHTML = '<p>Destination details not found.</p>';
            return;
        }

        let itineraryHTML = `<h3>Itinerary for ${destination.name} (${daysDifference} days)</h3>`;
        for (let i = 0; i < daysDifference; i++) {
            const activity = destination.activities[i % destination.activities.length];
            itineraryHTML += `
                <div class="day-itinerary">
                    <h4>Day ${i + 1}</h4>
                    <p>Activity: ${activity}</p>
                </div>
            `;
        }

        itineraryContainer.innerHTML = itineraryHTML;
    } catch (error) {
        itineraryContainer.innerHTML = '<p>Error fetching destination details.</p>';
    }
}
