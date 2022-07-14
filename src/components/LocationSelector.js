import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import colors from "../utils/colors";
import MapPreview from "./MapPreview";

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    preview: {
        width: "100%",
        height: 200,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        borderColor: colors.primary,
        borderWidth: 1,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
    }
})

const LocationSelector = ({ onLocation }) => {
    const [pickedLocation, setPickedLocation] = useState();
    const navigation = useNavigation();
    const route = useRoute();

    const mapLocation = route?.params?.mapLocation;

    useEffect(() => {
        if(mapLocation){
            setPickedLocation(mapLocation);
            onLocation(mapLocation)
        }
    }, [mapLocation]);

    const handleGetLocation = async () => {
        const isLocationPermissionGranted = await verifyPermissions();

        if(!isLocationPermissionGranted) return;

        const location = await Location.getCurrentPositionAsync({
            timeInterval: 5000
        })

        const { latitude, longitude } = location.coords;

        setPickedLocation({
            lat: latitude,
            lng: longitude
        })

        onLocation({
            lat: latitude,
            lng: longitude
        });
    }

    const verifyPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Permisos insuficientes", "Necesitas permisos para usar la localización", [{ text: "Ok" }]);
            return false;
        }
        return true;
    }

    const handlePickedLocation = async (location) => {
        const isLocationPermissionGranted = await verifyPermissions();
        if(!isLocationPermissionGranted) return;
        navigation.navigate("Map");
    }

    return (
        <View style={styles.container}>
            <MapPreview location={pickedLocation} style={styles.preview}>
                <Text>localizacion en proceso</Text>
            </MapPreview>
            <View style={styles.buttons}>
                <Button 
                    title="Obtener ubicación"
                    onPress={handleGetLocation}
                    color={colors.primary}
                />
                <Button 
                    title="Elegir desde el mapa"
                    onPress={handlePickedLocation}
                    color={colors.secondary}
                />
            </View>
        </View>
    )
}

export default LocationSelector;