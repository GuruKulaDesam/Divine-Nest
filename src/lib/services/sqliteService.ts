import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import initSqlJs from 'sql.js';

// SQLite service that works on both web and mobile
class SQLiteService {
  private sqlite: SQLiteConnection | null = null;
  private dbConnection: SQLiteDBConnection | null = null;
  private isWeb: boolean = false;
  private sqlJsDb: any = null;

  constructor() {
    // Defer platform detection to avoid SSR issues
    this.isWeb = typeof window !== 'undefined' && !Capacitor.isNativePlatform();
  }

  async initialize(): Promise<void> {
    try {
      if (this.isWeb) {
        await this.initializeWeb();
      } else {
        await this.initializeMobile();
      }
      console.log('SQLite service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize SQLite service:', error);
      throw error;
    }
  }

  private async initializeWeb(): Promise<void> {
    try {
      // Initialize SQL.js for web
      const SQL = await initSqlJs({
        locateFile: file => `https://sql.js.org/dist/${file}`
      });

      // Try to load existing database from localStorage
      const savedDbData = localStorage.getItem('divine_nest_db');
      if (savedDbData) {
        const dbArray = new Uint8Array(JSON.parse(savedDbData));
        this.sqlJsDb = new SQL.Database(dbArray);
      } else {
        this.sqlJsDb = new SQL.Database();
        await this.createTablesWeb();
      }

      console.log('Web SQLite initialized successfully');
    } catch (error) {
      console.error('Failed to initialize web SQLite:', error);
      throw error;
    }
  }

  private async initializeMobile(): Promise<void> {
    try {
      this.sqlite = new SQLiteConnection(CapacitorSQLite);
      this.dbConnection = await this.sqlite.createConnection(
        'divine_nest',
        false,
        'no-encryption',
        1,
        false
      );

      await this.dbConnection.open();
      await this.createTablesMobile();
      console.log('Mobile SQLite initialized successfully');
    } catch (error) {
      console.error('Failed to initialize mobile SQLite:', error);
      throw error;
    }
  }

  private async createTablesWeb(): Promise<void> {
    const tables = [
      `CREATE TABLE IF NOT EXISTS user_roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        role TEXT NOT NULL,
        dashboard TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS family_members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        relationship TEXT,
        phone TEXT,
        email TEXT,
        address TEXT,
        emergency_contact BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS reminders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        priority TEXT DEFAULT 'medium',
        due_date DATE,
        due_time TIME,
        completed BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS grocery_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT,
        in_stock BOOLEAN DEFAULT 1,
        market_mode BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS chores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        assigned_to TEXT,
        frequency TEXT,
        completed BOOLEAN DEFAULT 0,
        due_date DATE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      // Core application tables
      `CREATE TABLE IF NOT EXISTS issues (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('External', 'Internal')) NOT NULL,
        category TEXT CHECK(category IN ('Emergency', 'Urgents', 'Repairs', 'Maintenance', 'Upgrades', 'Other')) NOT NULL,
        sub_category TEXT,
        description TEXT NOT NULL,
        location_lat REAL,
        location_lng REAL,
        location_address TEXT,
        contact TEXT NOT NULL,
        preferred_resolution_date DATE,
        assigned_to TEXT,
        status TEXT CHECK(status IN ('Reported', 'Assigned', 'In Progress', 'Resolved')) DEFAULT 'Reported',
        created_by TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS requests (
        id TEXT PRIMARY KEY,
        category TEXT CHECK(category IN ('Emergency', 'Urgents', 'Repairs', 'Maintenance', 'Upgrades', 'Suggestion')) NOT NULL,
        sub_category TEXT,
        description TEXT NOT NULL,
        location_lat REAL,
        location_lng REAL,
        location_address TEXT,
        contact TEXT NOT NULL,
        preferred_resolution_date DATE,
        assigned_to TEXT,
        status TEXT CHECK(status IN ('Reported', 'Assigned', 'In Progress', 'Resolved')) DEFAULT 'Reported',
        affected_audience TEXT NOT NULL,
        created_by TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS foods (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Drinks')) NOT NULL,
        category TEXT CHECK(category IN ('South Indian', 'North Indian', 'Chinese', 'European', 'American')) NOT NULL,
        sub_category TEXT NOT NULL,
        ingredients TEXT NOT NULL,
        preparation_stage TEXT,
        mixing_stage TEXT,
        boiling_stage TEXT,
        ready_stage TEXT,
        schedule TEXT CHECK(schedule IN ('Weekly', 'Daily', 'Monthly', 'Annually', 'Festivally', 'Ad-Hoc')) DEFAULT 'Weekly',
        audience TEXT NOT NULL,
        health_factor TEXT,
        time_factor TEXT,
        cost_per_serving REAL,
        serving_definition TEXT,
        aroma_factor TEXT CHECK(aroma_factor IN ('Earthy', 'Floral', 'Spicy', 'Sweet', 'Neutral')) DEFAULT 'Neutral',
        taste_factor TEXT CHECK(taste_factor IN ('Spicy', 'Sweet', 'Sour', 'Salty', 'Bitter', 'Umami')) DEFAULT 'Neutral',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS inventory (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('Food Ingredient', 'Grocery', 'Toiletry', 'Pooja Item', 'Other')) NOT NULL,
        category TEXT CHECK(category IN ('Dry Goods', 'Fresh Produce', 'Spices', 'Cleaning', 'Personal Care', 'Ritual Supplies')) NOT NULL,
        sub_category TEXT,
        quantity_available REAL NOT NULL,
        unit TEXT CHECK(unit IN ('kg', 'g', 'litre', 'ml', 'pieces', 'packets')) NOT NULL,
        location TEXT,
        restock_threshold REAL,
        preferred_vendor TEXT,
        last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
        added_by TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('Duty', 'Responsibility', 'Ritual')) NOT NULL,
        category TEXT CHECK(category IN ('Self', 'Family', 'Parenting', 'Education', 'Health', 'Household', 'Spiritual')) NOT NULL,
        sub_category TEXT,
        description TEXT NOT NULL,
        assigned_to TEXT NOT NULL,
        mandatory BOOLEAN DEFAULT 0,
        frequency TEXT CHECK(frequency IN ('Daily', 'Weekly', 'Monthly', 'Yearly', 'Ad-Hoc')) DEFAULT 'Ad-Hoc',
        panchangam_link TEXT,
        time_of_day TEXT CHECK(time_of_day IN ('Morning', 'Afternoon', 'Evening', 'Night')),
        location TEXT,
        due_date DATE,
        alert_type TEXT CHECK(alert_type IN ('ToDo', 'SMS', 'Alarm', 'Notes')) DEFAULT 'ToDo',
        created_by TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS activities (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('Physical', 'Mental', 'Soulful')) NOT NULL,
        category TEXT CHECK(category IN ('Learning', 'Crafting', 'Sports', 'Meditation', 'Reading', 'Music', 'Art')) NOT NULL,
        sub_category TEXT,
        description TEXT NOT NULL,
        participant TEXT NOT NULL,
        frequency TEXT CHECK(frequency IN ('Daily', 'Weekly', 'Monthly', 'Ad-Hoc')) DEFAULT 'Ad-Hoc',
        location TEXT,
        time_of_day TEXT CHECK(time_of_day IN ('Morning', 'Afternoon', 'Evening', 'Night')),
        alert_type TEXT CHECK(alert_type IN ('Reminder', 'Alarm', 'None')) DEFAULT 'None',
        created_by TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS finance (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('Budget', 'Income', 'Expenses', 'Savings')) NOT NULL,
        category TEXT NOT NULL,
        sub_category TEXT,
        amount REAL NOT NULL,
        recurring TEXT CHECK(recurring IN ('None', 'By Period (Flexible)', 'By Period (Fixed)')) DEFAULT 'None',
        date DATE NOT NULL,
        actor TEXT NOT NULL,
        source TEXT CHECK(source IN ('Manual', 'Voice', 'SMS')) DEFAULT 'Manual',
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS rewards (
        id TEXT PRIMARY KEY,
        person TEXT NOT NULL,
        role TEXT CHECK(role IN ('Child', 'Adult')) NOT NULL,
        type TEXT CHECK(type IN ('Star', 'Karma')) NOT NULL,
        reason TEXT NOT NULL,
        points INTEGER NOT NULL,
        date DATE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS assets (
        id TEXT PRIMARY KEY,
        category TEXT CHECK(category IN ('Documents', 'Certificates', 'Photos', 'Valuables', 'Inventory', 'Vehicles', 'Land', 'Buildings', 'Software', 'Hardware')) NOT NULL,
        sub_category TEXT,
        name TEXT NOT NULL,
        description TEXT,
        location TEXT,
        owner TEXT,
        date_added DATE NOT NULL,
        tags TEXT, -- JSON array of tags
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS family (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('Nuclear', 'Joined', 'Independent')) NOT NULL,
        category TEXT CHECK(category IN ('Profile', 'Wisdom', 'Heritage', 'Tradition', 'Stories', 'Legacy', 'Success', 'Achievements', 'Certifications', 'Photos', 'Videos', 'Life Lessons', 'Rules', 'Virtues', 'Memories')) NOT NULL,
        sub_category TEXT CHECK(sub_category IN ('Members', 'Relatives', 'Friends', 'Neighbours', 'Life Lessons', 'Stories', 'Virtues', 'Legacy', 'Family Line', 'Traditions', 'Festivals', 'Celebrations', 'Certifications', 'Awards', 'Rewards', 'Success', 'Strict Guidelines', 'Mistakes to Avoid', 'Habits to Avoid', 'To Dos', 'Not To Dos', 'Occasions', 'Rituals', 'Functions', 'Moments')),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        date_time DATETIME NOT NULL,
        location TEXT,
        media_type TEXT CHECK(media_type IN ('Blog', 'Audio', 'Photo', 'Video')) NOT NULL,
        media_url TEXT,
        created_by TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS ai_prompts (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('Alert', 'Notes', 'Checklist', 'Query')) NOT NULL,
        category TEXT CHECK(category IN ('SMS', 'Email', 'Phone', 'Calendar Schedule', 'WhatsApp', 'Alarm')) NOT NULL,
        purpose TEXT NOT NULL,
        trigger_time DATETIME,
        trigger_location_lat REAL,
        trigger_location_lng REAL,
        trigger_radius_meters REAL,
        frequency TEXT CHECK(frequency IN ('Once', 'Daily', 'Weekly', 'Monthly', 'Custom')) DEFAULT 'Once',
        sound_type TEXT CHECK(sound_type IN ('Positive', 'Negative', 'Alarming', 'Pleasant')) DEFAULT 'Pleasant',
        volume_level TEXT CHECK(volume_level IN ('Low', 'Medium', 'High', 'Adaptive')) DEFAULT 'Medium',
        conditions TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        role TEXT CHECK(role IN ('Father', 'Mother', 'Child', 'Grandparent', 'Guest', 'Service Provider', 'Admin')) NOT NULL,
        name TEXT NOT NULL,
        nick_name TEXT,
        email TEXT NOT NULL UNIQUE,
        location TEXT,
        joined_date DATE NOT NULL,
        picture_url TEXT,
        auth_provider TEXT CHECK(auth_provider IN ('Google', 'Facebook', 'Manual')) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      // Dynamic tables
      `CREATE TABLE IF NOT EXISTS alerts (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('SMS', 'WhatsApp', 'Email', 'Alarm')) NOT NULL,
        recipient TEXT NOT NULL,
        message TEXT NOT NULL,
        related_table TEXT NOT NULL,
        related_id TEXT NOT NULL,
        trigger_time DATETIME NOT NULL,
        sent_at DATETIME,
        status TEXT CHECK(status IN ('Pending', 'Sent', 'Failed')) DEFAULT 'Pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS directory (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT CHECK(type IN ('Service Provider', 'Family Member', 'Vendor', 'Professional')) NOT NULL,
        category TEXT CHECK(category IN ('Emergency', 'Urgents', 'Repairs', 'Maintenance', 'Upgrades', 'Food', 'Health', 'Education', 'Other')) NOT NULL,
        sub_category TEXT,
        phone TEXT,
        email TEXT,
        address TEXT,
        location_lat REAL,
        location_lng REAL,
        rating REAL,
        notes TEXT,
        last_contacted DATE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('SMS', 'WhatsApp', 'Email', 'Alarm')) NOT NULL,
        recipient TEXT NOT NULL,
        message TEXT NOT NULL,
        related_to TEXT, -- issueId, activityId, etc.
        sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    ];

    for (const table of tables) {
      this.sqlJsDb.run(table);
    }

    // Save initial database to localStorage
    this.saveWebDatabase();
  }

  private async createTablesMobile(): Promise<void> {
    if (!this.dbConnection) throw new Error('Database not initialized');

    const tables = [
      `CREATE TABLE IF NOT EXISTS user_roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        role TEXT NOT NULL,
        dashboard TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS family_members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        relationship TEXT,
        phone TEXT,
        email TEXT,
        address TEXT,
        emergency_contact BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS reminders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        priority TEXT DEFAULT 'medium',
        due_date DATE,
        due_time TIME,
        completed BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS grocery_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT,
        in_stock BOOLEAN DEFAULT 1,
        market_mode BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS chores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        assigned_to TEXT,
        frequency TEXT,
        completed BOOLEAN DEFAULT 0,
        due_date DATE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      // Core application tables
      `CREATE TABLE IF NOT EXISTS issues (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('External', 'Internal')) NOT NULL,
        category TEXT CHECK(category IN ('Emergency', 'Urgents', 'Repairs', 'Maintenance', 'Upgrades', 'Other')) NOT NULL,
        sub_category TEXT,
        description TEXT NOT NULL,
        location_lat REAL,
        location_lng REAL,
        location_address TEXT,
        contact TEXT NOT NULL,
        preferred_resolution_date DATE,
        assigned_to TEXT,
        status TEXT CHECK(status IN ('Reported', 'Assigned', 'In Progress', 'Resolved')) DEFAULT 'Reported',
        created_by TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS requests (
        id TEXT PRIMARY KEY,
        category TEXT CHECK(category IN ('Emergency', 'Urgents', 'Repairs', 'Maintenance', 'Upgrades', 'Suggestion')) NOT NULL,
        sub_category TEXT,
        description TEXT NOT NULL,
        location_lat REAL,
        location_lng REAL,
        location_address TEXT,
        contact TEXT NOT NULL,
        preferred_resolution_date DATE,
        assigned_to TEXT,
        status TEXT CHECK(status IN ('Reported', 'Assigned', 'In Progress', 'Resolved')) DEFAULT 'Reported',
        affected_audience TEXT NOT NULL,
        created_by TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS foods (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Drinks')) NOT NULL,
        category TEXT CHECK(category IN ('South Indian', 'North Indian', 'Chinese', 'European', 'American')) NOT NULL,
        sub_category TEXT NOT NULL,
        ingredients TEXT NOT NULL,
        preparation_stage TEXT,
        mixing_stage TEXT,
        boiling_stage TEXT,
        ready_stage TEXT,
        schedule TEXT CHECK(schedule IN ('Weekly', 'Daily', 'Monthly', 'Annually', 'Festivally', 'Ad-Hoc')) DEFAULT 'Weekly',
        audience TEXT NOT NULL,
        health_factor TEXT,
        time_factor TEXT,
        cost_per_serving REAL,
        serving_definition TEXT,
        aroma_factor TEXT CHECK(aroma_factor IN ('Earthy', 'Floral', 'Spicy', 'Sweet', 'Neutral')) DEFAULT 'Neutral',
        taste_factor TEXT CHECK(taste_factor IN ('Spicy', 'Sweet', 'Sour', 'Salty', 'Bitter', 'Umami')) DEFAULT 'Neutral',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS inventory (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('Food Ingredient', 'Grocery', 'Toiletry', 'Pooja Item', 'Other')) NOT NULL,
        category TEXT CHECK(category IN ('Dry Goods', 'Fresh Produce', 'Spices', 'Cleaning', 'Personal Care', 'Ritual Supplies')) NOT NULL,
        sub_category TEXT,
        quantity_available REAL NOT NULL,
        unit TEXT CHECK(unit IN ('kg', 'g', 'litre', 'ml', 'pieces', 'packets')) NOT NULL,
        location TEXT,
        restock_threshold REAL,
        preferred_vendor TEXT,
        last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
        added_by TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('Duty', 'Responsibility', 'Ritual')) NOT NULL,
        category TEXT CHECK(category IN ('Self', 'Family', 'Parenting', 'Education', 'Health', 'Household', 'Spiritual')) NOT NULL,
        sub_category TEXT,
        description TEXT NOT NULL,
        assigned_to TEXT NOT NULL,
        mandatory BOOLEAN DEFAULT 0,
        frequency TEXT CHECK(frequency IN ('Daily', 'Weekly', 'Monthly', 'Yearly', 'Ad-Hoc')) DEFAULT 'Ad-Hoc',
        panchangam_link TEXT,
        time_of_day TEXT CHECK(time_of_day IN ('Morning', 'Afternoon', 'Evening', 'Night')),
        location TEXT,
        due_date DATE,
        alert_type TEXT CHECK(alert_type IN ('ToDo', 'SMS', 'Alarm', 'Notes')) DEFAULT 'ToDo',
        created_by TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS activities (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('Physical', 'Mental', 'Soulful')) NOT NULL,
        category TEXT CHECK(category IN ('Learning', 'Crafting', 'Sports', 'Meditation', 'Reading', 'Music', 'Art')) NOT NULL,
        sub_category TEXT,
        description TEXT NOT NULL,
        participant TEXT NOT NULL,
        frequency TEXT CHECK(frequency IN ('Daily', 'Weekly', 'Monthly', 'Ad-Hoc')) DEFAULT 'Ad-Hoc',
        location TEXT,
        time_of_day TEXT CHECK(time_of_day IN ('Morning', 'Afternoon', 'Evening', 'Night')),
        alert_type TEXT CHECK(alert_type IN ('Reminder', 'Alarm', 'None')) DEFAULT 'None',
        created_by TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS finance (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('Budget', 'Income', 'Expenses', 'Savings')) NOT NULL,
        category TEXT NOT NULL,
        sub_category TEXT,
        amount REAL NOT NULL,
        recurring TEXT CHECK(recurring IN ('None', 'By Period (Flexible)', 'By Period (Fixed)')) DEFAULT 'None',
        date DATE NOT NULL,
        actor TEXT NOT NULL,
        source TEXT CHECK(source IN ('Manual', 'Voice', 'SMS')) DEFAULT 'Manual',
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS rewards (
        id TEXT PRIMARY KEY,
        person TEXT NOT NULL,
        role TEXT CHECK(role IN ('Child', 'Adult')) NOT NULL,
        type TEXT CHECK(type IN ('Star', 'Karma')) NOT NULL,
        reason TEXT NOT NULL,
        points INTEGER NOT NULL,
        date DATE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS assets (
        id TEXT PRIMARY KEY,
        category TEXT CHECK(category IN ('Documents', 'Certificates', 'Photos', 'Valuables', 'Inventory', 'Vehicles', 'Land', 'Buildings', 'Software', 'Hardware')) NOT NULL,
        sub_category TEXT,
        name TEXT NOT NULL,
        description TEXT,
        location TEXT,
        owner TEXT,
        date_added DATE NOT NULL,
        tags TEXT, -- JSON array of tags
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS family (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('Nuclear', 'Joined', 'Independent')) NOT NULL,
        category TEXT CHECK(category IN ('Profile', 'Wisdom', 'Heritage', 'Tradition', 'Stories', 'Legacy', 'Success', 'Achievements', 'Certifications', 'Photos', 'Videos', 'Life Lessons', 'Rules', 'Virtues', 'Memories')) NOT NULL,
        sub_category TEXT CHECK(sub_category IN ('Members', 'Relatives', 'Friends', 'Neighbours', 'Life Lessons', 'Stories', 'Virtues', 'Legacy', 'Family Line', 'Traditions', 'Festivals', 'Celebrations', 'Certifications', 'Awards', 'Rewards', 'Success', 'Strict Guidelines', 'Mistakes to Avoid', 'Habits to Avoid', 'To Dos', 'Not To Dos', 'Occasions', 'Rituals', 'Functions', 'Moments')),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        date_time DATETIME NOT NULL,
        location TEXT,
        media_type TEXT CHECK(media_type IN ('Blog', 'Audio', 'Photo', 'Video')) NOT NULL,
        media_url TEXT,
        created_by TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS ai_prompts (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('Alert', 'Notes', 'Checklist', 'Query')) NOT NULL,
        category TEXT CHECK(category IN ('SMS', 'Email', 'Phone', 'Calendar Schedule', 'WhatsApp', 'Alarm')) NOT NULL,
        purpose TEXT NOT NULL,
        trigger_time DATETIME,
        trigger_location_lat REAL,
        trigger_location_lng REAL,
        trigger_radius_meters REAL,
        frequency TEXT CHECK(frequency IN ('Once', 'Daily', 'Weekly', 'Monthly', 'Custom')) DEFAULT 'Once',
        sound_type TEXT CHECK(sound_type IN ('Positive', 'Negative', 'Alarming', 'Pleasant')) DEFAULT 'Pleasant',
        volume_level TEXT CHECK(volume_level IN ('Low', 'Medium', 'High', 'Adaptive')) DEFAULT 'Medium',
        conditions TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        role TEXT CHECK(role IN ('Father', 'Mother', 'Child', 'Grandparent', 'Guest', 'Service Provider', 'Admin')) NOT NULL,
        name TEXT NOT NULL,
        nick_name TEXT,
        email TEXT NOT NULL UNIQUE,
        location TEXT,
        joined_date DATE NOT NULL,
        picture_url TEXT,
        auth_provider TEXT CHECK(auth_provider IN ('Google', 'Facebook', 'Manual')) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      // Dynamic tables
      `CREATE TABLE IF NOT EXISTS alerts (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('SMS', 'WhatsApp', 'Email', 'Alarm')) NOT NULL,
        recipient TEXT NOT NULL,
        message TEXT NOT NULL,
        related_table TEXT NOT NULL,
        related_id TEXT NOT NULL,
        trigger_time DATETIME NOT NULL,
        sent_at DATETIME,
        status TEXT CHECK(status IN ('Pending', 'Sent', 'Failed')) DEFAULT 'Pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS directory (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT CHECK(type IN ('Service Provider', 'Family Member', 'Vendor', 'Professional')) NOT NULL,
        category TEXT CHECK(category IN ('Emergency', 'Urgents', 'Repairs', 'Maintenance', 'Upgrades', 'Food', 'Health', 'Education', 'Other')) NOT NULL,
        sub_category TEXT,
        phone TEXT,
        email TEXT,
        address TEXT,
        location_lat REAL,
        location_lng REAL,
        rating REAL,
        notes TEXT,
        last_contacted DATE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('SMS', 'WhatsApp', 'Email', 'Alarm')) NOT NULL,
        recipient TEXT NOT NULL,
        message TEXT NOT NULL,
        related_to TEXT, -- issueId, activityId, etc.
        sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    ];

    for (const table of tables) {
      await this.dbConnection.execute(table);
    }
  }

  private saveWebDatabase(): void {
    if (this.sqlJsDb && this.isWeb) {
      try {
        const data = this.sqlJsDb.export();
        const buffer = Array.from(data);
        localStorage.setItem('divine_nest_db', JSON.stringify(buffer));
      } catch (error) {
        console.error('Failed to save web database:', error);
      }
    }
  }

  // Generic query methods
  async executeQuery(query: string, params: any[] = []): Promise<any[]> {
    try {
      if (this.isWeb) {
        return this.executeWebQuery(query, params);
      } else {
        return await this.executeMobileQuery(query, params);
      }
    } catch (error) {
      console.error('Query execution failed:', error);
      throw error;
    }
  }

  private executeWebQuery(query: string, params: any[] = []): any[] {
    if (!this.sqlJsDb) throw new Error('Web database not initialized');

    try {
      const stmt = this.sqlJsDb.prepare(query);
      const results: any[] = [];

      if (params.length > 0) {
        stmt.bind(params);
      }

      while (stmt.step()) {
        results.push(stmt.getAsObject());
      }

      stmt.free();
      this.saveWebDatabase(); // Save after modifications
      return results;
    } catch (error) {
      console.error('Web query failed:', error);
      throw error;
    }
  }

  private async executeMobileQuery(query: string, params: any[] = []): Promise<any[]> {
    if (!this.dbConnection) throw new Error('Mobile database not initialized');

    try {
      const result = await this.dbConnection.query(query, params);
      return result.values || [];
    } catch (error) {
      console.error('Mobile query failed:', error);
      throw error;
    }
  }

  async executeStatement(statement: string, params: any[] = []): Promise<void> {
    try {
      if (this.isWeb) {
        this.executeWebStatement(statement, params);
      } else {
        await this.executeMobileStatement(statement, params);
      }
    } catch (error) {
      console.error('Statement execution failed:', error);
      throw error;
    }
  }

  private executeWebStatement(statement: string, params: any[] = []): void {
    if (!this.sqlJsDb) throw new Error('Web database not initialized');

    try {
      const stmt = this.sqlJsDb.prepare(statement);
      if (params.length > 0) {
        stmt.bind(params);
      }
      stmt.step();
      stmt.free();
      this.saveWebDatabase(); // Save after modifications
    } catch (error) {
      console.error('Web statement failed:', error);
      throw error;
    }
  }

  private async executeMobileStatement(statement: string, params: any[] = []): Promise<void> {
    if (!this.dbConnection) throw new Error('Mobile database not initialized');

    try {
      if (params.length > 0) {
        // For parameterized statements (INSERT, UPDATE, DELETE)
        await this.dbConnection.run(statement, params);
      } else {
        // For DDL statements (CREATE TABLE, etc.)
        await this.dbConnection.execute(statement);
      }
    } catch (error) {
      console.error('Mobile statement failed:', error);
      throw error;
    }
  }

  // Sample data population method
  async populateSampleData(): Promise<void> {
    try {
      const { sampleData } = await import('$lib/sampleData');

      // Insert sample data for each table
      for (const issue of sampleData.issues) {
        await this.executeStatement(
          `INSERT OR IGNORE INTO issues (id, type, category, sub_category, description, location_lat, location_lng, location_address, contact, preferred_resolution_date, assigned_to, status, created_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [issue.id, issue.type, issue.category, issue.sub_category, issue.description, issue.location_lat, issue.location_lng, issue.location_address, issue.contact, issue.preferred_resolution_date, issue.assigned_to, issue.status, issue.created_by, issue.created_at, issue.updated_at]
        );
      }

      for (const request of sampleData.requests) {
        await this.executeStatement(
          `INSERT OR IGNORE INTO requests (id, category, sub_category, description, location_lat, location_lng, location_address, contact, preferred_resolution_date, assigned_to, status, affected_audience, created_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [request.id, request.category, request.sub_category, request.description, request.location_lat, request.location_lng, request.location_address, request.contact, request.preferred_resolution_date, request.assigned_to, request.status, request.affected_audience, request.created_by, request.created_at, request.updated_at]
        );
      }

      for (const food of sampleData.foods) {
        await this.executeStatement(
          `INSERT OR IGNORE INTO foods (id, type, category, sub_category, ingredients, preparation_stage, mixing_stage, boiling_stage, ready_stage, schedule, audience, health_factor, time_factor, cost_per_serving, serving_definition, aroma_factor, taste_factor, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [food.id, food.type, food.category, food.sub_category, food.ingredients, food.preparation_stage, food.mixing_stage, food.boiling_stage, food.ready_stage, food.schedule, food.audience, food.health_factor, food.time_factor, food.cost_per_serving, food.serving_definition, food.aroma_factor, food.taste_factor, food.created_at]
        );
      }

      for (const item of sampleData.inventory) {
        await this.executeStatement(
          `INSERT OR IGNORE INTO inventory (id, type, category, sub_category, quantity_available, unit, location, restock_threshold, preferred_vendor, last_updated, added_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [item.id, item.type, item.category, item.sub_category, item.quantity_available, item.unit, item.location, item.restock_threshold, item.preferred_vendor, item.last_updated, item.added_by, item.created_at]
        );
      }

      for (const task of sampleData.tasks) {
        await this.executeStatement(
          `INSERT OR IGNORE INTO tasks (id, type, category, sub_category, description, assigned_to, mandatory, frequency, panchangam_link, time_of_day, location, due_date, alert_type, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [task.id, task.type, task.category, task.sub_category, task.description, task.assigned_to, task.mandatory, task.frequency, task.panchangam_link, task.time_of_day, task.location, task.due_date, task.alert_type, task.created_by, task.created_at]
        );
      }

      for (const activity of sampleData.activities) {
        await this.executeStatement(
          `INSERT OR IGNORE INTO activities (id, type, category, sub_category, description, participant, frequency, location, time_of_day, alert_type, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [activity.id, activity.type, activity.category, activity.sub_category, activity.description, activity.participant, activity.frequency, activity.location, activity.time_of_day, activity.alert_type, activity.created_by, activity.created_at]
        );
      }

      for (const finance of sampleData.finance) {
        await this.executeStatement(
          `INSERT OR IGNORE INTO finance (id, type, category, sub_category, amount, recurring, date, actor, source, notes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [finance.id, finance.type, finance.category, finance.sub_category, finance.amount, finance.recurring, finance.date, finance.actor, finance.source, finance.notes, finance.created_at]
        );
      }

      for (const reward of sampleData.rewards) {
        await this.executeStatement(
          `INSERT OR IGNORE INTO rewards (id, person, role, type, reason, points, date, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [reward.id, reward.person, reward.role, reward.type, reward.reason, reward.points, reward.date, reward.created_at]
        );
      }

      for (const asset of sampleData.assets) {
        await this.executeStatement(
          `INSERT OR IGNORE INTO assets (id, category, sub_category, name, description, location, owner, date_added, tags, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [asset.id, asset.category, asset.sub_category, asset.name, asset.description, asset.location, asset.owner, asset.date_added, asset.tags, asset.created_at]
        );
      }

      for (const family of sampleData.family) {
        await this.executeStatement(
          `INSERT OR IGNORE INTO family (id, type, category, sub_category, title, description, date_time, location, media_type, media_url, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [family.id, family.type, family.category, family.sub_category, family.title, family.description, family.date_time, family.location, family.media_type, family.media_url, family.created_by, family.created_at]
        );
      }

      for (const prompt of sampleData.ai_prompts) {
        await this.executeStatement(
          `INSERT OR IGNORE INTO ai_prompts (id, type, category, purpose, trigger_time, trigger_location_lat, trigger_location_lng, trigger_radius_meters, frequency, sound_type, volume_level, conditions, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [prompt.id, prompt.type, prompt.category, prompt.purpose, prompt.trigger_time, prompt.trigger_location_lat, prompt.trigger_location_lng, prompt.trigger_radius_meters, prompt.frequency, prompt.sound_type, prompt.volume_level, prompt.conditions, prompt.created_at]
        );
      }

      for (const user of sampleData.users) {
        await this.executeStatement(
          `INSERT OR IGNORE INTO users (id, role, name, nick_name, email, location, joined_date, picture_url, auth_provider, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [user.id, user.role, user.name, user.nick_name, user.email, user.location, user.joined_date, user.picture_url, user.auth_provider, user.created_at]
        );
      }

      for (const alert of sampleData.alerts) {
        await this.executeStatement(
          `INSERT OR IGNORE INTO alerts (id, type, recipient, message, related_table, related_id, trigger_time, sent_at, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [alert.id, alert.type, alert.recipient, alert.message, alert.related_table, alert.related_id, alert.trigger_time, alert.sent_at, alert.status, alert.created_at]
        );
      }

      for (const contact of sampleData.directory) {
        await this.executeStatement(
          `INSERT OR IGNORE INTO directory (id, name, type, category, sub_category, phone, email, address, location_lat, location_lng, rating, notes, last_contacted, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [contact.id, contact.name, contact.type, contact.category, contact.sub_category, contact.phone, contact.email, contact.address, contact.location_lat, contact.location_lng, contact.rating, contact.notes, contact.last_contacted, contact.created_at]
        );
      }

      console.log('Sample data populated successfully');
    } catch (error) {
      console.error('Error populating sample data:', error);
      throw error;
    }
  }

  async getUserRole(): Promise<{role: string, user_id: string} | null> {
    const results = await this.executeQuery('SELECT role, user_id FROM user_roles LIMIT 1');
    return results.length > 0 ? results[0] : null;
  }

  async saveUserRole(role: string, userId: string): Promise<void> {
    try {
      // First try to update existing record
      const updateResult = await this.executeQuery(
        'UPDATE user_roles SET role = ?, updated_at = ? WHERE user_id = ?',
        [role, new Date().toISOString(), userId]
      );
      
      if (updateResult.length === 0 || (updateResult[0] as any).changes === 0) {
        // No existing record, insert new one
        await this.executeQuery(
          'INSERT INTO user_roles (role, user_id, created_at, updated_at) VALUES (?, ?, ?, ?)',
          [role, userId, new Date().toISOString(), new Date().toISOString()]
        );
      }
    } catch (error) {
      console.error('Error saving user role:', error);
      throw error;
    }
  }

  // Family Members methods
  async saveFamilyMember(member: {
    name: string;
    relationship: string;
    phone?: string;
    email?: string;
    address?: string;
    emergency_contact?: boolean;
  }): Promise<number> {
    const result = await this.executeQuery(
      `INSERT INTO family_members (name, relationship, phone, email, address, emergency_contact)
       VALUES (?, ?, ?, ?, ?, ?) RETURNING id`,
      [member.name, member.relationship, member.phone || null, member.email || null,
       member.address || null, member.emergency_contact ? 1 : 0]
    );
    return result[0]?.id;
  }

  async getFamilyMembers(): Promise<any[]> {
    return await this.executeQuery('SELECT * FROM family_members ORDER BY name');
  }

  // Reminders methods
  async saveReminder(reminder: {
    title: string;
    description?: string;
    priority?: string;
    due_date?: string;
    due_time?: string;
  }): Promise<number> {
    const result = await this.executeQuery(
      `INSERT INTO reminders (title, description, priority, due_date, due_time)
       VALUES (?, ?, ?, ?, ?) RETURNING id`,
      [reminder.title, reminder.description || null, reminder.priority || 'medium',
       reminder.due_date || null, reminder.due_time || null]
    );
    return result[0]?.id;
  }

  async getReminders(): Promise<any[]> {
    return await this.executeQuery('SELECT * FROM reminders ORDER BY due_date, due_time');
  }

  async updateReminder(id: number, updates: any): Promise<void> {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    await this.executeStatement(
      `UPDATE reminders SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
  }

  async deleteReminder(id: number): Promise<void> {
    await this.executeStatement('DELETE FROM reminders WHERE id = ?', [id]);
  }

  // Grocery methods
  async saveGroceryItem(item: {
    name: string;
    category?: string;
    in_stock?: boolean;
    market_mode?: boolean;
  }): Promise<number> {
    const result = await this.executeQuery(
      `INSERT INTO grocery_items (name, category, in_stock, market_mode)
       VALUES (?, ?, ?, ?) RETURNING id`,
      [item.name, item.category || null, item.in_stock ? 1 : 0, item.market_mode ? 1 : 0]
    );
    return result[0]?.id;
  }

  async getGroceryItems(): Promise<any[]> {
    return await this.executeQuery('SELECT * FROM grocery_items ORDER BY name');
  }

  async updateGroceryItem(id: number, updates: any): Promise<void> {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    await this.executeStatement(
      `UPDATE grocery_items SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
  }

  async deleteGroceryItem(id: number): Promise<void> {
    await this.executeStatement('DELETE FROM grocery_items WHERE id = ?', [id]);
  }

  // Chores methods
  async saveChore(chore: {
    title: string;
    assigned_to?: string;
    frequency?: string;
    due_date?: string;
  }): Promise<number> {
    const result = await this.executeQuery(
      `INSERT INTO chores (title, assigned_to, frequency, due_date)
       VALUES (?, ?, ?, ?) RETURNING id`,
      [chore.title, chore.assigned_to || null, chore.frequency || null, chore.due_date || null]
    );
    return result[0]?.id;
  }

  async getChores(): Promise<any[]> {
    return await this.executeQuery('SELECT * FROM chores ORDER BY due_date, title');
  }

  async updateChore(id: number, updates: any): Promise<void> {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    await this.executeStatement(
      `UPDATE chores SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
  }

  async deleteChore(id: number): Promise<void> {
    await this.executeStatement('DELETE FROM chores WHERE id = ?', [id]);
  }

  // Foods methods
  async saveFood(food: any): Promise<number> {
    const result = await this.executeQuery(
      `INSERT INTO foods (type, category, sub_category, ingredients, preparation_stage, mixing_stage, boiling_stage, ready_stage, schedule, audience, health_factor, time_factor, cost_per_serving, serving_definition, aroma_factor, taste_factor)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
      [food.type, food.category, food.sub_category, food.ingredients, food.preparation_stage, food.mixing_stage, food.boiling_stage, food.ready_stage, food.schedule, food.audience, food.health_factor, food.time_factor, food.cost_per_serving, food.serving_definition, food.aroma_factor, food.taste_factor]
    );
    return result[0]?.id;
  }

  async getFoods(): Promise<any[]> {
    return await this.executeQuery('SELECT * FROM foods ORDER BY type, category');
  }

  async updateFood(id: number, updates: any): Promise<void> {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    await this.executeStatement(
      `UPDATE foods SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
  }

  async deleteFood(id: number): Promise<void> {
    await this.executeStatement('DELETE FROM foods WHERE id = ?', [id]);
  }

  // Inventory methods
  async saveInventoryItem(item: any): Promise<number> {
    const result = await this.executeQuery(
      `INSERT INTO inventory (type, category, sub_category, quantity_available, unit, location, restock_threshold, preferred_vendor)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
      [item.type, item.category, item.sub_category, item.quantity_available, item.unit, item.location, item.restock_threshold, item.preferred_vendor]
    );
    return result[0]?.id;
  }

  async getInventoryItems(): Promise<any[]> {
    return await this.executeQuery('SELECT * FROM inventory ORDER BY type, category');
  }

  async updateInventoryItem(id: number, updates: any): Promise<void> {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    await this.executeStatement(
      `UPDATE inventory SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
  }

  async deleteInventoryItem(id: number): Promise<void> {
    await this.executeStatement('DELETE FROM inventory WHERE id = ?', [id]);
  }

  // Tasks/Todos methods
  async getTodos(): Promise<any[]> {
    return await this.executeQuery('SELECT * FROM todos ORDER BY created_at DESC');
  }

  async saveTodo(todo: any): Promise<void> {
    const { title, description, category, priority, dueDate, completed } = todo;
    await this.executeStatement(
      `INSERT INTO todos (title, description, category, priority, due_date, completed, created_at)
       VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
      [title, description || '', category || 'general', priority || 'medium', dueDate || null, completed || 0]
    );
  }

  async updateTodo(id: number, updates: any): Promise<void> {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    await this.executeStatement(
      `UPDATE todos SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
  }

  async deleteTodo(id: number): Promise<void> {
    await this.executeStatement('DELETE FROM todos WHERE id = ?', [id]);
  }

  // Recipes methods
  async getRecipes(): Promise<any[]> {
    return await this.executeQuery('SELECT * FROM recipes ORDER BY name');
  }

  async saveRecipe(recipe: any): Promise<void> {
    const { name, ingredients, instructions, cuisine, prepTime, cookTime } = recipe;
    await this.executeStatement(
      `INSERT INTO recipes (name, ingredients, instructions, cuisine, prep_time, cook_time, created_at)
       VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
      [name, ingredients || '', instructions || '', cuisine || 'general', prepTime || null, cookTime || null]
    );
  }

  async updateRecipe(id: number, updates: any): Promise<void> {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    await this.executeStatement(
      `UPDATE recipes SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
  }

  async deleteRecipe(id: number): Promise<void> {
    await this.executeStatement('DELETE FROM recipes WHERE id = ?', [id]);
  }

  // Requests methods
  async getRequests(): Promise<any[]> {
    return await this.executeQuery('SELECT * FROM requests ORDER BY created_at DESC');
  }

  async saveRequest(request: any): Promise<void> {
    const { title, description, category, priority, status, requestedBy } = request;
    await this.executeStatement(
      `INSERT INTO requests (title, description, category, priority, status, requested_by, created_at)
       VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
      [title, description || '', category || 'general', priority || 'medium', status || 'pending', requestedBy || null]
    );
  }

  async updateRequest(id: number, updates: any): Promise<void> {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    await this.executeStatement(
      `UPDATE requests SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
  }

  async deleteRequest(id: number): Promise<void> {
    await this.executeStatement('DELETE FROM requests WHERE id = ?', [id]);
  }

  // Cleanup
  async close(): Promise<void> {
    try {
      if (this.isWeb) {
        if (this.sqlJsDb) {
          this.saveWebDatabase();
          this.sqlJsDb.close();
        }
      } else {
        if (this.dbConnection) {
          await this.dbConnection.close();
        }
        if (this.sqlite) {
          await this.sqlite.closeConnection('divine_nest', false);
        }
      }
      console.log('SQLite service closed successfully');
    } catch (error) {
      console.error('Failed to close SQLite service:', error);
    }
  }

  // Public method to close the connection (alias for close)
  async closeConnection(): Promise<void> {
    await this.close();
  }
}

// Export singleton instance
export const sqliteService = new SQLiteService();
export default sqliteService;