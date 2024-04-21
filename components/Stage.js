import { Image, Text, View, StyleSheet, Dimensions } from "react-native";


export default function Stage({ imageSource, isBanned }) {

    const { width }  = Dimensions.get('window');
    const stageWidth = width / 3 - 15; // Subtracting padding
    const stageHeight = stageWidth/(16/9); // Calculate stageheight while taking 16:9 into account

    return (
        <View style={[{height: stageHeight, width: stageWidth}, styles.stageContainer]}>
            <Image source={imageSource} style={styles.stageImage} />
        </View>
    );
}

const styles = StyleSheet.create({
    stageContainer: {
        // height: stageHeight,
        // width: stageWidth,
        padding: 5, // Add padding around each stage
    },
    stageImage: {
        flex: 1, // Ensure the image takes up all available space within the stage
        height: "100%",
        width: "100%",
        borderRadius: 8, // Add some border radius for a nicer look
    },
});
