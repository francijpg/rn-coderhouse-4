import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import PlaceListScreen from "../screens/PlaceListScreen";
import colors from "../utils/colors";
import IonicIcons from '@expo/vector-icons/Ionicons'

const Stack = createNativeStackNavigator();

const PlaceNavigator = () => (
  <Stack.Navigator
    initialRouteName="Place"
    screenOptions={{
      headerStyle: {
        backgroundColor:
          Platform.OS === "android" ? colors.primary : colors.secondary,
      },
      headerTintColor: Platform.OS === "android" ? colors.white : colors.black,
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <Stack.Screen
      name="Place"
      component={PlaceListScreen}
      options={({ navigation }) => ({ 
        title: "Direcciones",
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("NewPlace")}>
            <IonicIcons
              name="add-circle-outline"
              size={25}
              color={colors.black}
              />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name="PlaceDetail"
      component={PlaceDetailScreen}
      options={{ title: "Detalle de Dirección" }}
    />
    <Stack.Screen
      name="NewPlace"
      component={NewPlaceScreen}
      options={{ title: "Nueva Dirección" }}
    />
    <Stack.Screen
      name="Map"
      component={MapScreen}
      options={{ title: "Mapa" }}
    />
  </Stack.Navigator>
);

export default PlaceNavigator;
