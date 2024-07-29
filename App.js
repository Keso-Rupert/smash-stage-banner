import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Switch, Text, View } from 'react-native';
import StagesGrid from './components/StagesGrid';
import { useState } from 'react';

const AMOUNT_OF_BANS = 3;
const AMOUNT_OF_COUNTER_BANS = 2;

export default function App() {

  [player, setPlayer] = useState("Winner");
  [amountOfStages, setAmountOfStages] = useState(AMOUNT_OF_BANS);
  [bannedStages, setBannedStages] = useState([]);
  [isFirstGame, setFirstGame] = useState(true);

  const banStage = (stageName) => {
    setBannedStages((prevBannedStages) => {
      if (prevBannedStages.includes(stageName)) {
        // The stage is already banned, so we remove it from the list and increase the amount of stages to be banned
        setAmountOfStages((amount) => amount + 1);
        return prevBannedStages.filter((stage) => stage !== stageName);
      } else if (amountOfStages > 0) {
        // Stage is banned and amount is decremented
        setAmountOfStages((amount) => amount - 1);
        console.log(amountOfStages);
        return [...prevBannedStages, stageName];
      }
      // No stages are left to ban, so return unchanged list
      return prevBannedStages;
    });
  };

  const toggleFirstGameSwitch = () => {
    setFirstGame((previousIsFirstGame) => {
      const newIsFirstGame = !previousIsFirstGame;
      setAmountOfStages(newIsFirstGame ? AMOUNT_OF_BANS : AMOUNT_OF_COUNTER_BANS);
      setBannedStages([]); // Reset banned stages when toggling the switch
      return newIsFirstGame;
    });
  };

  return (
    <View style={styles.container}>
      <StagesGrid bannedStages={bannedStages} onBanStage={banStage} />
      <Text style={styles.banText}>
        <Text style={styles.playerText}>{player}</Text> has to ban <Text style={styles.amountText}>{amountOfStages}</Text> stages.
      </Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isFirstGame ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleFirstGameSwitch}
        value={isFirstGame}
      />
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
