/**
 * Quiz Logic
 */

var questions = [
    {
        question: "1. Que signifie HTML ?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        correct: 0,
        type: "radio"
    },
    {
        question: "2. Quel langage est utilisé pour styliser les pages web ?",
        options: ["HTML", "CSS", "Python"],
        correct: 1,
        type: "radio"
    },
    
    {
        question: "3. Comment déclarer une variable en JavaScript (ES5) ?",
        options: ["var x;", "variable x;", "dim x;"],
        correct: 0,
        type: "radio"
    },
    {
        question: "4. Quelle méthode permet d'afficher une boîte de dialogue ?",
        options: ["msg()", "alert()", "popup()"],
        correct: 1,
        type: "radio"
    },
    {
        question: "5. Quel attribut HTML est utilisé pour définir des styles en ligne ?",
        options: ["font", "styles", "style"],
        correct: 2,
        type: "radio"
    },
    {
        question: "6. Cochez les frameworks JavaScript : (Choix Multiple)",
        options: ["Angular", "Laravel", "React", "Django"],
        correct: [0, 2], // Angular and React
        type: "checkbox"
    },
    {
        question: "7. Lequel n'est PAS un SGBD Relational ?",
        options: ["MySQL", "MongoDB", "PostgreSQL"],
        correct: 1,
        type: "radio"
    },
    {
        question: "8. Pour boucler sur un tableau, on peut utiliser :",
        options: ["for", "while", "if"],
        correct: 0,
        type: "radio"
    },
    {
        question: "9. Lequel est un événement JavaScript ?",
        options: ["onclick", "onmouse", "doit"],
        correct: 0,
        type: "radio"
    },
    {
        question: "10. Cochez les langages de programmation : (Choix Multiple)",
        options: ["Python", "HTML", "Java", "CSS"],
        correct: [0, 2], 
        type: "checkbox"
    }

];

function initQuiz() {
    var userName = prompt("Bienvenue ! Quel est votre nom ?", "Visiteur");
    // var userName = "Tester"; // Bypass prompt for testing
    if (userName === null || userName === "") {
        userName = "Visiteur";
    }
    // Store globally or just alert it? Let's assume we want to use it later, 
    // but for now just welcoming is enough or we save it to a hidden input/global var.
    // Let's create a global var top of file if we want to use it in result.
    window.quizUserName = userName;
    alert("Bonne chance " + userName + " !");

    var container = document.getElementById("questions-container");
    var content = "";

    for (var i = 0; i < questions.length; i++) {
        var q = questions[i];
        content += '<div class="question">';
        content += '<h3>' + q.question + '</h3>';
        content += '<div class="options">';

        for (var j = 0; j < q.options.length; j++) {
            // Unique name for each question group
            // For radio: name="q0", "q1"...
            // For checkbox: name="q6", but distinct values? No, checkbox needs same name usually to group, but values differ.
            // Or simple names like "q0_opt0" if we check manually.
            // Requirement says: "form.question1[0].checked". So name should be "question1".

            var inputName = "question" + i;
            var inputType = q.type;

            content += '<label>';
            content += '<input type="' + inputType + '" name="' + inputName + '" value="' + j + '"> ';
            content += q.options[j];
            content += '</label>';
        }

        content += '</div></div>';
    }

    container.innerHTML = content;
}

function submitQuiz() {
    console.log("Submit Quiz clicked");
    try {
        // Removed blocking confirm for better UX
        // if (!confirm("Voulez-vous vraiment soumettre le quiz ?")) return;

        var score = 0;
        var total = questions.length;
        var form = document.forms["quizForm"];

        if (!form) {
            console.error("Quiz form not found");
            return;
        }

        var resultsHtml = "<h3>Résultats :</h3><ul>";

        for (var i = 0; i < questions.length; i++) {
            var q = questions[i];
            var inputName = "question" + i;
            var inputs = form.elements[inputName];
            var isCorrect = false;

            if (!inputs) {
                console.warn("Inputs not found for question " + i);
                resultsHtml += "<li style='color: orange;'>Question " + (i + 1) + ": Non répondue</li>";
                continue;
            }

            if (q.type === "radio") {
                for (var j = 0; j < inputs.length; j++) {
                    if (inputs[j].checked) {
                        if (parseInt(inputs[j].value) === q.correct) {
                            isCorrect = true;
                        }
                        break;
                    }
                }
            } else if (q.type === "checkbox") {
                var correctCount = 0;
                var wrongCount = 0;
                // Checkbox inputs might be a RadioNodeList or individual elements if only one?
                // Assuming standard array-like behavior
                for (var j = 0; j < inputs.length; j++) {
                    if (inputs[j].checked) {
                        // Check if current index j is in correct array
                        var found = false;
                        for (var k = 0; k < q.correct.length; k++) {
                            if (q.correct[k] === j) found = true;
                        }
                        if (found) correctCount++;
                        else wrongCount++;
                    }
                }
                if (correctCount === q.correct.length && wrongCount === 0) {
                    isCorrect = true;
                }
            }

            if (isCorrect) {
                score++;
                resultsHtml += "<li style='color: #4caf50;'>Question " + (i + 1) + ": Correct</li>";
            } else {
                resultsHtml += "<li style='color: #f44336;'>Question " + (i + 1) + ": Incorrect</li>";
            }
        }

        resultsHtml += "</ul>";

        var resultBox = document.getElementById("result");
        if (resultBox) {
            resultBox.style.display = "block";
            resultBox.innerHTML = "<h3>Votre Score: " + score + " / " + total + "</h3>" + resultsHtml;
            resultBox.scrollIntoView({ behavior: 'smooth' });
        }

        // Optional: Alert score if preferred, but result box is better
        // alert(window.quizUserName + ", votre score est : " + score + " sur " + total);

    } catch (e) {
        console.error("Error in submitQuiz:", e);
        alert("Une erreur est survenue lors de la validation du quiz. Vérifiez la console.");
    }
}
