import React from "react";
import { Button, IconButton, Typography, Box } from "@mui/material";
import { Coffee } from "@mui/icons-material";

const BuyMeACoffee = () => {
    const handleClick = () => {
        window.open("https://www.buymeacoffee.com/YOUR_USERNAME", "_blank");
    };

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            flexDirection="column"
            padding={2}
        >
            <Typography variant="h6" gutterBottom>
                Enjoy my work? Buy me a coffee ☕
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={handleClick}
                startIcon={<Coffee />}
            >
                Buy Me a Coffee
            </Button>
        </Box>
    );
};

export default BuyMeACoffee;
