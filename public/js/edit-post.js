
// Extracts the post ID from the current page URL.
const post_id = window.location.toString().split('/').pop();

/**
 * Handles the submit event of the update post form.
 * @param {Event} event - The submit event object.
 */
const updatePostFormHandler = async (event) => {
  event.preventDefault();

  // Retrieve the title and content from the form
  const title = document.querySelector("#title-update-post").value.trim();
  const content = document.querySelector("#content-update-post").value.trim();

  // Proceed only if both title and content are provided
  if (title && content) {
    try {
      const response = await fetch(`/api/posts/${post_id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // Redirect to the dashboard page upon successful update
        document.location.replace("/dashboard");
      } else {
        // Alert the user if the update fails
        alert("Failed to update the post.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Failed to update the post.");
    }
  }
};

/**
 * Handles the click event of the delete post button.
 * @param {Event} event - The click event object.
 */
const deletePostFormHandler = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Redirect to the dashboard page upon successful deletion
      document.location.replace("/dashboard");
    } else {
      // Alert the user if the deletion fails
      alert("Failed to delete the post.");
    }
  } catch (error) {
    console.error('Error:', error);
    alert("Failed to delete the post.");
  }
};

// Attach event listeners to the update and delete buttons, if they exist
document.querySelector("#update-post")?.addEventListener("click", updatePostFormHandler);
document.querySelector("#delete-post")?.addEventListener("click", deletePostFormHandler);
