import React, { useState } from "react";

// MaterialUI Imports for Table
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(dept, name, request) {
  return { dept, name, request };
}

// Demo data, get data dynamically later
const rows = [
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
  createData("ECE", "Shobhan", "Sick Leave"),
];

function Dashboard() {
  const options = [
    { value: "", text: "-- Select Dept --" },
    { value: "Civil Engg", text: "Civil Engg" },
    { value: "Chemical Engg", text: "Chemical Engg" },
    { value: "EEE", text: "EEE" },
    { value: "Mechanical Engg", text: "Mechanical Engg" },
    { value: "Pharmacy", text: "Pharmacy" },
    { value: "Computer Sciences", text: "Computer Sciences" },
    { value: "ENI", text: "ENI" },
    { value: "ECE", text: "ECE" },
    { value: "Biological Sciences", text: "Biological Sciences" },
    { value: "Chemistry", text: "Chemistry" },
    { value: "Economics", text: "Economics" },
    { value: "Physics", text: "Physics" },
    { value: "Maths", text: "Maths" },
  ];
  const [selector, setSelector] = useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div className="text-center text-3xl mx-auto my-4 text-black">
        Dashboard
      </div>

      {/* Filter Search for Admin */}
      <div className="flex flex-row text-center items-center mx-auto ">
        {" "}
        {/* TODO: Only Admin should see this */}
        <h3 className="mx-4">Sort By: </h3>
        <select
          defaultValue={options[0].value}
          value={selector}
          className="text-center items-center h-auto flex my-5 bg-slate-300 p-4 rounded-xl right-0"
          required
          onChange={(e) => {
            setSelector(e.target.text);
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">#</StyledTableCell>
                <StyledTableCell align="center">Department</StyledTableCell>
                <StyledTableCell align="center">Requested By</StyledTableCell>
                <StyledTableCell align="center">Reason</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row, index) => (
                <TableRow>
                  <TableCell component="th" scope="row" align="center">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.dept}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.request}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                  >
                    <div className="flex flex-row right-0">
                      <button className="mx-4 hover:bg-green-400">Approve</button>
                      <button className="mx-4 hover:bg-red-400">Deny</button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Dashboard;
