import React from "react";
import Box from "@material-ui/core/Box";

const DisplayScreen = (props) => {
   return(
      <Box
          style={{fontSize: '42px', textAlign: "right", overflowWrap: "anywhere"}}
          bgcolor="text.primary"
          color="background.paper"
          p={2}
      >
          {props.display.join("") || 0}
      </Box>
   )
};
export default DisplayScreen;
