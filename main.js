// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

// Select the error modal element and add the .hidden class to hide it initially
const errorModal = document.getElementById('modal');
errorModal.classList.add('hidden');

// Select all the hearts and add event listeners to each
const hearts = document.querySelectorAll('.like-glyph');
hearts.forEach(heart => {
  heart.addEventListener('click', handleHeartClick);
});

// Function to handle heart click event
function handleHeartClick(event) {
  const heart = event.target;

  // Check if the heart is empty or full
  if (heart.classList.contains('activated-heart')) {
    // Heart is full, so change it back to empty
    heart.classList.remove('activated-heart');
    heart.innerText = EMPTY_HEART;
  } else {
    // Heart is empty, so make a server request
    mimicServerCall()
      .then(() => {
        // Server request was successful, update heart appearance
        heart.classList.add('activated-heart');
        heart.innerText = FULL_HEART;
      })
      .catch(error => {
        // Server request failed, display error message
        const modalMessage = document.getElementById('modal-message');
        modalMessage.innerText = error;
        errorModal.classList.remove('hidden');

        // Hide the error modal after 3 seconds
        setTimeout(() => {
          errorModal.classList.add('hidden');
        }, 3000);
      });
  }
}

// Mock server call function
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
