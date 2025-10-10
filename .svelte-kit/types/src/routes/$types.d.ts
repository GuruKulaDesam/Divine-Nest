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
type LayoutRouteId = RouteId | "/" | "/analytics" | "/assets" | "/assets/documents" | "/assets/items" | "/assets/maintenance" | "/assets/value" | "/assistant" | "/assistant/ambient-log" | "/assistant/auto-checklist" | "/assistant/event-feed" | "/assistant/task-board" | "/assistant/voice-log" | "/budget" | "/charts" | "/community" | "/contacts" | "/culture" | "/culture/daily-voice-guide" | "/culture/lifestyle-guide" | "/culture/places-to-visit" | "/culture/things-to-follow" | "/culture/things-to-remember" | "/culture/ways-to-live" | "/directory" | "/education" | "/education/achievements" | "/education/archive" | "/education/assessment" | "/education/courses" | "/education/curriculum" | "/education/grades-tracker" | "/education/mentors" | "/education/planner" | "/education/quiz" | "/education/students" | "/emergency" | "/emotions" | "/expenses" | "/family-calendar-modern" | "/family-governance" | "/family-notes-modern" | "/family-stories" | "/festival-calendar" | "/finances" | "/gantt" | "/grocery" | "/health" | "/health/beauty-guide" | "/health/period-tracker" | "/hobbies-activities" | "/household" | "/insurance" | "/inventory" | "/investments" | "/issues-emergency" | "/journal" | "/kitchen" | "/kitchen/cleaning" | "/kitchen/festivals" | "/kitchen/fresh" | "/kitchen/kids" | "/kitchen/vendors" | "/kitchen/wellness" | "/kolam" | "/learning-goals" | "/legacy" | "/leisure" | "/library" | "/lifeflow" | "/maintenance" | "/mantras" | "/maps" | "/meals" | "/members" | "/pantry" | "/products" | "/projects" | "/recharges" | "/recipes" | "/recipes/traditional" | "/reminders" | "/repairs" | "/requests" | "/rituals" | "/schedule" | "/settings" | "/shivo-agentic" | "/shivo-ai" | "/shivo-music" | "/studies" | "/study-plans" | "/tamil-panchangam" | "/temple" | "/travel" | "/trips" | "/upgrades" | "/urgent" | "/users" | "/vehicles" | "/vendors" | "/wellness" | "/yoga" | null
type LayoutParams = RouteParams & {  }
type LayoutParentData = EnsureDefined<{}>;

export type PageServerData = null;
export type PageData = Expand<PageParentData>;
export type PageProps = { params: RouteParams; data: PageData }
export type LayoutServerData = null;
export type LayoutData = Expand<LayoutParentData>;
export type LayoutProps = { params: LayoutParams; data: LayoutData; children: import("svelte").Snippet }