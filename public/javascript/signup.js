async function signupFormHandler(event) {
    event.preventDefault();
  
    // Constants to collect info from text-input
    const username = document.querySelector("#username-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
  
    // Running captured input through POST method in API to verify credentials match
    if (username && password) {
      const response = await fetch("/api/users", {
        method: "post",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      // If OK, user is taken to their dashboard
      if (response.ok) {
        console.log("Sign-Up Successful");
        document.location.replace("/");
      } else {
        alert(response.statusText);
      };
    };
};

document.querySelector("#signup-form").addEventListener("submit", signupFormHandler);