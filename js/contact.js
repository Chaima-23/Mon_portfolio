/**
 * Contact Form Validation
 */

function validateContactForm() {
    var name = document.forms["contactForm"]["name"].value;
    var email = document.forms["contactForm"]["email"].value;
    var subject = document.forms["contactForm"]["subject"].value;
    var message = document.forms["contactForm"]["message"].value;

    // Check Name
    if (name === "") {
        alert("Veuillez entrer votre nom.");
        document.forms["contactForm"]["name"].focus();
        return false;
    }

    // Check Email
    if (email === "") {
        alert("Veuillez entrer votre email.");
        document.forms["contactForm"]["email"].focus();
        return false;
    }

    // Basic Email Format Check (Foundational JS)
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        alert("Veuillez entrer une adresse email valide.");
        document.forms["contactForm"]["email"].focus();
        return false;
    }

    // Check Subject
    if (subject === "") {
        alert("Veuillez sélectionner un sujet.");
        return false;
    }

    // Check Message
    if (message === "") {
        alert("Veuillez écrire un message.");
        return false;
    }

    // If all pass
    alert("Merci " + name + "! Votre message a été envoyé (simulation).");
    return true; // In a real app this would submit
}
