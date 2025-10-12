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
      await this.dbConnection.execute(statement, params);
    } catch (error) {
      console.error('Mobile statement failed:', error);
      throw error;
    }
  }

  // User Role methods
  async saveUserRole(role: string, dashboard: string): Promise<void> {
    await this.executeStatement(
      'INSERT OR REPLACE INTO user_roles (id, role, dashboard) VALUES (1, ?, ?)',
      [role, dashboard]
    );
  }

  async getUserRole(): Promise<{role: string, dashboard: string} | null> {
    const results = await this.executeQuery('SELECT role, dashboard FROM user_roles WHERE id = 1');
    return results.length > 0 ? results[0] : null;
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
          await this.sqlite.closeConnection('divine_nest');
        }
      }
      console.log('SQLite service closed successfully');
    } catch (error) {
      console.error('Failed to close SQLite service:', error);
    }
  }
}

// Export singleton instance
export const sqliteService = new SQLiteService();
export default sqliteService;