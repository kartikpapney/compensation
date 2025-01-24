import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import Link from "next/link";

const SocialLinks = () => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" bgcolor="background.paper" borderRadius={2}>
            <Typography variant="secondary" component="p" color="text.primary">
                Developed by{" "}
                <Link href="https://kartikpapney.xyz" target="_blank" rel="noopener noreferrer">
                    Kartik Papney
                </Link>
            </Typography>
            <Tooltip title="GitHub">
                <IconButton href="https://github.com/kartikpapney/compensation" target="_blank" rel="noopener noreferrer" color="primary">
                    <GitHubIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="LinkedIn">
                <IconButton href="https://linkedin.com/in/kartikpapney" target="_blank" rel="noopener noreferrer" color="primary">
                    <LinkedInIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Website">
                <IconButton href="https://kartikpapney.xyz" target="_blank" rel="noopener noreferrer" color="primary">
                    <LanguageIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default SocialLinks;
