/**
 * NutriType – Mock Nutrition Service
 *
 * Returns personalised nutrition plans based on blood type and profile.
 * Future integration point: replace getMockNutritionPlan() with an
 * OpenAI API call using a carefully crafted system prompt.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Blood-type base data
// ─────────────────────────────────────────────────────────────────────────────

const BLOOD_TYPE_DATA = {
  'O': {
    typeLabel: 'Type O — The Hunter',
    typeDescription:
      'Type O is the oldest blood type, tied to ancestors who were hunter-gatherers. Your metabolism is optimised for lean protein, vigorous exercise, and low-grain diets.',
    foundationFoods: [
      { name: 'Grass-fed Beef', benefit: 'Rich protein & iron for type O metabolism' },
      { name: 'Wild Salmon', benefit: 'Omega-3s support type O heart health' },
      { name: 'Lamb & Venison', benefit: 'Lean protein with ancestral alignment' },
      { name: 'Broccoli', benefit: 'Anti-cancer crucifer, highly beneficial' },
      { name: 'Kale', benefit: 'Dense micronutrients, alkalising effect' },
      { name: 'Spinach', benefit: 'Iron-rich, boosts type O energy levels' },
      { name: 'Sweet Potato', benefit: 'Slow-burn carbs, anti-inflammatory' },
      { name: 'Walnuts', benefit: 'Brain-healthy fats, type O friendly' },
      { name: 'Olive Oil', benefit: 'Monounsaturated fats reduce inflammation' },
      { name: 'Blueberries', benefit: 'Antioxidant-rich, low glycaemic index' },
    ],
    avoidFoods: [
      { name: 'Wheat & Gluten', reason: 'Slows type O metabolism significantly' },
      { name: 'Dairy Products', reason: 'Poor digestion, promotes mucus buildup' },
      { name: 'Corn', reason: 'Inhibits insulin efficiency in type O' },
      { name: 'Kidney Beans', reason: 'Contain lectins harmful to type O cells' },
      { name: 'Pork', reason: 'Linked to inflammatory reactions in type O' },
    ],
    metabolicTiming: {
      preWorkout: 'Eat a small serving of lean protein (chicken or beef) 60–90 min before training. Pair with a low-GI carb like sweet potato.',
      postWorkout: 'Replenish with red meat or salmon + leafy greens within 45 min. Avoid simple sugars.',
      fastingWindow: 'Type O performs well with a 14:10 intermittent fasting window.',
      hydration: 'Target 3 L/day. Green tea amplifies type O fat metabolism.',
    },
    sampleMenu: {
      breakfast: {
        name: 'Hunter\'s Power Bowl',
        items: ['2 scrambled eggs', 'Sliced avocado', 'Handful of spinach sautéed in olive oil', 'Black coffee or green tea'],
        macros: '~380 kcal · 28g protein · 22g fat · 12g carbs',
      },
      lunch: {
        name: 'Grass-Fed Beef Salad',
        items: ['150g grilled grass-fed beef strips', 'Mixed kale & rocket', 'Cherry tomatoes', 'Olive oil & lemon dressing', 'Handful of walnuts'],
        macros: '~520 kcal · 42g protein · 28g fat · 18g carbs',
      },
      dinner: {
        name: 'Wild Salmon & Roasted Vegetables',
        items: ['180g wild salmon fillet', 'Roasted broccoli & sweet potato', 'Garlic-herb olive oil drizzle', 'Herbal tea'],
        macros: '~580 kcal · 44g protein · 24g fat · 36g carbs',
      },
    },
  },

  'A': {
    typeLabel: 'Type A — The Agrarian',
    typeDescription:
      'Type A evolved with settled agriculture. Your digestive system is optimised for plant-rich diets, with low stomach acid making plant proteins your strongest fuel source.',
    foundationFoods: [
      { name: 'Tofu & Tempeh', benefit: 'Ideal protein source for type A digestion' },
      { name: 'Lentils', benefit: 'Protein + fibre, enhances type A metabolism' },
      { name: 'Sardines', benefit: 'Omega-3s without the heaviness of red meat' },
      { name: 'Broccoli', benefit: 'Anti-tumour crucifer, top type A food' },
      { name: 'Garlic', benefit: 'Powerful immune booster for type A' },
      { name: 'Artichoke', benefit: 'Supports type A liver function' },
      { name: 'Blueberries', benefit: 'Antioxidant powerhouse, anti-inflammatory' },
      { name: 'Peanuts', benefit: 'Lectin activity boosts type A immunity' },
      { name: 'Olive Oil', benefit: 'Ideal fat source for type A digestion' },
      { name: 'Oats', benefit: 'Slow-release carbs, beneficial for type A' },
    ],
    avoidFoods: [
      { name: 'Red Meat', reason: 'Hard to digest, stored as fat in type A' },
      { name: 'Dairy (full-fat)', reason: 'Digestive stress, mucus production' },
      { name: 'Kidney Beans', reason: 'Toxic lectins disrupt type A digestion' },
      { name: 'Wheat (excess)', reason: 'Slows metabolic rate in type A' },
      { name: 'Tropical Fruits', reason: 'Too alkaline; disrupts type A digestion' },
    ],
    metabolicTiming: {
      preWorkout: 'Light meal 45 min before: oats with berries or a banana with peanut butter.',
      postWorkout: 'Tofu stir-fry or lentil soup within 30 min of training. Avoid heavy protein shakes.',
      fastingWindow: 'Type A benefits from a 12:12 fasting window. Avoid skipping breakfast.',
      hydration: 'Target 2.5 L/day. Green tea is especially beneficial for type A metabolism.',
    },
    sampleMenu: {
      breakfast: {
        name: 'Agrarian Morning Bowl',
        items: ['Oatmeal with blueberries & flaxseed', 'Small handful of peanuts', 'Green tea'],
        macros: '~350 kcal · 14g protein · 12g fat · 48g carbs',
      },
      lunch: {
        name: 'Tofu & Greens Stir-Fry',
        items: ['150g firm tofu, pan-seared', 'Broccoli, snap peas, garlic', 'Tamari sauce', 'Brown rice (small portion)'],
        macros: '~480 kcal · 28g protein · 18g fat · 52g carbs',
      },
      dinner: {
        name: 'Lentil & Vegetable Soup',
        items: ['Red lentil soup with spinach & tomatoes', 'Sardines on the side (optional)', 'Olive oil drizzle', 'Chamomile tea'],
        macros: '~420 kcal · 24g protein · 10g fat · 58g carbs',
      },
    },
  },

  'B': {
    typeLabel: 'Type B — The Nomad',
    typeDescription:
      'Type B is the most balanced and flexible blood type, originating with nomadic peoples. Your digestive system handles a wide variety of foods, excelling with dairy and diverse proteins.',
    foundationFoods: [
      { name: 'Lamb & Mutton', benefit: 'Optimal red meat for type B metabolism' },
      { name: 'Wild Turkey', benefit: 'Lean protein, highly beneficial for B' },
      { name: 'Cottage Cheese', benefit: 'Ideal dairy protein, highly digestible' },
      { name: 'Eggs', benefit: 'Best single food for type B' },
      { name: 'Mackerel', benefit: 'Omega-3 rich, boosts type B brain health' },
      { name: 'Mozzarella', benefit: 'Type B thrives on quality dairy' },
      { name: 'Broccoli', benefit: 'Anti-inflammatory, micronutrient-dense' },
      { name: 'Sweet Potato', benefit: 'Perfect slow-carb for type B energy' },
      { name: 'Bananas', benefit: 'Beneficial for type B digestion' },
      { name: 'Olive Oil', benefit: 'Anti-inflammatory fat source' },
    ],
    avoidFoods: [
      { name: 'Chicken', reason: 'Specific lectin interferes with type B circulation' },
      { name: 'Corn', reason: 'Inhibits insulin production in type B' },
      { name: 'Lentils', reason: 'Lectins damage type B vascular system' },
      { name: 'Peanuts', reason: 'Impairs type B liver function' },
      { name: 'Buckwheat', reason: 'Interferes with type B metabolism' },
    ],
    metabolicTiming: {
      preWorkout: 'Eggs + a banana 45–60 min before training. Type B handles mixed macro pre-workouts well.',
      postWorkout: 'Cottage cheese or lamb with vegetables. Type B recovers faster with dairy protein.',
      fastingWindow: 'Type B is flexible — 14:10 or 16:8 both work. Listen to hunger signals.',
      hydration: 'Target 2.5–3 L/day. Herbal teas (especially ginger) benefit type B digestion.',
    },
    sampleMenu: {
      breakfast: {
        name: 'Nomad\'s Power Breakfast',
        items: ['3-egg omelette with mozzarella', 'Sliced banana', 'Black coffee or ginger tea'],
        macros: '~440 kcal · 30g protein · 26g fat · 22g carbs',
      },
      lunch: {
        name: 'Lamb & Vegetable Plate',
        items: ['150g grilled lamb', 'Roasted broccoli & sweet potato', 'Olive oil drizzle', 'Side of cottage cheese'],
        macros: '~560 kcal · 46g protein · 24g fat · 32g carbs',
      },
      dinner: {
        name: 'Turkey & Rice Bowl',
        items: ['180g roasted wild turkey', 'Brown basmati rice', 'Steamed greens with olive oil', 'Herbal tea'],
        macros: '~520 kcal · 48g protein · 14g fat · 44g carbs',
      },
    },
  },

  'AB': {
    typeLabel: 'Type AB — The Enigma',
    typeDescription:
      'Type AB is the most recent and rarest blood type, blending traits of both A and B. You have low stomach acid like type A but tolerate meat moderately well. A mindful, varied diet works best.',
    foundationFoods: [
      { name: 'Tofu & Tempeh', benefit: 'Top protein for AB\'s blended chemistry' },
      { name: 'Lamb (moderate)', benefit: 'Best red meat choice for type AB' },
      { name: 'Tuna', benefit: 'Omega-3 rich, highly beneficial for AB' },
      { name: 'Sardines', benefit: 'Anti-inflammatory, excellent for AB heart' },
      { name: 'Broccoli', benefit: 'Anti-cancer properties shine for AB' },
      { name: 'Kale', benefit: 'Dense nutrients for AB immune support' },
      { name: 'Garlic', benefit: 'Immune powerhouse for type AB' },
      { name: 'Figs', benefit: 'Highly beneficial fruit for AB digestion' },
      { name: 'Cherries', benefit: 'Anti-inflammatory, perfect for AB' },
      { name: 'Mozzarella', benefit: 'Type AB digests quality dairy well' },
    ],
    avoidFoods: [
      { name: 'Red Meat (excess)', reason: 'Poorly digested in large amounts for AB' },
      { name: 'Corn', reason: 'Hypoglycaemic effect in type AB' },
      { name: 'Kidney Beans', reason: 'Harmful lectins for AB immune system' },
      { name: 'Buckwheat', reason: 'Hypoglycaemic, impairs AB metabolism' },
      { name: 'Smoked Meats', reason: 'Nitrates elevate AB cancer risk' },
    ],
    metabolicTiming: {
      preWorkout: 'Tofu or sardines with a small portion of brown rice 60 min before training.',
      postWorkout: 'Lamb or tuna with kale salad. Type AB benefits from smaller, frequent meals post-exercise.',
      fastingWindow: 'Type AB does best with 12:12 fasting. Avoid long fasting windows as it may stress the system.',
      hydration: 'Target 2.5 L/day. Green tea and herbal teas support AB immune resilience.',
    },
    sampleMenu: {
      breakfast: {
        name: 'Enigma Start',
        items: ['Tofu scramble with kale & garlic', 'Fresh figs or cherries', 'Green tea'],
        macros: '~360 kcal · 22g protein · 14g fat · 38g carbs',
      },
      lunch: {
        name: 'Tuna Salad Plate',
        items: ['160g seared tuna', 'Mixed greens with mozzarella', 'Olive oil & balsamic', 'Whole-grain crispbread'],
        macros: '~480 kcal · 40g protein · 20g fat · 28g carbs',
      },
      dinner: {
        name: 'Lamb & Broccoli Bowl',
        items: ['130g grilled lamb (small portion)', 'Roasted broccoli & kale', 'Brown rice', 'Chamomile or green tea'],
        macros: '~540 kcal · 38g protein · 20g fat · 50g carbs',
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Goal-based calorie modifier text
// ─────────────────────────────────────────────────────────────────────────────

const GOAL_ADVICE = {
  'Belly Fat Loss': 'Focus on a 200–300 kcal deficit. Prioritise protein to preserve muscle while losing visceral fat. Avoid refined carbs entirely.',
  'Muscle Gain': 'Aim for a 200–300 kcal surplus. Increase protein to 1.8–2.2g/kg body weight. Time carbs around workouts for maximal glycogen.',
  'Sustained Energy': 'Eat consistent meals every 3–4 hours. Prioritise slow-release carbs and healthy fats. Avoid sugar spikes and processed foods.',
  'General Health': 'Balanced macros (40% carbs / 30% protein / 30% fat). Focus on whole foods, micronutrient diversity, and gut health.',
  'Weight Loss': 'Moderate 300–400 kcal deficit. High fibre intake to control hunger. Lean protein at every meal to maintain metabolic rate.',
};

const ACTIVITY_MULTIPLIER = {
  'Sedentary': 1.2,
  'Lightly Active': 1.375,
  'Moderately Active': 1.55,
  'Very Active': 1.725,
};

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────

/**
 * getMockNutritionPlan
 * @param {Object} profile
 * @param {string} profile.bloodType  e.g. "O+", "A-", "AB+", "B-"
 * @param {number} profile.age
 * @param {string} profile.gender
 * @param {string} profile.goal
 * @param {string} profile.activityLevel
 * @param {number} profile.weeklyWorkouts
 * @returns {Object} Personalised nutrition plan
 */
export function getMockNutritionPlan(profile) {
  // Normalise blood type: extract the letter group (O, A, B, AB)
  const rawType = profile.bloodType || 'O+';
  let group = 'O';
  if (rawType.startsWith('AB')) group = 'AB';
  else if (rawType.startsWith('A')) group = 'A';
  else if (rawType.startsWith('B')) group = 'B';
  else if (rawType.startsWith('O')) group = 'O';

  const base = BLOOD_TYPE_DATA[group];

  // Estimate daily calories (Mifflin-St Jeor simplified)
  const bmr = profile.gender === 'Female'
    ? 447.6 + 9.2 * 70 + 3.1 * 165 - 4.3 * profile.age  // avg female body
    : 88.4 + 13.4 * 80 + 5.0 * 175 - 5.7 * profile.age; // avg male body

  const tdee = Math.round(bmr * (ACTIVITY_MULTIPLIER[profile.activityLevel] || 1.55));

  const goalAdvice = GOAL_ADVICE[profile.goal] || GOAL_ADVICE['General Health'];

  // Workout frequency insight
  const workoutInsight =
    profile.weeklyWorkouts >= 5
      ? 'High training volume detected. Increase protein to 2.0g/kg and ensure post-workout carbs.'
      : profile.weeklyWorkouts >= 3
      ? 'Moderate training schedule. Standard macro splits apply. Focus on workout day nutrition timing.'
      : 'Low training frequency. Prioritise nutrient density over caloric volume. Consider adding 1–2 strength sessions.';

  return {
    bloodType: profile.bloodType,
    bloodTypeGroup: group,
    typeLabel: base.typeLabel,
    typeDescription: base.typeDescription,
    estimatedTDEE: tdee,
    goalAdvice,
    workoutInsight,
    foundationFoods: base.foundationFoods,
    avoidFoods: base.avoidFoods,
    metabolicTiming: base.metabolicTiming,
    sampleMenu: base.sampleMenu,
    generatedAt: new Date().toISOString(),
  };
}
