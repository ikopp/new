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

        const arabic = 'رهطقسعحملأ';
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

        setInterval(draw, 30);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        


        // furquan el hoda content javasript
        const highlightChars = {
            'ا': '8', 'أ': '8', 'إ': '8', 'ئ': '8','ؤ': '8', 'ء': '8', 'ى': '8', 'آ': '8',
            'ل': '8',
            'م': '10',
            'ح': '4',
            'ع': '1',
            'س': '4',
            'ق': '1',
            'ط': '4',
            'ه': '1',
            'ر': '4'
        };
        const highlightChars1 = ['ا', 'أ', 'إ', 'ئ','ؤ', 'ء', 'ى', 'آ', 'ل', 'م', 'ح', 'ع', 'س', 'ق', 'ط', 'ه', 'ر'];

        // furquan el hoda content javasript
        const highlightCharss = {
            'ا': '1', 'أ': '1', 'إ': '1', 'ئ': '1','ؤ': '1', 'ء': '1', 'ى': '1', 'آ': '1',
            'ل': '1',
            'م': '1',
            'ح': '1',
            'ع': '1',
            'س': '1',
            'ق': '1',
            'ط': '1',
            'ه': '1',
            'ر': '1'
        };
        const highlightCharss1 = ['ا', 'أ', 'إ', 'ئ','ؤ', 'ء', 'ى', 'آ', 'ل', 'م', 'ح', 'ع', 'س', 'ق', 'ط', 'ه', 'ر'];


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
                if (char in highlightCharss) {
                    const number = highlightCharss[char];
                    const numberClass = parseInt(number) > 9 ? 'number large-number' : 'number';
                    return `<span class="highlight">${char}<span class="${numberClass}">${number}</span></span>`;
                }
                return char;
            }).join('');
        }

        // script placeholder
        
        const runInput = document.querySelector('#inputText');
        const line = '   أدخل النص القرآني هنا ......';
        const speed = 100;
        let i = 0;
        let done;

        function run_line() {
            if (i++ < line.length) {
                runInput.value = line.substring(0, i);
            } else {
                runInput.value = " ";
                i = 0;
            }
            done = setTimeout(run_line, speed);
        }
        run_line();

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
        function highlightText1d(text) {
            return text.split('').map(char => 
                highlightChars1.includes(char) ? `<span class="highlight">${char}</span>` : char
            ).join('');
        }

        let strippedTextd = ''; // Declare strippedText globally

        function analyzeText() {
            const inputText = document.getElementById('inputText').value;
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = `<p dir="rtl"><span style="color:#ff0099"><span style="font-size:22px"><span style="background-color:#000000">&nbsp;ألم حم-عسق طس ألم طسم طسم حم ألر ألر حم طه ألر ألم ألم حم ألر&nbsp;</span></span></span></p>`;



            const lines = inputText.split('\n');
            let totalAnalysis = '';
            let totalAnalysisd = '';
            
            lines.forEach((line, index) => {
                if (line.trim() !== '') {
                    outputDiv.innerHTML += `<div class="input-line">القرآن: ${highlightText1d(line)}</div>`;
                    outputDiv.innerHTML += `<div class="input-line">القرآن: ${highlightTextd(line)}</div>`;
                    const lineAnalysisd = analyzeLined(line);
                    outputDiv.innerHTML += `<div class="output-line">فرقان: ${lineAnalysisd}</div>`;
                    totalAnalysisd += lineAnalysisd + ' ';
                    const buttonIdd = `copyTextBtnd-${index}`;
                    outputDiv.innerHTML += `<button class="btn copy-btn" id="${buttonIdd}">نسخ</button></div>`;
                    // Attach event listener to the button
        setTimeout(() => {
            const copyButtond = document.getElementById(buttonIdd);
            copyButtond.addEventListener('click', () => {
			// Strip HTML tags from totalAnalysisd
            strippedTextd = totalAnalysisd.replace(/<[^>]*>/g, '').trim();
navigator.clipboard.writeText(strippedTextd)
                    .catch(err => alert("Failed to copy text: " + err));
            });
        }, 0);
                    outputDiv.innerHTML += `<div class="input-line">القرآن: ${highlightText1(line)}</div>`;
                    outputDiv.innerHTML += `<div class="input-line">القرآن: ${highlightText(line)}</div>`;
                    const lineAnalysis = analyzeLine(line);
                    outputDiv.innerHTML += `<div class="output-line">فرقان: ${lineAnalysis}</div>`;
                    totalAnalysis += lineAnalysis + ' ';
                    const buttonId = `copyTextBtn-${index}`;
                    outputDiv.innerHTML += `<button class="btn copy-btn" id="${buttonId}">نسخ</button></div>`;
                    // Attach event listener to the button
        setTimeout(() => {
            const copyButton = document.getElementById(buttonId);
            copyButton.addEventListener('click', () => {
			// Strip HTML tags from totalAnalysis
const strippedText = totalAnalysis.replace(/<[^>]*>/g, '').trim();
navigator.clipboard.writeText(strippedText)
                    .catch(err => alert("Failed to copy text: " + err));
            });
        }, 0);
                }
            });
            // Update strippedText globally after processing all lines
    strippedText = totalAnalysisd.replace(/<[^>]*>/g, '').trim();

            const wordCount = countWords(inputText);
            const allCharCount = countAllChars(inputText);
            const specificCharCounts = countSpecificChars(inputText);

   
        outputDiv.innerHTML += `<div class="counters">
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
                <th id="tasnimsaid">${wordCount}</th>
                <th>عدد الكلمات</th>
            </tr>
            <tr>
                <th id="tasnimsaid1">${allCharCount}</th>
                <th>عدد جميع الحروف</th>
            </tr>
            <tr>
                <th id="tasnimsaid2">${specificCharCounts.total}</th>
                <th>عدد الحروف (أ، ل، م، ح، ع، س، ق، ط، ه، ر)</th>
            </tr>
            <tr>
                <th id="tasnimsaid3">${specificCharCounts.alif}</th>
                <th>عدد حرف (أ)</th>
            </tr>
            <tr>
                <th id="tasnimsaid4">${specificCharCounts.lam}</th>
                <th>عدد حرف (ل)</th>
            </tr>
            <tr>
                <th id="tasnimsaid5">${specificCharCounts.meem}</th>
                <th>عدد حرف (م)</th>
            </tr>
             <tr>
   
    <tr>
    <th>${specificCharCounts.hhae}</th>
    <th>عدد حرف (ح)</th>
   </tr>
    <tr>
    <th>${specificCharCounts.ine}</th>
    <th>عدد حرف (ع)</th>
   </tr>
    <tr>
    <th>${specificCharCounts.sine}</th>
    <th>عدد حرف (س)</th>
   </tr>
    <tr>
    <th>${specificCharCounts.paf}</th>
    <th>عدد حرف (ق)</th>
   </tr>
    <tr>
    <th>${specificCharCounts.ttae}</th>
    <th>عدد حرف (ط)</th>
   </tr>
    <tr>
    <th>${specificCharCounts.hae}</th>
    <th>عدد حرف (ه)</th>
   </tr>
            <tr>
                <th id="tasnimsaid6">${specificCharCounts.raa}</th>
                <th>عدد حرف (ر)</th>
            </tr>
        </tbody>
    </table>

            </div>`;
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
                } else if (char === 'ح') {
                    result += 'حاء ';
                }else if (char === 'ع') {
                    result += 'عين ';
                }else if (char === 'س') {
                    result += 'سين ';
                }else if (char === 'ق') {
                    result += 'قاف ';
                }else if (char === 'ط') {
                    result += 'طاء ';
                }else if (char === 'ه') {
                    result += 'هاء ';
                }else if (char === 'ر') {
                    result += 'راء ';
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
                    result += 'ألف ألف ألف ألف ألف ألف ألف ألف  ';
                } else if (char === 'ل') {
                    result += 'لام لام لام لام لام لام لام لام ';
                } else if (char === 'م') {
                    result += 'ميم ميم ميم ميم ميم ميم ميم ميم ميم ميم ';
                } else if (char === 'ح') {
                    result += 'حاء حاء حاء حاء ';
                }else if (char === 'ع') {
                    result += 'عين ';
                }else if (char === 'س') {
                    result += 'سين سين سين سين ';
                }else if (char === 'ق') {
                    result += 'قاف ';
                }else if (char === 'ط') {
                    result += ' طاء طاء طاء طاء ';
                }else if (char === 'ه') {
                    result += 'هاء ';
                }else if (char === 'ر') {
                    result += 'راء راء راء راء ';
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
                hhae: 0,
                ine: 0,
                sine: 0,
                paf: 0,
                ttae: 0,
                hae: 0,
                raa: 0,
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
                } else if (char === 'ح') {
                    counts.hhae++;
                    counts.total++;
                }else if (char === 'ع') {
                    counts.ine++;
                    counts.total++;
                }else if (char === 'س') {
                    counts.sine++;
                    counts.total++;
                }else if (char === 'ق') {
                    counts.paf++;
                    counts.total++;
                }else if (char === 'ط') {
                    counts.ttae++;
                    counts.total++;
                }else if (char === 'ه') {
                    counts.hae++;
                    counts.total++;
                }else if (char === 'ر') {
                    counts.raa++;
                    counts.total++;
                }
            }

            return counts;
        }
                async function generateAudio(library) {

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