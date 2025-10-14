<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { VoiceController } from '$lib/voice/voiceController';

  // Create voice controller instance only on client side
  let voiceController: VoiceController | null = null;

  export let isActive = false;
  export let formFields: FormField[] = [];
  export let currentFieldIndex = 0;

  export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'number' | 'date' | 'boolean';
    required?: boolean;
    options?: string[];
    placeholder?: string;
    value?: any;
  }

  const dispatch = createEventDispatcher<{
    fieldComplete: { field: FormField; value: any };
    formComplete: { data: Record<string, any> };
    voiceCommand: { command: string; transcript: string };
  }>();

  let formData: Record<string, any> = {};
  let isListeningForField = false;
  let currentField: FormField | null = null;

  onMount(() => {
    // Initialize voice controller on client side
    voiceController = new VoiceController();
  });

  $: if (isActive && formFields.length > 0) {
    startFormFilling();
  }

  function startFormFilling() {
    currentFieldIndex = 0;
    formData = {};
    speakNextField();
  }

  function speakNextField() {
    if (currentFieldIndex < formFields.length) {
      currentField = formFields[currentFieldIndex];
      const field = currentField;

      let prompt = `Please provide ${field.label}`;
      if (field.placeholder) {
        prompt += `. For example: ${field.placeholder}`;
      }
      if (field.type === 'select' && field.options) {
        prompt += `. Options are: ${field.options.join(', ')}`;
      }

      voiceController.speak(prompt);
      isListeningForField = true;
    } else {
      // Form complete
      completeForm();
    }
  }

  function completeForm() {
    voiceController.speak('Form completed successfully!');
    dispatch('formComplete', { data: formData });
    isActive = false;
    isListeningForField = false;
  }

  function processVoiceInput(transcript: string) {
    if (!isListeningForField || !currentField) return;

    const field = currentField;
    let value: any = transcript;

    // Process based on field type
    switch (field.type) {
      case 'boolean':
        value = isAffirmative(transcript);
        break;
      case 'number':
        value = extractNumber(transcript);
        break;
      case 'date':
        value = extractDate(transcript);
        break;
      case 'select':
        value = matchOption(transcript, field.options || []);
        break;
      default:
        value = transcript;
    }

    if (value !== null) {
      formData[field.name] = value;
      dispatch('fieldComplete', { field, value });

      voiceController.speak(`Got it: ${value}. Moving to next field.`);
      currentFieldIndex++;
      setTimeout(() => speakNextField(), 1000);
    } else {
      voiceController.speak(`I didn't understand that. Please try again for ${field.label}.`);
    }
  }

  function isAffirmative(text: string): boolean {
    const affirmative = ['yes', 'yeah', 'yep', 'sure', 'correct', 'true', 'on', 'enable', 'ஆம்', 'சரி'];
    const negative = ['no', 'nope', 'nah', 'false', 'off', 'disable', 'இல்லை'];

    text = text.toLowerCase();
    if (affirmative.some(word => text.includes(word))) return true;
    if (negative.some(word => text.includes(word))) return false;
    return null;
  }

  function extractNumber(text: string): number | null {
    const numberMatch = text.match(/\d+/);
    return numberMatch ? parseInt(numberMatch[0]) : null;
  }

  function extractDate(text: string): string | null {
    // Simple date extraction - could be enhanced with better NLP
    const today = new Date();
    if (text.includes('today')) return today.toISOString().split('T')[0];
    if (text.includes('tomorrow')) {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    }

    // Try to parse natural language dates
    const dateMatch = text.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
    if (dateMatch) {
      return `${dateMatch[3]}-${dateMatch[2].padStart(2, '0')}-${dateMatch[1].padStart(2, '0')}`;
    }

    return null;
  }

  function matchOption(text: string, options: string[]): string | null {
    text = text.toLowerCase();
    for (const option of options) {
      if (text.includes(option.toLowerCase())) {
        return option;
      }
    }
    return null;
  }

  // Voice command processing
  function handleVoiceCommand(event: CustomEvent) {
    const { command, transcript } = event.detail;

    // Handle form-specific commands
    if (command === 'next') {
      if (currentField && formData[currentField.name] === undefined) {
        voiceController.speak('Please provide a value for the current field first.');
        return;
      }
      currentFieldIndex++;
      speakNextField();
    } else if (command === 'previous' || command === 'back') {
      if (currentFieldIndex > 0) {
        currentFieldIndex--;
        speakNextField();
      }
    } else if (command === 'repeat') {
      speakNextField();
    } else if (command === 'cancel') {
      voiceController.speak('Form cancelled.');
      isActive = false;
      isListeningForField = false;
    } else if (isListeningForField) {
      processVoiceInput(transcript);
    }

    dispatch('voiceCommand', { command, transcript });
  }

  // Public methods
  export function setFormFields(fields: FormField[]) {
    formFields = fields;
    if (isActive) {
      startFormFilling();
    }
  }

  export function startForm() {
    isActive = true;
    startFormFilling();
  }

  export function stopForm() {
    isActive = false;
    isListeningForField = false;
    voiceController.speak('Form filling stopped.');
  }

  export function getFormData(): Record<string, any> {
    return { ...formData };
  }
</script>

<!-- Voice Form Handler (Invisible Component) -->
<svelte:window on:voiceCommand={handleVoiceCommand} />

{#if isActive}
  <!-- Visual indicator for form filling -->
  <div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-primary text-primary-content px-4 py-2 rounded-full shadow-lg">
    <div class="flex items-center gap-2">
      <div class="w-2 h-2 bg-primary-content rounded-full animate-pulse"></div>
      <span class="text-sm font-medium">
        Voice Form: {currentField?.label || 'Loading...'}
        ({currentFieldIndex + 1}/{formFields.length})
      </span>
    </div>
  </div>
{/if}