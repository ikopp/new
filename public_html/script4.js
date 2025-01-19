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

        const arabic = 'س ي ح ص م ل أ';
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
        const highlightCharsd = {
            'ا': '1', 'أ': '1', 'إ': '1', 'ئ': '1','ؤ': '1', 'ء': '1', 'ى': '1', 'آ': '1',
            'ل': '1',
            'م': '1',
            'ص': '1',
            'ح': '1',
            'ي': '1',
            'س': '1'
        };

        const highlightChars = {
            'ا': '2', 'أ': '2', 'إ': '2', 'ئ': '2','ؤ': '2', 'ء': '2', 'ى': '2', 'آ': '2',
            'ل': '2',
            'م': '3',
            'ص': '1',
            'ح': '1',
            'ي': '1',
            'س': '1'
        };
        const highlightChars1 = ['ا', 'أ', 'إ', 'ئ','ؤ', 'ء', 'ى', 'آ', 'ل', 'م', 'ص', 'ح', 'ي', 'س'];

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
        function highlightTextd(text) {
            return text.split('').map(char => {
                if (char in highlightCharsd) {
                    const number = highlightCharsd[char];
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
            this.value = '';
            
        });

        inputText.addEventListener('blur', function () {
            this.setAttribute('placeholder', customAttr);
        });

        //end script place holder
        
		// Declare global variables
		let strippedText = '';
		let totalAnalysis = '';
		let strippedTextd = '';
		let totalAnalysisd = '';
		
        // Optimized Analyze Text Function
function analyzeText() {
	strippedText = '';
	totalAnalysis = '';
	strippedTextd = '';
	totalAnalysisd = '';
    const inputText = document.getElementById('inputText').value.trim();
    const outputDiv = document.getElementById('output');
    let linesHtml = '';

    // Process text in batches
    const lines = inputText.split('\n');
    lines.forEach((line, index) => {
        if (line.trim() !== '') {
            const highlightedLine = highlightText1(line);
			const highlightedLine1 = highlightText(line);
            const analyzedLine = analyzeLine(line);
			const highlightedLined = highlightText1d(line);
			const highlightedLine1d = highlightTextd(line);
            const analyzedLined = analyzeLined(line);

            linesHtml += `
                <div class="input-line">القرآن: ${highlightedLined}</div>
				<div class="input-line">القرآن: ${highlightedLine1d}</div>
                <div class="output-line">فرقان: ${analyzedLined}</div>
                <button class="btn copy-btn" id="copyTextBtnd-${index}">نسخ</button>
            `;

            totalAnalysisd += analyzedLined + ' ';
			
			linesHtml += `
                <div class="input-line">القرآن: ${highlightedLine}</div>
				<div class="input-line">القرآن: ${highlightedLine1}</div>
                <div class="output-line">فرقان: ${analyzedLine}</div>
                <button class="btn copy-btn" id="copyTextBtn-${index}">نسخ</button>
            `;

            totalAnalysis += analyzedLine + ' ';
        }
    });
	strippedText = totalAnalysisd.replace(/<[^>]*>/g, '').trim();

    // Batch update the DOM
    outputDiv.innerHTML = `
        <p><span style="font-size:24px; background-color:#f1c40f; color:#2c3e50">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;ألمص حم يس ألم&nbsp; &nbsp; &nbsp;&nbsp;</span></p>
        ${linesHtml}
        <div class="counters">
            <table id="table-7">
        <thead>
            <tr>
                <th colspan="2">فرقان الهدى عروج فكري</th>
            </tr>
            <tr>
                <th colspan="2">إحصائيات النص القرآني كاملا</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th id="tasnimsaid">${countWords(inputText)}</th>
                <th>عدد الكلمات</th>
            </tr>
            <tr>
                <th id="tasnimsaid1">${countAllChars(inputText)}</th>
                <th>عدد جميع الحروف</th>
            </tr>
            <tr>
                <th id="tasnimsaid2">${countSpecificChars(inputText).total}</th>
                <th>عدد الحروف (أ، ل، م، ص، ح، ي، س)</th>
            </tr>
            <tr>
                <th id="tasnimsaid3">${countSpecificChars(inputText).alif}</th>
                <th>عدد حرف (أ)</th>
            </tr>
            <tr>
                <th id="tasnimsaid4">${countSpecificChars(inputText).lam}</th>
                <th>عدد حرف (ل)</th>
            </tr>
            <tr>
                <th id="tasnimsaid5">${countSpecificChars(inputText).meem}</th>
                <th>عدد حرف (م)</th>
            </tr>
            <tr>
                <th id="tasnimsaid6">${countSpecificChars(inputText).sad}</th>
                <th>عدد حرف (ص)</th>
            </tr>
                <tr>
        <th>${countSpecificChars(inputText).hhae}</th>
        <th>عدد حرف (ح)</th>
    </tr>
        <tr>
        <th>${countSpecificChars(inputText).yaa}</th>
        <th>عدد حرف (ي)</th>
    </tr>
        <tr>
        <th>${countSpecificChars(inputText).sine}</th>
        <th>عدد حرف (س)</th>
    </tr>
        </tbody>
    </table>
        </div>
    `;

    // Attach event listeners for copy buttons
    lines.forEach((_, index) => {
        const button = document.getElementById(`copyTextBtnd-${index}`);
        button?.addEventListener('click', () => {
            navigator.clipboard.writeText(totalAnalysisd.replace(/<[^>]*>/g, '').trim());
        });
    });
	// Attach event listeners for copy buttons
    lines.forEach((_, index) => {
        const button = document.getElementById(`copyTextBtn-${index}`);
        button?.addEventListener('click', () => {
            navigator.clipboard.writeText(totalAnalysis.replace(/<[^>]*>/g, '').trim());
        });
    });
}
// Optimize Highlight Text Function
function highlightText1(inputText) {
    const regex = /[ا|أ|إ|ئ|ؤ|ء|ى|آ|ل|م|ح|ص|س|ي]/g;
    return inputText.replace(regex, match => `<span class="highlight">${match}</span>`);
}
// Optimize Highlight Text Function
function highlightText1d(inputText) {
    const regex = /[ا|أ|إ|ئ|ؤ|ء|ى|آ|ل|م|ح|ص|س|ي]/g;
    return inputText.replace(regex, match => `<span class="highlight">${match}</span>`);
}
        
        function analyzeLined(line) {
            const words = line.split(' ');
            return words.map(analyzeWordd).join('<span class="comma"> </span>');
        }

        function analyzeWordd(word) {
            let result = '';
            for (let char of word) {
                if (['ا', 'أ','ئ', 'ى','ء','ؤ' , 'إ', 'آ'].includes(char)) {
                    result += 'ألف ';
                } else if (char === 'ل') {
                    result += 'لام ';
                } else if (char === 'م') {
                    result += 'ميم ';
                } else if (char === 'ص') {
                    result += 'صاد ';
                } else if (char === 'ح') {
                    result += 'حاء ';
                } else if (char === 'ي') {
                    result += 'ياء ';
                } else if (char === 'س') {
                    result += 'سين ';
                }
            }
            return result.trim();
        }

        function analyzeLine(line) {
            const words = line.split(' ');
            return words.map(analyzeWord).join('<span class="comma"> </span>');
        }

        function analyzeWord(word) {
            let result = '';
            for (let char of word) {
                if (['ا', 'أ','ئ', 'ى','ء','ؤ' , 'إ', 'آ'].includes(char)) {
                    result += 'ألف ألف ';
                } else if (char === 'ل') {
                    result += 'لام لام ';
                } else if (char === 'م') {
                    result += 'ميم ميم ميم ';
                } else if (char === 'ص') {
                    result += 'صاد ';
                } else if (char === 'ح') {
                    result += 'حاء ';
                } else if (char === 'ي') {
                    result += 'ياء ';
                } else if (char === 'س') {
                    result += 'سين ';
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
                sad: 0,
                hhae: 0,
                yaa: 0,
                sine: 0,
                total: 0
            };

            for (let char of text) {
                if (['ا', 'أ','ئ', 'ى','ء','ؤ' , 'إ', 'آ'].includes(char)) {
                    counts.alif++;
                    counts.total++;
                } else if (char === 'ل') {
                    counts.lam++;
                    counts.total++;
                } else if (char === 'م') {
                    counts.meem++;
                    counts.total++;
                } else if (char === 'ص') {
                    counts.sad++;
                    counts.total++;
                } else if (char === 'ح') {
                    counts.hhae++;
                    counts.total++;
                } else if (char === 'ي') {
                    counts.yaa++;
                    counts.total++;
                } else if (char === 'س') {
                    counts.sine++;
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