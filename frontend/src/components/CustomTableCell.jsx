import React from "react";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

function CustomTableCell({ text, link, labels = [], align = "left" }) {
    return (
        <TableCell align={align}>
            {link ? (
                <Link href={link} target="_blank" rel="noopener">
                    <Typography variant="body2" component="span">
                        {text}
                    </Typography>
                </Link>
            ) : (
                <Typography variant="body2">{text}</Typography>
            )}
            <Box
                display="flex"
                flexDirection="row"
                gap={1}
                justifyContent={align === "right" ? "flex-end" : align === "center" ? "center" : "flex-start"}
            >
                {labels.map((text, index) => (
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        key={index}
                    >
                        {text}
                    </Typography>
                ))}
            </Box>
        </TableCell>
    );
}

export default CustomTableCell;
