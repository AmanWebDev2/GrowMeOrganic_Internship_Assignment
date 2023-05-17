import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { UserInterface } from "../../models/userInterface";

interface Props {
  users: UserInterface[];
  defaultRow: GridRowsProp;
  columns: GridColDef[];
  loading: boolean;
}

const UsersTable = (props: Props) => {
  const { columns, loading, users, defaultRow } = props;
  return (
    <DataGrid
      rows={users.length > 0 ? users : defaultRow}
      columns={columns}
      loading={loading}
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
  );
};

export default UsersTable;
