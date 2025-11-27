const PIPEDREAM_ENDPOINT = "https://YOUR_PIPE_ENDPOINT"; // Replace with your real Pipedream URL

async function fetchCourses() {
  return [
    { code: 'BTech', name: 'B.Tech (CSE)', feeRange: { min: 300000, max: 600000 } },
    { code: 'MBA', name: 'MBA', feeRange: { min: 150000, max: 350000 } }
  ];
}

function init() {
  const courseList = document.getElementById('courseList');
  const feesBtn = document.getElementById('feesBtn');
  const courseSelect = document.getElementById('courseSelect');
  const feesModal = document.getElementById('feesModal');
  const feesContainer = document.getElementById('feesContainer');
  const closeModal = document.getElementById('closeModal');
  const form = document.getElementById('leadFormElement');
  const formMsg = document.getElementById('formMsg');

  // Populate courses
  fetchCourses().then(courses => {
    courseList.innerHTML = courses.map(c =>
      `<li>${c.name} — Fee Range: ₹${c.feeRange.min.toLocaleString()} - ₹${c.feeRange.max.toLocaleString()}</li>`
    ).join('');

    courseSelect.innerHTML =
      `<option value="">Select course</option>` +
      courses.map(c => `<option value="${c.code}">${c.name}</option>`).join('');

    feesBtn.addEventListener('click', () => {
      feesContainer.innerHTML = courses.map(c =>
        `<div><strong>${c.name}</strong><div>₹${c.feeRange.min.toLocaleString()} - ₹${c.feeRange.max.toLocaleString()}</div></div>`
      ).join('');
      feesModal.setAttribute('aria-hidden', 'false');
    });
  });

  // Close modal
  closeModal.addEventListener('click', () => feesModal.setAttribute('aria-hidden', 'true'));
  feesModal.addEventListener('click', (e) => {
    if (e.target === feesModal) feesModal.setAttribute('aria-hidden', 'true');
  });

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formMsg.textContent = '';

    const data = Object.fromEntries(new FormData(form));
    const phone = (data.phone || '').replace(/\D/g, '');

    if (phone.length !== 10) {
      formMsg.textContent = 'Please enter a valid 10-digit phone number.';
      formMsg.style.color = 'crimson';
      return;
    }

    data.phone = phone;
    data.university = "Asteria University";
    data.timestamp = new Date().toISOString();

    try {
      const res = await fetch(PIPEDREAM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        formMsg.textContent = 'Thanks! Your enquiry was submitted.';
        formMsg.style.color = 'green';
        form.reset();
      } else {
        formMsg.textContent = 'Submission failed. Try again later.';
        formMsg.style.color = 'crimson';
      }
    } catch (err) {
      formMsg.textContent = 'Network error. Check endpoint.';
      formMsg.style.color = 'crimson';
    }
  });
}

document.addEventListener('DOMContentLoaded', init);