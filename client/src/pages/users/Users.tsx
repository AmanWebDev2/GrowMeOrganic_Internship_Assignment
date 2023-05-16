import React, { useEffect, useState } from "react";
import { getUsers } from "../../api/getUsers";

const Users = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    async () => {
      const data = await getUsers();
      setUsers(data);
    };
  }, []);

  useEffect(()=>{
    console.log(users);
  },[users]);
  return <div>Users</div>;
};

export default Users;
