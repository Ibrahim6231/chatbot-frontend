import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaUserEdit } from 'react-icons/fa';



interface iMuiTableAdditionalStyle {
  align?: Array<"center" | "left" | "right" | "inherit" | "justify" | undefined>
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "blue" || theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: "1.1rem"  //custom
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem"  //custom
  },
}));

//@ts-ignore
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



interface iMuiCustomizedTables {
  rows: any[];
  columns: any;
  additionalStyle?: iMuiTableAdditionalStyle;
  handleClickAction?: (param1: any, param2: string) => void;
}

const MuiCustomizedTables: React.FC<iMuiCustomizedTables> = ({ rows, columns, additionalStyle, handleClickAction }) => {

  const columnsTitle: string[] = Object.values(columns);
  const columnsTitleKey: string[] = Object.keys(columns);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align={"left"}>Sl. No.</StyledTableCell>
            {columnsTitle.map((ele: any, i: number) => <StyledTableCell key={i} align={additionalStyle?.align?.[i] || "center"}> {ele} </StyledTableCell>)}
            {handleClickAction && <StyledTableCell> Action </StyledTableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, idx) => (
            <>
              <StyledTableRow key={idx}>
                <StyledTableCell key={idx} align={"left"}>{idx + 1}</StyledTableCell>
                {columnsTitleKey.map((ele, i: number) => {
                  return <StyledTableCell key={i} align={additionalStyle?.align?.[i] || "center"}>
                    <>
                      {row[ele]}
                      {ele === "role" && <div onClick={() => handleClickAction(row, "update")}>
                        <FaUserEdit />
                      </div>
                      }
                    </>
                  </StyledTableCell>
                }
                )}
                <StyledTableCell> <button onClick={() => handleClickAction(row, "delete")}>Delete</button> </StyledTableCell>
              </StyledTableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MuiCustomizedTables;