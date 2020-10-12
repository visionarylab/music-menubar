import React, { useState, useEffect } from "react";
import { render, Box, useInput, useApp, Text } from "ink";
import Logo from "./components/Logo";

function App() {
  const [height, setHeight] = useState(process.stdout.rows);
  const { exit } = useApp();

  useInput((input, _key) => {
    if (input === "q") {
      exit();
    }
  });

  useEffect(() => {
    setHeight(process.stdout.rows);
  }, [process.stdout.rows]);

  return (
    <Box flexDirection="column" minHeight={height} alignItems="center">
      <Logo />

      <Text>Press “q” to exit.</Text>
    </Box>
  );
}

render(<App />);
