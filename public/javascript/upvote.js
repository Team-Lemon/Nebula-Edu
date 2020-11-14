async function upvoteClickHandler(event) {
    event.preventDefault();
  
    const lesson_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch('/api/lessons/upvote', {
        method: 'PUT',
        body: JSON.stringify({
          lesson_id,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
}
  
document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);