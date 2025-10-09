async function generateMusic(prompt, options = {}) {
  const {
    model = "small",
    duration = 10
  } = options;
  try {
    console.log(`Generating music locally: "${prompt}" (${duration}s, ${model} model)`);
    const response = await fetch("http://localhost:3003/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,
        duration: Math.min(duration, 30),
        // Local limit
        model
      })
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Local MusicGen API error: ${response.status} - ${errorText}`);
    }
    const audioBlob = await response.blob();
    const audioBuffer = await decodeAudioBlob(audioBlob);
    console.log("Music generated successfully!");
    return audioBuffer;
  } catch (error) {
    console.error("Local MusicGen error:", error);
    console.log("Falling back to Hugging Face API...");
    return generateMusicHuggingFace(prompt, options);
  }
}
async function generateMusicHuggingFace(prompt, options = {}) {
  const {
    model = "small",
    duration = 10
  } = options;
  const huggingFaceToken = "your_huggingface_token_here";
  try {
    const modelName = model === "small" ? "facebook/musicgen-small" : model === "medium" ? "facebook/musicgen-medium" : "facebook/musicgen-large";
    const response = await fetch(`https://api-inference.huggingface.co/models/${modelName}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${huggingFaceToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          duration: Math.min(duration, 30)
          // Hugging Face limit
        }
      })
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`MusicGen API error: ${response.status} - ${error}`);
    }
    const audioBlob = await response.blob();
    const audioBuffer = await decodeAudioBlob(audioBlob);
    return audioBuffer;
  } catch (error) {
    console.error("MusicGen generation failed:", error);
    throw error;
  }
}
async function decodeAudioBlob(blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
}
function buildMusicPrompt(basePrompt, style, mood) {
  let enhancedPrompt = basePrompt;
  if (style) {
    enhancedPrompt += `, ${style} style`;
  }
  if (mood) {
    enhancedPrompt += `, ${mood} mood`;
  }
  enhancedPrompt += ", high quality, professional production";
  return enhancedPrompt;
}
export {
  buildMusicPrompt,
  generateMusic
};
