/**
 * Asynchronously logs out the user by sending a POST request to the logout endpoint.
 */
const logout = async () => {
  try {
    // Attempt to log out by sending a POST request to the server
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    // Check if the logout was successful
    if (response.ok) {
      // Redirect the user to the homepage upon successful logout
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
  } catch (error) {
    // Log any errors to the console and alert the user
    console.error('Logout failed: ', error);
    alert('Failed to log out.');
  }
};

const logoutButton = document.querySelector('#logout');

// Add an event listener to the logout button to trigger the logout function on click
if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}
