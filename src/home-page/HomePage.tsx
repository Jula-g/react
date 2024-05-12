import { Box, Button } from '@mui/material';
import MenuAppBar from '../app-bar/MenuAppBar';
import { Link, Outlet } from 'react-router-dom';

function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
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
