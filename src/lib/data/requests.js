import Dexie from 'dexie';

// Database for Home Service Requests
class RequestsDatabase extends Dexie {
  constructor() {
    super('RequestsDB');
    this.version(1).stores({
      requests: '++id, title, type, priority, status, dateCreated, dateCompleted, location, estimatedCost, actualCost'
    });
  }
}

export const requestsDB = new RequestsDatabase();

// Request service functions
export const requestsService = {
  // Get all requests
  async getAll() {
    return await requestsDB.requests.orderBy('dateCreated').reverse().toArray();
  },

  // Add new request
  async add(request) {
    return await requestsDB.requests.add({
      ...request,
      dateCreated: request.dateCreated || new Date().toISOString(),
      status: request.status || 'pending'
    });
  },

  // Update request
  async update(id, updates) {
    return await requestsDB.requests.update(id, updates);
  },

  // Delete request
  async delete(id) {
    return await requestsDB.requests.delete(id);
  },

  // Get requests by type
  async getByType(type) {
    return await requestsDB.requests.where('type').equals(type).toArray();
  },

  // Get requests by status
  async getByStatus(status) {
    return await requestsDB.requests.where('status').equals(status).toArray();
  },

  // Get requests by priority
  async getByPriority(priority) {
    return await requestsDB.requests.where('priority').equals(priority).toArray();
  },

  // Get emergency requests
  async getEmergencyRequests() {
    return await requestsDB.requests.where('priority').equals('urgent').toArray();
  },

  // Get maintenance schedule
  async getMaintenanceSchedule() {
    return await requestsDB.requests.where('type').equals('maintenance').toArray();
  }
};

// Sample data for initial population
export const sampleRequests = [
  {
    id: "1",
    title: "Kitchen Faucet Leak",
    type: "repairs",
    priority: "high",
    description: "Water leaking from base of kitchen faucet, getting worse daily",
    location: "Kitchen",
    estimatedCost: "150",
    actualCost: "",
    preferredDate: "2025-10-07",
    contactPerson: "John Smith Plumbing",
    phone: "(555) 123-4567",
    notes: "Available weekdays after 2pm",
    status: "pending",
    dateCreated: "2025-10-05T10:30:00.000Z",
    dateCompleted: null
  },
  {
    id: "2",
    title: "Smoke Detector Battery",
    type: "maintenance",
    priority: "medium",
    description: "Replace batteries in all smoke detectors throughout house",
    location: "Whole House",
    estimatedCost: "50",
    actualCost: "45",
    preferredDate: "2025-10-15",
    contactPerson: "Self",
    phone: "",
    notes: "Need 9V batteries, check expiration dates",
    status: "completed",
    dateCreated: "2025-09-28T14:20:00.000Z",
    dateCompleted: "2025-10-02T16:45:00.000Z"
  },
  {
    id: "3",
    title: "Electrical Outlet Not Working",
    type: "emergency",
    priority: "urgent",
    description: "Master bedroom outlet stopped working, may be electrical issue",
    location: "Master Bedroom",
    estimatedCost: "200",
    actualCost: "",
    preferredDate: "2025-10-06",
    contactPerson: "Ace Electric Services",
    phone: "(555) 987-6543",
    notes: "URGENT - No power to outlet, possible fire hazard",
    status: "in-progress",
    dateCreated: "2025-10-05T18:45:00.000Z",
    dateCompleted: null
  },
  {
    id: "4",
    title: "Smart Thermostat Installation",
    type: "upgrades",
    priority: "low",
    description: "Install new smart thermostat to replace old manual unit",
    location: "Hallway",
    estimatedCost: "350",
    actualCost: "",
    preferredDate: "2025-10-20",
    contactPerson: "HVAC Plus",
    phone: "(555) 456-7890",
    notes: "Nest thermostat ordered, need C-wire installation",
    status: "pending",
    dateCreated: "2025-10-03T09:15:00.000Z",
    dateCompleted: null
  },
  {
    id: "5",
    title: "Gutter Cleaning",
    type: "maintenance",
    priority: "medium",
    description: "Clean all gutters and downspouts, check for damage",
    location: "Exterior",
    estimatedCost: "120",
    actualCost: "",
    preferredDate: "2025-10-12",
    contactPerson: "Clean Sweep Services",
    phone: "(555) 234-5678",
    notes: "Fall cleaning before winter, inspect for loose brackets",
    status: "pending",
    dateCreated: "2025-10-04T11:30:00.000Z",
    dateCompleted: null
  },
  {
    id: "6",
    title: "Garage Door Opener Repair",
    type: "repairs",
    priority: "medium",
    description: "Garage door opener making grinding noise, remote not working",
    location: "Garage",
    estimatedCost: "180",
    actualCost: "165",
    preferredDate: "2025-09-30",
    contactPerson: "Door Repair Pro",
    phone: "(555) 345-6789",
    notes: "Replaced drive gear and programmed new remote",
    status: "completed",
    dateCreated: "2025-09-25T13:20:00.000Z",
    dateCompleted: "2025-09-30T15:30:00.000Z"
  },
  {
    id: "7",
    title: "Water Heater Maintenance",
    type: "maintenance",
    priority: "medium",
    description: "Annual water heater inspection and maintenance service",
    location: "Basement",
    estimatedCost: "100",
    actualCost: "",
    preferredDate: "2025-10-25",
    contactPerson: "Reliable Plumbing",
    phone: "(555) 567-8901",
    notes: "Flush tank, check anode rod, test safety valve",
    status: "pending",
    dateCreated: "2025-10-01T08:45:00.000Z",
    dateCompleted: null
  },
  {
    id: "8",
    title: "Security System Upgrade",
    type: "upgrades",
    priority: "medium",
    description: "Upgrade home security system with new cameras and smart locks",
    location: "Whole House",
    estimatedCost: "800",
    actualCost: "",
    preferredDate: "2025-11-01",
    contactPerson: "SecureHome Solutions",
    phone: "(555) 678-9012",
    notes: "Add doorbell camera, motion sensors, smart deadbolts",
    status: "pending",
    dateCreated: "2025-10-02T16:10:00.000Z",
    dateCompleted: null
  }
];

// Initialize database with sample data
export async function initializeRequestsDB() {
  try {
    const existingRequests = await requestsDB.requests.count();
    if (existingRequests === 0) {
      await requestsDB.requests.bulkAdd(sampleRequests);
      console.log('Requests database initialized with sample data');
    }
  } catch (error) {
    console.error('Error initializing requests database:', error);
  }
}