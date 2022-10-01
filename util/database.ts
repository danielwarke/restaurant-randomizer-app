import * as SQLite from "expo-sqlite";
import { Restaurant } from "../models/restaurant";

const database = SQLite.openDatabase("restaurant-randomizer.db");

export function init(): Promise<true> {
  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS restaurants (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        favorite INTEGER NOT NULL DEFAULT 0
      )`,
        [],
        () => resolve(true),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

export function createRestaurant(
  name: string,
  category: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `INSERT INTO restaurants (
            name, 
            category,
            favorite
        ) VALUES (?, ?, ?)`,
        [name, category, 0],
        (_, result) => {
          resolve(result.insertId?.toString() as string);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

export function getRestaurants(
  category?: string,
  favorite?: boolean
): Promise<Restaurant[]> {
  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `SELECT * FROM restaurants ${
          category ? "WHERE category = " + category + " " : ""
        }${
          favorite ? (category ? "AND" : "WHERE") + "favorite = 1" : ""
        } ORDER BY category`,
        [],
        (_, result) => {
          const restaurants = result.rows._array;
          resolve(
            restaurants.map((restaurant) => ({
              ...restaurant,
              id: restaurant.id.toString(),
              favorite: restaurant.favorite === 1,
            }))
          );
        },
        (error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

export function getRestaurantDetails(
  restaurantId: string
): Promise<Restaurant> {
  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `SELECT * FROM restaurants WHERE id = ?`,
        [restaurantId],
        (_, result) => {
          const restaurant = result.rows._array[0];
          resolve({
            ...restaurant,
            id: restaurant.id.toString(),
            favorite: restaurant.favorite === 1,
          });
        },
        (error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

export function updateRestaurant(restaurant: Restaurant): Promise<true> {
  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `UPDATE restaurants 
        SET name = ?,
        category = ?,
        favorite = ?
        WHERE id = ?`,
        [
          restaurant.name,
          restaurant.category,
          restaurant.favorite ? 1 : 0,
          restaurant.id,
        ],
        () => resolve(true),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

export function deleteRestaurant(restaurantId: string): Promise<true> {
  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        "DELETE FROM restaurants WHERE id = ?",
        [restaurantId],
        () => resolve(true),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}
