import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Sample food data
const sampleFoods = [
  {
    id: '1',
    name: 'Idli Sambar',
    category: 'Breakfast',
    cuisine: 'South Indian',
    ingredients: ['Rice', 'Urad dal', 'Sambar vegetables', 'Tamarind', 'Spices'],
    instructions: 'Soak rice and dal, grind to batter, ferment overnight, steam idlis, prepare sambar with vegetables and spices.',
    nutritional_info: { calories: 250, protein: 8, carbs: 45, fat: 3 },
    preparation_time: 45,
    servings: 4,
    difficulty: 'Medium',
    dietary_tags: ['Vegetarian', 'Gluten-free'],
    meal_type: 'Breakfast',
    created_by: '1',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: null,
    cooked_at: null,
    rating: 4.5,
    reviews: 12
  },
  {
    id: '2',
    name: 'Chicken Biryani',
    category: 'Main Course',
    cuisine: 'Hyderabadi',
    ingredients: ['Basmati rice', 'Chicken', 'Onions', 'Tomatoes', 'Spices', 'Yogurt', 'Ghee'],
    instructions: 'Marinate chicken, cook rice, layer with marinated chicken and spices, dum cook for 30 minutes.',
    nutritional_info: { calories: 450, protein: 25, carbs: 50, fat: 18 },
    preparation_time: 60,
    servings: 6,
    difficulty: 'Hard',
    dietary_tags: ['Non-vegetarian'],
    meal_type: 'Lunch',
    created_by: '1',
    created_at: '2024-01-16T12:00:00Z',
    updated_at: '2024-01-16T12:00:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: '2024-01-20T13:00:00Z',
    cooked_at: null,
    rating: 4.8,
    reviews: 8
  },
  {
    id: '3',
    name: 'Vegetable Pulao',
    category: 'Main Course',
    cuisine: 'North Indian',
    ingredients: ['Basmati rice', 'Mixed vegetables', 'Onions', 'Ginger-garlic', 'Spices', 'Ghee'],
    instructions: 'Sauté vegetables and spices, add rice and water, cook until fluffy.',
    nutritional_info: { calories: 320, protein: 6, carbs: 55, fat: 8 },
    preparation_time: 30,
    servings: 4,
    difficulty: 'Easy',
    dietary_tags: ['Vegetarian', 'Vegan'],
    meal_type: 'Lunch',
    created_by: '2',
    created_at: '2024-01-17T11:30:00Z',
    updated_at: '2024-01-17T11:30:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: null,
    cooked_at: '2024-01-17T13:00:00Z',
    rating: 4.2,
    reviews: 15
  },
  {
    id: '4',
    name: 'Dosa with Chutney',
    category: 'Breakfast',
    cuisine: 'South Indian',
    ingredients: ['Rice', 'Urad dal', 'Coconut', 'Chili', 'Curry leaves', 'Oil'],
    instructions: 'Prepare dosa batter, ferment, spread on hot griddle, serve with coconut chutney.',
    nutritional_info: { calories: 280, protein: 7, carbs: 48, fat: 6 },
    preparation_time: 40,
    servings: 4,
    difficulty: 'Medium',
    dietary_tags: ['Vegetarian', 'Gluten-free'],
    meal_type: 'Breakfast',
    created_by: '1',
    created_at: '2024-01-18T07:45:00Z',
    updated_at: '2024-01-18T07:45:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: '2024-01-21T08:00:00Z',
    cooked_at: null,
    rating: 4.6,
    reviews: 20
  },
  {
    id: '5',
    name: 'Paneer Butter Masala',
    category: 'Main Course',
    cuisine: 'Punjabi',
    ingredients: ['Paneer', 'Tomatoes', 'Cream', 'Butter', 'Spices', 'Onions', 'Ginger-garlic'],
    instructions: 'Cook tomato base, add spices and cream, add paneer cubes, simmer for 10 minutes.',
    nutritional_info: { calories: 380, protein: 15, carbs: 12, fat: 28 },
    preparation_time: 35,
    servings: 4,
    difficulty: 'Medium',
    dietary_tags: ['Vegetarian'],
    meal_type: 'Dinner',
    created_at: '2024-01-19T18:30:00Z',
    updated_at: '2024-01-19T18:30:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: null,
    cooked_at: '2024-01-19T19:30:00Z',
    rating: 4.4,
    reviews: 18
  },
  {
    id: '6',
    name: 'Fruit Salad',
    category: 'Dessert',
    cuisine: 'International',
    ingredients: ['Apple', 'Banana', 'Orange', 'Grapes', 'Honey', 'Lemon juice'],
    instructions: 'Chop fruits, mix with honey and lemon juice, chill and serve.',
    nutritional_info: { calories: 120, protein: 2, carbs: 30, fat: 1 },
    preparation_time: 15,
    servings: 4,
    difficulty: 'Easy',
    dietary_tags: ['Vegetarian', 'Vegan', 'Gluten-free'],
    meal_type: 'Dessert',
    created_by: '3',
    created_at: '2024-01-20T14:00:00Z',
    updated_at: '2024-01-20T14:00:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: '2024-01-22T15:00:00Z',
    cooked_at: null,
    rating: 4.0,
    reviews: 6
  },
  {
    id: '7',
    name: 'Medu Vada',
    category: 'Snack',
    cuisine: 'South Indian',
    ingredients: ['Urad dal', 'Onions', 'Green chilies', 'Curry leaves', 'Oil'],
    instructions: 'Grind urad dal, mix with spices, shape into vadas, deep fry until golden.',
    nutritional_info: { calories: 180, protein: 6, carbs: 20, fat: 9 },
    preparation_time: 25,
    servings: 4,
    difficulty: 'Medium',
    dietary_tags: ['Vegetarian', 'Gluten-free'],
    meal_type: 'Snack',
    created_by: '1',
    created_at: '2024-01-21T16:00:00Z',
    updated_at: '2024-01-21T16:00:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: null,
    cooked_at: '2024-01-21T17:00:00Z',
    rating: 4.3,
    reviews: 14
  },
  {
    id: '8',
    name: 'Chicken Curry',
    category: 'Main Course',
    cuisine: 'South Indian',
    ingredients: ['Chicken', 'Coconut milk', 'Onions', 'Tomatoes', 'Spices', 'Oil'],
    instructions: 'Cook chicken with spices, add coconut milk, simmer until tender.',
    nutritional_info: { calories: 350, protein: 28, carbs: 8, fat: 22 },
    preparation_time: 45,
    servings: 4,
    difficulty: 'Medium',
    dietary_tags: ['Non-vegetarian'],
    meal_type: 'Dinner',
    created_by: '2',
    created_at: '2024-01-22T19:00:00Z',
    updated_at: '2024-01-22T19:00:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: '2024-01-23T20:00:00Z',
    cooked_at: null,
    rating: 4.7,
    reviews: 11
  },
  {
    id: '9',
    name: 'Upma',
    category: 'Breakfast',
    cuisine: 'South Indian',
    ingredients: ['Semolina', 'Onions', 'Vegetables', 'Mustard seeds', 'Curry leaves', 'Oil'],
    instructions: 'Roast semolina, sauté vegetables and spices, add water and semolina, cook until done.',
    nutritional_info: { calories: 220, protein: 5, carbs: 35, fat: 7 },
    preparation_time: 20,
    servings: 3,
    difficulty: 'Easy',
    dietary_tags: ['Vegetarian', 'Vegan'],
    meal_type: 'Breakfast',
    created_by: '1',
    created_at: '2024-01-23T08:15:00Z',
    updated_at: '2024-01-23T08:15:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: null,
    cooked_at: '2024-01-23T08:45:00Z',
    rating: 4.1,
    reviews: 9
  },
  {
    id: '10',
    name: 'Ras Malai',
    category: 'Dessert',
    cuisine: 'Bengali',
    ingredients: ['Milk', 'Sugar', 'Lemon', 'Cardamom', 'Pistachios'],
    instructions: 'Curdle milk, shape into dumplings, cook in sugar syrup, serve chilled.',
    nutritional_info: { calories: 180, protein: 4, carbs: 25, fat: 6 },
    preparation_time: 60,
    servings: 6,
    difficulty: 'Hard',
    dietary_tags: ['Vegetarian'],
    meal_type: 'Dessert',
    created_by: '3',
    created_at: '2024-01-24T10:00:00Z',
    updated_at: '2024-01-24T10:00:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: '2024-01-25T16:00:00Z',
    cooked_at: null,
    rating: 4.9,
    reviews: 22
  }
];

// Initialize store
function createFoodsStore() {
  const { subscribe, set, update } = writable(sampleFoods);

  return {
    subscribe,
    addFood: (food) => update(foods => [...foods, { ...food, id: Date.now().toString() }]),
    updateFood: (id, updates) => update(foods =>
      foods.map(food => food.id === id ? { ...food, ...updates, updated_at: new Date().toISOString() } : food)
    ),
    removeFood: (id) => update(foods => foods.filter(food => food.id !== id)),
    getFoodById: (id: string) => {
      let result: any = null;
      update((foods: any[]) => {
        result = foods.find((food: any) => food.id === id) || null;
        return foods;
      });
      return result;
    },
    getFoodsByCategory: (category: string) => {
      let result: any[] = [];
      update((foods: any[]) => {
        result = foods.filter((food: any) => food.category === category);
        return foods;
      });
      return result;
    },
    getFoodsByMealType: (mealType: string) => {
      let result: any[] = [];
      update((foods: any[]) => {
        result = foods.filter((food: any) => food.meal_type === mealType);
        return foods;
      });
      return result;
    },
    getScheduledMeals: () => {
      let result: any[] = [];
      update((foods: any[]) => {
        result = foods.filter((food: any) => food.scheduled_for && new Date(food.scheduled_for) > new Date());
        return foods;
      });
      return result;
    },
    getRecentMeals: (limit: number = 5) => {
      let result: any[] = [];
      update((foods: any[]) => {
        result = foods
          .filter((food: any) => food.cooked_at)
          .sort((a: any, b: any) => new Date(b.cooked_at || 0).getTime() - new Date(a.cooked_at || 0).getTime())
          .slice(0, limit);
        return foods;
      });
      return result;
    }
  };
}

export const foods = createFoodsStore();