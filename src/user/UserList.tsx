import React from 'react';
import User from './User';
import List from '@mui/material/List';
import UserListItem from './UserListItem';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="Loan-list">
      <h1 style={{ textAlign: 'center', fontStyle: 'italic' }}>
        List of Users
      </h1>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          display: 'flex',
          flexWrap: 'nowrap',
          gap: '16px',
          padding: '16px',
        }}
        component="nav"
      >
        {users.map((user) => (
          <UserListItem key={user.userId} user={user} />
        ))}
      </List>
    </div>
  );
};

export default UserList;
