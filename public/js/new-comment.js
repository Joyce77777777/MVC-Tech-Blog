/**
 * Handles form submission for creating a new comment.
 * @param {Event} event - The submit event triggered by the form.
 */
const newCommentFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Extract the post ID from the current page's URL
  const post_id = parseInt(window.location.pathname.split('/').pop());

  // Retrieve the comment content from the input field
  const content = document.querySelector('#content-new-comment').value.trim();

  // Proceed only if there is content in the comment
  if (content) {
    try {
      // Send a POST request to the server to create a new comment
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment_text: content, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Check if the request was successful
      if (response.ok) {
        // Reload the page to show the newly added comment
        document.location.reload();
      } else {
        // Log the response status and text for debugging purposes
        console.log('Failed to create a comment. Response status:', response.status);
        console.log('Response text:', await response.text());
        // Alert the user if the request failed
        alert('Failed to create a comment.');
      }
    } catch (error) {
      // Log any error that occurs during the fetch operation
      console.error('Failed to submit the comment:', error);
      alert('Failed to create a comment.');
    }
  }
};

// Attach an event listener to the comment form
const newCommentForm = document.querySelector('.new-comment-form');
if (newCommentForm) {
  newCommentForm.addEventListener('submit', newCommentFormHandler);
}
