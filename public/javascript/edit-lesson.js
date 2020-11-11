async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="lesson-title"]').value.trim();
    const desc = document.querySelector('input[name="desc"]').value.trim();

    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];

    const response = await fetch(`/api/lessons/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        desc
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
}
  
document.querySelector(".edit-post-form").addEventListener("submit", editFormHandler);