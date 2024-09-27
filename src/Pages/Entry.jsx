// Entery.jsx
import React, { useState } from "react";
import { Box, Button, Heading, Input, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const X = "x";
const O = "o";

const Entery = ({ setPlayers, setSymbols }) => {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [symbol, setSymbol] = useState(X);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setPlayers({ player1: player1Name, player2: player2Name });
    setSymbols({ player1: symbol, player2: symbol === X ? O : X });
    navigate("/game"); 
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundImage={'https://media.istockphoto.com/id/1406147229/video/an-abstract-yellow-xo-background-tic-tac-toe-abstract-background.jpg?s=640x640&k=20&c=G3Xd8tDziGh5MVk6YxmAtgSrtU9SovT2X_aPBSOPBjc='}
      backgroundSize={'cover'}
    >
    
      <Box
        bg="linear-gradient(to bottom right, #FDFCFB, #E2D1C3)"
        p={8}
        rounded="lg"
        shadow="lg"
        textAlign="center"
        width="500px"
      >
        
        <Heading as="h1" size="lg" mb={6} color="black">
          Enter Player Details
        </Heading>

        <Input
          placeholder="Player 1 Name"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
          mb={4}
          size="lg"
        />
        <Input
          placeholder="Player 2 Name"
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
          mb={6}
          size="lg"
        />

        <RadioGroup
          onChange={setSymbol}
          value={symbol}
          mb={6}
          colorScheme="yellow"
        >
          <Stack direction="row" justify="center" spacing={6}>
            <Radio value={X}>
              <Text fontSize="lg" color="teal.600">
                Player 1 as X
              </Text>
            </Radio>
            <Radio value={O}>
              <Text fontSize="lg" color="teal.600">
                Player 1 as O
              </Text>
            </Radio>
          </Stack>
        </RadioGroup>

        <Button
          colorScheme="yellow"
          size="lg"
          onClick={handleSubmit}
          isDisabled={!player1Name || !player2Name} // Disable until names are entered
        >
          Start Game
        </Button>
      </Box>
    </Box>
  );
};

export default Entery;
