// when the "submit-button" is clicked, the contents of the contact-page are replaced with a single <p> element that reads "Thank you for your message" in size 24 font.

// hint: you can change the style of an element by modifying the value of that element's .style.fontSize, or by updating its .classList.

const submitButton = document.getElementById("submit-button");
const contactPage = document.getElementById("contact-page");

submitButton.addEventListener("click", function(event) {
event.preventDefault();


contactPage.innerHTML = "";


const thankYou = document.createElement("p");
thankYou.textContent = "Thank you for your message";
thankYou.style.fontSize = "24px";


contactPage.appendChild(thankYou);
});