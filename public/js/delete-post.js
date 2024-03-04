/**
 * Asynchronously deletes a post given its ID.
 * @param {number} post_id - The ID of the post to be deleted.
 */
const deletePost = async (post_id) => {
  try {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    // Check if the request was successful
    if (response.ok) {
      // Reload the page to reflect the deletion
      document.location.reload();
    } else {
      // Inform the user if there was an issue with the post deletion
      alert("Failed to delete the post.");
    }
  } catch (error) {
    // Log any error to the console and alert the user
    console.error("Error deleting post:", error);
    alert("Failed to delete the post.");
  }
};

/**
 * Handles click events on the document, delegating to delete posts if necessary.
 * @param {Event} event - The click event object.
 */
const deletePostHandler = (event) => {
  // Check if the clicked element has a class indicating a delete operation
  if (event.target.matches(".delete-post")) {
    // Extract the post ID from the element's data attribute
    const post_id = event.target.getAttribute("data-post-id");
    // Call the delete function with the extracted post ID
    deletePost(post_id);
  }
};

// Attach the event listener to the whole document to catch all click events
document.addEventListener("click", deletePostHandler);
