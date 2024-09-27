import React, { useState, useEffect } from "react";
import { Box, Button, Heading, SimpleGrid, Text, useColorMode, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, ScaleFade } from "@chakra-ui/react";
import Confetti from "react-confetti";
import useSound from 'use-sound';
import { FaMoon, FaSun, FaInfoCircle } from 'react-icons/fa'; 
import placeMarkSound from '../Sounds/placeMarkSound.wav';
import winSound from '../Sounds/winSound.wav';
import resetSound from '../Sounds/resetSound.wav';

const Board = ({ players, symbols }) => {
  const [blocks, setBlocks] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [nextTurn, setNextTurn] = useState(symbols.player1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [stats, setStats] = useState({
    player1: { wins: 0, gamesPlayed: 0 },
    player2: { wins: 0, gamesPlayed: 0 },
  });

  const [playPlaceMark] = useSound(placeMarkSound);
  const [playWinSound] = useSound(winSound);
  const [playResetSound] = useSound(resetSound);

  const { colorMode, toggleColorMode } = useColorMode();

  
  const bgColor = useColorModeValue(
    'linear-gradient(to bottom, #5d9630, #0d9634 50%, #538c2b 50%, #538c2b)', // Light mode
    'linear-gradient(to bottom, #2e5722, #2e5722 50%, #244a1b 50%, #244a1b)'  // Dark mode, darker greens
  );

  const backgroundSize = "100% 50px"; 

  const textColor = useColorModeValue('black', 'white');

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (winner) {
      setShowConfetti(true);
      updateStats();
      playWinSound(); 
    }
  }, [winner]);

  const updateStats = () => {
    const newStats = { ...stats };
    if (winner === symbols.player1) {
      newStats.player1.wins += 1;
    } else {
      newStats.player2.wins += 1;
    }
    newStats.player1.gamesPlayed += 1;
    newStats.player2.gamesPlayed += 1;
    setStats(newStats);
  };

  const selectBlock = (ind) => {
    if (!blocks[ind] && !winner) {
      const newBlocks = [...blocks];
      newBlocks[ind] = nextTurn;
      setBlocks(newBlocks);
      findWinner(nextTurn, newBlocks);
      setNextTurn(nextTurn === symbols.player1 ? symbols.player2 : symbols.player1);
      playPlaceMark(); 
    }
  };

  const findWinner = (turn, newBlocks) => {
    if (checkWin(turn, newBlocks)) {
      setWinner(turn);
    }
  };

  const checkWin = (turn, blocks) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(
      (pattern) => pattern.every((index) => blocks[index] === turn)
    );
  };

  const renderBlocks = () => {
    return Array.from({ length: 9 }, (_, i) => (
      <Box
        key={i}
        height={"150px"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="1px solid black"
        borderRadius={'2%'}
        onClick={() => selectBlock(i)}
        bg={blocks[i] === symbols.player1 ? "red.500" : blocks[i] === symbols.player2 ? "green.500" : "gray.200"}
        _hover={{
          cursor: blocks[i] ? "not-allowed" : "pointer",
          transform: blocks[i] ? "none" : "scale(1.05)",
        }}
        transition="all 0.2s ease"
      >
        <Text fontSize={"100px"} color="white" fontWeight="bold">
          {blocks[i] === symbols.player1 ? 'X' : blocks[i] === symbols.player2 ? 'O' : ''}
        </Text>
      </Box>
    ));
  };

  const reset = () => {
    setBlocks(Array(9).fill(null));
    setWinner(null);
    setShowConfetti(false);
    playResetSound(); 
  };

  return (
    <Box
      textAlign="center"
      p={4}
      h="100vh"
      bg={bgColor}
      backgroundSize={backgroundSize} // Apply the repeating background size
      color={textColor}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      position="relative"
    >
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}

      <Button onClick={toggleColorMode} position="absolute" top={4} right={4}>
        {colorMode === 'dark' ? <FaSun /> : <FaMoon />}
      </Button>

      <Button onClick={onOpen} border={'1px solid black'} position="absolute" top={4} left={4}  bg={'transparent'} leftIcon={<FaInfoCircle />}>
        Player Stats
      </Button>

      <Heading mb={4}>Let's Play</Heading>
      {winner && (
        <ScaleFade in={true}>
          <Box>
            <Heading as="h1" size="lg" color="yellow.500">
              🎉 Winner is {winner === symbols.player1 ? players.player1 : players.player2} 🎉
            </Heading>
          </Box>
        </ScaleFade>
      )}
      <SimpleGrid margin={'auto'} marginTop={"100px"} w={"60%"} gap={4} columns={3}>
        {renderBlocks()}
      </SimpleGrid>
      <Box mt={4}>
        {(blocks.every((block) => block) || winner) && (
          <Button mt={4} onClick={reset} bg={'transparent'} border={'1px solid black'} size="lg">
            Replay
          </Button>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={bgColor} color={textColor}>
          <ModalHeader>Player Statistics</ModalHeader>
          <ModalBody>
            <Text fontSize="xl">{players.player1} (X):</Text>
            <Text>Wins: {stats.player1.wins}</Text>
            <Text>Games Played: {stats.player1.gamesPlayed}</Text>
            <Text mt={4} fontSize="xl">{players.player2} (O):</Text>
            <Text>Wins: {stats.player2.wins}</Text>
            <Text>Games Played: {stats.player2.gamesPlayed}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Board;
