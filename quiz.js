
        // Questions pool
        const questions = [
            {
                question: "What does HTML stand for?",
                options: [
                    "Hyper Text Markup Language",
                    "High Tech Modern Language",
                    "Hyperlinks and Text Markup Language",
                    "Home Tool Markup Language"
                ],
                answer: 0
            },
            {
                question: "What is the default value of a boolean variable in Java?",
                options: [
                    "true",
                    "false",
                    "null",
                    "0"
                ],
                answer: 1
            },
            {
                question: "Which operator is used to allocate memory in C?",
                options: [
                    "new",
                    "malloc",
                    "alloc",
                    "create"
                ],
                answer: 1
            },
            {
                question: "What does CSS stand for?",
                options: [
                    "Computer Style Sheets",
                    "Creative Style Sheets",
                    "Cascading Style Sheets",
                    "Colorful Style Sheets"
                ],
                answer: 2
            },
            {
                question: "Which of these is NOT a primitive data type in Java?",
                options: [
                    "int",
                    "boolean",
                    "String",
                    "char"
                ],
                answer: 2
            },
           
        ];

        // Select 10 random questions
        function getRandomQuestions() {
            const shuffled = [...questions].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, 10);
        }

        // Display questions
        function displayQuestions() {
            const questionsContainer = document.getElementById('questions-container');
            questionsContainer.innerHTML = '';
            
            quizQuestions.forEach((q, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'question';
                questionDiv.innerHTML = `
                    <h3>Question ${index + 1}: ${q.question}</h3>
                    <div class="options">
                        ${q.options.map((option, i) => `
                            <div class="option" data-question="${index}" data-option="${i}">
                                ${option}
                            </div>
                        `).join('')}
                    </div>
                `;
                questionsContainer.appendChild(questionDiv);
            });
        }

        // Initialize quiz
        let quizQuestions = [];
        let userAnswers = [];
        
        function initQuiz() {
            quizQuestions = getRandomQuestions();
            userAnswers = new Array(quizQuestions.length).fill(null);
            displayQuestions();
            
            document.querySelector('.quiz-section').style.display = 'block';
            document.querySelector('.result-section').style.display = 'none';
            
            // Add event listeners to options
            document.querySelectorAll('.option').forEach(option => {
                option.addEventListener('click', function() {
                    const questionIndex = parseInt(this.getAttribute('data-question'));
                    const optionIndex = parseInt(this.getAttribute('data-option'));
                    
                    // Remove selected class from all options in this question
                    document.querySelectorAll(`.option[data-question="${questionIndex}"]`).forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    
                    // Add selected class to clicked option
                    this.classList.add('selected');
                    
                    // Store user's answer
                    userAnswers[questionIndex] = optionIndex;
                });
            });
        }

        // Calculate score
        function calculateScore() {
            let score = 0;
            quizQuestions.forEach((q, index) => {
                if (userAnswers[index] === q.answer) {
                    score++;
                }
            });
            return score;
        }

        // Show results
        function showResults() {
            const score = calculateScore();
            const username = document.getElementById('username').value || 'User';
            
            document.getElementById('score-value').textContent = score;
            
            let feedback = '';
            if (score >= 8) {
                feedback = `<span class="best">Excellent work, ${username}! You're the best!</span>`;
            } else if (score >= 5) {
                feedback = `<span class="good">Good job, ${username}! Keep learning!</span>`;
            } else {
                feedback = `<span class="worst">You need more practice, ${username}. Don't give up!</span>`;
            }
            
            document.getElementById('feedback').innerHTML = feedback;
            
            document.querySelector('.quiz-section').style.display = 'none';
            document.querySelector('.result-section').style.display = 'block';
        }

        // Event listeners
        document.getElementById('submit-btn').addEventListener('click', showResults);
        document.getElementById('restart-btn').addEventListener('click', initQuiz);

        // Start the quiz
        initQuiz();
    