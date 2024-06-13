import React from 'react';
import UserList from '../user/UserList';
import { useApi } from '../api/ApiProvider';
import User from '../user/User';
import MenuAppBar from '../app-bar/MenuAppBar';
import { Box } from '@mui/material';

function ManageAccountsForm() {
  const apiClient = useApi();
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    apiClient
      .getAllUsers()
      .then((response) => {
        if (response.success && response.data) {
          if (Array.isArray(response.data)) {
            const mappedUsers = response.data.map((userDto) => ({
              userId: userDto.id || 0,
              name: userDto.name || '',
              lastName: userDto.lastName || '',
              email: userDto.email || '',
            }));
            setUsers(mappedUsers);
          } else {
            console.error('Invalid response data format: not an array');
          }
        } else {
          console.error('Failed to fetch users');
        }
      })
      .catch((error) => {
        console.error('Failed to fetch users:', error);
      });
  }, [apiClient]);

  return (
    <Box>
      <MenuAppBar />
      <Box style={{ justifyContent: 'center' }}>
        <h1>Manage Accounts</h1>
        <UserList users={users} />
      </Box>
    </Box>
  );
}
export default ManageAccountsForm;
