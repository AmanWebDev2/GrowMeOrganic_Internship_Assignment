import { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { getUsers } from "../../api/getUsers";
import { UserInterface } from "../../models/userInterface";
import { Box, Container } from "@mui/material";

const rows: GridRowsProp = [
  { id: "null", userId: "null", title: "No data found", body: "" },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "userId", headerName: "User ID",width:150, },
  { field: "title", headerName: "Title",minWidth:150,flex:1},
  { field: "body", headerName: "Body",width:650,flex:1},
];

const defaultUser: UserInterface[] = [];

const Users = () => {
  const [users, setUsers] = useState<UserInterface[]>(defaultUser);
  useEffect(() => {
    (async () => {
      const data = await getUsers();
      if (data != undefined) {
        setUsers(data);
      }
    })();
  }, []);

  return (
    <>
      <Container>
        <Box sx={{ height: 580, width: "100%" }}>
          <DataGrid
            rows={users.length > 0 ? users : rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </Container>
    </>
  );
};

export default Users;
