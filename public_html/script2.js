 // Fetch button texts from JSON file
        fetch('buttonTexts.json')
            .then(response => response.json())
            .then(buttonTexts => {
                // Select all buttons
                const buttons = document.querySelectorAll('.openModalBtn');

                // Assign texts dynamically based on data-key
                buttons.forEach(button => {
                    const key = button.getAttribute('data-key');
                    button.setAttribute('data-message', buttonTexts[key]);

                    
                });
            })
            .catch(error => console.error('Error fetching button texts:', error));
 // Get the modal and close button
        const modal = document.getElementById('myModal');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const modalText = document.getElementById('modalText');

        // Get all buttons that open the modal
        const openModalButtons = document.querySelectorAll('.openModalBtn');

        // Add event listeners to each button to open the modal with the respective message
        openModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const message = button.getAttribute('data-message');
                modalText.textContent = message;
                modal.style.display = 'flex';
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
                alert("Failed to copy text: " + err);
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

        const arabic = 'أ ل م ن';
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

                function logCharCodePoints(text) {
    for (let char of text) {
        console.log(`Character: ${char}, Code Point: ${char.codePointAt(0).toString(16)}`);
    }
}
        
        
        
        // furquan el hoda content javasript
        const highlightChars = {
            'ا': '1', 'أ': '1', 'إ': '1',  'ء': '1', 'آ': '1' , 'ٱ': '1' , 'ـٔا': '1',
            'ل': '1',
            'م': '1',
            'ن': '1'
        };
        const highlightChars1 = ['ا', 'أ', 'إ', 'ء','آ', 'ل', 'م', 'ن' , 'ٱ' , 'ـٔا'];

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
        
        

        const inputTextElement = document.getElementById('inputText');
        const inputTextValue = inputTextElement.value;
        const customAttr = inputText.getAttribute('placeholder');

        inputText.addEventListener('focus', function () {
    this.value = ''; // Clear the text inside the input box
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
	strippedText = '';
	totalAnalysis = '';
    const inputText = document.getElementById('inputText').value.trim();
    logTextDetails(inputText); // Log details for debugging
    console.log(countSpecificChars(inputText));
    // Rest of the analyzeText function...
    const outputDiv = document.getElementById('output');
    let linesHtml = '';

    // Process text in batches
    const lines = inputText.split('\n');
    lines.forEach((line, index) => {
        if (line.trim() !== '') {
            const highlightedLine = highlightText1(line);
			const highlightedLine1 = highlightText(line);
            const analyzedLine = analyzeLine(line);

            linesHtml += `
                <div class="input-line">القرآن: ${highlightedLine}</div>
				<div class="input-line">القرآن: ${highlightedLine1}</div>
                <div class="output-line">فرقان: ${analyzedLine}</div>
                <button class="btn copy-btn" id="copyTextBtn-${index}">نسخ</button>
            `;

            totalAnalysis += analyzedLine + ' ';
        }
    });
	strippedText = totalAnalysis.replace(/<[^>]*>/g, '').trim();

    // Batch update the DOM
    outputDiv.innerHTML = `
        <p><span style="font-size:24px; background-color:#f1c40f; color:#2c3e50">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ألمر&nbsp; &nbsp; &nbsp;&nbsp;</span></p>
        ${linesHtml}
        <div class="counters">
            <table id="table-7">
                <thead>
                    <tr><th colspan="2">فرقان الهدى عروج فكري</th></tr>
                    <tr><th colspan="2">إحصائيات النص القرآني كاملا</th></tr>
                </thead>
                <tbody>
                    <tr><th>${countWords(inputText)}</th><th>عدد الكلمات</th></tr>
                    <tr><th>${countAllChars(inputText)}</th><th>عدد جميع الحروف</th></tr>
                    <tr><th>${countSpecificChars(inputText).total}</th><th>عدد الحروف (أ، ل ، م ، ن )</th></tr>
					<tr><th id="tasnimsaid3">${countSpecificChars(inputText).alif}</th><th>عدد حرف (أ)</th></tr>
					<tr><th id="tasnimsaid4">${countSpecificChars(inputText).lam}</th><th>عدد حرف (ل)</th></tr>
					<tr><th id="tasnimsaid5">${countSpecificChars(inputText).meem}</th><th>عدد حرف (م)</th></tr>
					<tr><th id="tasnimsaid6">${countSpecificChars(inputText).noon}</th><th>عد حرف (ن)</th></tr>
                </tbody>
            </table>
        </div>
    `;

    // Attach event listeners for copy buttons
    lines.forEach((_, index) => {
        const button = document.getElementById(`copyTextBtn-${index}`);
        button?.addEventListener('click', () => {
            navigator.clipboard.writeText(totalAnalysis.trim());
        });
    });
}


       

        function analyzeLine(line) {
            const words = line.split(' ');
            return words.map(analyzeWord).join('<span class="comma"> </span>');
        }

        function analyzeWord(word) {
            let result = '';
            for (let char of word) {
                if (['ا', 'ى','ء','ئ','ؤ','أ', 'إ', 'آ','ٱ' , 'ـٔ'].includes(char)) {
                    result += 'ألف ';
                } else if (char === 'ل') {
                    result += 'لام ';
                } else if (char === 'م') {
                    result += 'ميم ';
                } else if (char === 'ن') {
                    result += 'نون ';
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
        function logTextDetails(text) {
    console.log("Original Text:", text);
    console.log("Normalized (NFC):", text.normalize('NFC'));
    console.log("Code Points:", [...text].map(c => `${c}: ${c.codePointAt(0).toString(16)}`).join(', '));
}
       

        function countSpecificChars(text) { 
    // Normalize text to NFC for consistent encoding
    text = text.normalize('NFC');

    const counts = {
        alif: 0,
        lam: 0,
        meem: 0,
        noon: 0,
        total: 0
    };

     for (let i = 0; i < text.length; i++) {
        const char = text[i];

        // Debugging: Log characters for each iteration
        console.log(`Checking char at index ${i}: ${char} (code point: ${char.codePointAt(0).toString(16)})`);

        // Handle the specific sequence "ـَٔ"
        if (char === 'ـ' && text[i + 1] === 'ٔ' && text[i + 2] === 'َ') {
            console.log(`Found sequence "ـَٔ" at indices ${i}, ${i + 1}, ${i + 2}`);
            counts.alif++;
            counts.total++;
            i += 2; // Skip the next two characters in the sequence
        }
        // Handle the specific sequence "ـًٔ"
        if (char === 'ـ' && text[i + 1] === 'ٔ' && text[i + 2] === 'ً') {
            console.log(`Found sequence "ـَٔ" at indices ${i}, ${i + 1}, ${i + 2}`);
            counts.alif++;
            counts.total++;
            i += 2; // Skip the next two characters in the sequence
        }
        // Handle "ـٔ" separately
        else if (char === 'ـ' && text[i + 1] === 'ٔ') {
            console.log(`Found sequence "ـٔ" at indices ${i}, ${i + 1}`);
            counts.alif++;
            counts.total++;
            i++; // Skip the next character in the sequence
        }
        // Count other alif variants
        else if (['ا', 'ء', 'أ', 'إ', 'آ', 'ٱ' , ' َٔ' , 'ًٔ'].includes(char)) {
            counts.alif++;
            counts.total++;
        }
        // Count lam
        else if (char === 'ل') {
            counts.lam++;
            counts.total++;
        }
        // Count meem
        else if (char === 'م') {
            counts.meem++;
            counts.total++;
        }
        // Count noon
        else if (char === 'ن') {
            counts.noon++;
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
