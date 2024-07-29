import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, View, StyleSheet, Dimensions, Pressable, useWindowDimensions } from "react-native";
import { Feather } from '@expo/vector-icons';

const STAGES_PER_ROW = 2
const PADDING_PER_STAGE = 5
const ASPECT_RATIO = 16 / 9

export default function Stage({ imageSource, isBanned, isPicked, onPress }) {
    const { width } = useWindowDimensions();
    const stageWidth = width / STAGES_PER_ROW - (STAGES_PER_ROW * PADDING_PER_STAGE); // Subtracting padding
    const stageHeight = stageWidth / ASPECT_RATIO; // Calculate stageheight while taking 16:9 into account

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
                {isPicked ? (
                    <Feather
                        name="check"
                        size={70}
                        color="#34eb40"
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
        padding: PADDING_PER_STAGE,
    },
    pressableStage: {
        flex: 1,
    },
    stageImage: {
        flex: 1,
        height: "100%",
        width: "100%",
        borderRadius: 8,
    },
    buttonIcon: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -35 }, { translateY: -35 }],
        zIndex: 2,
    }
});
