// Intent parser for Tamil-English voice commands
import type { VoiceIntent } from '../models'

export function parseIntent(text: string): VoiceIntent {
  const lowerText = text.toLowerCase().trim()

  // Todo creation patterns
  if (lowerText.match(/(add|சேர்க்க|பட்டியலில்).*?(to my list|பட்டியலில்)/) ||
      lowerText.match(/(remind me|நினைவூட்ட).*?(to buy|வாங்க)/) ||
      lowerText.match(/(need to|வேண்டும்).*?(buy|வாங்க)/)) {
    const title = extractTodoTitle(text)
    return {
      type: 'createTodo',
      title: title || 'New item',
      confidence: 0.8
    }
  }

  // Enhanced Reminder patterns with alert types
  if (lowerText.match(/(remind|நினைவூட்ட).*?(at|மணி|மணிக்கு)/) ||
      lowerText.match(/(reminder|நினைவூட்டல்).*?(for|க்கு)/) ||
      lowerText.match(/(set|அமை).*?(reminder|நினைவூட்டல்)/)) {
    const message = extractReminderMessage(text)
    const time = extractTime(text)
    const alertTypes = extractAlertTypes(text)
    return {
      type: 'setReminder',
      message: message || 'Reminder',
      time: time || '09:00',
      alertTypes: alertTypes.length > 0 ? alertTypes : ['sound'],
      confidence: 0.85
    }
  }

  // Specific alert type reminders
  if (lowerText.match(/(remind|நினைவூட்ட).*?(via|மூலம்).*?(sms|message|text|எஸ்எம்எஸ்|செய்தி)/) ||
      lowerText.match(/(send|அனுப்ப).*?(sms|எஸ்எம்எஸ்).*?(reminder|நினைவூட்டல்)/)) {
    const message = extractReminderMessage(text)
    return {
      type: 'setReminder',
      message: message || 'SMS Reminder',
      alertTypes: ['sms'],
      confidence: 0.9
    }
  }

  if (lowerText.match(/(remind|நினைவூட்ட).*?(via|மூலம்).*?(call|phone|தொலைபேசி|அழைப்பு)/) ||
      lowerText.match(/(call|அழை).*?(me|என்னை).*?(reminder|நினைவூட்டல்)/)) {
    const message = extractReminderMessage(text)
    return {
      type: 'setReminder',
      message: message || 'Phone Call Reminder',
      alertTypes: ['phoneCall'],
      confidence: 0.9
    }
  }

  if (lowerText.match(/(remind|நினைவூட்ட).*?(via|மூலம்).*?(email|mail|மின்னஞ்சல்)/) ||
      lowerText.match(/(send|அனுப்ப).*?(email|மின்னஞ்சல்).*?(reminder|நினைவூட்டல்)/)) {
    const message = extractReminderMessage(text)
    return {
      type: 'setReminder',
      message: message || 'Email Reminder',
      alertTypes: ['email'],
      confidence: 0.9
    }
  }

  if (lowerText.match(/(remind|நினைவூட்ட).*?(via|மூலம்).*?(windows|notification|desktop|விண்டோஸ்|அறிவிப்பு)/) ||
      lowerText.match(/(windows|விண்டோஸ்).*?(reminder|நினைவூட்டல்)/)) {
    const message = extractReminderMessage(text)
    return {
      type: 'setReminder',
      message: message || 'Windows Notification Reminder',
      alertTypes: ['windowsNotification'],
      confidence: 0.9
    }
  }

  if (lowerText.match(/(remind|நினைவூட்ட).*?(via|மூலம்).*?(phone message|text message|செய்தி)/) ||
      lowerText.match(/(send|அனுப்ப).*?(phone message|செய்தி).*?(reminder|நினைவூட்டல்)/)) {
    const message = extractReminderMessage(text)
    return {
      type: 'setReminder',
      message: message || 'Phone Message Reminder',
      alertTypes: ['phoneMessage'],
      confidence: 0.9
    }
  }

  // Multiple alert types
  if (lowerText.match(/(remind|நினைவூட்ட).*?(multiple|மூலம்|via|and|மற்றும்)/)) {
    const message = extractReminderMessage(text)
    const alertTypes = extractAlertTypes(text)
    return {
      type: 'setReminder',
      message: message || 'Multi-Alert Reminder',
      alertTypes: alertTypes.length > 0 ? alertTypes : ['sound', 'sms'],
      confidence: 0.8
    }
  }

  // Note patterns
  if (lowerText.match(/(note|குறிப்பு|பதிவு).*?(this|இதை)/) ||
      lowerText.match(/(remember|நினைவில்).*?(that|என்பதை)/)) {
    const content = extractNoteContent(text)
    return {
      type: 'createNote',
      content: content || text,
      confidence: 0.75
    }
  }

  // Event patterns
  if (lowerText.match(/(event|நிகழ்வு|விடுமுறை|leave).*?(on|அன்று)/) ||
      lowerText.match(/(school|பள்ளி).*?(leave|விடுமுறை)/)) {
    const title = extractEventTitle(text)
    const date = extractDate(text)
    return {
      type: 'setEventReminder',
      title: title || 'New event',
      date: date || new Date().toISOString().split('T')[0],
      confidence: 0.8
    }
  }

  // Recording patterns
  if (lowerText.match(/(start|தொடங்க).*?(recording|பதிவு)/) ||
      lowerText.match(/(record|பதிவு செய்)/)) {
    return {
      type: 'startRecording',
      confidence: 0.9
    }
  }

  if (lowerText.match(/(stop|நிறுத்த).*?(recording|பதிவு)/)) {
    return {
      type: 'stopRecording',
      confidence: 0.9
    }
  }

  return {
    type: 'unknown',
    confidence: 0.1
  }
}

// Helper functions to extract information from text
function extractTodoTitle(text: string): string | null {
  // Remove common prefixes and extract the main item
  const patterns = [
    /(?:add|சேர்க்க)\s+(.*?)(?:\s+to my list|பட்டியலில்|$)/i,
    /(?:remind me|நினைவூட்ட)\s+(?:to buy|வாங்க)\s+(.*?)$/i,
    /(?:need to|வேண்டும்)\s+(?:buy|வாங்க)\s+(.*?)$/i
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match && match[1]) {
      return match[1].trim()
    }
  }

  return text.replace(/^(add|சேர்க்க|remind|நினைவூட்ட)/i, '').trim()
}

function extractReminderMessage(text: string): string | null {
  const timeMatch = text.match(/(?:at|மணி|மணிக்கு)\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm|மணி)?)/i)
  if (timeMatch) {
    return text.replace(timeMatch[0], '').replace(/^(remind|நினைவூட்ட)/i, '').trim()
  }
  return text.replace(/^(remind|நினைவூட்ட)/i, '').trim()
}

function extractTime(text: string): string | null {
  const timePatterns = [
    /(\d{1,2})(?::(\d{2}))?\s*(am|pm|மணி)/i,
    /(\d{1,2})\s*o'clock/i,
    /(\d{1,2})\s*மணி/i
  ]

  for (const pattern of timePatterns) {
    const match = text.match(pattern)
    if (match) {
      let hour = parseInt(match[1])
      const minute = match[2] ? parseInt(match[2]) : 0
      const period = match[3]?.toLowerCase()

      if (period === 'pm' && hour !== 12) hour += 12
      if (period === 'am' && hour === 12) hour = 0

      return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
    }
  }

  return null
}

function extractNoteContent(text: string): string | null {
  const patterns = [
    /(?:note|குறிப்பு|பதிவு)\s+(?:this|இதை|that|என்பதை)[:\s]*(.*)$/i,
    /(?:remember|நினைவில்)\s+(?:that|என்பதை)[:\s]*(.*)$/i
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match && match[1]) {
      return match[1].trim()
    }
  }

  return text.replace(/^(note|குறிப்பு|பதிவு|remember|நினைவில்)/i, '').trim()
}

function extractEventTitle(text: string): string | null {
  const patterns = [
    /(?:event|நிகழ்வு)[:\s]*(.*?)(?:\s+on|அன்று|$)/i,
    /(?:school|பள்ளி)\s+(?:leave|விடுமுறை)[:\s]*(.*?)(?:\s+on|அன்று|$)/i
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match && match[1]) {
      return match[1].trim()
    }
  }

  return text.replace(/^(event|நிகழ்வு|school|பள்ளி)/i, '').trim()
}

function extractAlertTypes(text: string): string[] {
  const lowerText = text.toLowerCase()
  const alertTypes: string[] = []

  // Check for each alert type
  if (lowerText.includes('sms') || lowerText.includes('எஸ்எம்எஸ்') || lowerText.includes('message') || lowerText.includes('செய்தி') || lowerText.includes('text')) {
    alertTypes.push('sms')
  }

  if (lowerText.includes('call') || lowerText.includes('phone') || lowerText.includes('தொலைபேசி') || lowerText.includes('அழைப்பு') || lowerText.includes('phone call')) {
    alertTypes.push('phoneCall')
  }

  if (lowerText.includes('email') || lowerText.includes('mail') || lowerText.includes('மின்னஞ்சல்')) {
    alertTypes.push('email')
  }

  if (lowerText.includes('windows') || lowerText.includes('notification') || lowerText.includes('desktop') || lowerText.includes('விண்டோஸ்') || lowerText.includes('அறிவிப்பு')) {
    alertTypes.push('windowsNotification')
  }

  if (lowerText.includes('phone message') || lowerText.includes('text message')) {
    alertTypes.push('phoneMessage')
  }

  if (lowerText.includes('sound') || lowerText.includes('bell') || lowerText.includes('notification') || lowerText.includes('browser')) {
    alertTypes.push('sound')
  }

  // If no specific types mentioned, default to sound
  if (alertTypes.length === 0) {
    alertTypes.push('sound')
  }

  return alertTypes
}

function extractDate(text: string): string | null {
  const datePatterns = [
    /(?:on|அன்று)\s+(\d{1,2})(?:st|nd|rd|th)?\s+(\w+)/i,
    /(?:on|அன்று)\s+(\w+)\s+(\d{1,2})/i,
    /(\d{4}-\d{2}-\d{2})/
  ]

  for (const pattern of datePatterns) {
    const match = text.match(pattern)
    if (match) {
      // For now, return a simple date format
      // In production, you'd want proper date parsing
      return new Date().toISOString().split('T')[0] // Today's date as fallback
    }
  }

  return null
}