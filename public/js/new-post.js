/**
 * Handles the submission of the new post form.
 * @param {Event} event - The submit event triggered by the form.
 */
const newPostFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior.

  // Retrieve the title and content from the form.
  const title = document.querySelector('#title-new-post').value.trim();
  const content = document.querySelector('#content-new-post').value.trim();

  // Only proceed if both title and content are provided.
  if (title && content) {
    try {
      // Send a POST request to the server to create a new post.
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Check if the request was successful.
      if (response.ok) {
        // Redirect the user to the dashboard page upon success.
        document.location.replace('/dashboard');
      } else {
        // If the request was unsuccessful, alert the user.
        alert('Failed to create a new post.');
      }
    } catch (error) {
      // Log any errors that occur during the fetch operation.
      console.error('Error creating a new post:', error);
      alert('Failed to create a new post.');
    }
  }
};

// Attach an event listener to the new post form for the submit event.
const newPostForm = document.querySelector('.new-post-form');
if (newPostForm) {
  newPostForm.addEventListener('submit', newPostFormHandler);
}
