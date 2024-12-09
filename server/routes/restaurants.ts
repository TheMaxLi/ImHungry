import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const restaurantSchema = z.object({
  id: z.number().int().positive().min(1),
  name: z.string().min(3).max(100),
  description: z.string(),
  photo: z.string().optional(),
  location: z.string(),
});

type Restaurant = z.infer<typeof restaurantSchema>;

const createPostSchema = restaurantSchema.omit({ id: true });

const fakeRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "The Rustic Grill",
    location: "123 Oak Street, Springfield",
    photo: "https://example.com/photos/rustic_grill.jpg",
    description:
      "A cozy place with wood-fired grills, serving hearty American dishes.",
  },
  {
    id: 2,
    name: "Sushi Haven",
    location: "456 Pine Avenue, Downtown",
    photo: "https://example.com/photos/sushi_haven.jpg",
    description:
      "An upscale sushi restaurant offering fresh, authentic Japanese cuisine.",
  },
  {
    id: 3,
    name: "Bella Italia",
    location: "789 Maple Road, Westfield",
    photo: "https://example.com/photos/bella_italia.jpg",
    description:
      "A family-friendly Italian restaurant known for its pasta and wood-fired pizzas.",
  },
  {
    id: 4,
    name: "Taco Fiesta",
    location: "321 Birch Drive, Sunnydale",
    photo: "https://example.com/photos/taco_fiesta.jpg",
    description:
      "A vibrant spot serving delicious tacos, burritos, and fresh guacamole.",
  },
  {
    id: 5,
    name: "The Green Plate",
    location: "654 Elm Street, Rivercity",
    description:
      "A health-conscious restaurant focusing on organic and plant-based meals.",
  },
  {
    id: 6,
    name: "The Burger Joint",
    location: "987 Cedar Lane, Uptown",
    photo: "https://example.com/photos/burger_joint.jpg",
    description:
      "A casual spot with a variety of gourmet burgers, fries, and milkshakes.",
  },
  {
    id: 7,
    name: "Café de Paris",
    location: "1125 Cherry Blvd, Hilltop",
    photo: "https://example.com/photos/cafe_de_paris.jpg",
    description:
      "A charming café serving French pastries, croissants, and coffee.",
  },
  {
    id: 8,
    name: "El Camino",
    location: "420 Redwood Way, Lakeside",
    description:
      "A Mexican-inspired eatery known for its grilled meats and flavorful sauces.",
  },
  {
    id: 9,
    name: "The Seafood Shack",
    location: "150 Ocean Drive, Seaside",
    photo: "https://example.com/photos/seafood_shack.jpg",
    description:
      "A beachfront seafood restaurant offering fresh catches and coastal dishes.",
  },
  {
    id: 10,
    name: "Vegan Vibes",
    location: "852 Maple Avenue, Greenfield",
    description:
      "A trendy vegan spot with a variety of plant-based burgers, wraps, and smoothies.",
  },
];

export const restaurantsRoute = new Hono()
  .get("/", async (c) => {
    return c.json({ restaurants: fakeRestaurants });
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = parseInt(c.req.param("id"));
    const restaurant = fakeRestaurants.find((r) => r.id === id);
    if (!restaurant) return c.notFound();
    return c.json({ restaurant });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const restaurant = c.req.valid("json");
    fakeRestaurants.push({ ...restaurant, id: fakeRestaurants.length });
    console.log(restaurant);
    return c.json({});
  })
  .delete("/:id{[0-9]+}", async (c) => {
    // const id = parseInt(c.req.param("id"));
    // const index = fakeRestaurants.find((r) => r.id === id);
    // if not found then return c.notFound()
  });
