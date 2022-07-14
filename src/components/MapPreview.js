import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { URL_MAPS } from "../utils/maps";

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    mapImage: {
        width: "100%",
        height: "100%",
    }
})

const MapPreview = ({ children, location, style }) => {
    const { lat, lng } = location || {};
    const mapPreviewUrl = location ?  URL_MAPS(lat, lng) : '';
    return (
        <View style={{...styles.container, ...style}}>
            {location ? (
                <Image style={styles.mapImage} source={{ uri: mapPreviewUrl}} />
            ) : (
                children
            )}
        </View>
    )
}

export default MapPreview;