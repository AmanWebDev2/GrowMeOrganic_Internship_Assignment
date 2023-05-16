import { useEffect, useState } from "react";
import { getUsers } from "../../api/getUsers";
import { UserInterface } from "../../models/userInterface";

const Users = () => {
  const [users, setUsers] = useState<UserInterface | null>(null);
  
  useEffect(() => {
    (async()=>{
      const data = await getUsers();
      if(data != undefined) {
        setUsers(data);
      }
    })()
  }, []);

  return <div>Users</div>;
};

export default Users;
