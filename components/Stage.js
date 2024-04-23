import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, View, StyleSheet, Dimensions, Pressable } from "react-native";
import { Feather } from '@expo/vector-icons';

export default function Stage({ imageSource, isBanned, onPress }) {
    const { width } = Dimensions.get('window');
    const stageWidth = width / 3 - 15; // Subtracting padding
    const stageHeight = stageWidth / (16 / 9); // Calculate stageheight while taking 16:9 into account

    return (
        <View style={[{ height: stageHeight, width: stageWidth }, styles.stageContainer]}>
            <Pressable onPress={onPress} style={styles.pressableStage}>
                {isBanned ? (
                    <Feather
                        name="x"
                        size={70}
                        color="#eb4034"
                        style={styles.buttonIcon}
                    />
                ) : (
                    <View />
                )}
                <Image source={imageSource} style={styles.stageImage} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    stageContainer: {
        padding: 5, // Add padding around each stage
    },
    pressableStage: {
        flex: 1,
    },
    stageImage: {
        flex: 1, // Ensure the image takes up all available space within the stage
        height: "100%",
        width: "100%",
        borderRadius: 8, // Add some border radius for a nicer look
    },
    buttonIcon: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -35 }, { translateY: -35 }], // Adjust these values based on the icon size
        zIndex: 2,
        zIndex: 2,
      }
});
