import React from "react";
import Box from "@material-ui/core/Box";

export default Screen = (props) => {
   return(
      <Box
          style={{fontSize: '42px', textAlign: "right"}}
          bgcolor="text.primary"
          color="background.paper"
          p={2}
      >
          {props.display.join("") || 0}
      </Box>
   )
}