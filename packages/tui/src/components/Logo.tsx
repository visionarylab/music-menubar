import React from "react";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";
import { Box } from "ink";

export default function Logo() {
  return (
    <Box justifyContent="center">
      <Gradient name="rainbow">
        <BigText text="Music TUI" />
      </Gradient>
    </Box>
  );
}
