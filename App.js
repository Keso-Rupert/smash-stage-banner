import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Switch, Text, View, TouchableOpacity } from 'react-native';
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

  const resetEverything = () => {
    setFirstGame(true);
    setAmountOfStages(FIRST_GAME_WINNER_BANS);
    resetStageSelection();
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
      <Text style={styles.instructionText}>
        Start by playing Rock-Paper-Scissors.
      </Text>
      <Text style={styles.banText}>
        <Text style={styles.playerText}>{player}</Text> has to {getActionText()} stage{amountOfStages !== 1 ? 's' : ''}.
      </Text>
      <View style={styles.switchContainer} >
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isFirstGame ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleFirstGameSwitch}
          value={isFirstGame}
        />
        <Text style={styles.switchText}>This is the first game we're playing</Text>
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetEverything}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  instructionText: {
    color: "#a0a0a0",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  banText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  playerText: {
    color: "#a832a6",
    fontSize: 32,
  },
  amountText: {
    color: "#329ea8",
    fontSize: 32,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  switchText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#4a4a4a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
