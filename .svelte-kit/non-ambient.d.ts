
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
		RouteId(): "/" | "/assets" | "/assets/documents" | "/assets/household" | "/assets/inventory" | "/assets/items" | "/assets/maintenance" | "/assets/value" | "/assets/vehicles" | "/assistant" | "/assistant/ambient-log" | "/assistant/auto-checklist" | "/assistant/event-feed" | "/assistant/shivo-ai" | "/assistant/shivo-ai/agentic" | "/assistant/shivo-music" | "/assistant/task-board" | "/assistant/voice-log" | "/culture" | "/culture/daily-voice-guide" | "/culture/festival-calendar" | "/culture/festival-foods" | "/culture/kolam" | "/culture/lifestyle-guide" | "/culture/places-to-visit" | "/culture/things-to-follow" | "/culture/things-to-remember" | "/culture/ways-to-live" | "/directory" | "/divinity" | "/divinity/drikpanchangam" | "/divinity/mantras" | "/divinity/panchangam" | "/divinity/rituals" | "/divinity/temple" | "/education" | "/education/achievements" | "/education/archive" | "/education/assessment" | "/education/courses" | "/education/curriculum" | "/education/grades-tracker" | "/education/learning-goals" | "/education/library" | "/education/mentors" | "/education/planner" | "/education/quiz" | "/education/students" | "/education/studies" | "/education/study-plans" | "/expenses" | "/finances" | "/finances/budget" | "/finances/expenses" | "/finances/expenses/emotional" | "/finances/expenses/forecasting" | "/finances/expenses/goals" | "/finances/expenses/ledger" | "/finances/expenses/parse-upi-sms" | "/finances/insurance" | "/finances/investments" | "/finances/loans" | "/finances/recharges" | "/food" | "/food/grocery" | "/food/kitchen" | "/food/kitchen/cleaning" | "/food/kitchen/dashboard" | "/food/kitchen/festivals" | "/food/kitchen/fresh" | "/food/kitchen/kids" | "/food/kitchen/meals" | "/food/kitchen/vendors" | "/food/kitchen/wellness" | "/food/meals" | "/food/pantry" | "/food/recipes" | "/food/recipes/traditional" | "/health" | "/health/beauty-guide" | "/health/hobbies-activities" | "/health/journal" | "/health/period-tracker" | "/health/wellness-kitchen" | "/health/wellness" | "/health/yoga" | "/home" | "/home/checklist" | "/home/contacts" | "/home/contacts/directory" | "/home/contacts/emergency" | "/home/contacts/vendors" | "/home/family-calendar-modern" | "/home/family-notes-modern" | "/home/home-services" | "/home/household" | "/home/members" | "/home/reminders" | "/home/schedule" | "/home/wishlist" | "/inventory" | "/issues" | "/issues/dashboard" | "/issues/emergency" | "/issues/maintenance" | "/issues/projects" | "/issues/projects/gantt" | "/issues/repairs" | "/issues/requests" | "/issues/upgrades" | "/issues/urgent" | "/library" | "/lifeflow" | "/meals" | "/members" | "/memories" | "/memories/emotions" | "/memories/family-governance" | "/memories/family-stories" | "/memories/legacy" | "/memories/lifeflow" | "/pantry" | "/property" | "/recipes" | "/settings" | "/settings/analytics" | "/settings/analytics/charts" | "/study-plans" | "/todo" | "/trackers" | "/trackers/[tracker]" | "/travel" | "/travel/checklist" | "/travel/community" | "/travel/leisure" | "/travel/maps" | "/travel/trips" | "/vehicles" | "/wellness";
		RouteParams(): {
			"/trackers/[tracker]": { tracker: string }
		};
		LayoutParams(): {
			"/": { tracker?: string };
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
			"/culture/festival-foods": Record<string, never>;
			"/culture/kolam": Record<string, never>;
			"/culture/lifestyle-guide": Record<string, never>;
			"/culture/places-to-visit": Record<string, never>;
			"/culture/things-to-follow": Record<string, never>;
			"/culture/things-to-remember": Record<string, never>;
			"/culture/ways-to-live": Record<string, never>;
			"/directory": Record<string, never>;
			"/divinity": Record<string, never>;
			"/divinity/drikpanchangam": Record<string, never>;
			"/divinity/mantras": Record<string, never>;
			"/divinity/panchangam": Record<string, never>;
			"/divinity/rituals": Record<string, never>;
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
			"/expenses": Record<string, never>;
			"/finances": Record<string, never>;
			"/finances/budget": Record<string, never>;
			"/finances/expenses": Record<string, never>;
			"/finances/expenses/emotional": Record<string, never>;
			"/finances/expenses/forecasting": Record<string, never>;
			"/finances/expenses/goals": Record<string, never>;
			"/finances/expenses/ledger": Record<string, never>;
			"/finances/expenses/parse-upi-sms": Record<string, never>;
			"/finances/insurance": Record<string, never>;
			"/finances/investments": Record<string, never>;
			"/finances/loans": Record<string, never>;
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
			"/health/wellness-kitchen": Record<string, never>;
			"/health/wellness": Record<string, never>;
			"/health/yoga": Record<string, never>;
			"/home": Record<string, never>;
			"/home/checklist": Record<string, never>;
			"/home/contacts": Record<string, never>;
			"/home/contacts/directory": Record<string, never>;
			"/home/contacts/emergency": Record<string, never>;
			"/home/contacts/vendors": Record<string, never>;
			"/home/family-calendar-modern": Record<string, never>;
			"/home/family-notes-modern": Record<string, never>;
			"/home/home-services": Record<string, never>;
			"/home/household": Record<string, never>;
			"/home/members": Record<string, never>;
			"/home/reminders": Record<string, never>;
			"/home/schedule": Record<string, never>;
			"/home/wishlist": Record<string, never>;
			"/inventory": Record<string, never>;
			"/issues": Record<string, never>;
			"/issues/dashboard": Record<string, never>;
			"/issues/emergency": Record<string, never>;
			"/issues/maintenance": Record<string, never>;
			"/issues/projects": Record<string, never>;
			"/issues/projects/gantt": Record<string, never>;
			"/issues/repairs": Record<string, never>;
			"/issues/requests": Record<string, never>;
			"/issues/upgrades": Record<string, never>;
			"/issues/urgent": Record<string, never>;
			"/library": Record<string, never>;
			"/lifeflow": Record<string, never>;
			"/meals": Record<string, never>;
			"/members": Record<string, never>;
			"/memories": Record<string, never>;
			"/memories/emotions": Record<string, never>;
			"/memories/family-governance": Record<string, never>;
			"/memories/family-stories": Record<string, never>;
			"/memories/legacy": Record<string, never>;
			"/memories/lifeflow": Record<string, never>;
			"/pantry": Record<string, never>;
			"/property": Record<string, never>;
			"/recipes": Record<string, never>;
			"/settings": Record<string, never>;
			"/settings/analytics": Record<string, never>;
			"/settings/analytics/charts": Record<string, never>;
			"/study-plans": Record<string, never>;
			"/todo": Record<string, never>;
			"/trackers": { tracker?: string };
			"/trackers/[tracker]": { tracker: string };
			"/travel": Record<string, never>;
			"/travel/checklist": Record<string, never>;
			"/travel/community": Record<string, never>;
			"/travel/leisure": Record<string, never>;
			"/travel/maps": Record<string, never>;
			"/travel/trips": Record<string, never>;
			"/vehicles": Record<string, never>;
			"/wellness": Record<string, never>
		};
		Pathname(): "/" | "/assets" | "/assets/" | "/assets/documents" | "/assets/documents/" | "/assets/household" | "/assets/household/" | "/assets/inventory" | "/assets/inventory/" | "/assets/items" | "/assets/items/" | "/assets/maintenance" | "/assets/maintenance/" | "/assets/value" | "/assets/value/" | "/assets/vehicles" | "/assets/vehicles/" | "/assistant" | "/assistant/" | "/assistant/ambient-log" | "/assistant/ambient-log/" | "/assistant/auto-checklist" | "/assistant/auto-checklist/" | "/assistant/event-feed" | "/assistant/event-feed/" | "/assistant/shivo-ai" | "/assistant/shivo-ai/" | "/assistant/shivo-ai/agentic" | "/assistant/shivo-ai/agentic/" | "/assistant/shivo-music" | "/assistant/shivo-music/" | "/assistant/task-board" | "/assistant/task-board/" | "/assistant/voice-log" | "/assistant/voice-log/" | "/culture" | "/culture/" | "/culture/daily-voice-guide" | "/culture/daily-voice-guide/" | "/culture/festival-calendar" | "/culture/festival-calendar/" | "/culture/festival-foods" | "/culture/festival-foods/" | "/culture/kolam" | "/culture/kolam/" | "/culture/lifestyle-guide" | "/culture/lifestyle-guide/" | "/culture/places-to-visit" | "/culture/places-to-visit/" | "/culture/things-to-follow" | "/culture/things-to-follow/" | "/culture/things-to-remember" | "/culture/things-to-remember/" | "/culture/ways-to-live" | "/culture/ways-to-live/" | "/directory" | "/directory/" | "/divinity" | "/divinity/" | "/divinity/drikpanchangam" | "/divinity/drikpanchangam/" | "/divinity/mantras" | "/divinity/mantras/" | "/divinity/panchangam" | "/divinity/panchangam/" | "/divinity/rituals" | "/divinity/rituals/" | "/divinity/temple" | "/divinity/temple/" | "/education" | "/education/" | "/education/achievements" | "/education/achievements/" | "/education/archive" | "/education/archive/" | "/education/assessment" | "/education/assessment/" | "/education/courses" | "/education/courses/" | "/education/curriculum" | "/education/curriculum/" | "/education/grades-tracker" | "/education/grades-tracker/" | "/education/learning-goals" | "/education/learning-goals/" | "/education/library" | "/education/library/" | "/education/mentors" | "/education/mentors/" | "/education/planner" | "/education/planner/" | "/education/quiz" | "/education/quiz/" | "/education/students" | "/education/students/" | "/education/studies" | "/education/studies/" | "/education/study-plans" | "/education/study-plans/" | "/expenses" | "/expenses/" | "/finances" | "/finances/" | "/finances/budget" | "/finances/budget/" | "/finances/expenses" | "/finances/expenses/" | "/finances/expenses/emotional" | "/finances/expenses/emotional/" | "/finances/expenses/forecasting" | "/finances/expenses/forecasting/" | "/finances/expenses/goals" | "/finances/expenses/goals/" | "/finances/expenses/ledger" | "/finances/expenses/ledger/" | "/finances/expenses/parse-upi-sms" | "/finances/expenses/parse-upi-sms/" | "/finances/insurance" | "/finances/insurance/" | "/finances/investments" | "/finances/investments/" | "/finances/loans" | "/finances/loans/" | "/finances/recharges" | "/finances/recharges/" | "/food" | "/food/" | "/food/grocery" | "/food/grocery/" | "/food/kitchen" | "/food/kitchen/" | "/food/kitchen/cleaning" | "/food/kitchen/cleaning/" | "/food/kitchen/dashboard" | "/food/kitchen/dashboard/" | "/food/kitchen/festivals" | "/food/kitchen/festivals/" | "/food/kitchen/fresh" | "/food/kitchen/fresh/" | "/food/kitchen/kids" | "/food/kitchen/kids/" | "/food/kitchen/meals" | "/food/kitchen/meals/" | "/food/kitchen/vendors" | "/food/kitchen/vendors/" | "/food/kitchen/wellness" | "/food/kitchen/wellness/" | "/food/meals" | "/food/meals/" | "/food/pantry" | "/food/pantry/" | "/food/recipes" | "/food/recipes/" | "/food/recipes/traditional" | "/food/recipes/traditional/" | "/health" | "/health/" | "/health/beauty-guide" | "/health/beauty-guide/" | "/health/hobbies-activities" | "/health/hobbies-activities/" | "/health/journal" | "/health/journal/" | "/health/period-tracker" | "/health/period-tracker/" | "/health/wellness-kitchen" | "/health/wellness-kitchen/" | "/health/wellness" | "/health/wellness/" | "/health/yoga" | "/health/yoga/" | "/home" | "/home/" | "/home/checklist" | "/home/checklist/" | "/home/contacts" | "/home/contacts/" | "/home/contacts/directory" | "/home/contacts/directory/" | "/home/contacts/emergency" | "/home/contacts/emergency/" | "/home/contacts/vendors" | "/home/contacts/vendors/" | "/home/family-calendar-modern" | "/home/family-calendar-modern/" | "/home/family-notes-modern" | "/home/family-notes-modern/" | "/home/home-services" | "/home/home-services/" | "/home/household" | "/home/household/" | "/home/members" | "/home/members/" | "/home/reminders" | "/home/reminders/" | "/home/schedule" | "/home/schedule/" | "/home/wishlist" | "/home/wishlist/" | "/inventory" | "/inventory/" | "/issues" | "/issues/" | "/issues/dashboard" | "/issues/dashboard/" | "/issues/emergency" | "/issues/emergency/" | "/issues/maintenance" | "/issues/maintenance/" | "/issues/projects" | "/issues/projects/" | "/issues/projects/gantt" | "/issues/projects/gantt/" | "/issues/repairs" | "/issues/repairs/" | "/issues/requests" | "/issues/requests/" | "/issues/upgrades" | "/issues/upgrades/" | "/issues/urgent" | "/issues/urgent/" | "/library" | "/library/" | "/lifeflow" | "/lifeflow/" | "/meals" | "/meals/" | "/members" | "/members/" | "/memories" | "/memories/" | "/memories/emotions" | "/memories/emotions/" | "/memories/family-governance" | "/memories/family-governance/" | "/memories/family-stories" | "/memories/family-stories/" | "/memories/legacy" | "/memories/legacy/" | "/memories/lifeflow" | "/memories/lifeflow/" | "/pantry" | "/pantry/" | "/property" | "/property/" | "/recipes" | "/recipes/" | "/settings" | "/settings/" | "/settings/analytics" | "/settings/analytics/" | "/settings/analytics/charts" | "/settings/analytics/charts/" | "/study-plans" | "/study-plans/" | "/todo" | "/todo/" | "/trackers" | "/trackers/" | `/trackers/${string}` & {} | `/trackers/${string}/` & {} | "/travel" | "/travel/" | "/travel/checklist" | "/travel/checklist/" | "/travel/community" | "/travel/community/" | "/travel/leisure" | "/travel/leisure/" | "/travel/maps" | "/travel/maps/" | "/travel/trips" | "/travel/trips/" | "/vehicles" | "/vehicles/" | "/wellness" | "/wellness/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}