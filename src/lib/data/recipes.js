import { Dexie } from 'dexie';

// Initialize IndexedDB for recipes
export const db = new Dexie('RecipesDB');

db.version(1).stores({
  recipes: '++id, name, category, ingredients, instructions, prepTime, cookTime, servings, difficulty, tags, createdAt, updatedAt',
  categories: '++id, name, description, color',
  ingredients: '++id, name, category, unit, quantity, price',
  mealPlans: '++id, date, meals, notes'
});

// Initialize database with sample data
export async function initRecipesDB() {
  try {
    // Check if data already exists
    const existingRecipes = await db.recipes.count();
    if (existingRecipes > 0) return;

    // Sample categories
    await db.categories.bulkAdd([
      { name: 'Breakfast', description: 'Morning meals and breakfast items', color: '#FF6B6B' },
      { name: 'Lunch', description: 'Midday meals', color: '#4ECDC4' },
      { name: 'Dinner', description: 'Evening meals', color: '#45B7D1' },
      { name: 'Snacks', description: 'Light snacks and appetizers', color: '#96CEB4' },
      { name: 'Desserts', description: 'Sweet treats and desserts', color: '#FFEAA7' },
      { name: 'Beverages', description: 'Drinks and beverages', color: '#DDA0DD' }
    ]);

    // Sample recipes
    await db.recipes.bulkAdd([
      {
        name: 'Idli Sambar',
        category: 'Breakfast',
        ingredients: [
          '2 cups rice',
          '1 cup urad dal',
          '1 tsp fenugreek seeds',
          'Salt to taste',
          '1 cup toor dal',
          '2 tomatoes',
          '1 onion',
          '2 tbsp sambar powder',
          '1 tsp turmeric',
          'Tamarind paste',
          'Curry leaves',
          'Mustard seeds'
        ],
        instructions: [
          'Soak rice and urad dal with fenugreek seeds for 6 hours',
          'Grind to a smooth batter and ferment overnight',
          'Steam idli batter in idli molds for 10-12 minutes',
          'For sambar: Cook toor dal with turmeric and water',
          'Add chopped vegetables, sambar powder, and tamarind',
          'Season with mustard seeds and curry leaves',
          'Serve hot idli with sambar and chutney'
        ],
        prepTime: 30,
        cookTime: 45,
        servings: 4,
        difficulty: 'Medium',
        tags: ['South Indian', 'Traditional', 'Vegetarian'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dosa',
        category: 'Breakfast',
        ingredients: [
          '2 cups rice',
          '1 cup urad dal',
          '1 tsp fenugreek seeds',
          'Salt to taste',
          'Oil for cooking',
          'Potato filling ingredients',
          'Onion, potato, green chilies',
          'Mustard seeds, curry leaves'
        ],
        instructions: [
          'Soak rice and urad dal with fenugreek seeds for 6 hours',
          'Grind to smooth batter and ferment overnight',
          'Heat dosa pan and spread thin layer of batter',
          'Cook until golden brown on both sides',
          'For filling: Cook potatoes with spices and onions',
          'Serve hot with chutney and sambar'
        ],
        prepTime: 30,
        cookTime: 20,
        servings: 4,
        difficulty: 'Medium',
        tags: ['South Indian', 'Crispy', 'Vegetarian'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chicken Biryani',
        category: 'Dinner',
        ingredients: [
          '500g chicken',
          '2 cups basmati rice',
          '2 onions',
          '2 tomatoes',
          'Green chilies',
          'Ginger-garlic paste',
          'Biryani masala',
          'Yogurt',
          'Saffron',
          'Fried onions',
          'Boiled eggs',
          'Mint and coriander leaves'
        ],
        instructions: [
          'Marinate chicken with yogurt, spices, and ginger-garlic paste',
          'Cook basmati rice with whole spices until 70% done',
          'Layer chicken and rice alternately in a heavy bottom pan',
          'Add saffron milk, fried onions, and boiled eggs',
          'Seal with dough and cook on low heat for 30 minutes',
          'Serve hot with raita and salad'
        ],
        prepTime: 45,
        cookTime: 60,
        servings: 4,
        difficulty: 'Hard',
        tags: ['Non-Veg', 'Festive', 'Aromatic'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    console.log('Recipes database initialized with sample data');
  } catch (error) {
    console.error('Error initializing recipes database:', error);
  }
}

// Recipe operations
export async function getAllRecipes() {
  return await db.recipes.toArray();
}

export async function getRecipesByCategory(category) {
  return await db.recipes.where('category').equals(category).toArray();
}

export async function addRecipe(recipe) {
  return await db.recipes.add({
    ...recipe,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

export async function updateRecipe(id, updates) {
  return await db.recipes.update(id, {
    ...updates,
    updatedAt: new Date()
  });
}

export async function deleteRecipe(id) {
  return await db.recipes.delete(id);
}

export async function getAllCategories() {
  return await db.categories.toArray();
}

// Search recipes
export async function searchRecipes(query) {
  const allRecipes = await getAllRecipes();
  const lowerQuery = query.toLowerCase();

  return allRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(lowerQuery) ||
    recipe.ingredients.some(ing => ing.toLowerCase().includes(lowerQuery)) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}