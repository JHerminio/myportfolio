document.addEventListener("DOMContentLoaded", () => {
  // 1. Fixed selector to match the new ID in the HTML
  const form = document.getElementById("contact-form");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "5e250373-194c-4b5f-a0fd-c67cd436aea3");

    // 2. Cache original innerHTML to preserve the FontAwesome <i> icon
    const originalContent = submitBtn.innerHTML;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Success! Your message has been sent.");
        form.reset(); // 3. This clears all text fields seamlessly after success
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      // 4. Restore original text along with the plane icon
      submitBtn.innerHTML = originalContent;
      submitBtn.disabled = false;
    }
  });
});
