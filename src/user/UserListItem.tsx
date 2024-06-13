import React, { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useApi } from '../api/ApiProvider';
import User from './User';

const StyledCard = styled(Card)(({ theme }) => ({
  width: 300,
  flexShrink: 0,
}));

interface UserListItemProps {
  user: User;
}

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  const apiClient = useApi();
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setUpdatedUser({ ...user });
  };

  const handleUpdate = () => {
    apiClient
      .updateUser(updatedUser, user.userId)
      .then((response) => {
        if (response.success && response.data) {
          const updatedUserData = {
            userId: response.data.id || 0,
            name: response.data.name || '',
            lastName: response.data.lastName || '',
            email: response.data.email || '',
          };
          setUpdatedUser(updatedUserData);
          console.log('User updated successfully');
          alert('User updated successfully');
        }
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        alert('Failed to update user');
      });
    toggleEditMode();
  };

  return (
    <>
      <StyledCard>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            User ID: {user.userId}
          </Typography>
          {editMode ? (
            <>
              <input
                type="text"
                value={updatedUser.name}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, name: e.target.value })
                }
              />
              <input
                type="text"
                value={updatedUser.lastName}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, lastName: e.target.value })
                }
              />
              <input
                type="text"
                value={updatedUser.email}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, email: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary">
                Name: {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last Name: {user.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {user.email}
              </Typography>
            </>
          )}
        </CardContent>
        <CardActions>
          {editMode ? (
            <>
              <Button size="small" color="primary" onClick={handleUpdate}>
                Save
              </Button>
              <Button size="small" color="secondary" onClick={toggleEditMode}>
                Cancel
              </Button>
            </>
          ) : (
            <Button size="small" color="primary" onClick={toggleEditMode}>
              Update
            </Button>
          )}
          <Button
            size="small"
            color="primary"
            onClick={() => {
              apiClient.deleteUser(user.userId).then((response) => {
                if (response.success) {
                  console.log('User deleted successfully');
                  alert('User deleted successfully');
                }
              });
            }}
          >
            Delete
          </Button>
        </CardActions>
      </StyledCard>
    </>
  );
};

export default UserListItem;
