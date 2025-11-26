function openFees() {
  document.getElementById('feesModal').style.display = 'flex';
}

// Close fees modal
function closeFees() {
  document.getElementById('feesModal').style.display = 'none';
}

// Handle lead form submission
function submitForm(e) {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    state: document.getElementById('state').value,
    course: document.getElementById('course').value,
    year: document.getElementById('year').value
  };

  // Replace with your actual Pipedream API endpoint
  const PIPE_URL = "https://your-pipedream-endpoint.m.pipedream.net";

  fetch(PIPE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        document.getElementById('msg').innerHTML = "Submitted Successfully!";
        document.getElementById('msg').style.color = 'green';
        e.target.reset(); // clear form after success
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .catch(() => {
      document.getElementById('msg').innerHTML = "Submission Failed!";
      document.getElementById('msg').style.color = 'red';
    });
}