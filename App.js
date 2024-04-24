import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StagesGrid from './components/StagesGrid';
import { useState } from 'react';

export default function App() {

  [player, setPlayer] = useState("Winner");
  [amountOfStages, setAmountOfStages] = useState(0);
  [bannedStages, setBannedStages] = useState([]);

  const banStage = (stageName) => {
    setBannedStages((prevBannedStages) =>
      prevBannedStages.includes(stageName)
        ? prevBannedStages.filter((stage) => stage !== stageName)
        : [...prevBannedStages, stageName]
    );
  };

  return (
    <View style={styles.container}>
      <StagesGrid bannedStages={bannedStages} onBanStage={banStage} />
      <Text style={styles.banText}>
        <Text style={styles.playerText}>{player}</Text> has to ban <Text style={styles.amountText}>{amountOfStages}</Text> stages.
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  banText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
  },
  playerText: {
    color: "#a832a6",
    fontSize: 32,
  },
  amountText: {
    color: "#329ea8",
    fontSize: 32,
  }
});
