import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("address.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS address (id INTEGER PRIMARY KEY NOT NULL, title TEXT NO NULL, image TEXT NOT NULL, address TEXT NOT NULL, coords TEXT NOT NULL)",
        [],
        () => resolve(),
        (_, err) => reject(err)
      );
    });
  });

  return promise;
};

export const inserAddress = (title, image, address, coords) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO address (title, image, address, coords) VALUES (?, ?, ?, ?)",
        [title, image, address, JSON.stringify(coords)],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  });

  return promise;
};
