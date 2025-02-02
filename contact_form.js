document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault();
  
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
  
    const response = await fetch("https://8bwiiyirfd.execute-api.us-east-2.amazonaws.com/contactme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  
    if (response.ok) {
      alert("Message sent!");
    } else {
      alert("Error sending message.");
    }
  });