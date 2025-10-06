// Notification Service for South Indian Family App
// Handles SMS, WhatsApp, and in-app notifications

import { familyMembers, monthlyRecharges, yearlyRenewals, notificationTemplates } from '../data/family.js';

class NotificationService {
  constructor() {
    this.apiKeys = {
      twilio: null, // Set your Twilio API key
      firebase: null, // Set your Firebase Cloud Messaging key
      whatsapp: null  // Set your WhatsApp Business API key
    };
    
    this.notificationQueue = [];
    this.sentNotifications = [];
    this.preferences = {
      enableSMS: true,
      enableWhatsApp: true,
      enablePush: true,
      reminderDaysBefore: [7, 3, 1], // Send reminders 7, 3, and 1 days before due date
      overdueReminders: true,
      festivalReminders: true
    };
  }

  // Initialize the service
  init() {
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

  // Create reminder notification
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
    localStorage.setItem('notificationPreferences', JSON.stringify(this.preferences));
  }

  // Load preferences from storage
  loadPreferences() {
    const saved = localStorage.getItem('notificationPreferences');
    if (saved) {
      this.preferences = { ...this.preferences, ...JSON.parse(saved) };
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