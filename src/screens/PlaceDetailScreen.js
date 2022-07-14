import React from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import MapPreview from "../components/MapPreview";
import colors from "../utils/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: "40%",
    minHeight: 300,
    width: "100%",
  },
  location: {
    margin: 20,
    width: "90%",
    maxWidth: 350,
    backgroundColor: colors.white,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: colors.primary,
    textAlign: "center",
  },
  map: {
    height: 300,
  }
});

const PlaceDetailScreen = ({ navigation, route }) => {
  const { placeId } = route.params;
  const place = useSelector((state) => state.place.places.find((item) => item.id === placeId));
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: place.image }} style={styles.image} />
      <View style={styles.location}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <MapPreview 
        location={{
          lat: place.coords.lat,
          lng: place.coords.lng
        }}
        style={styles.map}
        >
          <Text>Ubicacion no disponible</Text>
        </MapPreview>
      </View>
    </ScrollView>
  );
};

export default PlaceDetailScreen;
