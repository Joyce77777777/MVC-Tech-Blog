/**
 * Handles the form submission event to sign up a new user.
 * This function collects the input from the signup form, sends a request to the server,
 * and handles the response by either redirecting the user upon successful signup or
 * displaying an error message if signup fails.
 * 
 * @param {Event} event - The event object representing the form submission.
 */
const signupFormHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Collect form data from the input fields
  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  // Proceed with the signup process only if all fields have values
  if (username && email && password) {
    try {
      // Send a POST request to the server's signup endpoint with the user's details
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Handle the server's response
      if (response.ok) {
        // Redirect the user to the homepage upon successful signup
        document.location.replace('/');
      } else {
        // Display an alert message if the signup process fails
        alert('Failed to sign up. This username/email may already exist. Please try again.');
      }
    } catch (error) {
      // Log any errors to the console and alert the user
      console.error('Signup failed: ', error);
      alert('Failed to sign up. This username/email may already exist. Please try again.');
    }
  }
};

// Attach the event listener to the signup form
const signupForm = document.querySelector('#signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', signupFormHandler);
}
