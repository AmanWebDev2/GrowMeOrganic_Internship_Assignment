import { useEffect, useState } from "react";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { getUsers } from "../../api/getUsers";
import { UserInterface } from "../../models/userInterface";
import { Box, Container } from "@mui/material";
import UsersTable from "../../components/Table/UsersTable";
import SelectDepartment from "../../components/Department/SelectDepartment";
import DepartmentData from "../../data/departmentList.json";
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
    console.log(DepartmentData);
    
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
      <Container>
        <Box sx={{ height: 580, width: "100%" }}>
          <UsersTable
            columns={columns}
            defaultRow={rows}
            loading={loading}
            users={users}
          />
        </Box>
        <Box sx={{marginTop:10}}>
          <SelectDepartment departmentsDetail={DepartmentData}/>
        </Box>
      </Container>
    </>
  );
};

export default Users;
