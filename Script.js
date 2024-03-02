const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters to be displayed
const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Convert the string to an array of characters
const charactersArray = characters.split('');

// Set the font style and size
const fontSize = 16;
const columns = canvas.width / fontSize;

// Array to store the drops
const drops = [];

// Set initial y positions for the drops
for (let x = 0; x < columns; x++) {
    drops[x] = Math.floor(Math.random() * canvas.height);
}

// Function to draw the Matrix rain
function drawMatrixRain() {
    // Set the background with a low alpha to create the trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0'; // Green text
    ctx.font = fontSize + 'px arial';

    // Loop through each drop
    for (let i = 0; i < drops.length; i++) {
        const text = charactersArray[Math.floor(Math.random() * charactersArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop if it goes out of screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Increment y coordinate of the drop
        drops[i] += 0.5;
    }
}

// Function to display "Nice Try"
function displayNiceTry() {
    ctx.fillStyle = '#0F0';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Nice try', canvas.width / 2, canvas.height / 2 - 30);
    ctx.fillText('But not good enough', canvas.width / 2, canvas.height / 2 + 30);
}

// Animation loop
function animate() {
    drawMatrixRain(); // Display Matrix rain continuously

    // Check if 3 seconds have passed and then display "Nice Try"
    if (Date.now() - startTime > 1000) {
        displayNiceTry();
    }

    requestAnimationFrame(animate);
}

const startTime = Date.now(); // Record the start time
animate();
