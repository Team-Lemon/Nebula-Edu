async function newFormHandler(event) {
    event.preventDefault();

    // Constants grabbing text values from text-entry
    const title = document.querySelector('input[name="post-title"]').value;
    const desc = document.querySelector('input[name="desc"]').value;
    // Constant for topic_id to be passed to post route
    const topic_id = document.querySelector('input[name="topic_id"]:checked').value;


    const response = await fetch(`/api/lessons`, {
      method: "POST",
      body: JSON.stringify({
        title,
        desc,
        topic_id
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If OK, send user to HomePage
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
}

document.querySelector("#new-post-form").addEventListener("submit", newFormHandler);