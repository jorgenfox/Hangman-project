$(document).ready(function() {

    const words = [
        "algorithm",
        "database",
        "encryption",
        "firewall",
        "interface",
        "javaScript",
        "keyboard",
        "laptop",
        "monitor",
        "networking",
        "operating",
        "programming",
        "router",
        "software",
        "technology",
        "virtual",
        "framework",
        "application",
        "development",
        "cybersecurity",
        "intelligence",
        "augmented",
        "blockchain",
        "automation",
        "smartphone"
    ];

    let selectedWord = ""; // randomly selected word
    let guessedWord = []; // guessed letters array
    let remainingTries = 6; // total tries
    let $message = $("#message");

    $("#triesCount").text(remainingTries);

    // selects a random word from the words array
    function selectWord() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        guessedWord = Array(selectedWord.length).fill("_");
        updateWordContainer();
    }

    // updates the word container
    function updateWordContainer() {
        $("#wordContainer").text(guessedWord.join(" "));
    }

    // checks if the letter is in the word
    function checkLetter(letter) {
        if (selectedWord.includes(letter)) {
            for (let i = 0; i < selectedWord.length; i++) {
                if (selectedWord[i] === letter) {
                    guessedWord[i] = letter.toUpperCase();
                }
            }
            updateWordContainer();
            if (guessedWord.join("") === selectedWord.toUpperCase()) {
                $message.text("You win!");
                disableButtons();
            }
        } else {
            remainingTries--;
            drawMan(remainingTries);
            $("#triesCount").text(remainingTries);
            if (remainingTries === 0) {
                $message.text("Game over!");
                disableButtons();
            }
        }
    }

    // buttons
    function disableButtons() {
        $("#buttonsContainer button").prop("disabled", true);
    }

    // initializes the game
    function initialize() {
        selectWord();
        const $buttonsContainer = $("#buttonsContainer");
        const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        alphabet.forEach(letter => {
            const $button = $("<button>").text(letter.toUpperCase());
            $button.on("click", () => {
                $button.prop("disabled", true);
                checkLetter(letter);
            });
            $buttonsContainer.append($button);
        });
        $("#restart-btn").on("click", () => {
            remainingTries = 6;
            $("#triesCount").text(remainingTries);
            $message.text("");
            $("#wordContainer").empty();
            $buttonsContainer.empty();
            
            // initialize canvas
            let { initialDrawing } = canvasCreator();
            initialDrawing();
            initialize();
        });
    }

    const canvas = $("#canvas")[0];
    // canvas
    const canvasCreator = () => {
        let context = canvas.getContext("2d");
        context.beginPath();
        context.strokeStyle = "#000";
        context.lineWidth = 3;

        // drawing lines
        const drawLine = (fromX, fromY, toX, toY) => {
            context.moveTo(fromX, fromY);
            context.lineTo(toX, toY);
            context.stroke();
        };

        const head = () => {
            context.beginPath();
            context.arc(100, 30, 10, 0, Math.PI * 2, true);
            context.stroke();
        };

        const body = () => {
            drawLine(100, 40, 100, 80);
        };

        const leftArm = () => {
            drawLine(100, 50, 80, 70);
        };

        const rightArm = () => {
            drawLine(100, 50, 120, 70);
        };

        const leftLeg = () => {
            drawLine(100, 80, 80, 110);
        };

        const rightLeg = () => {
            drawLine(100, 80, 120, 110);
        };

        // initial frame
        const initialDrawing = () => {
            // clear canvas
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            // draw hang line
            drawLine(100, 0, 100, 20);
        };

        return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
    };

    // draw the man
    const drawMan = (remainingTries) => {
        let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
        const centerX = canvas.width / 2;
        const yOffset = 20;
        switch (remainingTries) {
            case 5:
                head(centerX, yOffset);
                break;
            case 4:
                body(centerX, yOffset);
                break;
            case 3:
                leftArm(centerX, yOffset);
                break;
            case 2:
                rightArm(centerX, yOffset);
                break;
            case 1:
                leftLeg(centerX, yOffset);
                break;
            case 0:
                rightLeg(centerX, yOffset);
                break;
            default:
                break;
        }
    };

    // initialize canvas
    let { initialDrawing } = canvasCreator();
    initialDrawing();
    // start the game
    initialize();
});
