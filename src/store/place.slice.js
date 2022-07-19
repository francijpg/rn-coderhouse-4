import { createSlice } from "@reduxjs/toolkit";
import * as FileSystem from "expo-file-system";
import Place from "../models/Place";
import { URL_GEOCODING } from "../utils/maps";
import { inserAddress, getAddress } from "../db";

const initialState = {
  places: [],
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    addPlace: (state, action) => {
      const newPlace = new Place(
        action.payload.id.toString(),
        action.payload.title,
        action.payload.image,
        action.payload.address,
        action.payload.coords
      );
      state.places.push(newPlace);
    },
    loadAddress: (state, action) => {
      state.places = action.payload;
    },
  },
});

export const { addPlace, loadAddress } = placeSlice.actions;

export const savePlace = (title, image, coords) => {
  return async (dispatch) => {
    let result;
    const response = await fetch(URL_GEOCODING(coords.lat, coords.lng));

    if (!response.ok)
      throw new Error("no se ha podido conectar con el servidor");

    const data = await response.json();

    if (!data.results)
      throw new Error("no se ha podido encontrar la dirección");

    const address = data.results[0].formatted_address;

    const fileName = image.split("/").pop();
    const Path = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: Path,
      });

      result = await inserAddress(title, Path, address = '', coords);
      console.log("result insertAddress", result);
    } catch (error) {
      console.log(error.message);
      throw error;
    }

    dispatch(
      addPlace({ id: result.insertId, title, image: Path, address, coords })
    );
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const result = await getAddress();
      dispatch(loadAddress(result.rows._array));
    } catch (error) {
      throw error;
    }
  };
};

export default placeSlice.reducer;
