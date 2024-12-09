import { useEffect, useState } from "react";
import {api} from './lib/api'
import "./App.css";


type Restaurant = {
  id: number;
  name: string;
  description: string;
  location: string;
  photo?: string | undefined;
};

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const res = await api.restaurants.$get();
        if (!res.ok) {
          throw new Error("Failed to fetch restaurants");
        }
        const data = await res.json();
        setRestaurants(data.restaurants);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    }
    fetchRestaurants();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center p-4 text-xl">Loading restaurants...</div>
    );
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Restaurants</h1>
      {restaurants.length === 0 ? (
        <p className="text-center text-gray-500">No restaurants found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              {restaurant.photo && (
                <img
                  src={restaurant.photo}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {restaurant.name}
                </h2>
                <p className="text-gray-600 mb-2">{restaurant.location}</p>
                <p className="text-gray-500">{restaurant.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
