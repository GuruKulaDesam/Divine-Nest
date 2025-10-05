import Dexie from 'dexie';

// Meals, Recipes & Kitchen Life Database
export class MealsDB extends Dexie {
  constructor() {
    super('MealsDB');
    this.version(1).stores({
      mealPlans: 'id, date, type, completed',
      recipes: 'id, title, category, source, prepTime, cookTime',
      ingredients: 'id, name, category, inStock, lastUsed',
      voiceNotes: 'id, recipeId, audioBlob, transcribedText, createdAt'
    });
  }
}

export const mealsDB = new MealsDB();

// Initialize sample data
export async function initializeMealsData() {
  try {
    // Check if data already exists
    const existingRecipes = await mealsDB.recipes.count();
    if (existingRecipes > 0) return;

    // Sample recipes
    const recipes = [
      {
        id: 'sambar-rice',
        title: 'Sambar Rice (தொண்டை மண்டல சாம்பார் சாதம்)',
        category: 'vegetarian',
        source: 'traditional',
        prepTime: 15,
        cookTime: 30,
        servings: 4,
        ingredients: [
          { ingredientId: 'rice', name: 'Rice', quantity: 2, unit: 'cups' },
          { ingredientId: 'toor-dal', name: 'Toor Dal', quantity: 1, unit: 'cup' },
          { ingredientId: 'tamarind', name: 'Tamarind', quantity: 1, unit: 'small lemon size' },
          { ingredientId: 'sambar-powder', name: 'Sambar Powder', quantity: 2, unit: 'tbsp' },
          { ingredientId: 'turmeric', name: 'Turmeric', quantity: 1, unit: 'tsp' },
          { ingredientId: 'salt', name: 'Salt', quantity: 1, unit: 'tsp' }
        ],
        steps: [
          'Cook rice and dal separately until soft',
          'Soak tamarind and extract juice',
          'Cook vegetables with tamarind water and spices',
          'Add cooked dal and simmer',
          'Mix with rice and serve hot'
        ],
        nutritionalInfo: {
          calories: 350,
          protein: 12,
          carbs: 65,
          fat: 8
        },
        culturalNotes: 'Traditional South Indian comfort food, perfect for lunch',
        rating: 5,
        tags: ['south-indian', 'vegetarian', 'comfort-food', 'lunch'],
        createdAt: new Date('2025-01-01')
      },
      {
        id: 'rasam',
        title: 'Pepper Rasam (மிளகு ரசம்)',
        category: 'vegetarian',
        source: 'traditional',
        prepTime: 10,
        cookTime: 15,
        servings: 4,
        ingredients: [
          { ingredientId: 'tamarind', name: 'Tamarind', quantity: 1, unit: 'small lemon size' },
          { ingredientId: 'tomato', name: 'Tomato', quantity: 2, unit: 'medium' },
          { ingredientId: 'pepper', name: 'Black Pepper', quantity: 1, unit: 'tsp' },
          { ingredientId: 'cumin', name: 'Cumin Seeds', quantity: 1, unit: 'tsp' },
          { ingredientId: 'garlic', name: 'Garlic', quantity: 3, unit: 'cloves' },
          { ingredientId: 'curry-leaves', name: 'Curry Leaves', quantity: 1, unit: 'sprig' }
        ],
        steps: [
          'Extract tamarind juice',
          'Cook tomatoes with tamarind water',
          'Add crushed pepper, cumin, and garlic',
          'Season with curry leaves and coriander',
          'Serve hot with rice'
        ],
        nutritionalInfo: {
          calories: 45,
          protein: 2,
          carbs: 8,
          fat: 1
        },
        culturalNotes: 'Healing soup for colds and digestion, served with rice',
        rating: 4.5,
        tags: ['south-indian', 'vegetarian', 'soup', 'medicinal'],
        createdAt: new Date('2025-01-02')
      },
      {
        id: 'pongal',
        title: 'Sweet Pongal (சக்கரை பொங்கல்)',
        category: 'vegetarian',
        source: 'festival',
        prepTime: 5,
        cookTime: 25,
        servings: 6,
        ingredients: [
          { ingredientId: 'rice', name: 'Rice', quantity: 1, unit: 'cup' },
          { ingredientId: 'moong-dal', name: 'Moong Dal', quantity: 0.25, unit: 'cup' },
          { ingredientId: 'jaggery', name: 'Jaggery', quantity: 1, unit: 'cup' },
          { ingredientId: 'ghee', name: 'Ghee', quantity: 2, unit: 'tbsp' },
          { ingredientId: 'cashews', name: 'Cashews', quantity: 10, unit: 'pieces' },
          { ingredientId: 'raisins', name: 'Raisins', quantity: 1, unit: 'tbsp' }
        ],
        steps: [
          'Cook rice and dal with water until soft',
          'Melt jaggery and add to cooked rice-dal mixture',
          'Fry nuts in ghee and add to pongal',
          'Offer to deities first, then serve family'
        ],
        nutritionalInfo: {
          calories: 280,
          protein: 5,
          carbs: 55,
          fat: 8
        },
        culturalNotes: 'Festival dish for Pongal, offered to Sun God',
        rating: 5,
        tags: ['festival', 'sweet', 'pongal', 'traditional'],
        createdAt: new Date('2025-01-03')
      }
    ];

    // Sample ingredients
    const ingredients = [
      { id: 'rice', name: 'Rice', category: 'grains', inStock: true, quantity: 5, unit: 'kg', lastUsed: new Date('2025-10-01') },
      { id: 'toor-dal', name: 'Toor Dal', category: 'grains', inStock: true, quantity: 2, unit: 'kg', lastUsed: new Date('2025-09-28') },
      { id: 'tamarind', name: 'Tamarind', category: 'spices', inStock: true, quantity: 500, unit: 'g', lastUsed: new Date('2025-09-30') },
      { id: 'turmeric', name: 'Turmeric', category: 'spices', inStock: true, quantity: 100, unit: 'g', lastUsed: new Date('2025-10-01') },
      { id: 'cumin', name: 'Cumin Seeds', category: 'spices', inStock: true, quantity: 50, unit: 'g', lastUsed: new Date('2025-09-25') },
      { id: 'pepper', name: 'Black Pepper', category: 'spices', inStock: true, quantity: 30, unit: 'g', lastUsed: new Date('2025-09-20') },
      { id: 'jaggery', name: 'Jaggery', category: 'other', inStock: true, quantity: 1, unit: 'kg', lastUsed: new Date('2025-01-14') }
    ];

    // Sample meal plans
    const mealPlans = [
      {
        id: 'daily-2025-10-05',
        date: new Date('2025-10-05'),
        type: 'daily',
        meals: {
          breakfast: 'Idli with Sambar',
          lunch: 'Sambar Rice with Rasam',
          dinner: 'Curry with Rice',
          snacks: ['Banana', 'Coffee']
        },
        ingredients: [
          { id: 'rice-1', name: 'Rice', quantity: 3, unit: 'cups', category: 'grains' },
          { id: 'dal-1', name: 'Toor Dal', quantity: 1, unit: 'cup', category: 'grains' },
          { id: 'vegetables-1', name: 'Mixed Vegetables', quantity: 500, unit: 'g', category: 'vegetables' }
        ],
        culturalNotes: 'Traditional South Indian vegetarian meal',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await mealsDB.recipes.bulkAdd(recipes);
    await mealsDB.ingredients.bulkAdd(ingredients);
    await mealsDB.mealPlans.bulkAdd(mealPlans);

    console.log('Meals data initialized successfully');
  } catch (error) {
    console.error('Error initializing meals data:', error);
  }
}

export const initMealsDB = initializeMealsData;

// Meal Plan Operations
export async function getMealPlans() {
  return await mealsDB.mealPlans.toArray();
}

export async function getMealPlanByDate(date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return await mealsDB.mealPlans
    .where('date')
    .between(startOfDay, endOfDay)
    .first();
}

export async function addMealPlan(plan) {
  const id = `mealplan-${Date.now()}`;
  const newPlan = {
    ...plan,
    id,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await mealsDB.mealPlans.add(newPlan);
  return newPlan;
}

export async function updateMealPlan(id, updates) {
  await mealsDB.mealPlans.update(id, { ...updates, updatedAt: new Date() });
}

export async function deleteMealPlan(id) {
  await mealsDB.mealPlans.delete(id);
}

// Recipe Operations
export async function getRecipes() {
  return await mealsDB.recipes.toArray();
}

export async function getRecipesByCategory(category) {
  return await mealsDB.recipes.where('category').equals(category).toArray();
}

export async function getRecipesByTag(tag) {
  return await mealsDB.recipes.filter(recipe => recipe.tags.includes(tag)).toArray();
}

export async function addRecipe(recipe) {
  const id = `recipe-${Date.now()}`;
  const newRecipe = {
    ...recipe,
    id,
    createdAt: new Date()
  };
  await mealsDB.recipes.add(newRecipe);
  return newRecipe;
}

export async function updateRecipe(id, updates) {
  await mealsDB.recipes.update(id, { ...updates, lastUsed: new Date() });
}

export async function deleteRecipe(id) {
  await mealsDB.recipes.delete(id);
}

export async function rateRecipe(id, rating) {
  await updateRecipe(id, { rating });
}

// Ingredient Operations
export async function getIngredients() {
  return await mealsDB.ingredients.toArray();
}

export async function getIngredientsByCategory(category) {
  return await mealsDB.ingredients.where('category').equals(category).toArray();
}

export async function addIngredient(ingredient) {
  const id = `ingredient-${Date.now()}`;
  const newIngredient = { ...ingredient, id };
  await mealsDB.ingredients.add(newIngredient);
  return newIngredient;
}

export async function updateIngredient(id, updates) {
  await mealsDB.ingredients.update(id, updates);
}

export async function deleteIngredient(id) {
  await mealsDB.ingredients.delete(id);
}

// Voice Note Operations
export async function saveVoiceNote(note) {
  const id = `voicenote-${Date.now()}`;
  const newNote = {
    ...note,
    id,
    createdAt: new Date(),
    processed: false
  };
  await mealsDB.voiceNotes.add(newNote);
  return newNote;
}

export async function getVoiceNotes(recipeId) {
  if (recipeId) {
    return await mealsDB.voiceNotes.where('recipeId').equals(recipeId).toArray();
  }
  return await mealsDB.voiceNotes.toArray();
}

// Statistics and Analytics
export async function getMealsStats() {
  const recipes = await getRecipes();
  const mealPlans = await getMealPlans();
  const ingredients = await getIngredients();

  return {
    totalRecipes: recipes.length,
    recipesByCategory: recipes.reduce((acc, recipe) => {
      acc[recipe.category] = (acc[recipe.category] || 0) + 1;
      return acc;
    }, {}),
    avgRecipeRating: recipes.filter(r => r.rating).reduce((sum, r) => sum + (r.rating || 0), 0) / recipes.filter(r => r.rating).length || 0,
    totalMealPlans: mealPlans.length,
    completedMealPlans: mealPlans.filter(p => p.completed).length,
    totalIngredients: ingredients.length,
    inStockIngredients: ingredients.filter(i => i.inStock).length
  };
}

// Smart Grocery List Generation
export async function generateGroceryList(mealPlan) {
  const existingIngredients = await getIngredients();
  const inStockItems = new Set(existingIngredients.filter(i => i.inStock).map(i => i.name.toLowerCase()));

  const groceryList = [];

  for (const ingredient of mealPlan.ingredients) {
    if (!inStockItems.has(ingredient.name.toLowerCase())) {
      groceryList.push(ingredient);
    }
  }

  return groceryList;
}