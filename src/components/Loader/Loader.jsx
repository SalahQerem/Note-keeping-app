import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

const Loader = () => {
  let [isInSleepMode, setIsInSleepMode] = useState(false);
  setTimeout(() => setIsInSleepMode(true), 1500);

  return (
    <Box className="flex justify-center w-full flex-wrap">
      <Box className="flex gap-2 justify-center w-full">
        {[1, 2, 3, 4, 5].map((item) => (
          <Box
            key={item}
            className="border shadow rounded-md p-4 w-[19.3%] h-32"
          >
            <Box className="animate-pulse flex space-x-4">
              <Box className="flex-1 space-y-6 py-1">
                <Box className="h-2 bg-slate-200 rounded" />
                <Box className="space-y-3">
                  <Box className="grid grid-cols-3 gap-4">
                    <Box className="h-2 bg-slate-200 rounded col-span-2" />
                    <Box className="h-2 bg-slate-200 rounded col-span-1" />
                  </Box>
                  <Box className="h-2 bg-slate-200 rounded" />
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      {isInSleepMode && (
        <Typography
          variant="h1"
          className="text-2xl w-[80%] mx-auto mt-4 text-center font-semibold"
        >
          "Please bear with us. It may take a moment for your request to be
          processed as our service wakes up from sleep mode. Thank you for your
          patience!☺️"
        </Typography>
      )}
    </Box>
  );
};

export default Loader;
