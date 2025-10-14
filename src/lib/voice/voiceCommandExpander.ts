export class VoiceCommandExpander {
  private commandPatterns: { [key: string]: RegExp } = {};
  private commandMappings: { [key: string]: string } = {};

  constructor() {
    this.initializePatterns();
  }

  private initializePatterns() {
    // Basic navigation patterns
    this.commandPatterns = {
      // Task commands
      'show_tasks': /(?:show|view|display|list)\s+(?:all\s+)?tasks?/i,
      'create_task': /(?:create|add|make|new)\s+(?:a\s+)?(?:new\s+)?task/i,
      'pending_tasks': /(?:show|view|list)\s+(?:pending|open|active)\s+tasks?/i,
      'completed_tasks': /(?:show|view|list)\s+(?:completed|done|finished)\s+tasks?/i,
      'overdue_tasks': /(?:show|view|list)\s+(?:overdue|late|past\s+due)\s+tasks?/i,
      'today_tasks': /(?:show|view|list)\s+(?:today'?s?|due\s+today)\s+tasks?/i,

      // Food commands
      'show_recipes': /(?:show|view|list)\s+(?:all\s+)?recipes?/i,
      'create_recipe': /(?:create|add|make|new)\s+(?:a\s+)?(?:new\s+)?recipe/i,
      'schedule_meal': /(?:schedule|plan|make|create)\s+(?:a\s+)?meal/i,

      // Request commands
      'show_requests': /(?:show|view|list)\s+(?:all\s+)?requests?/i,
      'create_request': /(?:create|submit|make|new)\s+(?:a\s+)?(?:new\s+)?request/i,

      // Navigation commands
      'go_home': /(?:go\s+to\s+)?(?:home|dashboard|main)/i,
      'go_tasks': /(?:go\s+to\s+)?tasks?/i,
      'go_issues': /(?:go\s+to\s+)?issues?/i,
      'go_requests': /(?:go\s+to\s+)?requests?/i,
      'go_alerts': /(?:go\s+to\s+)?alerts?/i,
      'go_family': /(?:go\s+to\s+)?family/i,
      'go_foods': /(?:go\s+to\s+)?(?:foods?|meals?|recipes?)/i,
      'go_inventory': /(?:go\s+to\s+)?inventory/i,

      // System commands
      'help': /(?:help|what\s+can\s+you\s+do|commands|show\s+commands)/i,
      'stop_listening': /(?:stop\s+listening|shut\s+up|be\s+quiet|mute)/i,
      'start_listening': /(?:start\s+listening|wake\s+up|listen)/i,

      // Analytics commands
      'show_analytics': /(?:show|view|display)\s+(?:analytics|statistics|stats|data)/i,
      'productivity_score': /(?:show|view|what'?s\s+my)\s+(?:productivity|performance|efficiency)\s+(?:score|level)/i,

      // Emergency commands
      'emergency': /(?:emergency|help|call\s+emergency|911)/i,
    };

    // Command mappings to standardized commands
    this.commandMappings = {
      'show_tasks': 'show total tasks',
      'create_task': 'create new task',
      'pending_tasks': 'show pending tasks',
      'completed_tasks': 'show completed tasks',
      'overdue_tasks': 'show overdue tasks',
      'today_tasks': 'show today tasks',
      'show_recipes': 'show recipes',
      'create_recipe': 'create new recipe',
      'schedule_meal': 'schedule meal',
      'show_requests': 'show requests',
      'create_request': 'create new request',
      'go_home': 'go to home',
      'go_tasks': 'go to tasks',
      'go_issues': 'go to issues',
      'go_requests': 'go to requests',
      'go_alerts': 'go to alerts',
      'go_family': 'go to family',
      'go_foods': 'go to foods',
      'go_inventory': 'go to inventory',
      'help': 'help',
      'stop_listening': 'stop listening',
      'start_listening': 'start listening',
      'show_analytics': 'show analytics',
      'productivity_score': 'show productivity',
      'emergency': 'emergency',
    };
  }

  public expandCommand(transcript: string): { command: string; confidence: number; original: string } {
    const lowerTranscript = transcript.toLowerCase().trim();

    // Check for exact pattern matches
    for (const [patternKey, regex] of Object.entries(this.commandPatterns)) {
      if (regex.test(lowerTranscript)) {
        const mappedCommand = this.commandMappings[patternKey];
        if (mappedCommand) {
          return {
            command: mappedCommand,
            confidence: this.calculateConfidence(lowerTranscript, regex),
            original: transcript
          };
        }
      }
    }

    // Check for contextual commands (create task with text)
    const createTaskMatch = lowerTranscript.match(/(?:create|add|make)\s+(?:a\s+)?(?:new\s+)?task\s+(?:to\s+)?(.+)/i);
    if (createTaskMatch) {
      const taskText = createTaskMatch[1].trim();
      return {
        command: `create task: ${taskText}`,
        confidence: 0.9,
        original: transcript
      };
    }

    // Check for schedule meal commands
    const scheduleMealMatch = lowerTranscript.match(/(?:schedule|plan)\s+(?:a\s+)?meal\s+(?:for\s+)?(.+)/i);
    if (scheduleMealMatch) {
      const mealText = scheduleMealMatch[1].trim();
      return {
        command: `schedule meal: ${mealText}`,
        confidence: 0.9,
        original: transcript
      };
    }

    // Check for search commands
    const searchMatch = lowerTranscript.match(/(?:search|find|look\s+for)\s+(.+)/i);
    if (searchMatch) {
      const searchTerm = searchMatch[1].trim();
      return {
        command: `search: ${searchTerm}`,
        confidence: 0.8,
        original: transcript
      };
    }

    // Check for filter commands
    const filterMatch = lowerTranscript.match(/(?:filter|show\s+only)\s+(.+)/i);
    if (filterMatch) {
      const filterTerm = filterMatch[1].trim();
      return {
        command: `filter: ${filterTerm}`,
        confidence: 0.8,
        original: transcript
      };
    }

    // If no pattern matches, return the original transcript with low confidence
    return {
      command: transcript,
      confidence: 0.3,
      original: transcript
    };
  }

  private calculateConfidence(transcript: string, regex: RegExp): number {
    // Simple confidence calculation based on match quality
    const match = transcript.match(regex);
    if (!match) return 0;

    // Higher confidence for longer matches and exact matches
    const matchLength = match[0].length;
    const transcriptLength = transcript.length;
    const lengthRatio = matchLength / transcriptLength;

    // Bonus for exact matches
    const isExactMatch = match[0].length === transcript.length;

    let confidence = lengthRatio * 0.8; // Base confidence from length
    if (isExactMatch) confidence += 0.2; // Bonus for exact match

    return Math.min(confidence, 1.0);
  }

  public getAvailableCommands(): string[] {
    return Object.values(this.commandMappings);
  }

  public getCommandExamples(): { [key: string]: string[] } {
    return {
      'Navigation': [
        'go to tasks',
        'show recipes',
        'go to family',
        'go home'
      ],
      'Tasks': [
        'show pending tasks',
        'create new task',
        'show overdue tasks',
        'show today tasks'
      ],
      'Actions': [
        'create task to buy groceries',
        'schedule meal for lunch',
        'search for chicken recipes',
        'filter by priority'
      ],
      'System': [
        'help',
        'stop listening',
        'show analytics',
        'emergency'
      ]
    };
  }

  public suggestCommands(partialCommand: string): string[] {
    const suggestions: string[] = [];
    const lowerPartial = partialCommand.toLowerCase();

    for (const command of Object.values(this.commandMappings)) {
      if (command.toLowerCase().includes(lowerPartial)) {
        suggestions.push(command);
      }
    }

    return suggestions.slice(0, 5); // Limit to 5 suggestions
  }
}

// Global instance
export const voiceCommandExpander = new VoiceCommandExpander();