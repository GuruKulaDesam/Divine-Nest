
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/assets" | "/assets/documents" | "/assets/household" | "/assets/inventory" | "/assets/items" | "/assets/maintenance" | "/assets/value" | "/assets/vehicles" | "/assistant" | "/assistant/ambient-log" | "/assistant/auto-checklist" | "/assistant/event-feed" | "/assistant/shivo-ai" | "/assistant/shivo-ai/agentic" | "/assistant/shivo-music" | "/assistant/task-board" | "/assistant/voice-log" | "/culture" | "/culture/daily-voice-guide" | "/culture/festival-calendar" | "/culture/kolam" | "/culture/lifestyle-guide" | "/culture/places-to-visit" | "/culture/things-to-follow" | "/culture/things-to-remember" | "/culture/ways-to-live" | "/divinity" | "/divinity/mantras" | "/divinity/rituals" | "/divinity/tamil-panchangam" | "/divinity/temple" | "/education" | "/education/achievements" | "/education/archive" | "/education/assessment" | "/education/courses" | "/education/curriculum" | "/education/grades-tracker" | "/education/learning-goals" | "/education/library" | "/education/mentors" | "/education/planner" | "/education/quiz" | "/education/students" | "/education/studies" | "/education/study-plans" | "/finances" | "/finances/budget" | "/finances/expenses" | "/finances/insurance" | "/finances/investments" | "/finances/recharges" | "/food" | "/food/grocery" | "/food/kitchen" | "/food/kitchen/cleaning" | "/food/kitchen/dashboard" | "/food/kitchen/festivals" | "/food/kitchen/fresh" | "/food/kitchen/kids" | "/food/kitchen/meals" | "/food/kitchen/pantry" | "/food/kitchen/recipes" | "/food/kitchen/vendors" | "/food/kitchen/wellness" | "/food/meals" | "/food/pantry" | "/food/recipes" | "/food/recipes/traditional" | "/health" | "/health/beauty-guide" | "/health/hobbies-activities" | "/health/journal" | "/health/period-tracker" | "/health/wellness" | "/health/yoga" | "/home" | "/home/contacts" | "/home/contacts/directory" | "/home/contacts/emergency" | "/home/contacts/vendors" | "/home/family-calendar-modern" | "/home/family-notes-modern" | "/home/members" | "/home/reminders" | "/home/schedule" | "/issues-emergency" | "/issues" | "/issues/emergency" | "/issues/maintenance" | "/issues/projects" | "/issues/projects/gantt" | "/issues/repairs" | "/issues/requests" | "/issues/upgrades" | "/issues/urgent" | "/memories" | "/memories/emotions" | "/memories/family-governance" | "/memories/family-stories" | "/memories/legacy" | "/memories/lifeflow" | "/settings" | "/settings/analytics" | "/settings/analytics/charts" | "/travel" | "/travel/community" | "/travel/leisure" | "/travel/maps" | "/travel/trips";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/assets": Record<string, never>;
			"/assets/documents": Record<string, never>;
			"/assets/household": Record<string, never>;
			"/assets/inventory": Record<string, never>;
			"/assets/items": Record<string, never>;
			"/assets/maintenance": Record<string, never>;
			"/assets/value": Record<string, never>;
			"/assets/vehicles": Record<string, never>;
			"/assistant": Record<string, never>;
			"/assistant/ambient-log": Record<string, never>;
			"/assistant/auto-checklist": Record<string, never>;
			"/assistant/event-feed": Record<string, never>;
			"/assistant/shivo-ai": Record<string, never>;
			"/assistant/shivo-ai/agentic": Record<string, never>;
			"/assistant/shivo-music": Record<string, never>;
			"/assistant/task-board": Record<string, never>;
			"/assistant/voice-log": Record<string, never>;
			"/culture": Record<string, never>;
			"/culture/daily-voice-guide": Record<string, never>;
			"/culture/festival-calendar": Record<string, never>;
			"/culture/kolam": Record<string, never>;
			"/culture/lifestyle-guide": Record<string, never>;
			"/culture/places-to-visit": Record<string, never>;
			"/culture/things-to-follow": Record<string, never>;
			"/culture/things-to-remember": Record<string, never>;
			"/culture/ways-to-live": Record<string, never>;
			"/divinity": Record<string, never>;
			"/divinity/mantras": Record<string, never>;
			"/divinity/rituals": Record<string, never>;
			"/divinity/tamil-panchangam": Record<string, never>;
			"/divinity/temple": Record<string, never>;
			"/education": Record<string, never>;
			"/education/achievements": Record<string, never>;
			"/education/archive": Record<string, never>;
			"/education/assessment": Record<string, never>;
			"/education/courses": Record<string, never>;
			"/education/curriculum": Record<string, never>;
			"/education/grades-tracker": Record<string, never>;
			"/education/learning-goals": Record<string, never>;
			"/education/library": Record<string, never>;
			"/education/mentors": Record<string, never>;
			"/education/planner": Record<string, never>;
			"/education/quiz": Record<string, never>;
			"/education/students": Record<string, never>;
			"/education/studies": Record<string, never>;
			"/education/study-plans": Record<string, never>;
			"/finances": Record<string, never>;
			"/finances/budget": Record<string, never>;
			"/finances/expenses": Record<string, never>;
			"/finances/insurance": Record<string, never>;
			"/finances/investments": Record<string, never>;
			"/finances/recharges": Record<string, never>;
			"/food": Record<string, never>;
			"/food/grocery": Record<string, never>;
			"/food/kitchen": Record<string, never>;
			"/food/kitchen/cleaning": Record<string, never>;
			"/food/kitchen/dashboard": Record<string, never>;
			"/food/kitchen/festivals": Record<string, never>;
			"/food/kitchen/fresh": Record<string, never>;
			"/food/kitchen/kids": Record<string, never>;
			"/food/kitchen/meals": Record<string, never>;
			"/food/kitchen/pantry": Record<string, never>;
			"/food/kitchen/recipes": Record<string, never>;
			"/food/kitchen/vendors": Record<string, never>;
			"/food/kitchen/wellness": Record<string, never>;
			"/food/meals": Record<string, never>;
			"/food/pantry": Record<string, never>;
			"/food/recipes": Record<string, never>;
			"/food/recipes/traditional": Record<string, never>;
			"/health": Record<string, never>;
			"/health/beauty-guide": Record<string, never>;
			"/health/hobbies-activities": Record<string, never>;
			"/health/journal": Record<string, never>;
			"/health/period-tracker": Record<string, never>;
			"/health/wellness": Record<string, never>;
			"/health/yoga": Record<string, never>;
			"/home": Record<string, never>;
			"/home/contacts": Record<string, never>;
			"/home/contacts/directory": Record<string, never>;
			"/home/contacts/emergency": Record<string, never>;
			"/home/contacts/vendors": Record<string, never>;
			"/home/family-calendar-modern": Record<string, never>;
			"/home/family-notes-modern": Record<string, never>;
			"/home/members": Record<string, never>;
			"/home/reminders": Record<string, never>;
			"/home/schedule": Record<string, never>;
			"/issues-emergency": Record<string, never>;
			"/issues": Record<string, never>;
			"/issues/emergency": Record<string, never>;
			"/issues/maintenance": Record<string, never>;
			"/issues/projects": Record<string, never>;
			"/issues/projects/gantt": Record<string, never>;
			"/issues/repairs": Record<string, never>;
			"/issues/requests": Record<string, never>;
			"/issues/upgrades": Record<string, never>;
			"/issues/urgent": Record<string, never>;
			"/memories": Record<string, never>;
			"/memories/emotions": Record<string, never>;
			"/memories/family-governance": Record<string, never>;
			"/memories/family-stories": Record<string, never>;
			"/memories/legacy": Record<string, never>;
			"/memories/lifeflow": Record<string, never>;
			"/settings": Record<string, never>;
			"/settings/analytics": Record<string, never>;
			"/settings/analytics/charts": Record<string, never>;
			"/travel": Record<string, never>;
			"/travel/community": Record<string, never>;
			"/travel/leisure": Record<string, never>;
			"/travel/maps": Record<string, never>;
			"/travel/trips": Record<string, never>
		};
		Pathname(): "/" | "/assets" | "/assets/" | "/assets/documents" | "/assets/documents/" | "/assets/household" | "/assets/household/" | "/assets/inventory" | "/assets/inventory/" | "/assets/items" | "/assets/items/" | "/assets/maintenance" | "/assets/maintenance/" | "/assets/value" | "/assets/value/" | "/assets/vehicles" | "/assets/vehicles/" | "/assistant" | "/assistant/" | "/assistant/ambient-log" | "/assistant/ambient-log/" | "/assistant/auto-checklist" | "/assistant/auto-checklist/" | "/assistant/event-feed" | "/assistant/event-feed/" | "/assistant/shivo-ai" | "/assistant/shivo-ai/" | "/assistant/shivo-ai/agentic" | "/assistant/shivo-ai/agentic/" | "/assistant/shivo-music" | "/assistant/shivo-music/" | "/assistant/task-board" | "/assistant/task-board/" | "/assistant/voice-log" | "/assistant/voice-log/" | "/culture" | "/culture/" | "/culture/daily-voice-guide" | "/culture/daily-voice-guide/" | "/culture/festival-calendar" | "/culture/festival-calendar/" | "/culture/kolam" | "/culture/kolam/" | "/culture/lifestyle-guide" | "/culture/lifestyle-guide/" | "/culture/places-to-visit" | "/culture/places-to-visit/" | "/culture/things-to-follow" | "/culture/things-to-follow/" | "/culture/things-to-remember" | "/culture/things-to-remember/" | "/culture/ways-to-live" | "/culture/ways-to-live/" | "/divinity" | "/divinity/" | "/divinity/mantras" | "/divinity/mantras/" | "/divinity/rituals" | "/divinity/rituals/" | "/divinity/tamil-panchangam" | "/divinity/tamil-panchangam/" | "/divinity/temple" | "/divinity/temple/" | "/education" | "/education/" | "/education/achievements" | "/education/achievements/" | "/education/archive" | "/education/archive/" | "/education/assessment" | "/education/assessment/" | "/education/courses" | "/education/courses/" | "/education/curriculum" | "/education/curriculum/" | "/education/grades-tracker" | "/education/grades-tracker/" | "/education/learning-goals" | "/education/learning-goals/" | "/education/library" | "/education/library/" | "/education/mentors" | "/education/mentors/" | "/education/planner" | "/education/planner/" | "/education/quiz" | "/education/quiz/" | "/education/students" | "/education/students/" | "/education/studies" | "/education/studies/" | "/education/study-plans" | "/education/study-plans/" | "/finances" | "/finances/" | "/finances/budget" | "/finances/budget/" | "/finances/expenses" | "/finances/expenses/" | "/finances/insurance" | "/finances/insurance/" | "/finances/investments" | "/finances/investments/" | "/finances/recharges" | "/finances/recharges/" | "/food" | "/food/" | "/food/grocery" | "/food/grocery/" | "/food/kitchen" | "/food/kitchen/" | "/food/kitchen/cleaning" | "/food/kitchen/cleaning/" | "/food/kitchen/dashboard" | "/food/kitchen/dashboard/" | "/food/kitchen/festivals" | "/food/kitchen/festivals/" | "/food/kitchen/fresh" | "/food/kitchen/fresh/" | "/food/kitchen/kids" | "/food/kitchen/kids/" | "/food/kitchen/meals" | "/food/kitchen/meals/" | "/food/kitchen/pantry" | "/food/kitchen/pantry/" | "/food/kitchen/recipes" | "/food/kitchen/recipes/" | "/food/kitchen/vendors" | "/food/kitchen/vendors/" | "/food/kitchen/wellness" | "/food/kitchen/wellness/" | "/food/meals" | "/food/meals/" | "/food/pantry" | "/food/pantry/" | "/food/recipes" | "/food/recipes/" | "/food/recipes/traditional" | "/food/recipes/traditional/" | "/health" | "/health/" | "/health/beauty-guide" | "/health/beauty-guide/" | "/health/hobbies-activities" | "/health/hobbies-activities/" | "/health/journal" | "/health/journal/" | "/health/period-tracker" | "/health/period-tracker/" | "/health/wellness" | "/health/wellness/" | "/health/yoga" | "/health/yoga/" | "/home" | "/home/" | "/home/contacts" | "/home/contacts/" | "/home/contacts/directory" | "/home/contacts/directory/" | "/home/contacts/emergency" | "/home/contacts/emergency/" | "/home/contacts/vendors" | "/home/contacts/vendors/" | "/home/family-calendar-modern" | "/home/family-calendar-modern/" | "/home/family-notes-modern" | "/home/family-notes-modern/" | "/home/members" | "/home/members/" | "/home/reminders" | "/home/reminders/" | "/home/schedule" | "/home/schedule/" | "/issues-emergency" | "/issues-emergency/" | "/issues" | "/issues/" | "/issues/emergency" | "/issues/emergency/" | "/issues/maintenance" | "/issues/maintenance/" | "/issues/projects" | "/issues/projects/" | "/issues/projects/gantt" | "/issues/projects/gantt/" | "/issues/repairs" | "/issues/repairs/" | "/issues/requests" | "/issues/requests/" | "/issues/upgrades" | "/issues/upgrades/" | "/issues/urgent" | "/issues/urgent/" | "/memories" | "/memories/" | "/memories/emotions" | "/memories/emotions/" | "/memories/family-governance" | "/memories/family-governance/" | "/memories/family-stories" | "/memories/family-stories/" | "/memories/legacy" | "/memories/legacy/" | "/memories/lifeflow" | "/memories/lifeflow/" | "/settings" | "/settings/" | "/settings/analytics" | "/settings/analytics/" | "/settings/analytics/charts" | "/settings/analytics/charts/" | "/travel" | "/travel/" | "/travel/community" | "/travel/community/" | "/travel/leisure" | "/travel/leisure/" | "/travel/maps" | "/travel/maps/" | "/travel/trips" | "/travel/trips/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}