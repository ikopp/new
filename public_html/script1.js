 // Fetch button texts dynamically on button click
const modal = document.getElementById('myModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalText = document.getElementById('modalText');
const openModalButtons = document.querySelectorAll('.openModalBtn');
const copyTextBtn = document.getElementById('copyTextBtn');

// Add event listeners to each button to load text and open the modal
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const key = button.getAttribute('data-key'); // Get the button's data-key attribute

        // Fetch the JSON data only when the button is clicked
        fetch('buttonTexts.json')
            .then(response => response.json())
            .then(buttonTexts => {
                // Get the message based on the key
                const message = buttonTexts[key];

                // Check if the message exists and display it in the modal
                if (message) {
                    modalText.textContent = message;
                    modal.style.display = 'flex';
                } else {
                    alert('Message not found for this button.');
                }
            })
            .catch(error => {
                console.error('Error fetching button texts:', error);
                alert('Failed to load the message.');
            });
    });
});

// Close the modal when the close button is clicked
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Copy text functionality
copyTextBtn.addEventListener('click', () => {
    const textToCopy = modalText.textContent;
    navigator.clipboard.writeText(textToCopy).catch(err => {
        alert('Failed to copy text: ' + err);
    });
});

// Close the modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

          // svg home
          const homeButton = document.querySelector('.home-button');
        
        homeButton.addEventListener('mouseenter', () => {
            homeButton.style.animation = 'pulse 1s infinite';
        });

        homeButton.addEventListener('mouseleave', () => {
            homeButton.style.animation = 'none';
            void homeButton.offsetWidth;
        });

        homeButton.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
            
            // إضافة توجيه بعد انتهاء التأثير البصري
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                window.location.href = './index.html';
            }, 100);
        });
          // End svg home

        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const arabic = 'أ ر م ل';
        const fontSize = 14;
        const columns = canvas.width / fontSize;

        const rainDrops = [];

        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = arabic.charAt(Math.floor(Math.random() * arabic.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        }

        setInterval(draw, 45);


        
        // furquan el hoda content javasript
        
        const highlightChars = {
            'ا': '1', 'أ': '1', 'إ': '1', 'ئ': '1','ؤ': '1', 'ء': '1', 'ى': '1', 'آ': '1',
            'ل': '1',
            'م': '1',
            'ر': '1'
        };
        const highlightChars1 = ['ا', 'أ', 'إ', 'ئ','ؤ', 'ء', 'ى', 'آ', 'ل', 'م', 'ر'];
        function highlightText(text) {
            return text.split('').map(char => {
                if (char in highlightChars) {
                    const number = highlightChars[char];
                    const numberClass = parseInt(number) > 9 ? 'number large-number' : 'number';
                    return `<span class="highlight">${char}<span class="${numberClass}">${number}</span></span>`;
                  
                }
                return char;
            }).join('');
        }

        // script placeholder
        
        

        const inputText = document.getElementById('inputText');
        const customAttr = inputText.getAttribute('placeholder');

        inputText.addEventListener('focus', function () {
            clearTimeout(done);
            this.value = '';
            if (this.hasAttribute('placeholder')) {
                this.removeAttribute('placeholder');
            }
        });

        inputText.addEventListener('blur', function () {
            this.setAttribute('placeholder', customAttr);
        });

        //end script place holder
        
        function highlightText1(text) {
            return text.split('').map(char => 
                highlightChars1.includes(char) ? `<span class="highlight">${char}</span>` : char
            ).join('');
        }
		let strippedText = '';
		let totalAnalysis = '';
		
        // Optimized Analyze Text Function
function analyzeText() {
    const inputText = document.getElementById('inputText').value.trim();
    const outputDiv = document.getElementById('output');
    const lines = inputText.split('\n');
    const fragment = document.createDocumentFragment();
	totalAnalysis = '';
	strippedText = '';

    // Debounced rendering
    const processLines = (start, batchSize) => {
        const end = Math.min(start + batchSize, lines.length);

        for (let i = start; i < end; i++) {
            const line = lines[i];
            if (line.trim() !== '') {
                const highlightedLine = highlightText1(line);
                const highlightedLine1 = highlightText(line);
                const analyzedLine = analyzeLine(line);

                const container = document.createElement('div');
                container.className = 'line-container';
                container.innerHTML = `
                    <div class="input-line">القرآن: ${highlightedLine}</div>
                    <div class="input-line">القرآن: ${highlightedLine1}</div>
                    <div class="output-line">فرقان: ${analyzedLine}</div>
                    <button class="btn copy-btn">نسخ</button>
                `;
                fragment.appendChild(container);

                totalAnalysis += analyzedLine + ' ';
            }
        }

        // Append the batch to the DOM
        outputDiv.appendChild(fragment);

        // Process the next batch if there are more lines
        if (end < lines.length) {
            requestAnimationFrame(() => processLines(end, batchSize));
        } else {
            // All lines processed; add event delegation for copy buttons
            outputDiv.addEventListener('click', (event) => {
                if (event.target.classList.contains('copy-btn')) {
                    const analysis = event.target.dataset.analysis;
                    navigator.clipboard.writeText(analysis).then(() => {
                        alert('Copied to clipboard!');
                    });
                }
            });
        }
    };
	strippedText = totalAnalysis.replace(/<[^>]*>/g, '').trim();

    // Clear output and start processing in batches
    outputDiv.innerHTML = `
        <p><span style="font-size:24px; background-color:#f1c40f; color:#2c3e50">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ألمر&nbsp; &nbsp; &nbsp;&nbsp;</span></p>
	<div class="counters">
            <table id="table-7">
                <thead>
                    <tr><th colspan="2">فرقان الهدى عروج فكري</th></tr>
                    <tr><th colspan="2">إحصائيات النص القرآني كاملا</th></tr>
                </thead>
                <tbody>
                    <tr><th>${countWords(inputText)}</th><th>عدد الكلمات</th></tr>
                    <tr><th>${countAllChars(inputText)}</th><th>عدد جميع الحروف</th></tr>
                    <tr><th>${countSpecificChars(inputText).total}</th><th>عدد الحروف (أ، ل ، م ، ر )</th></tr>
                    <tr><th id="tasnimsaid3">${countSpecificChars(inputText).alif}</th><th>عدد حرف (أ)</th></tr>
                    <tr><th id="tasnimsaid4">${countSpecificChars(inputText).lam}</th><th>عدد حرف (ل)</th></tr>
                    <tr><th id="tasnimsaid5">${countSpecificChars(inputText).meem}</th><th>عدد حرف (م)</th></tr>
                    <tr><th id="tasnimsaid6">${countSpecificChars(inputText).raa}</th><th>عدد حرف (ر)</th></tr>
                </tbody>
            </table>
        </div>
    `;
    processLines(0, 50); // Adjust batch size for performance
        

    // Add event listeners to copy buttons
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const analysis = button.dataset.analysis;
            navigator.clipboard.writeText(analysis).then(() => {
                alert('Copied to clipboard!');
            });
        });
    });
}

// Optimize Highlight Text Function
function highlightText1(text) {
    const regex = /[ا|أ|إ|ئ|ؤ|ء|ى|آ|ل|م|ر]/g;
    return text.replace(regex, match => `<span class="highlight">${match}</span>`);
}
                                                                                                                    

        function analyzeLine(line) {
            const words = line.split(' ');
            return words.map(analyzeWord).join('<span class="comma"> </span>');
        }

        function analyzeWord(word) {
            let result = '';
            for (let char of word) {
                if (['ا', 'ى', 'ء', 'ئ', 'ؤ', 'أ', 'إ', 'آ'].includes(char)) {
                    result += 'ألف ';
                } else if (char === 'ل') {
                    result += 'لام ';
                } else if (char === 'م') {
                    result += 'ميم ';
                } else if (char === 'ر') {
                    result += 'راء ';
                }
            }
            return result.trim();
        }
		function countWords(text) {
            return text.trim().split(/\s+/).length;
        }

        function countAllChars(text) {
            return text.replace(/\s/g, '').length;
        }

        function countSpecificChars(text) {
            const counts = {
                alif: 0,
                lam: 0,
                meem: 0,
                raa: 0,
                total: 0
            };

            for (let char of text) {
                if (['ا', 'ى', 'ء', 'ئ', 'ؤ', 'أ', 'إ', 'آ'].includes(char)) {
                    counts.alif++;
                    counts.total++;
                } else if (char === 'ل') {
                    counts.lam++;
                    counts.total++;
                } else if (char === 'م') {
                    counts.meem++;
                    counts.total++;
                } else if (char === 'ر') {
                    counts.raa++;
                    counts.total++;
                }
            }

            return counts;
        }
		audioBtn1 = document.getElementById('audioBtn1');
		audioBtn2 = document.getElementById('audioBtn2');
        async function generateAudio(library) {
			// Disable the buttons immediately
    audioBtn1.disabled = true;
	audioBtn2.disabled = true;

            if (!strippedText) {
                alert('Please enter Arabic text.');
                return;
            }

            try {
                const response = await fetch('/synthesize', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ strippedText, library })
                });

                const data = await response.json();
                if (data.success) {
                    const audioPlayer = document.getElementById('audioPlayer');
                    audioPlayer.src = data.output;
					audioPlayer.addEventListener('canplaythrough', () => {
        audioBtn1.disabled = false;
        audioBtn2.disabled = false;
    });
                    audioPlayer.play();
                } else {
                    alert(data.error || 'Error generating audio.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to generate audio.');
            }
        }
		function playAudio() {
            const audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.play();
        }

        function pauseAudio() {
            const audioPlayer = document.getElementById('audioPlayer');
            if (!audioPlayer.paused) {
                audioPlayer.pause();
            }
        }
        function printResult() {
            const printContents = document.getElementById('output').innerHTML;
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        }
