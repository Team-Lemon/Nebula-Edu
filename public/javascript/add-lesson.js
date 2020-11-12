async function newFormHandler(event) {
    event.preventDefault();

    // Constants grabbing text values from text-entry
    const title = document.querySelector('input[name="lesson-title"]').value;
    const desc = document.querySelector('input[name="desc"]').value;
    
    // Constant for topic_id to be passed to post route
    let topic_id = document.querySelector('input[name="topic_id"]:checked').value;

    // Switch statement
    switch (topic_id) {
      case 'html':
        topic_id = 1
        break;
      case 'css':
        topic_id = 2
        break;
      case 'javascript':
        topic_id = 3
        break;
    }

    const response = await fetch(`/api/lessons`, {
      method: "POST",
      body: JSON.stringify({
        title,
        desc,
        // topic_id
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