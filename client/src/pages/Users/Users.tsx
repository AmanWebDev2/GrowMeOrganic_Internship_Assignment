import { useEffect, useState } from "react";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { getUsers } from "../../api/getUsers";
import { UserInterface } from "../../interfaces/UserInterface";
import { Box, Container, Typography } from "@mui/material";
import UsersTable from "../../components/Table/UsersTable";
import SelectDepartment from "../../components/Department/SelectDepartment";
import DepartmentData from "../../data/departmentList.json";
import RedirectButton from "../../components/Button/RedirectButton";
import { DepartmentInterface } from "../../interfaces/DepartmentInterface";

const departments:DepartmentInterface[] = DepartmentData;

const rows: GridRowsProp = [
  { id: "null", userId: "null", title: "No data found", body: "" },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "userId", headerName: "User ID", width: 150 },
  { field: "title", headerName: "Title", width: 550 },
  { field: "body", headerName: "Body", width: 650 },
];

const defaultUser: UserInterface[] = [];

const Users = () => {
  const [users, setUsers] = useState<UserInterface[]>(defaultUser);
  const [loading, setloading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      const data = await getUsers();
      if (data != undefined) {
        setUsers(data);
        setloading(false);
      }
      setloading(false);
    })();
  }, []);

  return (
    <>
      <Container sx ={{background:'#f8f8f8', padding:'1rem',borderRadius:2}}>
        <Box sx={{display:'flex',alignItems:'center' ,justifyContent:'end'}}>
        <RedirectButton name="Home" redirectionURL="/" />
        </Box>
        <Box sx={{ height: 580, width: "100%" }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
            Users Details
          </Typography>
          <UsersTable
            columns={columns}
            defaultRow={rows}
            loading={loading}
            users={users}
          />
        </Box>
        <Box sx={{ marginTop: 10 }}>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Departments
          </Typography>
          <SelectDepartment departmentsDetail={departments} />
        </Box>
      </Container>
    </>
  );
};

export default Users;
