import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Switch, Text, View } from 'react-native';
import StagesGrid from './components/StagesGrid';
import { useState } from 'react';

const FIRST_GAME_WINNER_BANS = 3;
const FIRST_GAME_LOSER_BANS = 4;
const NON_FIRST_GAME_WINNER_BANS = 2;

export default function App() {

  [player, setPlayer] = useState("Winner");
  [amountOfStages, setAmountOfStages] = useState(FIRST_GAME_WINNER_BANS);
  [bannedStages, setBannedStages] = useState([]);
  [isFirstGame, setFirstGame] = useState(true);
  [pickedStage, setPickedStage] = useState(null);
  [gamePhase, setGamePhase] = useState("winnerBanning");

  const handleStageAction = (stageName) => {
    if (gamePhase === "winnerBanning" || gamePhase === "loserBanning") {
      banStage(stageName);
    } else if (gamePhase === "winnerPicking" || gamePhase === "loserPicking") {
      pickStage(stageName);
    }
  }

  const banStage = (stageName) => {
    setBannedStages((prevBannedStages) => {
      if (prevBannedStages.includes(stageName)) {
        // The stage is already banned, so we remove it from the list and increase the amount of stages to be banned
        setAmountOfStages((amount) => amount + 1);
        return prevBannedStages.filter((stage) => stage !== stageName);
      } else if (amountOfStages > 0) {
        // Stage is banned and amount is decremented
        setAmountOfStages((amount) => amount - 1);
        if (amountOfStages - 1 === 0) {
          updateGamePhase();
        }
        return [...prevBannedStages, stageName];
      }
      // No stages are left to ban, so return unchanged list
      return prevBannedStages;
    });
  };

  const pickStage = (stageName) => {
    setPickedStage(stageName);
    setGamePhase("finished");
  }

  const updateGamePhase = () => {
    if (isFirstGame) {
      if (gamePhase === "winnerBanning") {
        setGamePhase("loserBanning");
        setPlayer("Loser");
        setAmountOfStages(FIRST_GAME_LOSER_BANS);
      } else if (gamePhase === "loserBanning") {
        setGamePhase("winnerPicking");
        setPlayer("Winner");
        setAmountOfStages(1);
      }
    } else {
      if (gamePhase === "winnerBanning") {
        setGamePhase("loserPicking");
        setPlayer("Loser");
        setAmountOfStages(1);
      }
    }
  };

  const toggleFirstGameSwitch = () => {
    setFirstGame((previousIsFirstGame) => {
      const newIsFirstGame = !previousIsFirstGame;
      setAmountOfStages(newIsFirstGame ? FIRST_GAME_WINNER_BANS : NON_FIRST_GAME_WINNER_BANS);
      // Reset when toggling the switch
      resetStageSelection();
      return newIsFirstGame;
    });
  };

  const resetStageSelection = () => {
    setBannedStages([]); 
    setPickedStage(null);
    setPlayer("Winner");
    setGamePhase("winnerBanning");
  }

  const getActionText = () => {
    if (gamePhase === "winnerBanning" || gamePhase === "loserBanning") {
      return `ban ${amountOfStages}`;
    } else if (gamePhase === "winnerPicking" || gamePhase === "loserPicking") {
      return "pick 1";
    } else {
      return "play on the";
    }
  }

  return (
    <View style={styles.container}>
      <StagesGrid 
        bannedStages={bannedStages}
        pickedStage={pickedStage}
        onStageAction={handleStageAction} 
      />
      <Text style={styles.banText}>
        <Text style={styles.playerText}>{player}</Text> has to {getActionText()} stage{amountOfStages !== 1 ? 's' : ''}.
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
