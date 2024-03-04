/**
 * Handles the login form submission by sending user credentials to the server.
 * @param {Event} event - The form submission event.
 */
const loginFormHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve the username and password from the form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Ensure both username and password fields are filled out
  if (username && password) {
    try {
      // Attempt to log in by sending a POST request to the login endpoint with the username and password
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Check if the login was successful
      if (response.ok) {
        // Redirect the user to the homepage upon successful login
        document.location.replace('/');
      } else {
        // Alert the user if login was unsuccessful
        alert('Failed to log in. Incorrect Username/Password.');
      }
    } catch (error) {
      // Log any errors to the console and alert the user
      console.error('Failed to log in:', error);
      alert('Failed to log in. Incorrect Username/Password.');
    }
  } else {
    // Prompt the user to enter both username and password if either field is left blank
    alert('Please enter username and password.');
  }
};

// Attach the event listener to the login form
const loginForm = document.querySelector('.login-form');
if (loginForm) {
  loginForm.addEventListener('submit', loginFormHandler);
}
