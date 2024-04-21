import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Stage from './components/Stage';

export default function App() {

  var stages = [
    {
      name: "Battlefield",
      image: require("./assets/images/Battlefield.jpg")
    },
    {
      name: "Final Destination",
      image: require("./assets/images/Final_Destination.jpg")
    },
    {
      name: "Hollow Bastion",
      image: require("./assets/images/Hollow_Bastion.jpg")
    }, 
    {
      name: "Kalos Pokemon League",
      image: require("./assets/images/Kalos_Pokemon_League.jpg")
    },
    {
      name: "Pokemon Stadium 2",
      image: require("./assets/images/Pokemon_Stadium_2.jpg")
    },
    {
      name: "Small Battlefield",
      image: require("./assets/images/Small_Battlefield.jpg")
    },
    {
      name: "Smashville",
      image: require("./assets/images/Smashville.jpg")
    },
    {
      name: "Town and City",
      image: require("./assets/images/Town_and_city.jpg")
    },
    {
      name: "Yoshi's Story",
      image: require("./assets/images/Yoshis_Story.jpg")
    }
  ];



  return (
    <View style={styles.container}>
      {stages.map(stage => (
        <Stage key={stage.name} imageSource={stage.image} isBanned={false}/>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    flexDirection: 'row', // Arrange items horizontally
    flexWrap: 'wrap', // Allow items to wrap to the next line if needed
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, // Add some padding around the stages
  },
});
