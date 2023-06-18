// Get DOM elements
const selectMovie = document.getElementById("select-movie");
const seatContainer = document.querySelector(".seats");
const seats = document.querySelectorAll(".row .seat");
const video = document.getElementById("video");
const count = document.getElementById("count");
const total = document.getElementById("total");

// Get the ticket price from selected movie
let ticketPrice = +selectMovie.value;
// console.log(moviePrice);

// Call the update UI Function - get data from local storage and update the UI
updateUI();

//  Function to update counts updateCounts()
function updateCount() {
  // calculate how many seats are selected
  const selectedSeats = document.querySelectorAll(".row .selected");
  // Get the number of seats from the node list
  const selectSeatsCount = selectedSeats.length;
  // Update DOM with the count
  count.innerText = selectSeatsCount;
  // Update DOM with total price
  total.innerText = selectSeatsCount * ticketPrice;
  //  Create an array using the node list
  const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  //  Because local storage saves data for key value in Strings
  // JSON.stringify(seatIndex)
  //  Save Data to Local Storage using LocalStorage
  localStorage.setItem("Seat Number", JSON.stringify(seatIndex));
}

// function to get data from local storage and update the UI
function updateUI() {
  //  Converted  String to again array using JSON.parse
  // get the selected seats from localstorage
  const selectedSeats = JSON.parse(localStorage.getItem("Seat Number"));
  //  check if there are any selected seats
  if (selectedSeats !== null && selectedSeats.length > 0) {
    // loop over all the seats in the theater
    seats.forEach((seat, index) => {
      // if the index index of seat contained inside selectedSeats Array
      if (selectedSeats.indexOf(index) > -1) {
        // add the selected class to the seat
        seat.classList.add("selected");
      }
    });
  }
  // get the selected movie from localstorage
  const movieIndex = JSON.parse(localStorage.getItem("Movie Index"));
  // check if there is a movie index
  if (movieIndex !== null) {
    // use the movieIndex from local storage to update the movie from dropdown
    selectMovie.selectedIndex = movieIndex;

    //  Change Video when user change and update UI
    video.setAttribute("src", `movies/${selectMovie.selectedIndex}.mp4`);
    // Update the counts
    updateCount();
  }
}

// Event Listeners
// 1. Listen for event on seats
seatContainer.addEventListener("click", (e) => {
  // Check if target has a class of seat and also is not occupied
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    //  Add and remove selected class inn if statement true
    e.target.classList.toggle("selected");
    //  Update the count of the selected count
    updateCount();
  }
});

// 2. Listen For change in movie selection
selectMovie.addEventListener("change", (e) => {
  // Update ticket price to the selected movie
  ticketPrice = +e.target.value;

  // selectedIndex is a property for eventListener provides you to check which index you want to select the movie
  // console.log(e.target.selectedIndex);
  // update the count in the DOM
  updateCount();
  // Save the Movie Data to localStorage and use saveMovieData()
  localStorage.setItem("Movie Index", e.target.selectedIndex);
  localStorage.setItem("Movie Price", e.target.value);

  //  Change Video when user change
  video.setAttribute("src", `movies/${e.target.selectedIndex}.mp4`);
});
