import React, { useEffect, useState } from "react";
import { HOD_Data } from "../Admin/HOD_Data";

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
// import { get } from "mongoose";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function TablePaginationActions({ count, page, rowsPerPage, onPageChange }) {
  const theme = useTheme();

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

function Dashboard({ department }) {
  const [rows, setRows] = useState([]);

  async function getListOfPhds() {
    var response = await fetch("http://127.0.0.1:5004/api/leave/hod/phd", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        department: department,
      }),
    });
    response = await response.json();
    setRows(response);
  }

  useEffect(() => {
    getListOfPhds();
  }, []);

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

  const[reply,setReply] = useState(0);
  const[email,setEmail] = useState(" ");

  const handleSubmit = (event) =>{
    event.preventDefault();
    async function ApprovePhd(){
      var response = await fetch("http://127.0.0.1:5004/api/leave/admin/response",{
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body:JSON.stringify({
          reply:reply,
          email:email,
        }),
      });
      response = await response.json();
      console.log(response);
      window.alert(`You Have ${response?"Accepted":"Rejected"} the leave. Email has been sent successfully. If you want to modify your request, you can hit approve/deny button again`);
      return;
    }
    ApprovePhd();
    getListOfPhds();
    getListOfPhds();
  }

  return (
    <div>
      {/* <div className="text-center text-3xl mx-auto my-4 text-black">
        Dashboard
      </div> */}
      <div className="text-center text-3xl mx-auto my-4 text-black">
        {HOD_Data.map((ele)=>{
          if(ele.hod.includes(localStorage.getItem("email"))){
            return (<div>Dept. of {ele.text}</div>);
          }}
          )}
      </div>
      {/* Filter Search for Admin */}
      {localStorage.getItem("email") === HOD_Data[0].value && (
        <div className="flex flex-row text-center items-center mx-auto ">
          {" "}
          <h3 className="mx-4">Sorted By: </h3>
          <select
            defaultValue={HOD_Data[0].value}
            value={selector}
            className="text-center items-center w-40 overflow-auto flex my-5 bg-slate-300 p-4 rounded-xl right-0 flex-grow-0"
            required
            onChange={(e) => {
              setSelector(e.target.text);
            }}
          >
            {HOD_Data.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Table */}
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Department</StyledTableCell>
                <StyledTableCell align="center">Requested By</StyledTableCell>
                <StyledTableCell align="center">Reason</StyledTableCell>
                <StyledTableCell align="center">Leave Dates</StyledTableCell>
                <StyledTableCell align="center">Leave Status</StyledTableCell>
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
              ).map((row) => (
                <TableRow>

                  <TableCell component="th" scope="row" align="center">
                    {row.department}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.reason}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.date + " "}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {(row.leave)?"Approved":"Rejected"}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                  >
                  <form method = "POST" onSubmit = {handleSubmit}>
                    <div className="flex flex-row items-center justify-center">
                      <button className="mx-4 hover:bg-green-400 border-black border-2 px-3 py-2 rounded-md" name="approve" onClick={()=>{
                        setReply(1);
                        setEmail(row.emailId);
                      }} type="submit">Approve</button>
                      <button className="mx-4 hover:bg-red-400 border-black border-2 px-3 py-2 rounded-md" name = "deny"  onClick={()=>{
                        setReply(0);
                        setEmail(row.emailId);
                      }} type="submit">Deny</button>
                    </div>
                  </form>
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
                  colSpan={4}
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
