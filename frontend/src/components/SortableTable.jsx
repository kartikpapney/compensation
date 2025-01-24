"use client";

import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import CustomTableCell from "./CustomTableCell";

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort, columns } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead sx={{ backgroundColor: "grey.100" }}>
            <TableRow>
                {columns.map(({ sortBy, disablePadding, text, label }, idx) =>
                    sortBy ? (
                        <TableCell
                            key={sortBy}
                            align={idx == 0 ? "left" : "right"}
                            padding={disablePadding ? "none" : "normal"}
                            sortDirection={orderBy === sortBy ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === sortBy}
                                direction={orderBy === sortBy ? order : "asc"}
                                onClick={createSortHandler(sortBy)}
                            >
                                {text}
                                {orderBy === sortBy ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === "desc" ? "sorted descending" : "sorted ascending"}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                            <Box display="flex" flexDirection="row" gap={1} justifyContent={idx === 0 ? "flex-start" : "flex-end"}>
                                {(label ?? []).map(({ text }, index) => (
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
                    ) : (
                        <TableCell
                            key={sortBy}
                            align={idx == 0 ? "left" : "right"}
                            padding={disablePadding ? "none" : "normal"}
                            sortDirection={orderBy === sortBy ? order : false}
                        >
                            <Typography variant="body2" component="span">
                                {text}
                            </Typography>

                            <Box display="flex" flexDirection="row" gap={1} justifyContent={idx === 0 ? "flex-start" : "flex-end"}>
                                {(label ?? []).map(({ text }, index) => (
                                    <Typography variant="body2" color="textSecondary" key={index}>
                                        {text}
                                    </Typography>
                                ))}
                            </Box>
                        </TableCell>
                    )
                )}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable({
    isMobile,
    total,
    columns,
    rows,
    order,
    setOrder,
    orderBy,
    setOrderBy,
    page,
    setPage,
    rowsPerPage = 10,
    setRowsPerPage,
}) {
    const [selected, setSelected] = React.useState([]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <TableContainer>
                    <Table sx={{ minWidth: "100%" }} aria-labelledby="tableTitle" size="small">
                        <EnhancedTableHead
                            isMobile={isMobile}
                            columns={columns}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={total}
                        />
                        <TableBody>
                            {rows.map((row, index) => {
                                const isItemSelected = selected.includes(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        {columns.map((column) => {
                                            return (
                                                <CustomTableCell
                                                    key={column.id}
                                                    text={row[column.id]}
                                                    labels={column.label.map((label) => row[label.id])}
                                                    link={column.link ? row.link : null}
                                                    align={column.align}
                                                ></CustomTableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 33 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
