<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "@iconify/svelte";

  // Voice recognition variables
  let isListening = false;
  let transcript = "";
  let confidence = 0;
  let emotion = "😐";
  let currentLanguage = "ta-IN";
  let assistantName = "Shivo";
  let wakeWords = ["nanbaa", "நண்பா", "thozhi", "தோழி", "shivo", "சிவோ", "ஷக்தி", "shakthi", "bro", "ப்ரோ"];
  let recognition = null;
  let wakeWordTimeout = null;

  // Tamil voice commands
  const tamilCommands = {
    பட்டியல்: "list",
    சேர்: "add",
    நீக்கு: "delete",
    முடிந்தது: "complete",
    உதவி: "help",
    நிறுத்து: "stop",
    தொடங்கு: "start",
  };

  function extractAfterKeywords(command, keywords) {
    const lowerCommand = command.toLowerCase();
    for (let kw of keywords) {
      const index = lowerCommand.indexOf(kw.toLowerCase());
      if (index > -1) {
        return command.substring(index + kw.length).trim();
      }
    }
    return command.trim();
  }

  function startWakeWordDetection() {
    if (!recognition) {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = currentLanguage;
    }

    recognition.onstart = () => {
      isListening = true;
      console.log("Wake word detection started");
    };

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      if (result.isFinal) {
        const command = result[0].transcript.toLowerCase().trim();
        confidence = result[0].confidence;
        console.log("Heard:", command, "Confidence:", confidence);

        // Check for wake words
        const wakeWordDetected = wakeWords.some((word) => command.includes(word.toLowerCase()));

        if (wakeWordDetected) {
          console.log("Wake word detected! Starting voice recognition...");
          emotion = "😊";
          startVoiceRecognition();
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("Wake word detection error:", event.error);
      if (event.error === "not-allowed") {
        alert("Microphone permission denied. Please allow microphone access to use voice commands.");
      }
      setTimeout(() => startWakeWordDetection(), 2000);
    };

    recognition.onend = () => {
      isListening = false;
      console.log("Wake word detection ended");
      // Restart wake word detection after a short delay
      wakeWordTimeout = setTimeout(() => {
        startWakeWordDetection();
      }, 1000);
    };

    try {
      recognition.start();
    } catch (error) {
      console.error("Error starting wake word detection:", error);
    }
  }

  function startVoiceRecognition() {
    if (recognition) {
      recognition.stop();
    }

    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = currentLanguage;

    recognition.onstart = () => {
      isListening = true;
      console.log("Voice recognition started");
      emotion = "🎤";
    };

    recognition.onresult = (event) => {
      const result = event.results[0];
      transcript = result[0].transcript;
      confidence = result[0].confidence;
      console.log("Voice command:", transcript, "Confidence:", confidence);

      processTamilCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      emotion = "😞";
      setTimeout(() => startWakeWordDetection(), 1000);
    };

    recognition.onend = () => {
      isListening = false;
      console.log("Voice recognition ended");
      emotion = "😐";
      // Return to wake word detection
      setTimeout(() => startWakeWordDetection(), 1000);
    };

    try {
      recognition.start();
    } catch (error) {
      console.error("Error starting voice recognition:", error);
    }
  }

  function processTamilCommand(command) {
    const lowerCommand = command.toLowerCase();
    console.log("Processing command:", lowerCommand);

    // Simple response for now
    if (lowerCommand.includes("உதவி") || lowerCommand.includes("help")) {
      speakResponse("நான் உங்கள் உதவிக்கு இங்கே இருக்கிறேன். என்ன செய்ய வேண்டும்?");
    } else if (lowerCommand.includes("நிறுத்து") || lowerCommand.includes("stop")) {
      speakResponse("குரல் கட்டளைகளை நிறுத்துகிறேன்.");
      stopVoiceRecognition();
    } else {
      speakResponse("உங்கள் கட்டளையை புரிந்துகொண்டேன். அதை செயல்படுத்துகிறேன்.");
    }
  }

  function speakResponse(text) {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage;
      utterance.rate = 0.8;
      utterance.pitch = 1;

      speechSynthesis.speak(utterance);
    }
  }

  function stopVoiceRecognition() {
    if (recognition) {
      recognition.stop();
    }
    if (wakeWordTimeout) {
      clearTimeout(wakeWordTimeout);
    }
    isListening = false;
    emotion = "😐";
  }

  function toggleAssistant() {
    if (isListening) {
      stopVoiceRecognition();
    } else {
      startWakeWordDetection();
    }
  }

  onMount(() => {
    // Start wake word detection immediately
    startWakeWordDetection();
  });

  onDestroy(() => {
    stopVoiceRecognition();
  });
</script>

<!-- Floating Assistant Button -->
<div class="fixed bottom-6 right-6 z-50">
  <button class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl {isListening ? 'animate-pulse scale-110' : 'hover:scale-105'}" on:click={toggleAssistant} title="Voice Assistant - Say 'Shivo' or 'நண்பா' to activate">
    <div class="flex flex-col items-center">
      <Icon icon={isListening ? "heroicons:microphone" : "heroicons:sparkles"} class="w-6 h-6 text-white" />
      <span class="text-xs text-white mt-0.5">{emotion}</span>
    </div>
  </button>

  <!-- Status indicator -->
  {#if isListening}
    <div class="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
    <div class="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full"></div>
  {/if}
</div>

<style>
  .animate-ping {
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  @keyframes ping {
    75%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
</style>
