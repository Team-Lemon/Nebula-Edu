async function loginFormHandler(event) {
    event.preventDefault();

    // Constants grabbing info from text-entry input
    const username = document.querySelector("#username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    // Running captured input through POST method in API to verify credentials match
    if (username && password) {
      const response = await fetch("/api/users/login", {
        method: "post",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      // If OK, send user to the Homepage
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert(response.statusText);
      };
    };
};

document.querySelector("#login-form").addEventListener("submit", loginFormHandler);