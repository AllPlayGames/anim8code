document.addEventListener('DOMContentLoaded', () => {
    const designArea = document.getElementById('designArea');
    const addButton = document.getElementById('addButton');
    const viewCodeBtn = document.getElementById('viewCodeBtn');
    const codeModal = document.getElementById('codeModal');
    const closeButton = document.querySelector('.close-button');
    const codeDisplay = document.getElementById('codeDisplay');

    let elements = [];
    let isDragging = false;
    let activeElement = null;
    let offset = { x: 0, y: 0 };

    function generateUniqueId() {
        return `el-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }

    function createElement(type) {
        const id = generateUniqueId();
        const newElement = {
            id,
            type,
            content: 'Click Me!',
            style: {
                position: 'absolute',
                top: '50px',
                left: '50px',
            }
        };

        elements.push(newElement);
        renderElements();
    }

    function renderElements() {
        designArea.innerHTML = '';
        elements.forEach(el => {
            const domElement = document.createElement('button');
            domElement.className = 'draggable-item';
            domElement.id = el.id;
            domElement.textContent = el.content;
            Object.assign(domElement.style, el.style);

            domElement.addEventListener('mousedown', startDrag);
            designArea.appendChild(domElement);
        });
    }

    function startDrag(e) {
        isDragging = true;
        activeElement = e.target;
        const rect = activeElement.getBoundingClientRect();
        offset.x = e.clientX - rect.left;
        offset.y = e.clientY - rect.top;
        activeElement.style.cursor = 'grabbing';
    }

    document.addEventListener('mousemove', (e) => {
        if (!isDragging || !activeElement) return;

        const designAreaRect = designArea.getBoundingClientRect();
        let newX = e.clientX - designAreaRect.left - offset.x;
        let newY = e.clientY - designAreaRect.top - offset.y;
        
        // Update the element's position in our state
        const elementState = elements.find(el => el.id === activeElement.id);
        if (elementState) {
            elementState.style.left = `${newX}px`;
            elementState.style.top = `${newY}px`;
        }

        // Visually update the element
        activeElement.style.left = `${newX}px`;
        activeElement.style.top = `${newY}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        if (activeElement) {
            activeElement.style.cursor = 'grab';
            activeElement = null;
        }
    });

    function generateCode() {
        let htmlCode = `<!DOCTYPE html>\n<html>\n<head>\n    <title>My Anim8Code Website</title>\n    <style>\n        body { position: relative; width: 100%; height: 100vh; }\n`;
        let cssCode = '';
        let jsCode = '';

        elements.forEach(el => {
            // Generate CSS
            cssCode += `.${el.id} { position: absolute; top: ${el.style.top}; left: ${el.style.left}; }\n`;

            // Generate HTML
            htmlCode += `    <button class="${el.id}">${el.content}</button>\n`;
        });

        htmlCode += `    </style>\n</head>\n<body>\n${htmlCode.split('\n').slice(2).join('\n')}\n</body>\n</html>`;
        
        return htmlCode;
    }

    // Event Listeners
    addButton.addEventListener('click', () => createElement('button'));
    viewCodeBtn.addEventListener('click', () => {
        const code = generateCode();
        codeDisplay.value = code;
        codeModal.style.display = 'flex';
    });
    closeButton.addEventListener('click', () => {
        codeModal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target === codeModal) {
            codeModal.style.display = 'none';
        }
    });

});
