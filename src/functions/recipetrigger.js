const { app } = require("@azure/functions");
const fs = require("fs").promises;

async function load_recipes() {
  try {
    const data = await fs.readFile(__dirname + "/recipes.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Fehler beim Laden der Rezeptdatei: " + error.message);
  }
}

app.http("welcome", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "start",
  handler: async (request, context) => {
    context.log("Willkommensnachricht");
    return { status: 200, body: "Willkommen zur Rezeptdatenbank!" };
  },
});

app.http("getAllRecipes", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "start/rezepte",
  handler: async (request, context) => {
    context.log("Rezepte wurden abgefragt");

    try {
      const recipes = await load_recipes();
      return { status: 200, body: JSON.stringify(recipes) };
    } catch (error) {
      context.log("Fehler beim Laden der Rezepte:", error);
      return {
        status: 500,
        body: JSON.stringify({
          error: "Interner Server Fehler",
          message: error.message,
        }),
      };
    }
  },
});

app.http("recipes", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  route: "start/rezepte/filtered",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const ingredients = request.query.get("ingredients")?.toLowerCase();
    const prepTime = request.query.get("prepTime")
      ? parseInt(request.query.get("prepTime"))
      : null;
    const diet = request.query.get("diet")?.toLowerCase();

    try {
      const recipes = await load_recipes();

      const filtered_recipes = recipes.filter((recipe) => {
        if (
          ingredients &&
          !recipe.ingredients.some((i) => i.toLowerCase().includes(ingredients))
        ) {
          return false;
        }
        if (prepTime && recipe.prepTime > prepTime) {
          return false;
        }
        if (diet && recipe.diet.toLowerCase() !== diet) {
          return false;
        }
        return true;
      });

      if (filtered_recipes.length > 0) {
        return { status: 200, body: JSON.stringify(filtered_recipes) };
      } else {
        return {
          status: 404,
          body: JSON.stringify({ error: "Keine passende Rezepte gefunden!" }),
        };
      }
    } catch (error) {
      context.log("Fehler beim laden der Rezepte:", error);
      return {
        status: 500,
        body: JSON.stringify({
          error: "Interner Server Fehler",
          message: error.message,
        }),
      };
    }
  },
});
