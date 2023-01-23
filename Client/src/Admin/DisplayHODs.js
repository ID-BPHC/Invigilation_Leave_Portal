import React, { useEffect, useState } from "react";
import { HOD_Data } from "./HOD_Data";

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

function DisplayHODs() {

  const[rows,setRows] = useState([]);
  const sortedRows = [];
  var count  = 0;

  useEffect(()=>{
    async function getListOfHods(){
      var response = await fetch("http://127.0.0.1:5004/api/leave/admin/getAllHods",{
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      if(count == 0){
        setArray(response);
        count++;
      }
    }
    getListOfHods();
  },[]);

  function setArray(response){
    for(let i=0;i<response.length;i++){
      if(response[i].department === "Biological Sciences"){
          sortedRows.push({
              name:response[i].name,
              department:response[i].department,
              hpsrn:response[i].hpsrn,
              email:response[i].email,
          });
      }
  }
  for(let i=0;i<response.length;i++){
    if(response[i].department === "Chemical Engineering"){
        sortedRows.push({
            name:response[i].name,
            department:response[i].department,
            hpsrn:response[i].hpsrn,
            email:response[i].email,
        });
    }
}
for(var i=0;i<response.length;i++){
    if(response[i].department === "Chemistry"){
        sortedRows.push({
            name:response[i].name,
            department:response[i].department,
            hpsrn:response[i].hpsrn,
            email:response[i].email,
        });
    }
}
for(var i=0;i<response.length;i++){
    if(response[i].department === "Civil Engineering"){
        sortedRows.push({
            name:response[i].name,
            department:response[i].department,
            hpsrn:response[i].hpsrn,
            email:response[i].email,
        });
    }
}
for(var i=0;i<response.length;i++){
    if(response[i].department === "Computer Science and Information Systems"){
        sortedRows.push({
            name:response[i].name,
            department:response[i].department,
            hpsrn:response[i].hpsrn,
            email:response[i].email,
        });
    }
}
for(var i=0;i<response.length;i++){
    if(response[i].department === "Electrical and Electronics Engineering"){
        sortedRows.push({
            name:response[i].name,
            department:response[i].department,
            hpsrn:response[i].hpsrn,
            email:response[i].email,
        });
    }
}
for(var i=0;i<response.length;i++){
    if(response[i].department === "Humanities and Social Sciences"){
        sortedRows.push({
            name:response[i].name,
            department:response[i].department,
            hpsrn:response[i].hpsrn,
            email:response[i].email,
        });
    }
}
for(var i=0;i<response.length;i++){
    if(response[i].department === "Mathematics"){
        sortedRows.push({
            name:response[i].name,
            department:response[i].department,
            hpsrn:response[i].hpsrn,
            email:response[i].email,
        });
    }
}
for(var i=0;i<response.length;i++){
    if(response[i].department === "Mechanical Engineering"){
        sortedRows.push({
            name:response[i].name,
            department:response[i].department,
            hpsrn:response[i].hpsrn,
            email:response[i].email,
        });
    }
}
for(var i=0;i<response.length;i++){
  if(response[i].department === "Economics and Finance"){
      sortedRows.push({
          name:response[i].name,
          department:response[i].department,
          hpsrn:response[i].hpsrn,
          email:response[i].email,
      });
  }
}
for(var i=0;i<response.length;i++){
    if(response[i].department === "Pharmacy"){
        sortedRows.push({
            name:response[i].name,
            department:response[i].department,
            hpsrn:response[i].hpsrn,
            email:response[i].email,
        });
    }
}
for(var i=0;i<response.length;i++){
    if(response[i].department === "Physics"){
        sortedRows.push({
            name:response[i].name,
            department:response[i].department,
            hpsrn:response[i].hpsrn,
            email:response[i].email,
        });
    }
}
setRows(sortedRows);
  }
  
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
      HODs
      </div>

      {/* Filter Search for Admin */}
      { localStorage.getItem('email') === HOD_Data[0].value && <div className="flex flex-row text-center items-center mx-auto ">
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
      </div>}
      

      {/* Table */}
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Department</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">HPSRN</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
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
                    {row.hpsrn}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.email}
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

export default DisplayHODs;
