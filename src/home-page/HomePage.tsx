import { Box, Button } from '@mui/material';
import MenuAppBar from '../app-bar/MenuAppBar';
import { Link, Outlet } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';

function HomePage(this: any) {
  const apiClient = useApi();

  apiClient.getBooks().then((response) => {
    console.log(response);
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <h1 style={{ textAlign: 'center', fontStyle: 'italic' }}>
        Library Management System
      </h1>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '100px',
        }}
      >
        <Button
          variant="outlined"
          size={'large'}
          component={Link}
          to="1"
          sx={{ m: 10, color: 'black', borderColor: 'black' }}
        >
          Books
        </Button>
        <Button
          variant="outlined"
          size={'large'}
          component={Link}
          to="2"
          sx={{ m: 10, color: 'black', borderColor: 'black' }}
        >
          Loans
        </Button>
      </Box>
      <Outlet />
    </Box>
  );
}

export default HomePage;
