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

//Generate Itineray
function generateitinerary() {
    
}



