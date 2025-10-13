import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Sample food data - South Indian Family Meals
const sampleFoods = [
  {
    id: '1',
    name: 'Idli Sambar with Coconut Chutney',
    category: 'Breakfast',
    cuisine: 'South Indian',
    ingredients: ['Rice', 'Urad dal', 'Sambar vegetables (drumstick, eggplant, pumpkin)', 'Tamarind', 'Sambar powder', 'Coconut', 'Red chilies', 'Curry leaves'],
    instructions: 'Soak rice and urad dal for 4 hours, grind to smooth batter, ferment overnight. Steam idlis. For sambar: pressure cook vegetables with tamarind and spices. For chutney: grind coconut with chilies and curry leaves.',
    nutritional_info: { calories: 280, protein: 9, carbs: 52, fat: 4 },
    preparation_time: 45,
    servings: 6,
    difficulty: 'Medium',
    dietary_tags: ['Vegetarian', 'Gluten-free', 'Dairy-free'],
    meal_type: 'Breakfast',
    created_by: 'Mother',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: null,
    cooked_at: '2024-01-15T08:30:00Z',
    rating: 4.8,
    reviews: 25
  },
  {
    id: '2',
    name: 'Masala Dosa with Potato Filling',
    category: 'Breakfast',
    cuisine: 'South Indian',
    ingredients: ['Rice', 'Urad dal', 'Potatoes', 'Onions', 'Green chilies', 'Mustard seeds', 'Curry leaves', 'Turmeric', 'Oil'],
    instructions: 'Prepare dosa batter and ferment. For filling: boil potatoes, sauté with onions, chilies, and spices. Spread batter on hot griddle, add filling, fold and serve.',
    nutritional_info: { calories: 320, protein: 8, carbs: 55, fat: 8 },
    preparation_time: 50,
    servings: 4,
    difficulty: 'Medium',
    dietary_tags: ['Vegetarian', 'Vegan'],
    meal_type: 'Breakfast',
    created_by: 'Mother',
    created_at: '2024-01-16T07:30:00Z',
    updated_at: '2024-01-16T07:30:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: '2024-01-20T08:00:00Z',
    cooked_at: null,
    rating: 4.9,
    reviews: 32
  },
  {
    id: '3',
    name: 'Vegetable Biryani (South Indian Style)',
    category: 'Main Course',
    cuisine: 'South Indian',
    ingredients: ['Basmati rice', 'Mixed vegetables (carrots, beans, peas, cauliflower)', 'Onions', 'Tomatoes', 'Ginger-garlic paste', 'Biryani masala', 'Yogurt', 'Ghee', 'Cashews', 'Raisins'],
    instructions: 'Cook rice with whole spices. Sauté vegetables with biryani masala. Layer rice and vegetable mixture. Add saffron milk and ghee. Dum cook for 20 minutes.',
    nutritional_info: { calories: 380, protein: 8, carbs: 65, fat: 12 },
    preparation_time: 60,
    servings: 6,
    difficulty: 'Hard',
    dietary_tags: ['Vegetarian', 'Gluten-free'],
    meal_type: 'Lunch',
    created_by: 'Mother',
    created_at: '2024-01-17T12:00:00Z',
    updated_at: '2024-01-17T12:00:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: null,
    cooked_at: '2024-01-17T13:30:00Z',
    rating: 4.7,
    reviews: 28
  },
  {
    id: '4',
    name: 'Fish Curry with Rice (Kerala Style)',
    category: 'Main Course',
    cuisine: 'Kerala',
    ingredients: ['King fish', 'Coconut milk', 'Kashmiri chilies', 'Tamarind', 'Curry leaves', 'Mustard seeds', 'Fenugreek seeds', 'Rice'],
    instructions: 'Clean fish. Prepare curry base with coconut milk, tamarind, and spices. Add fish pieces and simmer. Serve with steamed rice.',
    nutritional_info: { calories: 420, protein: 28, carbs: 45, fat: 16 },
    preparation_time: 40,
    servings: 4,
    difficulty: 'Medium',
    dietary_tags: ['Non-vegetarian', 'Gluten-free', 'Dairy-free'],
    meal_type: 'Lunch',
    created_by: 'Father',
    created_at: '2024-01-18T13:00:00Z',
    updated_at: '2024-01-18T13:00:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: '2024-01-22T13:30:00Z',
    cooked_at: null,
    rating: 4.6,
    reviews: 22
  },
  {
    id: '5',
    name: 'Sambar Rice (Tiffin Sambar)',
    category: 'Main Course',
    cuisine: 'South Indian',
    ingredients: ['Rice', 'Toor dal', 'Mixed vegetables', 'Sambar powder', 'Tamarind', 'Ghee', 'Cashews', 'Curry leaves'],
    instructions: 'Cook rice and dal separately. Prepare sambar with vegetables and spices. Mix rice with sambar. Garnish with ghee, cashews, and curry leaves.',
    nutritional_info: { calories: 350, protein: 12, carbs: 58, fat: 7 },
    preparation_time: 35,
    servings: 4,
    difficulty: 'Easy',
    dietary_tags: ['Vegetarian', 'Gluten-free'],
    meal_type: 'Lunch',
    created_by: 'Mother',
    created_at: '2024-01-19T12:30:00Z',
    updated_at: '2024-01-19T12:30:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: null,
    cooked_at: '2024-01-19T13:00:00Z',
    rating: 4.4,
    reviews: 18
  },
  {
    id: '6',
    name: 'Avial with Rice',
    category: 'Main Course',
    cuisine: 'Kerala',
    ingredients: ['Rice', 'Mixed vegetables (drumstick, carrots, beans, pumpkin)', 'Coconut', 'Green chilies', 'Curry leaves', 'Cumin seeds', 'Turmeric', 'Coconut oil'],
    instructions: 'Cook rice. Grind coconut with chilies and cumin. Cook vegetables with turmeric. Add ground coconut mixture and curry leaves. Finish with coconut oil.',
    nutritional_info: { calories: 290, protein: 6, carbs: 48, fat: 9 },
    preparation_time: 30,
    servings: 4,
    difficulty: 'Easy',
    dietary_tags: ['Vegetarian', 'Vegan', 'Gluten-free'],
    meal_type: 'Lunch',
    created_by: 'Grandmother',
    created_at: '2024-01-20T12:00:00Z',
    updated_at: '2024-01-20T12:00:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: '2024-01-25T12:30:00Z',
    cooked_at: null,
    rating: 4.5,
    reviews: 15
  },
  {
    id: '7',
    name: 'Medu Vada with Coconut Chutney',
    category: 'Snack',
    cuisine: 'South Indian',
    ingredients: ['Urad dal', 'Onions', 'Green chilies', 'Ginger', 'Curry leaves', 'Black pepper', 'Coconut', 'Oil for frying'],
    instructions: 'Soak urad dal, grind to thick batter. Mix with chopped onions, chilies, ginger, and spices. Shape into donuts and deep fry until golden.',
    nutritional_info: { calories: 220, protein: 8, carbs: 25, fat: 11 },
    preparation_time: 45,
    servings: 6,
    difficulty: 'Medium',
    dietary_tags: ['Vegetarian', 'Gluten-free'],
    meal_type: 'Evening Snack',
    created_by: 'Mother',
    created_at: '2024-01-21T16:00:00Z',
    updated_at: '2024-01-21T16:00:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: null,
    cooked_at: '2024-01-21T17:00:00Z',
    rating: 4.7,
    reviews: 20
  },
  {
    id: '8',
    name: 'Rasam with Rice',
    category: 'Main Course',
    cuisine: 'South Indian',
    ingredients: ['Rice', 'Toor dal', 'Tamarind', 'Tomatoes', 'Rasam powder', 'Garlic', 'Curry leaves', 'Ghee'],
    instructions: 'Cook rice and dal. Extract tamarind juice, add tomatoes and rasam powder. Add cooked dal and simmer. Season with curry leaves and ghee.',
    nutritional_info: { calories: 260, protein: 10, carbs: 42, fat: 5 },
    preparation_time: 25,
    servings: 4,
    difficulty: 'Easy',
    dietary_tags: ['Vegetarian', 'Gluten-free'],
    meal_type: 'Dinner',
    created_by: 'Mother',
    created_at: '2024-01-22T19:00:00Z',
    updated_at: '2024-01-22T19:00:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: '2024-01-26T19:30:00Z',
    cooked_at: null,
    rating: 4.3,
    reviews: 16
  },
  {
    id: '9',
    name: 'Pongal (Sweet and Savory)',
    category: 'Breakfast',
    cuisine: 'Tamil Nadu',
    ingredients: ['Rice', 'Moong dal', 'Jaggery', 'Ghee', 'Cashews', 'Raisins', 'Pepper', 'Cumin seeds', 'Curry leaves'],
    instructions: 'For sweet pongal: Cook rice and dal with jaggery, ghee, and nuts. For savory: Cook with pepper, cumin, and curry leaves.',
    nutritional_info: { calories: 340, protein: 8, carbs: 55, fat: 10 },
    preparation_time: 40,
    servings: 6,
    difficulty: 'Medium',
    dietary_tags: ['Vegetarian', 'Gluten-free'],
    meal_type: 'Festival Food',
    created_by: 'Grandmother',
    created_at: '2024-01-23T09:00:00Z',
    updated_at: '2024-01-23T09:00:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: '2024-01-27T09:30:00Z',
    cooked_at: null,
    rating: 4.8,
    reviews: 30
  },
  {
    id: '10',
    name: 'Chicken Chettinad Curry',
    category: 'Main Course',
    cuisine: 'Chettinad',
    ingredients: ['Chicken', 'Chettinad masala', 'Coconut', 'Onions', 'Tomatoes', 'Ginger-garlic', 'Curry leaves', 'Oil'],
    instructions: 'Marinate chicken with Chettinad masala. Sauté onions, add marinated chicken, cook until tender. Add coconut milk and simmer.',
    nutritional_info: { calories: 380, protein: 32, carbs: 8, fat: 24 },
    preparation_time: 50,
    servings: 4,
    difficulty: 'Hard',
    dietary_tags: ['Non-vegetarian', 'Gluten-free'],
    meal_type: 'Dinner',
    created_by: 'Father',
    created_at: '2024-01-24T18:30:00Z',
    updated_at: '2024-01-24T18:30:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: null,
    cooked_at: '2024-01-24T19:30:00Z',
    rating: 4.9,
    reviews: 24
  },
  {
    id: '11',
    name: 'Coconut Milk Payasam',
    category: 'Dessert',
    cuisine: 'South Indian',
    ingredients: ['Rice', 'Coconut milk', 'Jaggery', 'Cardamom', 'Cashews', 'Raisins', 'Ghee'],
    instructions: 'Cook rice in water, add jaggery syrup, then coconut milk. Add cardamom and garnish with fried nuts.',
    nutritional_info: { calories: 280, protein: 4, carbs: 45, fat: 10 },
    preparation_time: 30,
    servings: 6,
    difficulty: 'Easy',
    dietary_tags: ['Vegetarian', 'Gluten-free'],
    meal_type: 'Dessert',
    created_by: 'Grandmother',
    created_at: '2024-01-25T15:00:00Z',
    updated_at: '2024-01-25T15:00:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: '2024-01-28T15:30:00Z',
    cooked_at: null,
    rating: 4.6,
    reviews: 19
  },
  {
    id: '12',
    name: 'Murukku (Chakli)',
    category: 'Snack',
    cuisine: 'South Indian',
    ingredients: ['Rice flour', 'Urad dal flour', 'Butter', 'Sesame seeds', 'Cumin seeds', 'Asafoetida', 'Oil for frying'],
    instructions: 'Mix flours with butter, spices, and water to make dough. Press through murukku maker into spirals. Deep fry until crispy.',
    nutritional_info: { calories: 180, protein: 3, carbs: 25, fat: 8 },
    preparation_time: 60,
    servings: 8,
    difficulty: 'Hard',
    dietary_tags: ['Vegetarian', 'Gluten-free'],
    meal_type: 'Festival Snack',
    created_by: 'Mother',
    created_at: '2024-01-26T10:00:00Z',
    updated_at: '2024-01-26T10:00:00Z',
    applicable_roles: ['All'],
    location: 'Kitchen',
    scheduled_for: null,
    cooked_at: '2024-01-26T12:00:00Z',
    rating: 4.5,
    reviews: 14
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