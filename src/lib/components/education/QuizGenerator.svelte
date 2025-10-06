<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { StudentProfiles, CurrentAcademicData, QuizConfig } from "../../data/educationData.js";

  export let selectedStudent = "thambi";

  let student = {};
  let curriculum = {};
  let selectedSubject = "";
  let selectedChapter = "";
  let quizType = "mcq";
  let difficulty = "medium";
  let numQuestions = 5;
  let currentQuiz = null;
  let currentQuestionIndex = 0;
  let userAnswers = [];
  let quizResults = null;
  let isQuizActive = false;

  $: {
    student = StudentProfiles[selectedStudent] || StudentProfiles.thambi;
    curriculum = selectedStudent === "akka" ? CurrentAcademicData.class11 : CurrentAcademicData.class6;
    if (!selectedSubject && Object.keys(curriculum).length > 0) {
      selectedSubject = Object.keys(curriculum)[0];
    }
  }

  // Sample quiz questions database
  const QuizQuestions = {
    mathematics: {
      class6: {
        "Playing with Numbers": {
          easy: [
            {
              type: "mcq",
              question: "What is the smallest prime number?",
              questionTamil: "மிகச் சிறிய அபாஜ்ய எண் எது?",
              options: ["1", "2", "3", "4"],
              correct: 1,
              explanation: "2 is the smallest prime number because it has only two factors: 1 and 2.",
            },
            {
              type: "mcq",
              question: "Which number is divisible by 3?",
              questionTamil: "3 ஆல் வகுக்கப்படும் எண் எது?",
              options: ["13", "14", "15", "16"],
              correct: 2,
              explanation: "15 is divisible by 3 because 1+5=6, and 6 is divisible by 3.",
            },
          ],
          medium: [
            {
              type: "mcq",
              question: "What is the LCM of 12 and 18?",
              questionTamil: "12 மற்றும் 18 இன் மீச்சிறு பொது மடங்கு என்ன?",
              options: ["36", "54", "72", "108"],
              correct: 0,
              explanation: "LCM of 12 and 18 is 36. Prime factorization: 12=2²×3, 18=2×3². LCM=2²×3²=36",
            },
          ],
        },
      },
      class11: {
        Sets: {
          medium: [
            {
              type: "mcq",
              question: "If A = {1, 2, 3} and B = {2, 3, 4}, what is A ∩ B?",
              questionTamil: "A = {1, 2, 3} மற்றும் B = {2, 3, 4} எனில், A ∩ B என்ன?",
              options: ["{1}", "{2, 3}", "{1, 2, 3, 4}", "{4}"],
              correct: 1,
              explanation: "Intersection contains common elements: {2, 3}",
            },
          ],
          hard: [
            {
              type: "reasoning",
              question: "Prove that for any two sets A and B, (A ∪ B)' = A' ∩ B'",
              questionTamil: "ஏதேனும் இரண்டு கணங்கள் A மற்றும் B க்கு, (A ∪ B)' = A' ∩ B' என நிருபிக்கவும்",
              answer: "This is De Morgan's Law. Use element-wise proof.",
              explanation: "De Morgan's Law states that the complement of union equals intersection of complements.",
            },
          ],
        },
      },
    },
    science: {
      class6: {
        "Living Organisms": {
          easy: [
            {
              type: "mcq",
              question: "Which of these is a living thing?",
              questionTamil: "இவற்றில் எது உயிருள்ளது?",
              options: ["Rock", "Tree", "Car", "Book"],
              correct: 1,
              explanation: "Trees are living organisms as they grow, reproduce, and respond to environment.",
            },
          ],
        },
      },
    },
    physics: {
      class11: {
        "Laws of Motion": {
          hard: [
            {
              type: "mcq",
              question: "A force of 10N acts on a 2kg mass. What is the acceleration?",
              questionTamil: "2 கிலோ வஸ்துவின் மீது 10N விசை செயல்படுகிறது. முடுக்கம் என்ன?",
              options: ["5 m/s²", "10 m/s²", "20 m/s²", "2 m/s²"],
              correct: 0,
              explanation: "Using Newton's second law: F = ma, so a = F/m = 10/2 = 5 m/s²",
            },
          ],
        },
      },
    },
  };

  function getAvailableSubjects() {
    return Object.entries(curriculum).map(([key, subject]) => ({
      key,
      name: subject.name,
      tamil: subject.tamil,
    }));
  }

  function getAvailableChapters() {
    if (!selectedSubject || !curriculum[selectedSubject]) return [];
    return curriculum[selectedSubject].chapters.filter((ch) => ch.status === "completed" || ch.status === "in-progress");
  }

  function generateQuiz() {
    if (!selectedSubject || !selectedChapter) return;

    const subjectKey = selectedSubject.toLowerCase().replace(/\s+/g, "");
    const gradeKey = selectedStudent === "akka" ? "class11" : "class6";
    const chapter = getAvailableChapters().find((ch) => ch.title === selectedChapter);

    if (!chapter) return;

    // Get questions from database or generate sample questions
    let questions = [];
    const questionDb = QuizQuestions[subjectKey]?.[gradeKey]?.[chapter.title]?.[difficulty];

    if (questionDb && questionDb.length > 0) {
      questions = questionDb.slice(0, numQuestions);
    } else {
      // Generate sample questions if none found
      questions = generateSampleQuestions();
    }

    currentQuiz = {
      subject: curriculum[selectedSubject].name,
      chapter: chapter.title,
      type: quizType,
      difficulty,
      questions,
      startTime: new Date(),
    };

    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    isQuizActive = true;
    quizResults = null;
  }

  function generateSampleQuestions() {
    const sampleQuestions = [];
    const chapter = getAvailableChapters().find((ch) => ch.title === selectedChapter);

    for (let i = 0; i < numQuestions; i++) {
      if (quizType === "mcq") {
        sampleQuestions.push({
          type: "mcq",
          question: `Sample question ${i + 1} about ${chapter.title}`,
          questionTamil: `${chapter.tamil || chapter.title} பற்றிய மாதிரி கேள்வி ${i + 1}`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correct: Math.floor(Math.random() * 4),
          explanation: "This is a sample explanation for the question.",
        });
      } else if (quizType === "fill") {
        sampleQuestions.push({
          type: "fill",
          question: `Fill in the blank: ${chapter.title} is important because ______.`,
          questionTamil: `இடத்தை நிரப்புங்கள்: ${chapter.tamil || chapter.title} முக்கியம் ஏனென்றால் ______.`,
          answer: "it forms the foundation",
          explanation: "Sample explanation for fill in the blank.",
        });
      }
    }

    return sampleQuestions;
  }

  function submitAnswer(answer) {
    userAnswers[currentQuestionIndex] = answer;
    userAnswers = [...userAnswers]; // Trigger reactivity
  }

  function nextQuestion() {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      currentQuestionIndex++;
    }
  }

  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
    }
  }

  function finishQuiz() {
    const endTime = new Date();
    const timeTaken = Math.round((endTime - currentQuiz.startTime) / 1000 / 60); // minutes

    let score = 0;
    const results = currentQuiz.questions.map((question, index) => {
      const userAnswer = userAnswers[index];
      let isCorrect = false;

      if (question.type === "mcq") {
        isCorrect = userAnswer === question.correct;
      } else if (question.type === "fill") {
        isCorrect = userAnswer && userAnswer.toLowerCase().includes(question.answer.toLowerCase());
      }

      if (isCorrect) score++;

      return {
        question,
        userAnswer,
        isCorrect,
        correctAnswer: question.correct !== undefined ? question.options[question.correct] : question.answer,
      };
    });

    quizResults = {
      score,
      totalQuestions: currentQuiz.questions.length,
      percentage: Math.round((score / currentQuiz.questions.length) * 100),
      timeTaken,
      results,
      subject: currentQuiz.subject,
      chapter: currentQuiz.chapter,
      difficulty: currentQuiz.difficulty,
      completedAt: endTime,
    };

    isQuizActive = false;
  }

  function restartQuiz() {
    currentQuiz = null;
    currentQuestionIndex = 0;
    userAnswers = [];
    quizResults = null;
    isQuizActive = false;
  }

  function getScoreColor(percentage) {
    if (percentage >= 80) return "green";
    if (percentage >= 60) return "blue";
    if (percentage >= 40) return "yellow";
    return "red";
  }

  $: scoreColor = quizResults ? getScoreColor(quizResults.percentage) : "gray";

  onMount(() => {
    // Any initialization logic
  });
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="bg-white rounded-xl shadow-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Auto Quiz Generator</h1>
        <p class="text-lg text-gray-600">தானியங்கி வினாவிடை</p>
        <p class="text-sm text-gray-500">{student.name} ({student.tamil}) • {student.grade}</p>
      </div>

      <!-- Quiz Stats -->
      <div class="grid grid-cols-2 gap-4 text-center">
        <div class="bg-purple-50 p-3 rounded-lg">
          <Icon icon="heroicons:puzzle-piece" class="w-6 h-6 mx-auto mb-1 text-purple-600" />
          <p class="text-lg font-bold text-purple-800">12</p>
          <p class="text-xs text-purple-600">Quizzes Taken</p>
        </div>
        <div class="bg-green-50 p-3 rounded-lg">
          <Icon icon="heroicons:trophy" class="w-6 h-6 mx-auto mb-1 text-green-600" />
          <p class="text-lg font-bold text-green-800">78%</p>
          <p class="text-xs text-green-600">Average Score</p>
        </div>
      </div>
    </div>
  </div>

  {#if !isQuizActive && !quizResults}
    <!-- Quiz Setup -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <Icon icon="heroicons:cog-6-tooth" class="w-6 h-6 mr-2 text-blue-600" />
        Create New Quiz
        <span class="ml-2 text-sm text-gray-500">புதிய வினாவிடை உருவாக்கவும்</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Subject Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Subject • பாடம் </label>
          <select bind:value={selectedSubject} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Select Subject</option>
            {#each getAvailableSubjects() as subject}
              <option value={subject.key}>{subject.name} • {subject.tamil}</option>
            {/each}
          </select>
        </div>

        <!-- Chapter Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Chapter • அத்தியாயம் </label>
          <select bind:value={selectedChapter} disabled={!selectedSubject} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100">
            <option value="">Select Chapter</option>
            {#each getAvailableChapters() as chapter}
              <option value={chapter.title}>{chapter.title}</option>
            {/each}
          </select>
        </div>

        <!-- Quiz Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Question Type • கேள்வி வகை </label>
          <select bind:value={quizType} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            {#each QuizConfig.questionTypes as type}
              <option value={type.id}>{type.name} • {type.tamil}</option>
            {/each}
          </select>
        </div>

        <!-- Difficulty -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Difficulty • சிரமம் </label>
          <select bind:value={difficulty} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            {#each QuizConfig.difficultyLevels as level}
              <option value={level.id}>{level.name} • {level.tamil}</option>
            {/each}
          </select>
        </div>

        <!-- Number of Questions -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Number of Questions • கேள்விகளின் எண்ணிக்கை </label>
          <select bind:value={numQuestions} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value={5}>5 Questions</option>
            <option value={10}>10 Questions</option>
            <option value={15}>15 Questions</option>
            <option value={20}>20 Questions</option>
          </select>
        </div>

        <!-- Generate Button -->
        <div class="flex items-end">
          <button on:click={generateQuiz} disabled={!selectedSubject || !selectedChapter} class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
            <Icon icon="heroicons:sparkles" class="w-5 h-5" />
            <span>Generate Quiz</span>
          </button>
        </div>
      </div>

      <!-- Quick Practice Suggestions -->
      <div class="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
        <h3 class="font-medium text-gray-900 mb-2 flex items-center">
          <Icon icon="heroicons:lightbulb" class="w-5 h-5 mr-2 text-yellow-500" />
          Quick Practice Suggestions
          <span class="ml-2 text-sm text-gray-500">பயிற்சி பரிந்துரைகள்</span>
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#if selectedStudent === "akka"}
            <button
              on:click={() => {
                selectedSubject = "physics";
                selectedChapter = "Laws of Motion";
                difficulty = "hard";
                generateQuiz();
              }}
              class="p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-left"
            >
              <h4 class="font-medium text-blue-900">JEE Physics Practice</h4>
              <p class="text-sm text-blue-700">Laws of Motion - Hard Level</p>
            </button>
            <button
              on:click={() => {
                selectedSubject = "mathematics";
                selectedChapter = "Sets";
                difficulty = "medium";
                generateQuiz();
              }}
              class="p-3 bg-white border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-left"
            >
              <h4 class="font-medium text-purple-900">Math Fundamentals</h4>
              <p class="text-sm text-purple-700">Sets and Relations - Medium</p>
            </button>
          {:else}
            <button
              on:click={() => {
                selectedSubject = "mathematics";
                selectedChapter = "Playing with Numbers";
                difficulty = "easy";
                generateQuiz();
              }}
              class="p-3 bg-white border border-green-200 rounded-lg hover:bg-green-50 transition-colors text-left"
            >
              <h4 class="font-medium text-green-900">Math Practice</h4>
              <p class="text-sm text-green-700">Playing with Numbers - Easy</p>
            </button>
            <button
              on:click={() => {
                selectedSubject = "science";
                selectedChapter = "Living Organisms";
                difficulty = "easy";
                generateQuiz();
              }}
              class="p-3 bg-white border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors text-left"
            >
              <h4 class="font-medium text-orange-900">Science Explorer</h4>
              <p class="text-sm text-orange-700">Living Organisms - Easy</p>
            </button>
          {/if}
        </div>
      </div>
    </div>
  {:else if isQuizActive && currentQuiz}
    <!-- Active Quiz -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <!-- Quiz Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl font-bold text-gray-900">{currentQuiz.subject} Quiz</h2>
          <p class="text-sm text-gray-600">{currentQuiz.chapter} • {currentQuiz.difficulty} level</p>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</p>
          <div class="w-32 bg-gray-200 rounded-full h-2 mt-1">
            <div class="bg-blue-500 h-2 rounded-full transition-all" style="width: {((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%"></div>
          </div>
        </div>
      </div>

      <!-- Current Question -->
      {#if currentQuiz.questions[currentQuestionIndex]}
        {@const question = currentQuiz.questions[currentQuestionIndex]}
        <div class="space-y-6">
          <!-- Question Text -->
          <div class="p-6 bg-gray-50 rounded-lg">
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              {question.question}
            </h3>
            {#if question.questionTamil}
              <p class="text-gray-600">{question.questionTamil}</p>
            {/if}
          </div>

          <!-- Answer Options -->
          {#if question.type === "mcq"}
            <div class="space-y-3">
              {#each question.options as option, index}
                <button on:click={() => submitAnswer(index)} class="w-full p-4 text-left border-2 rounded-lg transition-all {userAnswers[currentQuestionIndex] === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}">
                  <span class="font-medium text-gray-900">
                    {String.fromCharCode(65 + index)}. {option}
                  </span>
                </button>
              {/each}
            </div>
          {:else if question.type === "fill"}
            <div>
              <textarea placeholder="Type your answer here..." rows="3" value={userAnswers[currentQuestionIndex] || ""} on:input={(e) => submitAnswer(e.target.value)} class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
          {/if}

          <!-- Navigation Buttons -->
          <div class="flex justify-between items-center pt-6 border-t">
            <button on:click={previousQuestion} disabled={currentQuestionIndex === 0} class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2">
              <Icon icon="heroicons:chevron-left" class="w-4 h-4" />
              <span>Previous</span>
            </button>

            {#if currentQuestionIndex === currentQuiz.questions.length - 1}
              <button on:click={finishQuiz} class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
                <Icon icon="heroicons:check-circle" class="w-4 h-4" />
                <span>Finish Quiz</span>
              </button>
            {:else}
              <button on:click={nextQuestion} class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
                <span>Next</span>
                <Icon icon="heroicons:chevron-right" class="w-4 h-4" />
              </button>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  {:else if quizResults}
    <!-- Quiz Results -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
        <p class="text-lg text-gray-600">வினாவிடை முடிந்தது!</p>
      </div>

      <!-- Score Display -->
      <div class="bg-gradient-to-r from-{scoreColor}-50 to-{scoreColor}-100 p-6 rounded-lg mb-6">
        <div class="text-center">
          <div class="relative w-24 h-24 mx-auto mb-4">
            <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" stroke-width="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="{quizResults.percentage}, 100" stroke-linecap="round" class="text-{scoreColor}-500" />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-2xl font-bold text-{scoreColor}-800">{quizResults.percentage}%</span>
            </div>
          </div>

          <p class="text-xl font-bold text-{scoreColor}-800 mb-2">
            {quizResults.score} out of {quizResults.totalQuestions} correct
          </p>
          <p class="text-{scoreColor}-700">
            Completed in {quizResults.timeTaken} minutes
          </p>
        </div>
      </div>

      <!-- Quiz Details -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-blue-50 p-4 rounded-lg text-center">
          <Icon icon="heroicons:book-open" class="w-6 h-6 mx-auto mb-2 text-blue-600" />
          <p class="font-medium text-blue-900">{quizResults.subject}</p>
          <p class="text-sm text-blue-700">{quizResults.chapter}</p>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg text-center">
          <Icon icon="heroicons:cog-6-tooth" class="w-6 h-6 mx-auto mb-2 text-purple-600" />
          <p class="font-medium text-purple-900">Difficulty</p>
          <p class="text-sm text-purple-700 capitalize">{quizResults.difficulty}</p>
        </div>
        <div class="bg-green-50 p-4 rounded-lg text-center">
          <Icon icon="heroicons:clock" class="w-6 h-6 mx-auto mb-2 text-green-600" />
          <p class="font-medium text-green-900">Time Taken</p>
          <p class="text-sm text-green-700">{quizResults.timeTaken} minutes</p>
        </div>
      </div>

      <!-- Question Review -->
      <div class="space-y-4 mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Question Review</h3>
        {#each quizResults.results as result, index}
          <div class="border border-gray-200 rounded-lg p-4 {result.isCorrect ? 'bg-green-50' : 'bg-red-50'}">
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-medium text-gray-900">Question {index + 1}</h4>
              <Icon icon={result.isCorrect ? "heroicons:check-circle" : "heroicons:x-circle"} class="w-5 h-5 {result.isCorrect ? 'text-green-600' : 'text-red-600'}" />
            </div>
            <p class="text-sm text-gray-700 mb-2">{result.question.question}</p>
            <div class="text-sm">
              <p class="text-gray-600">
                Your answer:
                <span class="{result.isCorrect ? 'text-green-600' : 'text-red-600'} font-medium">
                  {result.question.type === "mcq" ? result.question.options[result.userAnswer] || "Not answered" : result.userAnswer || "Not answered"}
                </span>
              </p>
              {#if !result.isCorrect}
                <p class="text-gray-600">
                  Correct answer:
                  <span class="text-green-600 font-medium">{result.correctAnswer}</span>
                </p>
              {/if}
              {#if result.question.explanation}
                <p class="text-gray-500 mt-1 italic">{result.question.explanation}</p>
              {/if}
            </div>
          </div>
        {/each}
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-4 justify-center">
        <button on:click={restartQuiz} class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
          <Icon icon="heroicons:arrow-path" class="w-4 h-4" />
          <span>Take Another Quiz</span>
        </button>
        <button class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
          <Icon icon="heroicons:share" class="w-4 h-4" />
          <span>Share Results</span>
        </button>
      </div>
    </div>
  {/if}
</div>
