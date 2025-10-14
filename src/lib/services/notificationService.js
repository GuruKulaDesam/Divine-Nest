// Notification Service for South Indian Family App
// Handles SMS, WhatsApp, Phone Call, Email, Windows Notification, and Phone Message alerts

import { familyMembers, monthlyRecharges, yearlyRenewals, notificationTemplates } from '../data/family.js';
import { secureStorage, StorageKeys } from '../utils/secureStorage.js';

class NotificationService {
  constructor() {
    this.apiKeys = {
      twilio: null, // Set your Twilio API key
      firebase: null, // Set your Firebase Cloud Messaging key
      whatsapp: null,  // Set your WhatsApp Business API key
      email: null,     // Set your email service API key
      windows: null    // Windows notification API key
    };

    this.notificationQueue = [];
    this.sentNotifications = [];
    this.preferences = {
      enableSMS: true,
      enablePhoneCall: true,
      enableEmail: true,
      enableWindowsNotification: true,
      enablePhoneMessage: true,
      enableWhatsApp: true,
      enablePush: true,
      reminderDaysBefore: [7, 3, 1], // Send reminders 7, 3, and 1 days before due date
      overdueReminders: true,
      festivalReminders: true
    };

    // Prevent multiple initializations
    this.initialized = false;

    // Initialize alert templates
    this.alertTemplates = this.initializeAlertTemplates();
  }

  // Initialize comprehensive alert templates for all 5 types with 10 samples each
  initializeAlertTemplates() {
    return {
      sms: {
        english: [
          "Hi {name}! Your {service} bill of {amount} is due on {date}. Please make payment to avoid late fees. - Divine Nest",
          "Reminder: {service} payment of {amount} due {date}. Pay now to keep services running smoothly. - Family Manager",
          "Alert! {name}, your {service} bill {amount} is overdue. Please settle immediately. Contact us if needed. - Home Suite",
          "{name}, don't forget: {service} payment {amount} due tomorrow. Set up auto-pay to avoid this reminder! - Divine Nest",
          "Payment Notice: Your {service} bill of {amount} for {date} is now due. Thank you for your prompt attention. - Family App",
          "Hi {name}! This is a gentle reminder for your {service} bill of {amount} due on {date}. - Divine Nest Family",
          "⚠️ OVERDUE: {name}, your {service} bill {amount} is past due. Please pay immediately to avoid disconnection. - Home Suite",
          "Friendly reminder: {service} payment of {amount} due in 3 days ({date}). Keep your home running smoothly! - Divine Nest",
          "Payment Alert: {name}, your {service} bill of {amount} is due today. Make payment now. - Family Manager",
          "Final Notice: {service} bill {amount} due {date}. Late fees will apply after due date. - Divine Nest"
        ],
        tamil: [
          "வணக்கம் {name}! உங்கள் {service} கட்டணம் {amount} {date} அன்று கட்டணம். தாமத கட்டணம் தவிர்க்க கட்டுங்கள். - திவைன் நெஸ்ட்",
          "நினைவூட்டல்: {service} கட்டணம் {amount} {date} அன்று கட்டணம். சேவைகள் சீராக இயங்க கட்டுங்கள். - குடும்ப மேலாளர்",
          "எச்சரிக்கை! {name}, உங்கள் {service} கட்டணம் {amount} தாமதமாகிவிட்டது. உடனே செலுத்துங்கள். தேவைப்பட்டால் எங்களை தொடர்பு கொள்ளுங்கள். - ஹோம் சூட்",
          "{name}, மறக்காதீர்கள்: {service} கட்டணம் {amount} நாளைக்கு கட்டணம். இந்த நினைவூட்டலை தவிர்க்க ஆட்டோ-பே செட்டப் செய்யுங்கள்! - திவைன் நெஸ்ட்",
          "கட்டண அறிவிப்பு: உங்கள் {service} கட்டணம் {amount} {date}க்கு கட்டணம். உங்கள் உடனடி கவனத்துக்கு நன்றி. - குடும்ப ஆப்",
          "வணக்கம் {name}! உங்கள் {service} கட்டணம் {amount} {date} அன்று கட்டணம் என்பதற்கு மென்மையான நினைவூட்டல். - திவைன் நெஸ்ட் குடும்பம்",
          "⚠️ தாமதம்: {name}, உங்கள் {service} கட்டணம் {amount} தாமதமாகிவிட்டது. துண்டிப்பை தவிர்க்க உடனே கட்டுங்கள். - ஹோம் சூட்",
          "நட்பு நினைவூட்டல்: {service} கட்டணம் {amount} 3 நாட்களில் ({date}) கட்டணம். உங்கள் வீட்டை சீராக இயக்குங்கள்! - திவைன் நெஸ்ட்",
          "கட்டண எச்சரிக்கை: {name}, உங்கள் {service} கட்டணம் {amount} இன்று கட்டணம். இப்போது கட்டுங்கள். - குடும்ப மேலாளர்",
          "இறுதி அறிவிப்பு: {service} கட்டணம் {amount} {date}க்கு கட்டணம். கட்டண தேதிக்கு பிறகு தாமத கட்டணம் விதிக்கப்படும். - திவைன் நெஸ்ட்"
        ]
      },
      phoneCall: {
        english: [
          "Hello {name}, this is Divine Nest calling about your {service} bill of {amount} due on {date}. Please make payment soon.",
          "Hi {name}! Friendly reminder from Family Manager: your {service} payment of {amount} is due {date}.",
          "Good day {name}. This is Home Suite calling regarding your overdue {service} bill of {amount}.",
          "Hello {name}, don't forget your {service} bill of {amount} due tomorrow. This is Divine Nest automated reminder.",
          "{name}, this is Family App calling. Your {service} bill of {amount} for {date} is now due.",
          "Hi {name}! This is a courtesy call from Divine Nest Family about your {service} bill due on {date}.",
          "Urgent: {name}, your {service} bill of {amount} is past due. This is Home Suite calling to assist.",
          "Hello {name}, this is Divine Nest. Your {service} payment of {amount} is due in 3 days on {date}.",
          "Payment reminder call: {name}, your {service} bill of {amount} is due today. Please pay now.",
          "Final notice call: {name}, {service} bill {amount} due {date}. Late fees apply after due date."
        ],
        tamil: [
          "வணக்கம் {name}, திவைன் நெஸ்ட் அழைக்கிறது. உங்கள் {service} கட்டணம் {amount} {date} அன்று கட்டணம். விரைவில் கட்டுங்கள்.",
          "வணக்கம் {name}! குடும்ப மேலாளரிடமிருந்து நட்பு நினைவூட்டல்: உங்கள் {service} கட்டணம் {amount} {date} அன்று கட்டணம்.",
          "நல்வரவு {name}. ஹோம் சூட் அழைக்கிறது. உங்கள் தாமதமான {service} கட்டணம் {amount} பற்றி.",
          "வணக்கம் {name}, உங்கள் {service} கட்டணம் {amount} நாளைக்கு கட்டணம் என்பதை மறக்காதீர்கள். திவைன் நெஸ்ட் ஆட்டோமேட்டட் நினைவூட்டல் இது.",
          "{name}, குடும்ப ஆப் அழைக்கிறது. உங்கள் {service} கட்டணம் {amount} {date}க்கு இப்போது கட்டணம்.",
          "வணக்கம் {name}! திவைன் நெஸ்ட் குடும்பத்திடமிருந்து உங்கள் {service} கட்டணம் {date} அன்று கட்டணம் பற்றிய மரியாதை அழைப்பு இது.",
          "அவசரம்: {name}, உங்கள் {service} கட்டணம் {amount} தாமதமாகிவிட்டது. உதவ ஹோம் சூட் அழைக்கிறது.",
          "வணக்கம் {name}, திவைன் நெஸ்ட் அழைக்கிறது. உங்கள் {service} கட்டணம் {amount} 3 நாட்களில் {date} அன்று கட்டணம்.",
          "கட்டண நினைவூட்டல் அழைப்பு: {name}, உங்கள் {service} கட்டணம் {amount} இன்று கட்டணம். இப்போது கட்டுங்கள்.",
          "இறுதி அறிவிப்பு அழைப்பு: {name}, {service} கட்டணம் {amount} {date}க்கு கட்டணம். கட்டண தேதிக்கு பிறகு தாமத கட்டணம்."
        ]
      },
      email: {
        english: [
          "Subject: Payment Reminder - {service} Bill Due Soon\n\nDear {name},\n\nThis is a friendly reminder that your {service} bill of {amount} is due on {date}.\n\nPlease make your payment to avoid any late fees.\n\nBest regards,\nDivine Nest Family Manager",
          "Subject: {service} Payment Due - Action Required\n\nHello {name},\n\nYour {service} bill amounting to {amount} is due on {date}.\n\nKindly ensure timely payment to maintain uninterrupted service.\n\nThank you,\nHome Suite Team",
          "Subject: OVERDUE: {service} Bill Payment\n\nDear {name},\n\nYour {service} bill of {amount} is now overdue.\n\nPlease settle this payment immediately to avoid service interruption.\n\nRegards,\nFamily Manager",
          "Subject: Tomorrow's {service} Bill Deadline\n\nHi {name},\n\nJust a reminder that your {service} payment of {amount} is due tomorrow.\n\nConsider setting up automatic payments for convenience.\n\nBest,\nDivine Nest",
          "Subject: {service} Bill Now Due\n\nDear {name},\n\nYour {service} bill of {amount} for the period ending {date} is now due for payment.\n\nThank you for your prompt attention to this matter.\n\nSincerely,\nFamily App Team",
          "Subject: Gentle Reminder - {service} Payment\n\nHello {name},\n\nThis is a gentle reminder about your upcoming {service} bill of {amount} due on {date}.\n\nWe appreciate your continued business.\n\nWarm regards,\nDivine Nest Family",
          "Subject: URGENT - Overdue {service} Bill\n\nDear {name},\n\nYour {service} bill of {amount} is past due.\n\nImmediate payment is required to prevent service disconnection.\n\nPlease contact us if you need assistance.\n\nUrgently,\nHome Suite Support",
          "Subject: {service} Payment Due in 3 Days\n\nHi {name},\n\nYour {service} bill of {amount} will be due in 3 days on {date}.\n\nPlease plan accordingly to avoid late fees.\n\nThank you,\nDivine Nest",
          "Subject: Today's {service} Bill Deadline\n\nDear {name},\n\nYour {service} bill of {amount} is due today.\n\nPlease make payment at your earliest convenience.\n\nBest regards,\nFamily Manager",
          "Subject: Final Notice - {service} Bill Due {date}\n\nDear {name},\n\nThis is your final notice for {service} bill payment of {amount} due on {date}.\n\nLate fees will apply after the due date.\n\nSincerely,\nDivine Nest Team"
        ],
        tamil: [
          "பாட்ச்: கட்டண நினைவூட்டல் - {service} கட்டணம் விரைவில் கட்டணம்\n\nஅன்புள்ள {name},\n\nஉங்கள் {service} கட்டணம் {amount} {date} அன்று கட்டணம் என்பதற்கு நட்பு நினைவூட்டல் இது.\n\nதாமத கட்டணம் தவிர்க்க கட்டுங்கள்.\n\nநல்வாழ்த்துகள்,\nதிவைன் நெஸ்ட் குடும்ப மேலாளர்",
          "பாட்ச்: {service} கட்டணம் கட்டணம் - செயல் தேவை\n\nவணக்கம் {name},\n\nஉங்கள் {service} கட்டணம் {amount} {date} அன்று கட்டணம்.\n\nகுறுக்கீடு இல்லாத சேவையை பராமரிக்க சரியான நேரத்தில் கட்டணம் செலுத்துவதை உறுதிப்படுத்துங்கள்.\n\nநன்றி,\nஹோம் சூட் குழு",
          "பாட்ச்: தாமதம்: {service} கட்டண கட்டணம்\n\nஅன்புள்ள {name},\n\nஉங்கள் {service} கட்டணம் {amount} இப்போது தாமதமாகிவிட்டது.\n\nசேவை குறுக்கீடை தவிர்க்க உடனே இந்த கட்டணத்தை செலுத்துங்கள்.\n\nவணக்கம்,\nகுடும்ப மேலாளர்",
          "பாட்ச்: நாளைய {service} கட்டண காலக்கெடு\n\nவணக்கம் {name},\n\nஉங்கள் {service} கட்டணம் {amount} நாளைக்கு கட்டணம் என்பதை நினைவூட்டுகிறது.\n\nவசதிக்காக ஆட்டோமேட்டிக் கட்டணங்களை செட்டப் செய்ய கருதுங்கள்.\n\nசிறப்பாக,\nதிவைன் நெஸ்ட்",
          "பாட்ச்: {service} கட்டணம் இப்போது கட்டணம்\n\nஅன்புள்ள {name},\n\n{date} அன்று முடியும் காலத்திற்கு உங்கள் {service} கட்டணம் {amount} இப்போது கட்டணம்.\n\nஇந்த விஷயத்தில் உங்கள் உடனடி கவனத்துக்கு நன்றி.\n\nஉண்மையாக,\nகுடும்ப ஆப் குழு",
          "பாட்ச்: மென்மையான நினைவூட்டல் - {service} கட்டணம்\n\nவணக்கம் {name},\n\nஉங்கள் வரவிருக்கும் {service} கட்டணம் {amount} {date} அன்று கட்டணம் பற்றிய மென்மையான நினைவூட்டல் இது.\n\nஉங்கள் தொடர்ந்த வணிகத்தை பாராட்டுகிறோம்.\n\nசூடான வணக்கம்,\nதிவைன் நெஸ்ட் குடும்பம்",
          "பாட்ச்: அவசரம் - தாமதமான {service} கட்டணம்\n\nஅன்புள்ள {name},\n\nஉங்கள் {service} கட்டணம் {amount} தாமதமாகிவிட்டது.\n\nசேவை துண்டிப்பை தடுக்க உடனடி கட்டணம் தேவை.\n\nஉதவி தேவைப்பட்டால் எங்களை தொடர்பு கொள்ளுங்கள்.\n\nஅவசரமாக,\nஹோம் சூட் ஆதரவு",
          "பாட்ச்: {service} கட்டணம் 3 நாட்களில் கட்டணம்\n\nவணக்கம் {name},\n\nஉங்கள் {service} கட்டணம் {amount} 3 நாட்களில் {date} அன்று கட்டணம்.\n\nதாமத கட்டணம் தவிர்க்க திட்டமிடுங்கள்.\n\nநன்றி,\nதிவைன் நெஸ்ட்",
          "பாட்ச்: இன்றைய {service} கட்டண காலக்கெடு\n\nஅன்புள்ள {name},\n\nஉங்கள் {service} கட்டணம் {amount} இன்று கட்டணம்.\n\nஉங்கள் மிக ஆரம்ப வசதியில் கட்டணம் செய்யுங்கள்.\n\nநல்வாழ்த்துகள்,\nகுடும்ப மேலாளர்",
          "பாட்ச்: இறுதி அறிவிப்பு - {service} கட்டணம் {date} அன்று கட்டணம்\n\nஅன்புள்ள {name},\n\n{service} கட்டண கட்டணம் {amount} {date} அன்று கட்டணம் என்பதற்கு உங்கள் இறுதி அறிவிப்பு இது.\n\nகட்டண தேதிக்கு பிறகு தாமத கட்டணம் விதிக்கப்படும்.\n\nஉண்மையாக,\nதிவைன் நெஸ்ட் குழு"
        ]
      },
      windowsNotification: {
        english: [
          { title: "💰 Payment Due Soon", body: "{name}, your {service} bill of {amount} is due on {date}. Don't forget!" },
          { title: "⏰ Reminder Alert", body: "{service} payment of {amount} due {date}. Time to pay up!" },
          { title: "⚠️ Overdue Bill", body: "{name}, your {service} bill {amount} is overdue. Please pay now!" },
          { title: "📅 Tomorrow's Deadline", body: "{service} bill {amount} due tomorrow. Set a reminder!" },
          { title: "💳 Bill Due Today", body: "{name}, your {service} bill of {amount} is due today." },
          { title: "🏠 Home Payment Alert", body: "Friendly reminder: {service} payment {amount} due on {date}." },
          { title: "🚨 Urgent Payment", body: "{name}, {service} bill {amount} is past due. Pay immediately!" },
          { title: "📆 3-Day Warning", body: "{service} payment of {amount} due in 3 days ({date})." },
          { title: "💸 Payment Time", body: "Hi {name}! Your {service} bill {amount} is due today." },
          { title: "⏳ Final Notice", body: "Last chance: {service} bill {amount} due {date}. Late fees coming!" }
        ],
        tamil: [
          { title: "💰 கட்டணம் விரைவில் கட்டணம்", body: "{name}, உங்கள் {service} கட்டணம் {amount} {date} அன்று கட்டணம். மறக்காதீர்கள்!" },
          { title: "⏰ நினைவூட்டல் எச்சரிக்கை", body: "{service} கட்டணம் {amount} {date} அன்று கட்டணம். கட்டணம் செய்ய நேரம்!" },
          { title: "⚠️ தாமதமான கட்டணம்", body: "{name}, உங்கள் {service} கட்டணம் {amount} தாமதமாகிவிட்டது. இப்போது கட்டுங்கள்!" },
          { title: "📅 நாளைய காலக்கெடு", body: "{service} கட்டணம் {amount} நாளைக்கு கட்டணம். நினைவூட்டலை செட்டப் செய்யுங்கள்!" },
          { title: "💳 கட்டணம் இன்று கட்டணம்", body: "{name}, உங்கள் {service} கட்டணம் {amount} இன்று கட்டணம்." },
          { title: "🏠 வீடு கட்டண எச்சரிக்கை", body: "நட்பு நினைவூட்டல்: {service} கட்டணம் {amount} {date} அன்று கட்டணம்." },
          { title: "🚨 அவசர கட்டணம்", body: "{name}, {service} கட்டணம் {amount} தாமதமாகிவிட்டது. உடனே கட்டுங்கள்!" },
          { title: "📆 3-நாள் எச்சரிக்கை", body: "{service} கட்டணம் {amount} 3 நாட்களில் ({date}) கட்டணம்." },
          { title: "💸 கட்டண நேரம்", body: "வணக்கம் {name}! உங்கள் {service} கட்டணம் {amount} இன்று கட்டணம்." },
          { title: "⏳ இறுதி அறிவிப்பு", body: "கடைசி வாய்ப்பு: {service} கட்டணம் {amount} {date} அன்று கட்டணம். தாமத கட்டணம் வருகிறது!" }
        ]
      },
      phoneMessage: {
        english: [
          "Hi {name}! 📱 Your {service} bill of {amount} is due on {date}. Pay now to avoid late fees. Reply 'PAID' when done. - Divine Nest",
          "Reminder: {service} payment {amount} due {date}. Keep your home services running! Send 'OK' to confirm. - Family Manager",
          "ALERT! {name}, {service} bill {amount} is overdue. Please pay immediately. Text 'HELP' for assistance. - Home Suite",
          "Don't forget: {service} bill {amount} due tomorrow. Set up auto-pay? Reply 'YES' or 'NO'. - Divine Nest",
          "{name}, your {service} bill of {amount} is due today. Make payment now. Reply 'DONE' when paid. - Family App",
          "Gentle reminder: {service} payment {amount} due on {date}. We appreciate your business! - Divine Nest Family",
          "URGENT: {name}, {service} bill {amount} is past due. Pay now to avoid disconnection. Text 'PAID'. - Home Suite",
          "Hi {name}! {service} payment of {amount} due in 3 days ({date}). Need a reminder? Reply 'REMIND'. - Divine Nest",
          "Payment due today: {name}, your {service} bill {amount} needs payment. Reply 'PAID' when complete. - Family Manager",
          "Final notice: {service} bill {amount} due {date}. Late fees apply tomorrow. Confirm payment with 'OK'. - Divine Nest"
        ],
        tamil: [
          "வணக்கம் {name}! 📱 உங்கள் {service} கட்டணம் {amount} {date} அன்று கட்டணம். தாமத கட்டணம் தவிர்க்க இப்போது கட்டுங்கள். முடிந்ததும் 'PAID' பதில் அனுப்புங்கள். - திவைன் நெஸ்ட்",
          "நினைவூட்டல்: {service} கட்டணம் {amount} {date} அன்று கட்டணம். உங்கள் வீடு சேவைகளை இயக்குங்கள்! உறுதிப்படுத்த 'OK' அனுப்புங்கள். - குடும்ப மேலாளர்",
          "எச்சரிக்கை! {name}, {service} கட்டணம் {amount} தாமதமாகிவிட்டது. உடனே கட்டுங்கள். உதவிக்கு 'HELP' அனுப்புங்கள். - ஹோம் சூட்",
          "மறக்காதீர்கள்: {service} கட்டணம் {amount} நாளைக்கு கட்டணம். ஆட்டோ-பே செட்டப் செய்ய வேண்டுமா? 'YES' அல்லது 'NO' பதில் அனுப்புங்கள். - திவைன் நெஸ்ட்",
          "{name}, உங்கள் {service} கட்டணம் {amount} இன்று கட்டணம். இப்போது கட்டணம் செய்யுங்கள். கட்டிய பிறகு 'DONE' பதில் அனுப்புங்கள். - குடும்ப ஆப்",
          "மென்மையான நினைவூட்டல்: {service} கட்டணம் {amount} {date} அன்று கட்டணம். உங்கள் வணிகத்தை பாராட்டுகிறோம்! - திவைன் நெஸ்ட் குடும்பம்",
          "அவசரம்: {name}, {service} கட்டணம் {amount} தாமதமாகிவிட்டது. துண்டிப்பை தவிர்க்க இப்போது கட்டுங்கள். 'PAID' அனுப்புங்கள். - ஹோம் சூட்",
          "வணக்கம் {name}! {service} கட்டணம் {amount} 3 நாட்களில் ({date}) கட்டணம். நினைவூட்டல் தேவையா? 'REMIND' பதில் அனுப்புங்கள். - திவைன் நெஸ்ட்",
          "இன்று கட்டணம்: {name}, உங்கள் {service} கட்டணம் {amount} கட்டணம் தேவை. முடிந்ததும் 'PAID' பதில் அனுப்புங்கள். - குடும்ப மேலாளர்",
          "இறுதி அறிவிப்பு: {service} கட்டணம் {amount} {date} அன்று கட்டணம். நாளைக்கு தாமத கட்டணம். 'OK' உடன் கட்டணத்தை உறுதிப்படுத்துங்கள். - திவைன் நெஸ்ட்"
        ]
      }
    };
  }

  // Initialize the service
  init() {
    // Prevent multiple initializations
    if (this.initialized) {
      console.log('NotificationService already initialized, skipping...');
      return;
    }
    
    this.initialized = true;
    console.log('Initializing NotificationService...');
    
    this.checkDuePayments();
    this.scheduleReminders();
    
    // Set up periodic checks (every hour)
    setInterval(() => {
      this.checkDuePayments();
    }, 60 * 60 * 1000);
  }

  // Check for due payments and create notifications
  checkDuePayments() {
    const today = new Date();
    const allPayments = [...monthlyRecharges, ...yearlyRenewals];

    allPayments.forEach(payment => {
      const dueDate = new Date(payment.dueDate);
      const daysDiff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

      // Check if reminder should be sent
      if (this.preferences.reminderDaysBefore.includes(daysDiff)) {
        this.createReminder(payment, 'upcoming');
      } else if (daysDiff < 0 && this.preferences.overdueReminders) {
        this.createReminder(payment, 'overdue');
      } else if (daysDiff === 0) {
        this.createReminder(payment, 'due_today');
      }
    });

    this.processNotificationQueue();
  }

  // Create reminder notification with all 5 alert types
  createReminder(payment, type) {
    const member = payment.assignedTo;
    const notificationId = `${payment.id}_${type}_${new Date().toISOString().split('T')[0]}`;

    // Check if notification already sent
    if (this.sentNotifications.includes(notificationId)) {
      return;
    }

    const notification = {
      id: notificationId,
      type,
      payment,
      member,
      createdAt: new Date(),
      methods: []
    };

    // Add SMS notification
    if (this.preferences.enableSMS) {
      notification.methods.push({
        type: 'sms',
        to: member.phoneNumber,
        message: this.generateSMSMessage(payment, member, type)
      });
    }

    // Add Phone Call notification
    if (this.preferences.enablePhoneCall) {
      notification.methods.push({
        type: 'phoneCall',
        to: member.phoneNumber,
        message: this.generatePhoneCallMessage(payment, member, type)
      });
    }

    // Add Email notification
    if (this.preferences.enableEmail) {
      notification.methods.push({
        type: 'email',
        to: member.email,
        subject: this.generateEmailSubject(payment, type),
        message: this.generateEmailMessage(payment, member, type)
      });
    }

    // Add Windows Notification
    if (this.preferences.enableWindowsNotification) {
      notification.methods.push({
        type: 'windowsNotification',
        title: this.generateWindowsNotificationTitle(payment, type),
        body: this.generateWindowsNotificationBody(payment, member, type),
        icon: this.getNotificationIcon(type)
      });
    }

    // Add Phone Message notification
    if (this.preferences.enablePhoneMessage) {
      notification.methods.push({
        type: 'phoneMessage',
        to: member.phoneNumber,
        message: this.generatePhoneMessage(payment, member, type)
      });
    }

    // Add WhatsApp notification
    if (this.preferences.enableWhatsApp) {
      notification.methods.push({
        type: 'whatsapp',
        to: member.whatsappNumber,
        message: this.generateWhatsAppMessage(payment, member, type)
      });
    }

    // Add push notification
    if (this.preferences.enablePush) {
      notification.methods.push({
        type: 'push',
        title: this.generatePushTitle(payment, type),
        body: this.generatePushBody(payment, member, type),
        icon: '💰',
        data: { paymentId: payment.id, type }
      });
    }

    this.notificationQueue.push(notification);
  }

  // Generate SMS message
  generateSMSMessage(payment, member, type) {
    const language = member.preferredLanguage || 'english';
    const templates = this.alertTemplates.sms[language] || this.alertTemplates.sms.english;
    const templateIndex = Math.floor(Math.random() * templates.length);
    const template = templates[templateIndex];

    return this.replaceMessageVariables(template, payment, member);
  }

  // Generate Phone Call message
  generatePhoneCallMessage(payment, member, type) {
    const language = member.preferredLanguage || 'english';
    const templates = this.alertTemplates.phoneCall[language] || this.alertTemplates.phoneCall.english;
    const templateIndex = Math.floor(Math.random() * templates.length);
    const template = templates[templateIndex];

    return this.replaceMessageVariables(template, payment, member);
  }

  // Generate Email subject
  generateEmailSubject(payment, type) {
    const subjects = {
      upcoming: `${payment.provider} Payment Due Soon`,
      overdue: `OVERDUE: ${payment.provider} Bill Payment`,
      due_today: `${payment.provider} Bill Due Today`,
      reminder: `${payment.provider} Payment Reminder`
    };
    return subjects[type] || subjects.reminder;
  }

  // Generate Email message
  generateEmailMessage(payment, member, type) {
    const language = member.preferredLanguage || 'english';
    const templates = this.alertTemplates.email[language] || this.alertTemplates.email.english;
    const templateIndex = Math.floor(Math.random() * templates.length);
    const template = templates[templateIndex];

    return this.replaceMessageVariables(template, payment, member);
  }

  // Generate Windows Notification title
  generateWindowsNotificationTitle(payment, type) {
    const language = 'english'; // Windows notifications are typically in English
    const templates = this.alertTemplates.windowsNotification[language];
    const templateIndex = Math.floor(Math.random() * templates.length);
    return templates[templateIndex].title;
  }

  // Generate Windows Notification body
  generateWindowsNotificationBody(payment, member, type) {
    const language = member.preferredLanguage || 'english';
    const templates = this.alertTemplates.windowsNotification[language] || this.alertTemplates.windowsNotification.english;
    const templateIndex = Math.floor(Math.random() * templates.length);
    const template = templates[templateIndex].body;

    return this.replaceMessageVariables(template, payment, member);
  }

  // Generate Phone Message
  generatePhoneMessage(payment, member, type) {
    const language = member.preferredLanguage || 'english';
    const templates = this.alertTemplates.phoneMessage[language] || this.alertTemplates.phoneMessage.english;
    const templateIndex = Math.floor(Math.random() * templates.length);
    const template = templates[templateIndex];

    return this.replaceMessageVariables(template, payment, member);
  }

  // Get notification icon based on type
  getNotificationIcon(type) {
    const icons = {
      upcoming: '⏰',
      overdue: '⚠️',
      due_today: '📅',
      reminder: '💰'
    };
    return icons[type] || icons.reminder;
  }

  // Generate WhatsApp message
  generateWhatsAppMessage(payment, member, type) {
    const template = notificationTemplates.whatsapp[member.preferredLanguage] || notificationTemplates.whatsapp.english;
    const messageTemplate = template[type] || template.reminder;
    
    return this.replaceMessageVariables(messageTemplate, payment, member);
  }

  // Generate push notification title
  generatePushTitle(payment, type) {
    switch (type) {
      case 'overdue': return '⚠️ Overdue Payment';
      case 'due_today': return '📅 Payment Due Today';
      case 'upcoming': return '⏰ Upcoming Payment';
      default: return '💰 Payment Reminder';
    }
  }

  // Generate push notification body
  generatePushBody(payment, member, type) {
    const amount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(payment.amount);

    switch (type) {
      case 'overdue':
        return `${member.name}, your ${payment.provider} bill of ${amount} is overdue!`;
      case 'due_today':
        return `${member.name}, your ${payment.provider} bill of ${amount} is due today.`;
      case 'upcoming':
        return `${member.name}, your ${payment.provider} bill of ${amount} is due soon.`;
      default:
        return `Payment reminder for ${payment.provider}`;
    }
  }

  // Replace variables in message templates
  replaceMessageVariables(template, payment, member) {
    const amount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(payment.amount);

    const date = new Date(payment.dueDate).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    return template
      .replace(/{name}/g, member.name)
      .replace(/{service}/g, `${payment.provider} ${payment.type}`)
      .replace(/{amount}/g, amount)
      .replace(/{date}/g, date);
  }

  // Process notification queue
  async processNotificationQueue() {
    while (this.notificationQueue.length > 0) {
      const notification = this.notificationQueue.shift();
      
      try {
        await this.sendNotification(notification);
        this.sentNotifications.push(notification.id);
        console.log(`Notification sent: ${notification.id}`);
      } catch (error) {
        console.error(`Failed to send notification ${notification.id}:`, error);
        // Optionally retry failed notifications
      }
    }
  }

  // Send notification through all methods
  async sendNotification(notification) {
    const promises = notification.methods.map(method => {
      switch (method.type) {
        case 'sms':
          return this.sendSMS(method.to, method.message);
        case 'phoneCall':
          return this.sendPhoneCall(method.to, method.message);
        case 'email':
          return this.sendEmail(method.to, method.subject, method.message);
        case 'windowsNotification':
          return this.sendWindowsNotification(method.title, method.body, method.icon);
        case 'phoneMessage':
          return this.sendPhoneMessage(method.to, method.message);
        case 'whatsapp':
          return this.sendWhatsApp(method.to, method.message);
        case 'push':
          return this.sendPushNotification(method);
        default:
          return Promise.resolve();
      }
    });

    await Promise.allSettled(promises);
  }

  // Send SMS via Twilio (mock implementation)
  async sendSMS(phoneNumber, message) {
    if (!this.apiKeys.twilio) {
      console.log(`SMS to ${phoneNumber}: ${message}`);
      return { success: true, mock: true };
    }

    // Real Twilio implementation would go here
    try {
      // const client = require('twilio')(accountSid, authToken);
      // const result = await client.messages.create({
      //   body: message,
      //   from: '+1234567890', // Your Twilio number
      //   to: phoneNumber
      // });

      console.log(`SMS sent to ${phoneNumber}: ${message}`);
      return { success: true };
    } catch (error) {
      throw new Error(`SMS failed: ${error.message}`);
    }
  }

  // Send Phone Call (mock implementation)
  async sendPhoneCall(phoneNumber, message) {
    if (!this.apiKeys.twilio) {
      console.log(`Phone call to ${phoneNumber}: ${message}`);
      return { success: true, mock: true };
    }

    // Real Twilio implementation would go here for automated calls
    try {
      console.log(`Phone call made to ${phoneNumber}: ${message}`);
      return { success: true };
    } catch (error) {
      throw new Error(`Phone call failed: ${error.message}`);
    }
  }

  // Send Email (mock implementation)
  async sendEmail(emailAddress, subject, message) {
    if (!this.apiKeys.email) {
      console.log(`Email to ${emailAddress}:\nSubject: ${subject}\n${message}`);
      return { success: true, mock: true };
    }

    // Real email service implementation would go here
    try {
      console.log(`Email sent to ${emailAddress}: ${subject}`);
      return { success: true };
    } catch (error) {
      throw new Error(`Email failed: ${error.message}`);
    }
  }

  // Send Windows Notification
  async sendWindowsNotification(title, body, icon) {
    if (!this.apiKeys.windows) {
      // Use browser notification API as fallback
      if ("Notification" in window && Notification.permission === "granted") {
        const notification = new Notification(title, {
          body: body,
          icon: icon || '💰'
        });
        console.log(`Windows notification: ${title} - ${body}`);
        return { success: true, mock: true };
      }
      return { success: false, reason: "Notifications not supported or permission denied" };
    }

    // Real Windows notification implementation would go here
    try {
      console.log(`Windows notification sent: ${title}`);
      return { success: true };
    } catch (error) {
      throw new Error(`Windows notification failed: ${error.message}`);
    }
  }

  // Send Phone Message (SMS alternative)
  async sendPhoneMessage(phoneNumber, message) {
    // Phone messages are similar to SMS but might use different service
    return this.sendSMS(phoneNumber, message);
  }

  // Send WhatsApp message (mock implementation)
  async sendWhatsApp(phoneNumber, message) {
    if (!this.apiKeys.whatsapp) {
      console.log(`WhatsApp to ${phoneNumber}: ${message}`);
      return { success: true, mock: true };
    }

    // Real WhatsApp Business API implementation would go here
    try {
      console.log(`WhatsApp sent to ${phoneNumber}: ${message}`);
      return { success: true };
    } catch (error) {
      throw new Error(`WhatsApp failed: ${error.message}`);
    }
  }

  // Send push notification via Firebase (mock implementation)
  async sendPushNotification(notificationData) {
    if (!this.apiKeys.firebase) {
      console.log(`Push notification: ${notificationData.title} - ${notificationData.body}`);
      return { success: true, mock: true };
    }

    // Real Firebase implementation would go here
    try {
      // const admin = require('firebase-admin');
      // const result = await admin.messaging().send({
      //   notification: {
      //     title: notificationData.title,
      //     body: notificationData.body,
      //     icon: notificationData.icon
      //   },
      //   data: notificationData.data,
      //   topic: 'family_reminders'
      // });

      console.log(`Push notification sent: ${notificationData.title}`);
      return { success: true };
    } catch (error) {
      throw new Error(`Push notification failed: ${error.message}`);
    }
  }

  // Manual reminder for specific payment
  async sendManualReminder(paymentId, memberIds = null) {
    const payment = [...monthlyRecharges, ...yearlyRenewals].find(p => p.id === paymentId);
    if (!payment) {
      throw new Error('Payment not found');
    }

    const members = memberIds 
      ? familyMembers.filter(m => memberIds.includes(m.id))
      : [payment.assignedTo];

    const notifications = members.map(member => {
      const notification = {
        id: `manual_${payment.id}_${member.id}_${Date.now()}`,
        type: 'manual',
        payment,
        member,
        createdAt: new Date(),
        methods: [
          {
            type: 'whatsapp',
            to: member.whatsappNumber,
            message: this.generateWhatsAppMessage(payment, member, 'reminder')
          }
        ]
      };
      return notification;
    });

    for (const notification of notifications) {
      await this.sendNotification(notification);
    }

    return { success: true, sent: notifications.length };
  }

  // Get notification history
  getNotificationHistory(days = 30) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    return this.sentNotifications
      .filter(id => {
        // Extract date from notification ID if possible
        const parts = id.split('_');
        if (parts.length >= 3) {
          const date = new Date(parts[2]);
          return date >= cutoff;
        }
        return true;
      })
      .slice(-50); // Return last 50 notifications
  }

  // Schedule festival and special occasion reminders
  scheduleReminders() {
    const festivals = [
      { name: 'Diwali', date: '2025-10-31', days: [7, 3, 1] },
      { name: 'Pongal', date: '2026-01-14', days: [14, 7, 3, 1] },
      { name: 'Navaratri', date: '2025-10-03', days: [7, 3, 1] },
      { name: 'Ganesh Chaturthi', date: '2025-08-29', days: [7, 3, 1] }
    ];

    festivals.forEach(festival => {
      festival.days.forEach(daysBefore => {
        const reminderDate = new Date(festival.date);
        reminderDate.setDate(reminderDate.getDate() - daysBefore);
        
        if (reminderDate >= new Date()) {
          setTimeout(() => {
            this.sendFestivalReminder(festival, daysBefore);
          }, reminderDate - new Date());
        }
      });
    });
  }

  // Send festival preparation reminder
  async sendFestivalReminder(festival, daysBefore) {
    const message = `🎉 ${festival.name} is in ${daysBefore} day(s)! Time to start preparations. Check your festival expenses budget and shopping list.`;
    
    // Send to all family members
    for (const member of familyMembers) {
      await this.sendPushNotification({
        title: `🪔 ${festival.name} Reminder`,
        body: message,
        icon: '🎉',
        data: { type: 'festival', festival: festival.name }
      });
    }
  }

  // Update notification preferences
  updatePreferences(newPreferences) {
    this.preferences = { ...this.preferences, ...newPreferences };
    secureStorage.setItem(StorageKeys.NOTIFICATION_PREFERENCES, this.preferences, false); // Preferences are not sensitive
  }

  // Load preferences from storage
  loadPreferences() {
    const saved = secureStorage.getItem(StorageKeys.NOTIFICATION_PREFERENCES, false);
    if (saved) {
      this.preferences = { ...this.preferences, ...saved };
    }
  }

  // Get current notification settings
  getPreferences() {
    return { ...this.preferences };
  }

  // Test notification system
  async testNotification(memberId, type = 'sms') {
    const member = familyMembers.find(m => m.id === memberId);
    if (!member) {
      throw new Error('Member not found');
    }

    const testPayment = {
      id: 'test',
      provider: 'Test Service',
      type: 'test',
      amount: 100,
      dueDate: new Date().toISOString().split('T')[0]
    };

    const message = type === 'sms' 
      ? this.generateSMSMessage(testPayment, member, 'reminder')
      : this.generateWhatsAppMessage(testPayment, member, 'reminder');

    if (type === 'sms') {
      await this.sendSMS(member.phoneNumber, message);
    } else {
      await this.sendWhatsApp(member.whatsappNumber, message);
    }

    return { success: true, message };
  }
}

// Create and export singleton instance
export const notificationService = new NotificationService();

// Export class for testing
export { NotificationService };

// Initialize service when module loads
if (typeof window !== 'undefined') {
  notificationService.loadPreferences();
  notificationService.init();
}