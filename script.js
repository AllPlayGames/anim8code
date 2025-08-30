document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('animationCanvas');
    const ctx = canvas.getContext('2d');
    const drawBtn = document.getElementById('drawBtn');
    const animateBtn = document.getElementById('animateBtn');
    const viewCodeBtn = document.getElementById('viewCodeBtn');
    const colorPicker = document.getElementById('colorPicker');

    const codeModal = document.getElementById('codeModal');
    const closeButton = document.querySelector('.close-button');
    const codeDisplay = document.getElementById('codeDisplay');

    // Set canvas dimensions
    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 600;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    let shapes = [];
    let isDrawing = false;
    let startX, startY;

    // --- Drawing Functionality ---
    drawBtn.addEventListener('click', () => {
        const x = Math.random() * (CANVAS_WIDTH - 50);
        const y = Math.random() * (CANVAS_HEIGHT - 50);
        const size = 50;
        const color = colorPicker.value;
        const speedX = Math.random() * 2 - 1; // Random speed between -1 and 1
        const speedY = Math.random() * 2 - 1; // Random speed between -1 and 1
        
        shapes.push({ x, y, size, color, speedX, speedY });
        drawAllShapes();
    });

    function drawAllShapes() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        shapes.forEach(shape => {
            ctx.fillStyle = shape.color;
            ctx.fillRect(shape.x, shape.y, shape.size, shape.size);
        });
    }

    // --- Animation Functionality ---
    let animationFrameId = null;

    animateBtn.addEventListener('click', () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
            animateBtn.textContent = 'Animate!';
            return;
        }

        animateBtn.textContent = 'Stop Animation';
        animateLoop();
    });

    function animateLoop() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        shapes.forEach(shape => {
            // Update position
            shape.x += shape.speedX;
            shape.y += shape.speedY;

            // Bounce off walls
            if (shape.x + shape.size > CANVAS_WIDTH || shape.x < 0) {
                shape.speedX *= -1;
            }
            if (shape.y + shape.size > CANVAS_HEIGHT || shape.y < 0) {
                shape.speedY *= -1;
            }

            // Draw shape at new position
            ctx.fillStyle = shape.color;
            ctx.fillRect(shape.x, shape.y, shape.size, shape.size);
        });

        animationFrameId = requestAnimationFrame(animateLoop);
    }

    // --- Code Generation ---
    viewCodeBtn.addEventListener('click', () => {
        const code = generateCode();
        codeDisplay.value = code;
        codeModal.style.display = 'flex';
    });

    function generateCode() {
        let htmlCode = `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        body { background-color: #f0f4f8; }\n        canvas { background-color: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }\n    </style>\n</head>\n<body>\n    <canvas id="animationCanvas" width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}"></canvas>\n    <script>\n`;
        
        let jsCode = `const canvas = document.getElementById('animationCanvas');\n`;
        jsCode += `const ctx = canvas.getContext('2d');\n`;
        jsCode += `let shapes = [\n`;

        shapes.forEach(shape => {
            jsCode += `    { x: ${shape.x.toFixed(2)}, y: ${shape.y.toFixed(2)}, size: ${shape.size}, color: '${shape.color}', speedX: ${shape.speedX.toFixed(2)}, speedY: ${shape.speedY.toFixed(2)} },\n`;
        });
        
        jsCode += `];\n\n`;

        jsCode += `function animateLoop() {\n`;
        jsCode += `    ctx.clearRect(0, 0, canvas.width, canvas.height);\n`;
        jsCode += `    shapes.forEach(shape => {\n`;
        jsCode += `        shape.x += shape.speedX;\n`;
        jsCode += `        shape.y += shape.speedY;\n`;
        jsCode += `        if (shape.x + shape.size > canvas.width || shape.x < 0) { shape.speedX *= -1; }\n`;
        jsCode += `        if (shape.y + shape.size > canvas.height || shape.y < 0) { shape.speedY *= -1; }\n`;
        jsCode += `        ctx.fillStyle = shape.color;\n`;
        jsCode += `        ctx.fillRect(shape.x, shape.y, shape.size, shape.size);\n`;
        jsCode += `    });\n`;
        jsCode += `    requestAnimationFrame(animateLoop);\n`;
        jsCode += `}\n\n`;
        jsCode += `animateLoop();\n`;

        htmlCode += `        ${jsCode}\n    </script>\n</body>\n</html>`;
        
        return htmlCode;
    }

    // --- Modal functionality ---
    closeButton.addEventListener('click', () => {
        codeModal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target === codeModal) {
            codeModal.style.display = 'none';
        }
    });
});
