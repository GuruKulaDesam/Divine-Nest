const FamilyRoles = {
  APPA: "appa",
  AMMA: "amma",
  PAATI: "paati",
  THATHA: "thatha",
  AKKA: "akka",
  THAMBI: "thambi"
};
const ExpenseCategories = {
  HEALTH: "health",
  DIGITAL_SUBSCRIPTIONS: "digital_subscriptions",
  TRANSPORT: "transport",
  HOUSEHOLD: "household",
  ENTERTAINMENT: "entertainment"
};
const PaymentStatus = {
  UPCOMING: "upcoming"
};
const familyMembers = [
  {
    id: 1,
    name: "Raman",
    role: FamilyRoles.APPA,
    age: 52,
    avatar: "👨🏽‍💼",
    responsibilities: ["House rent", "Vehicle maintenance", "Insurance premiums"],
    monthlyBudget: 25e3,
    preferredLanguage: "tamil",
    phoneNumber: "+91 98765 43210",
    whatsappNumber: "+91 98765 43210"
  },
  {
    id: 2,
    name: "Lakshmi",
    role: FamilyRoles.AMMA,
    age: 48,
    avatar: "👩🏽‍🏫",
    responsibilities: ["Grocery shopping", "Utility bills", "Children's education"],
    monthlyBudget: 2e4,
    preferredLanguage: "tamil",
    phoneNumber: "+91 98765 43211",
    whatsappNumber: "+91 98765 43211"
  },
  {
    id: 3,
    name: "Kamala",
    role: FamilyRoles.PAATI,
    age: 75,
    avatar: "👵🏽",
    responsibilities: ["Temple donations", "Medical expenses", "Festival preparations"],
    monthlyBudget: 8e3,
    preferredLanguage: "tamil",
    phoneNumber: "+91 98765 43212",
    whatsappNumber: "+91 98765 43212"
  },
  {
    id: 4,
    name: "Krishnan",
    role: FamilyRoles.THATHA,
    age: 78,
    avatar: "👴🏽",
    responsibilities: ["Newspaper subscription", "Medical checkups", "Banking"],
    monthlyBudget: 6e3,
    preferredLanguage: "tamil",
    phoneNumber: "+91 98765 43213",
    whatsappNumber: "+91 98765 43213"
  },
  {
    id: 5,
    name: "Priya",
    role: FamilyRoles.AKKA,
    age: 22,
    avatar: "👩🏽‍🎓",
    responsibilities: ["College fees", "Books", "Mobile recharge"],
    monthlyBudget: 12e3,
    preferredLanguage: "english",
    phoneNumber: "+91 98765 43214",
    whatsappNumber: "+91 98765 43214"
  },
  {
    id: 6,
    name: "Arjun",
    role: FamilyRoles.THAMBI,
    age: 18,
    avatar: "👨🏽‍🎓",
    responsibilities: ["School fees", "Sports equipment", "Gaming subscriptions"],
    monthlyBudget: 8e3,
    preferredLanguage: "english",
    phoneNumber: "+91 98765 43215",
    whatsappNumber: "+91 98765 43215"
  }
];
const monthlyRecharges = [
  {
    id: 1,
    type: "mobile",
    provider: "Airtel",
    number: "98765 43210",
    amount: 599,
    dueDate: "2025-10-15",
    assignedTo: familyMembers[0],
    // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.DIGITAL_SUBSCRIPTIONS
  },
  {
    id: 2,
    type: "mobile",
    provider: "Jio",
    number: "98765 43211",
    amount: 399,
    dueDate: "2025-10-12",
    assignedTo: familyMembers[1],
    // Amma
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.DIGITAL_SUBSCRIPTIONS
  },
  {
    id: 3,
    type: "broadband",
    provider: "BSNL Fiber",
    plan: "100 Mbps Unlimited",
    amount: 849,
    dueDate: "2025-10-20",
    assignedTo: familyMembers[0],
    // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.DIGITAL_SUBSCRIPTIONS
  },
  {
    id: 4,
    type: "dth",
    provider: "Tata Sky",
    plan: "South Plus HD",
    amount: 315,
    dueDate: "2025-10-25",
    assignedTo: familyMembers[1],
    // Amma
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.ENTERTAINMENT
  },
  {
    id: 5,
    type: "electricity",
    provider: "TNEB",
    account: "240156789012",
    amount: 1200,
    dueDate: "2025-10-30",
    assignedTo: familyMembers[0],
    // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.HOUSEHOLD
  },
  {
    id: 6,
    type: "water",
    provider: "Chennai Metro Water",
    account: "CW98765432",
    amount: 180,
    dueDate: "2025-10-28",
    assignedTo: familyMembers[1],
    // Amma
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.HOUSEHOLD
  },
  {
    id: 7,
    type: "gas",
    provider: "Indane Gas",
    connection: "17654321890",
    amount: 450,
    dueDate: "2025-10-22",
    assignedTo: familyMembers[1],
    // Amma
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.HOUSEHOLD
  },
  {
    id: 8,
    type: "streaming",
    provider: "Netflix",
    plan: "Premium",
    amount: 649,
    dueDate: "2025-10-18",
    assignedTo: familyMembers[4],
    // Akka
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.ENTERTAINMENT
  },
  {
    id: 9,
    type: "streaming",
    provider: "Amazon Prime",
    plan: "Annual",
    amount: 1499,
    dueDate: "2025-10-15",
    assignedTo: familyMembers[0],
    // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.ENTERTAINMENT
  }
];
const totalMonthlyRecharges = monthlyRecharges.reduce((total, item) => total + item.amount, 0);
const yearlyRenewals = [
  {
    id: 1,
    type: "life_insurance",
    provider: "LIC",
    policyNumber: "240156789",
    amount: 24e3,
    dueDate: "2025-12-15",
    assignedTo: familyMembers[0],
    // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.HEALTH
  },
  {
    id: 2,
    type: "health_insurance",
    provider: "Star Health",
    policyNumber: "SH9876543",
    amount: 18500,
    dueDate: "2025-11-20",
    assignedTo: familyMembers[1],
    // Amma
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.HEALTH
  },
  {
    id: 3,
    type: "vehicle_insurance",
    provider: "ICICI Lombard",
    vehicleNumber: "TN 09 AB 1234",
    amount: 8200,
    dueDate: "2026-03-10",
    assignedTo: familyMembers[0],
    // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.TRANSPORT
  },
  {
    id: 4,
    type: "property_tax",
    provider: "Chennai Corporation",
    propertyId: "CC/2024/789456",
    amount: 12e3,
    dueDate: "2026-03-31",
    assignedTo: familyMembers[0],
    // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.HOUSEHOLD
  }
];
const totalYearlyRenewals = yearlyRenewals.reduce((total, item) => total + item.amount, 0);
const notificationTemplates = {
  sms: {
    tamil: {
      reminder: "வணக்கம் {name}! உங்கள் {service} பில் ₹{amount} {date} அன்று செலுத்த வேண்டும். - குடும்பம்",
      overdue: "வணக்கம் {name}! உங்கள் {service} பில் ₹{amount} தாமதமாகிவிட்டது. உடனே செலுத்தவும். - குடும்பம்"
    },
    english: {
      reminder: "Hi {name}! Your {service} bill of ₹{amount} is due on {date}. Please pay on time. - Family",
      overdue: "Hi {name}! Your {service} bill of ₹{amount} is overdue. Please pay immediately. - Family"
    }
  },
  whatsapp: {
    tamil: {
      reminder: "🙏 வணக்கம் {name}!\n\n💰 உங்கள் {service} பில்:\n• தொகை: ₹{amount}\n• கடைசி தேதி: {date}\n\n📅 நேரத்தில் செலுத்த மறக்காதீர்கள்!\n\n💖 அன்புடன்,\nகுடும்பம்",
      overdue: "⚠️ கவனம் {name}!\n\n💸 தாமதமான பில்:\n• {service}: ₹{amount}\n• கடைசி தேதி: {date}\n\n🚨 உடனே செலுத்தவும்!\n\n💖 அன்புடன்,\nகுடும்பம்"
    },
    english: {
      reminder: "🙏 Hi {name}!\n\n💰 Your {service} bill:\n• Amount: ₹{amount}\n• Due date: {date}\n\n📅 Please pay on time!\n\n💖 With love,\nFamily",
      overdue: "⚠️ Attention {name}!\n\n💸 Overdue bill:\n• {service}: ₹{amount}\n• Due date: {date}\n\n🚨 Please pay immediately!\n\n💖 With love,\nFamily"
    }
  }
};
class NotificationService {
  constructor() {
    this.apiKeys = {
      twilio: null,
      // Set your Twilio API key
      firebase: null,
      // Set your Firebase Cloud Messaging key
      whatsapp: null
      // Set your WhatsApp Business API key
    };
    this.notificationQueue = [];
    this.sentNotifications = [];
    this.preferences = {
      enableSMS: true,
      enableWhatsApp: true,
      enablePush: true,
      reminderDaysBefore: [7, 3, 1],
      // Send reminders 7, 3, and 1 days before due date
      overdueReminders: true,
      festivalReminders: true
    };
  }
  // Initialize the service
  init() {
    this.checkDuePayments();
    this.scheduleReminders();
    setInterval(() => {
      this.checkDuePayments();
    }, 60 * 60 * 1e3);
  }
  // Check for due payments and create notifications
  checkDuePayments() {
    const today = /* @__PURE__ */ new Date();
    const allPayments = [...monthlyRecharges, ...yearlyRenewals];
    allPayments.forEach((payment) => {
      const dueDate = new Date(payment.dueDate);
      const daysDiff = Math.ceil((dueDate - today) / (1e3 * 60 * 60 * 24));
      if (this.preferences.reminderDaysBefore.includes(daysDiff)) {
        this.createReminder(payment, "upcoming");
      } else if (daysDiff < 0 && this.preferences.overdueReminders) {
        this.createReminder(payment, "overdue");
      } else if (daysDiff === 0) {
        this.createReminder(payment, "due_today");
      }
    });
    this.processNotificationQueue();
  }
  // Create reminder notification
  createReminder(payment, type) {
    const member = payment.assignedTo;
    const notificationId = `${payment.id}_${type}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}`;
    if (this.sentNotifications.includes(notificationId)) {
      return;
    }
    const notification = {
      id: notificationId,
      type,
      payment,
      member,
      createdAt: /* @__PURE__ */ new Date(),
      methods: []
    };
    if (this.preferences.enableSMS) {
      notification.methods.push({
        type: "sms",
        to: member.phoneNumber,
        message: this.generateSMSMessage(payment, member, type)
      });
    }
    if (this.preferences.enableWhatsApp) {
      notification.methods.push({
        type: "whatsapp",
        to: member.whatsappNumber,
        message: this.generateWhatsAppMessage(payment, member, type)
      });
    }
    if (this.preferences.enablePush) {
      notification.methods.push({
        type: "push",
        title: this.generatePushTitle(payment, type),
        body: this.generatePushBody(payment, member, type),
        icon: "💰",
        data: { paymentId: payment.id, type }
      });
    }
    this.notificationQueue.push(notification);
  }
  // Generate SMS message
  generateSMSMessage(payment, member, type) {
    const template = notificationTemplates.sms[member.preferredLanguage] || notificationTemplates.sms.english;
    const messageTemplate = template[type] || template.reminder;
    return this.replaceMessageVariables(messageTemplate, payment, member);
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
      case "overdue":
        return "⚠️ Overdue Payment";
      case "due_today":
        return "📅 Payment Due Today";
      case "upcoming":
        return "⏰ Upcoming Payment";
      default:
        return "💰 Payment Reminder";
    }
  }
  // Generate push notification body
  generatePushBody(payment, member, type) {
    const amount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0
    }).format(payment.amount);
    switch (type) {
      case "overdue":
        return `${member.name}, your ${payment.provider} bill of ${amount} is overdue!`;
      case "due_today":
        return `${member.name}, your ${payment.provider} bill of ${amount} is due today.`;
      case "upcoming":
        return `${member.name}, your ${payment.provider} bill of ${amount} is due soon.`;
      default:
        return `Payment reminder for ${payment.provider}`;
    }
  }
  // Replace variables in message templates
  replaceMessageVariables(template, payment, member) {
    const amount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0
    }).format(payment.amount);
    const date = new Date(payment.dueDate).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
    return template.replace(/{name}/g, member.name).replace(/{service}/g, `${payment.provider} ${payment.type}`).replace(/{amount}/g, amount).replace(/{date}/g, date);
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
      }
    }
  }
  // Send notification through all methods
  async sendNotification(notification) {
    const promises = notification.methods.map((method) => {
      switch (method.type) {
        case "sms":
          return this.sendSMS(method.to, method.message);
        case "whatsapp":
          return this.sendWhatsApp(method.to, method.message);
        case "push":
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
    try {
      console.log(`SMS sent to ${phoneNumber}: ${message}`);
      return { success: true };
    } catch (error) {
      throw new Error(`SMS failed: ${error.message}`);
    }
  }
  // Send WhatsApp message (mock implementation)
  async sendWhatsApp(phoneNumber, message) {
    if (!this.apiKeys.whatsapp) {
      console.log(`WhatsApp to ${phoneNumber}: ${message}`);
      return { success: true, mock: true };
    }
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
    try {
      console.log(`Push notification sent: ${notificationData.title}`);
      return { success: true };
    } catch (error) {
      throw new Error(`Push notification failed: ${error.message}`);
    }
  }
  // Manual reminder for specific payment
  async sendManualReminder(paymentId, memberIds = null) {
    const payment = [...monthlyRecharges, ...yearlyRenewals].find((p) => p.id === paymentId);
    if (!payment) {
      throw new Error("Payment not found");
    }
    const members = memberIds ? familyMembers.filter((m) => memberIds.includes(m.id)) : [payment.assignedTo];
    const notifications = members.map((member) => {
      const notification = {
        id: `manual_${payment.id}_${member.id}_${Date.now()}`,
        type: "manual",
        payment,
        member,
        createdAt: /* @__PURE__ */ new Date(),
        methods: [
          {
            type: "whatsapp",
            to: member.whatsappNumber,
            message: this.generateWhatsAppMessage(payment, member, "reminder")
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
    const cutoff = /* @__PURE__ */ new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return this.sentNotifications.filter((id) => {
      const parts = id.split("_");
      if (parts.length >= 3) {
        const date = new Date(parts[2]);
        return date >= cutoff;
      }
      return true;
    }).slice(-50);
  }
  // Schedule festival and special occasion reminders
  scheduleReminders() {
    const festivals = [
      { name: "Diwali", date: "2025-10-31", days: [7, 3, 1] },
      { name: "Pongal", date: "2026-01-14", days: [14, 7, 3, 1] },
      { name: "Navaratri", date: "2025-10-03", days: [7, 3, 1] },
      { name: "Ganesh Chaturthi", date: "2025-08-29", days: [7, 3, 1] }
    ];
    festivals.forEach((festival) => {
      festival.days.forEach((daysBefore) => {
        const reminderDate = new Date(festival.date);
        reminderDate.setDate(reminderDate.getDate() - daysBefore);
        if (reminderDate >= /* @__PURE__ */ new Date()) {
          setTimeout(() => {
            this.sendFestivalReminder(festival, daysBefore);
          }, reminderDate - /* @__PURE__ */ new Date());
        }
      });
    });
  }
  // Send festival preparation reminder
  async sendFestivalReminder(festival, daysBefore) {
    const message = `🎉 ${festival.name} is in ${daysBefore} day(s)! Time to start preparations. Check your festival expenses budget and shopping list.`;
    for (const member of familyMembers) {
      await this.sendPushNotification({
        title: `🪔 ${festival.name} Reminder`,
        body: message,
        icon: "🎉",
        data: { type: "festival", festival: festival.name }
      });
    }
  }
  // Update notification preferences
  updatePreferences(newPreferences) {
    this.preferences = { ...this.preferences, ...newPreferences };
    localStorage.setItem("notificationPreferences", JSON.stringify(this.preferences));
  }
  // Load preferences from storage
  loadPreferences() {
    const saved = localStorage.getItem("notificationPreferences");
    if (saved) {
      this.preferences = { ...this.preferences, ...JSON.parse(saved) };
    }
  }
  // Get current notification settings
  getPreferences() {
    return { ...this.preferences };
  }
  // Test notification system
  async testNotification(memberId, type = "sms") {
    const member = familyMembers.find((m) => m.id === memberId);
    if (!member) {
      throw new Error("Member not found");
    }
    const testPayment = {
      id: "test",
      provider: "Test Service",
      type: "test",
      amount: 100,
      dueDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    const message = type === "sms" ? this.generateSMSMessage(testPayment, member, "reminder") : this.generateWhatsAppMessage(testPayment, member, "reminder");
    if (type === "sms") {
      await this.sendSMS(member.phoneNumber, message);
    } else {
      await this.sendWhatsApp(member.whatsappNumber, message);
    }
    return { success: true, message };
  }
}
const notificationService = new NotificationService();
if (typeof window !== "undefined") {
  notificationService.loadPreferences();
  notificationService.init();
}
export {
  totalYearlyRenewals as a,
  familyMembers as f,
  monthlyRecharges as m,
  totalMonthlyRecharges as t,
  yearlyRenewals as y
};
