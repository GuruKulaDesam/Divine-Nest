import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// @ts-ignore
type MatcherParam<M> = M extends (param : string) => param is infer U ? U extends string ? U : string : string;
type RouteParams = {  };
type RouteId = '/';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type PageParentData = EnsureDefined<LayoutData>;
type LayoutRouteId = RouteId | "/" | "/assets" | "/assets/documents" | "/assets/household" | "/assets/inventory" | "/assets/items" | "/assets/maintenance" | "/assets/value" | "/assets/vehicles" | "/assistant" | "/assistant/ambient-log" | "/assistant/auto-checklist" | "/assistant/event-feed" | "/assistant/shivo-ai" | "/assistant/shivo-ai/agentic" | "/assistant/shivo-music" | "/assistant/task-board" | "/assistant/voice-log" | "/culture" | "/culture/daily-voice-guide" | "/culture/festival-calendar" | "/culture/kolam" | "/culture/lifestyle-guide" | "/culture/places-to-visit" | "/culture/things-to-follow" | "/culture/things-to-remember" | "/culture/ways-to-live" | "/directory" | "/divinity" | "/divinity/mantras" | "/divinity/panchangam" | "/divinity/rituals" | "/divinity/temple" | "/education" | "/education/achievements" | "/education/archive" | "/education/assessment" | "/education/courses" | "/education/curriculum" | "/education/grades-tracker" | "/education/learning-goals" | "/education/library" | "/education/mentors" | "/education/planner" | "/education/quiz" | "/education/students" | "/education/studies" | "/education/study-plans" | "/expenses" | "/finances" | "/finances/budget" | "/finances/expenses" | "/finances/insurance" | "/finances/investments" | "/finances/recharges" | "/food" | "/food/grocery" | "/food/kitchen" | "/food/kitchen/cleaning" | "/food/kitchen/dashboard" | "/food/kitchen/festivals" | "/food/kitchen/fresh" | "/food/kitchen/kids" | "/food/kitchen/meals" | "/food/kitchen/vendors" | "/food/kitchen/wellness" | "/food/meals" | "/food/pantry" | "/food/recipes" | "/food/recipes/traditional" | "/health" | "/health/beauty-guide" | "/health/hobbies-activities" | "/health/journal" | "/health/period-tracker" | "/health/wellness" | "/health/yoga" | "/home" | "/home/contacts" | "/home/contacts/directory" | "/home/contacts/emergency" | "/home/contacts/vendors" | "/home/family-calendar-modern" | "/home/family-notes-modern" | "/home/home-services" | "/home/household" | "/home/members" | "/home/reminders" | "/home/schedule" | "/inventory" | "/issues" | "/issues/dashboard" | "/issues/emergency" | "/issues/maintenance" | "/issues/projects" | "/issues/projects/gantt" | "/issues/repairs" | "/issues/requests" | "/issues/upgrades" | "/issues/urgent" | "/library" | "/lifeflow" | "/meals" | "/members" | "/memories" | "/memories/emotions" | "/memories/family-governance" | "/memories/family-stories" | "/memories/legacy" | "/memories/lifeflow" | "/pantry" | "/property" | "/recipes" | "/settings" | "/settings/analytics" | "/settings/analytics/charts" | "/study-plans" | "/todo" | "/travel" | "/travel/community" | "/travel/leisure" | "/travel/maps" | "/travel/trips" | "/vehicles" | "/wellness" | null
type LayoutParams = RouteParams & {  }
type LayoutParentData = EnsureDefined<{}>;

export type PageServerData = null;
export type PageData = Expand<PageParentData>;
export type PageProps = { params: RouteParams; data: PageData }
export type LayoutServerData = null;
export type LayoutData = Expand<LayoutParentData>;
export type LayoutProps = { params: LayoutParams; data: LayoutData; children: import("svelte").Snippet }