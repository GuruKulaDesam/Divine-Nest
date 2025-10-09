/**
 * UI Agent - Adapts the user interface based on role, emotion, and context
 * Manages layout, colors, content, and interaction patterns
 */

import { BaseAgent } from './core.js';

export class UIAgent extends BaseAgent {
  constructor() {
    super('ui', ['adapt', 'personalize', 'optimize', 'guide']);
    this.currentTheme = 'default';
    this.roleThemes = new Map();
    this.emotionThemes = new Map();
    this.contextualElements = new Map();
  }

  async initialize() {
    await super.initialize();
    this.initializeThemes();
    this.initializeContextualElements();
  }

  initializeThemes() {
    // Role-based themes
    this.roleThemes.set('paati', {
      colors: {
        primary: 'emerald',
        background: 'warm',
        text: 'gentle'
      },
      layout: {
        fontSize: 'large',
        spacing: 'comfortable',
        navigation: 'simple'
      },
      content: {
        language: 'tamil',
        tone: 'respectful',
        icons: 'traditional'
      },
      interactions: {
        pace: 'slow',
        feedback: 'verbal',
        gestures: 'minimal'
      }
    });

    this.roleThemes.set('appa', {
      colors: {
        primary: 'blue',
        background: 'professional',
        text: 'clear'
      },
      layout: {
        fontSize: 'medium',
        spacing: 'efficient',
        navigation: 'structured'
      },
      content: {
        language: 'english',
        tone: 'practical',
        icons: 'modern'
      },
      interactions: {
        pace: 'fast',
        feedback: 'minimal',
        gestures: 'precise'
      }
    });

    this.roleThemes.set('amma', {
      colors: {
        primary: 'purple',
        background: 'warm',
        text: 'nurturing'
      },
      layout: {
        fontSize: 'medium',
        spacing: 'organized',
        navigation: 'categorized'
      },
      content: {
        language: 'mixed',
        tone: 'caring',
        icons: 'friendly'
      },
      interactions: {
        pace: 'balanced',
        feedback: 'encouraging',
        gestures: 'supportive'
      }
    });

    this.roleThemes.set('kids', {
      colors: {
        primary: 'orange',
        background: 'playful',
        text: 'fun'
      },
      layout: {
        fontSize: 'large',
        spacing: 'spacious',
        navigation: 'visual'
      },
      content: {
        language: 'english',
        tone: 'exciting',
        icons: 'animated'
      },
      interactions: {
        pace: 'engaging',
        feedback: 'celebratory',
        gestures: 'expressive'
      }
    });

    // Emotion-based theme adjustments
    this.emotionThemes.set('joy', {
      colors: { brightness: 1.2, saturation: 1.1 },
      animations: 'celebratory',
      content: 'positive'
    });

    this.emotionThemes.set('stress', {
      colors: { brightness: 0.9, saturation: 0.8 },
      layout: 'calming',
      content: 'soothing'
    });

    this.emotionThemes.set('gratitude', {
      colors: { warmth: 1.2 },
      content: 'appreciative',
      interactions: 'grateful'
    });
  }

  initializeContextualElements() {
    // Define contextual UI elements
    this.contextualElements.set('prayer_time', {
      show: ['paati'],
      elements: ['devotional_music', 'temple_reminder', 'peaceful_background']
    });

    this.contextualElements.set('meal_time', {
      show: ['amma', 'family'],
      elements: ['recipe_suggestions', 'grocery_reminder', 'cooking_timer']
    });

    this.contextualElements.set('study_time', {
      show: ['kids'],
      elements: ['study_timer', 'break_reminder', 'achievement_badges']
    });

    this.contextualElements.set('work_time', {
      show: ['appa'],
      elements: ['focus_timer', 'task_priorities', 'meeting_reminder']
    });
  }

  async execute(input) {
    const { type, data, role, preferences, emotion } = input;

    switch (type) {
      case 'adapt_interface':
        return this.adaptInterface(role, emotion, data?.context);
      case 'personalize_content':
        return this.personalizeContent(data?.content, role, preferences);
      case 'optimize_layout':
        return this.optimizeLayout(data?.screen, role);
      case 'guide_interaction':
        return this.guideInteraction(data?.action, role);
      default:
        return this.provideUIAdaptation(input);
    }
  }

  adaptInterface(role, emotion, context) {
    const roleTheme = this.roleThemes.get(role) || this.roleThemes.get('family');
    const emotionTheme = this.emotionThemes.get(emotion);

    // Combine themes
    const adaptedTheme = this.combineThemes(roleTheme, emotionTheme);

    // Apply contextual elements
    const contextualElements = this.getContextualElements(context, role);

    return {
      response: `Adapted interface for ${role} with ${emotion} emotion`,
      actions: [
        { type: 'apply_theme', data: adaptedTheme },
        { type: 'show_elements', data: contextualElements },
        { type: 'update_navigation', data: { role, theme: adaptedTheme } }
      ],
      theme: adaptedTheme,
      elements: contextualElements
    };
  }

  personalizeContent(content, role, preferences) {
    const roleTheme = this.roleThemes.get(role);

    // Personalize based on role preferences
    const personalized = {
      ...content,
      language: preferences?.language || roleTheme?.content?.language || 'english',
      tone: roleTheme?.content?.tone || 'neutral',
      style: this.adaptContentStyle(content, roleTheme)
    };

    return {
      response: `Personalized content for ${role}`,
      actions: [{ type: 'render_content', data: personalized }],
      content: personalized
    };
  }

  optimizeLayout(screenData, role) {
    const roleTheme = this.roleThemes.get(role);
    const { width, height, device } = screenData || {};

    // Optimize layout based on screen and role
    const layout = {
      fontSize: this.calculateFontSize(width, roleTheme?.layout?.fontSize),
      spacing: roleTheme?.layout?.spacing || 'normal',
      columns: this.calculateColumns(width, device),
      navigation: this.optimizeNavigation(width, roleTheme?.layout?.navigation)
    };

    return {
      response: `Optimized layout for ${role} on ${device}`,
      actions: [{ type: 'apply_layout', data: layout }],
      layout
    };
  }

  guideInteraction(action, role) {
    const roleTheme = this.roleThemes.get(role);

    // Provide contextual guidance
    const guidance = {
      action,
      role,
      style: roleTheme?.interactions?.pace || 'normal',
      feedback: this.generateFeedback(action, roleTheme),
      gestures: roleTheme?.interactions?.gestures || 'standard'
    };

    return {
      response: `Guiding interaction for ${role}`,
      actions: [{ type: 'show_guidance', data: guidance }],
      guidance
    };
  }

  provideUIAdaptation(input) {
    const { role, preferences, emotion } = input;

    // General UI adaptation based on context
    const adaptation = {
      theme: this.getAdaptedTheme(role, emotion),
      layout: this.getOptimizedLayout(role, preferences),
      content: this.getPersonalizedContent(role, preferences),
      interactions: this.getInteractionGuide(role)
    };

    return {
      response: `Provided UI adaptation for ${role}`,
      actions: [{ type: 'apply_adaptation', data: adaptation }],
      adaptation
    };
  }

  combineThemes(roleTheme, emotionTheme) {
    if (!emotionTheme) return roleTheme;

    // Merge themes with emotion adjustments
    return {
      ...roleTheme,
      colors: {
        ...roleTheme.colors,
        ...emotionTheme.colors
      },
      animations: emotionTheme.animations || roleTheme.animations,
      content: {
        ...roleTheme.content,
        ...emotionTheme.content
      }
    };
  }

  getContextualElements(context, role) {
    const elements = [];

    for (const [contextKey, config] of this.contextualElements) {
      if (context === contextKey && config.show.includes(role)) {
        elements.push(...config.elements);
      }
    }

    return elements;
  }

  adaptContentStyle(content, roleTheme) {
    // Adapt content presentation style
    return {
      ...content.style,
      tone: roleTheme?.content?.tone || content.style?.tone,
      language: roleTheme?.content?.language || content.style?.language,
      visual: roleTheme?.content?.icons || content.style?.visual
    };
  }

  calculateFontSize(screenWidth, preferredSize) {
    const baseSizes = {
      small: 14,
      medium: 16,
      large: 18,
      xlarge: 20
    };

    let size = baseSizes[preferredSize] || baseSizes.medium;

    // Adjust for screen size
    if (screenWidth < 768) {
      size = Math.max(size - 2, 12); // Smaller on mobile
    } else if (screenWidth > 1200) {
      size = Math.min(size + 2, 22); // Larger on desktop
    }

    return size;
  }

  calculateColumns(screenWidth, device) {
    if (device === 'mobile' || screenWidth < 768) {
      return 1;
    } else if (screenWidth < 1024) {
      return 2;
    } else {
      return 3;
    }
  }

  optimizeNavigation(screenWidth, navType) {
    if (screenWidth < 768) {
      return 'bottom_tabs'; // Mobile-friendly
    } else if (navType === 'simple') {
      return 'sidebar_simple';
    } else {
      return 'sidebar_full';
    }
  }

  generateFeedback(action, roleTheme) {
    const feedbackStyle = roleTheme?.interactions?.feedback || 'standard';

    const feedbackMap = {
      standard: 'Action completed successfully',
      encouraging: 'Great job! That was perfect',
      celebratory: '🎉 Excellent work!',
      verbal: 'I have completed that task for you',
      minimal: '✓ Done'
    };

    return feedbackMap[feedbackStyle] || feedbackMap.standard;
  }

  getAdaptedTheme(role, emotion) {
    const roleTheme = this.roleThemes.get(role);
    const emotionTheme = this.emotionThemes.get(emotion);

    return this.combineThemes(roleTheme, emotionTheme);
  }

  getOptimizedLayout(role, preferences) {
    const roleTheme = this.roleThemes.get(role);

    return {
      fontSize: roleTheme?.layout?.fontSize || 'medium',
      spacing: roleTheme?.layout?.spacing || 'normal',
      navigation: roleTheme?.layout?.navigation || 'standard'
    };
  }

  getPersonalizedContent(role, preferences) {
    const roleTheme = this.roleThemes.get(role);

    return {
      language: preferences?.language || roleTheme?.content?.language || 'english',
      tone: roleTheme?.content?.tone || 'neutral',
      style: roleTheme?.content?.icons || 'modern'
    };
  }

  getInteractionGuide(role) {
    const roleTheme = this.roleThemes.get(role);

    return {
      pace: roleTheme?.interactions?.pace || 'normal',
      feedback: roleTheme?.interactions?.feedback || 'standard',
      gestures: roleTheme?.interactions?.gestures || 'standard'
    };
  }

  // Dynamic theme application
  applyTheme(theme) {
    // Apply CSS custom properties based on theme
    const root = document.documentElement;

    if (theme.colors) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--theme-${key}`, value);
      });
    }

    // Update body classes
    document.body.className = `theme-${theme.name || 'default'}`;
  }

  // Element visibility management
  showElements(elements) {
    // Hide all contextual elements first
    document.querySelectorAll('[data-contextual]').forEach(el => {
      el.style.display = 'none';
    });

    // Show requested elements
    elements.forEach(elementId => {
      const element = document.querySelector(`[data-contextual="${elementId}"]`);
      if (element) {
        element.style.display = 'block';
      }
    });
  }
}