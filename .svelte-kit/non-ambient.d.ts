
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
		RouteId(): "/" | "/analytics" | "/assets" | "/assets/documents" | "/assets/items" | "/assets/maintenance" | "/assets/value" | "/assistant" | "/assistant/ambient-log" | "/assistant/auto-checklist" | "/assistant/event-feed" | "/assistant/task-board" | "/assistant/voice-log" | "/budget" | "/charts" | "/community" | "/contacts" | "/culture" | "/culture/daily-voice-guide" | "/culture/lifestyle-guide" | "/culture/places-to-visit" | "/culture/things-to-follow" | "/culture/things-to-remember" | "/culture/ways-to-live" | "/directory" | "/education" | "/education/achievements" | "/education/archive" | "/education/assessment" | "/education/courses" | "/education/curriculum" | "/education/grades-tracker" | "/education/mentors" | "/education/planner" | "/education/quiz" | "/education/students" | "/emergency" | "/emotions" | "/expenses" | "/family-calendar-modern" | "/family-governance" | "/family-notes-modern" | "/family-stories" | "/festival-calendar" | "/finances" | "/gantt" | "/grocery" | "/health" | "/health/beauty-guide" | "/health/period-tracker" | "/hobbies-activities" | "/household" | "/insurance" | "/inventory" | "/investments" | "/issues-emergency" | "/journal" | "/kitchen" | "/kitchen/cleaning" | "/kitchen/festivals" | "/kitchen/fresh" | "/kitchen/kids" | "/kitchen/vendors" | "/kitchen/wellness" | "/kolam" | "/learning-goals" | "/legacy" | "/leisure" | "/library" | "/lifeflow" | "/maintenance" | "/mantras" | "/maps" | "/meals" | "/members" | "/pantry" | "/products" | "/projects" | "/recharges" | "/recipes" | "/recipes/traditional" | "/reminders" | "/repairs" | "/requests" | "/rituals" | "/schedule" | "/settings" | "/shivo-agentic" | "/shivo-ai" | "/shivo-music" | "/studies" | "/study-plans" | "/tamil-panchangam" | "/temple" | "/travel" | "/trips" | "/upgrades" | "/urgent" | "/users" | "/vehicles" | "/vendors" | "/wellness" | "/yoga";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/analytics": Record<string, never>;
			"/assets": Record<string, never>;
			"/assets/documents": Record<string, never>;
			"/assets/items": Record<string, never>;
			"/assets/maintenance": Record<string, never>;
			"/assets/value": Record<string, never>;
			"/assistant": Record<string, never>;
			"/assistant/ambient-log": Record<string, never>;
			"/assistant/auto-checklist": Record<string, never>;
			"/assistant/event-feed": Record<string, never>;
			"/assistant/task-board": Record<string, never>;
			"/assistant/voice-log": Record<string, never>;
			"/budget": Record<string, never>;
			"/charts": Record<string, never>;
			"/community": Record<string, never>;
			"/contacts": Record<string, never>;
			"/culture": Record<string, never>;
			"/culture/daily-voice-guide": Record<string, never>;
			"/culture/lifestyle-guide": Record<string, never>;
			"/culture/places-to-visit": Record<string, never>;
			"/culture/things-to-follow": Record<string, never>;
			"/culture/things-to-remember": Record<string, never>;
			"/culture/ways-to-live": Record<string, never>;
			"/directory": Record<string, never>;
			"/education": Record<string, never>;
			"/education/achievements": Record<string, never>;
			"/education/archive": Record<string, never>;
			"/education/assessment": Record<string, never>;
			"/education/courses": Record<string, never>;
			"/education/curriculum": Record<string, never>;
			"/education/grades-tracker": Record<string, never>;
			"/education/mentors": Record<string, never>;
			"/education/planner": Record<string, never>;
			"/education/quiz": Record<string, never>;
			"/education/students": Record<string, never>;
			"/emergency": Record<string, never>;
			"/emotions": Record<string, never>;
			"/expenses": Record<string, never>;
			"/family-calendar-modern": Record<string, never>;
			"/family-governance": Record<string, never>;
			"/family-notes-modern": Record<string, never>;
			"/family-stories": Record<string, never>;
			"/festival-calendar": Record<string, never>;
			"/finances": Record<string, never>;
			"/gantt": Record<string, never>;
			"/grocery": Record<string, never>;
			"/health": Record<string, never>;
			"/health/beauty-guide": Record<string, never>;
			"/health/period-tracker": Record<string, never>;
			"/hobbies-activities": Record<string, never>;
			"/household": Record<string, never>;
			"/insurance": Record<string, never>;
			"/inventory": Record<string, never>;
			"/investments": Record<string, never>;
			"/issues-emergency": Record<string, never>;
			"/journal": Record<string, never>;
			"/kitchen": Record<string, never>;
			"/kitchen/cleaning": Record<string, never>;
			"/kitchen/festivals": Record<string, never>;
			"/kitchen/fresh": Record<string, never>;
			"/kitchen/kids": Record<string, never>;
			"/kitchen/vendors": Record<string, never>;
			"/kitchen/wellness": Record<string, never>;
			"/kolam": Record<string, never>;
			"/learning-goals": Record<string, never>;
			"/legacy": Record<string, never>;
			"/leisure": Record<string, never>;
			"/library": Record<string, never>;
			"/lifeflow": Record<string, never>;
			"/maintenance": Record<string, never>;
			"/mantras": Record<string, never>;
			"/maps": Record<string, never>;
			"/meals": Record<string, never>;
			"/members": Record<string, never>;
			"/pantry": Record<string, never>;
			"/products": Record<string, never>;
			"/projects": Record<string, never>;
			"/recharges": Record<string, never>;
			"/recipes": Record<string, never>;
			"/recipes/traditional": Record<string, never>;
			"/reminders": Record<string, never>;
			"/repairs": Record<string, never>;
			"/requests": Record<string, never>;
			"/rituals": Record<string, never>;
			"/schedule": Record<string, never>;
			"/settings": Record<string, never>;
			"/shivo-agentic": Record<string, never>;
			"/shivo-ai": Record<string, never>;
			"/shivo-music": Record<string, never>;
			"/studies": Record<string, never>;
			"/study-plans": Record<string, never>;
			"/tamil-panchangam": Record<string, never>;
			"/temple": Record<string, never>;
			"/travel": Record<string, never>;
			"/trips": Record<string, never>;
			"/upgrades": Record<string, never>;
			"/urgent": Record<string, never>;
			"/users": Record<string, never>;
			"/vehicles": Record<string, never>;
			"/vendors": Record<string, never>;
			"/wellness": Record<string, never>;
			"/yoga": Record<string, never>
		};
		Pathname(): "/" | "/analytics" | "/analytics/" | "/assets" | "/assets/" | "/assets/documents" | "/assets/documents/" | "/assets/items" | "/assets/items/" | "/assets/maintenance" | "/assets/maintenance/" | "/assets/value" | "/assets/value/" | "/assistant" | "/assistant/" | "/assistant/ambient-log" | "/assistant/ambient-log/" | "/assistant/auto-checklist" | "/assistant/auto-checklist/" | "/assistant/event-feed" | "/assistant/event-feed/" | "/assistant/task-board" | "/assistant/task-board/" | "/assistant/voice-log" | "/assistant/voice-log/" | "/budget" | "/budget/" | "/charts" | "/charts/" | "/community" | "/community/" | "/contacts" | "/contacts/" | "/culture" | "/culture/" | "/culture/daily-voice-guide" | "/culture/daily-voice-guide/" | "/culture/lifestyle-guide" | "/culture/lifestyle-guide/" | "/culture/places-to-visit" | "/culture/places-to-visit/" | "/culture/things-to-follow" | "/culture/things-to-follow/" | "/culture/things-to-remember" | "/culture/things-to-remember/" | "/culture/ways-to-live" | "/culture/ways-to-live/" | "/directory" | "/directory/" | "/education" | "/education/" | "/education/achievements" | "/education/achievements/" | "/education/archive" | "/education/archive/" | "/education/assessment" | "/education/assessment/" | "/education/courses" | "/education/courses/" | "/education/curriculum" | "/education/curriculum/" | "/education/grades-tracker" | "/education/grades-tracker/" | "/education/mentors" | "/education/mentors/" | "/education/planner" | "/education/planner/" | "/education/quiz" | "/education/quiz/" | "/education/students" | "/education/students/" | "/emergency" | "/emergency/" | "/emotions" | "/emotions/" | "/expenses" | "/expenses/" | "/family-calendar-modern" | "/family-calendar-modern/" | "/family-governance" | "/family-governance/" | "/family-notes-modern" | "/family-notes-modern/" | "/family-stories" | "/family-stories/" | "/festival-calendar" | "/festival-calendar/" | "/finances" | "/finances/" | "/gantt" | "/gantt/" | "/grocery" | "/grocery/" | "/health" | "/health/" | "/health/beauty-guide" | "/health/beauty-guide/" | "/health/period-tracker" | "/health/period-tracker/" | "/hobbies-activities" | "/hobbies-activities/" | "/household" | "/household/" | "/insurance" | "/insurance/" | "/inventory" | "/inventory/" | "/investments" | "/investments/" | "/issues-emergency" | "/issues-emergency/" | "/journal" | "/journal/" | "/kitchen" | "/kitchen/" | "/kitchen/cleaning" | "/kitchen/cleaning/" | "/kitchen/festivals" | "/kitchen/festivals/" | "/kitchen/fresh" | "/kitchen/fresh/" | "/kitchen/kids" | "/kitchen/kids/" | "/kitchen/vendors" | "/kitchen/vendors/" | "/kitchen/wellness" | "/kitchen/wellness/" | "/kolam" | "/kolam/" | "/learning-goals" | "/learning-goals/" | "/legacy" | "/legacy/" | "/leisure" | "/leisure/" | "/library" | "/library/" | "/lifeflow" | "/lifeflow/" | "/maintenance" | "/maintenance/" | "/mantras" | "/mantras/" | "/maps" | "/maps/" | "/meals" | "/meals/" | "/members" | "/members/" | "/pantry" | "/pantry/" | "/products" | "/products/" | "/projects" | "/projects/" | "/recharges" | "/recharges/" | "/recipes" | "/recipes/" | "/recipes/traditional" | "/recipes/traditional/" | "/reminders" | "/reminders/" | "/repairs" | "/repairs/" | "/requests" | "/requests/" | "/rituals" | "/rituals/" | "/schedule" | "/schedule/" | "/settings" | "/settings/" | "/shivo-agentic" | "/shivo-agentic/" | "/shivo-ai" | "/shivo-ai/" | "/shivo-music" | "/shivo-music/" | "/studies" | "/studies/" | "/study-plans" | "/study-plans/" | "/tamil-panchangam" | "/tamil-panchangam/" | "/temple" | "/temple/" | "/travel" | "/travel/" | "/trips" | "/trips/" | "/upgrades" | "/upgrades/" | "/urgent" | "/urgent/" | "/users" | "/users/" | "/vehicles" | "/vehicles/" | "/vendors" | "/vendors/" | "/wellness" | "/wellness/" | "/yoga" | "/yoga/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}