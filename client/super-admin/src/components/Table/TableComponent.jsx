import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getUsers } from "../../services/user.services";
import ButtonComponent from "../ButtonComponent";

export default function BasicTable() {
  const [rows, setRows] = React.useState([]);
  const [currentDispRole, setCurrentDispRole] = React.useState('USER');

  const handleChangeRole = (e) => {
    console.log(e)
  }
  
  React.useEffect(() => {
    async function fetchData() {
    const res = await getUsers()
    const users = res.data.filter((user) => {return user.role.roleName === currentDispRole});
      setRows(users);
    }
    fetchData();
  }, [currentDispRole]);

  return (
    <div style={{ margin: 30, padding: 50}}>
        <div>
            <ButtonComponent onClick={handleChangeRole} key="DOCTORS" buttonText={"Doctors"}/> 
            <ButtonComponent onClick={handleChangeRole} key="USERS" buttonText={"Users"}/>
        </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.firstName}</TableCell>
                <TableCell align="center">{row.lastName}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phoneNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
