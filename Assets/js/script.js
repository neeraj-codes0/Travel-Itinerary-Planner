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
async function generateItinerary() {
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
        const destination = data.destinations.find(dest => dest.name.toLowerCase().replace(/ /g, '-') === selectedDestination);

        if (!destination) {
            detailsContainer.innerHTML = '<p>Destination details not found.</p>';
            return;
        }

        detailsContainer.innerHTML = `
            <h3>${destination.name}</h3>
            <p>Country: ${destination.country}</p>
            <p>Activities: ${destination.activities.join(', ')}</p>
            <p>Weather: ${destination.weather}</p>
            <a href="${destination.map}" target="_blank">View Map</a>
        `;
    } catch (error) {
        detailsContainer.innerHTML = '<p>Error fetching destination details.</p>';
    }
}

