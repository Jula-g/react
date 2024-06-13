import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { alpha, InputBase } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

export default function MenuAppBar() {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );
  const [profileAnchorEl, setProfileAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const apiClient = useApi();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleProfileOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleMenuClose();
    handleProfileClose();
  };

  const handleLogout = async () => {
    apiClient.logOut();
    navigate('/login', { replace: true });
  };

  const isRoleAdmin = () => {
    let userRole = apiClient.getUserRole();
    return userRole === 'ROLE_ADMIN';
  };

  const isLoggedIn = () => {
    return apiClient.isLoggedIn();
  };

  const location = useLocation();

  const handleSearchSubmit = () => {
    const search = document.getElementById('search') as HTMLInputElement;
    if (search && search.value) {
      navigate(`/books?title=${encodeURIComponent(search.value)}`);
    }
  };

  const Search = styled('div')(({ theme }: { theme: Theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }: { theme: Theme }) => ({
    color: 'inherit',
    width: '400px',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ background: 'black', display: 'flex' }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
          sx={{ mr: 2, color: 'white' }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Library
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            id={'search'}
            placeholder="Search for title..."
            inputProps={{ 'aria-label': 'search' }}
            autoComplete="off"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearchSubmit();
              }
            }}
          />
        </Search>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="profile-menu-appbar"
          aria-haspopup="true"
          onClick={handleProfileOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={menuAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem key="1" onClick={() => handleNavigation('/books')}>
            List of books
          </MenuItem>
          <MenuItem key="2" onClick={() => handleNavigation('/history')}>
            History of loans
          </MenuItem>
          <MenuItem key="3" onClick={() => handleNavigation('/home')}>
            Your Loans
          </MenuItem>
        </Menu>
        <Menu
          id="profile-menu-appbar"
          anchorEl={profileAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(profileAnchorEl)}
          onClose={handleProfileClose}
        >
          <MenuItem
            key="6"
            style={{ display: isRoleAdmin() ? '' : 'none' }}
            onClick={() => handleNavigation('/accounts')}
          >
            Manage User Accounts
          </MenuItem>
          <MenuItem
            key="4"
            style={{ display: isRoleAdmin() ? '' : 'none' }}
            onClick={() => handleNavigation('/register')}
          >
            Add User
          </MenuItem>
          <MenuItem
            key="7"
            style={{ display: isRoleAdmin() ? '' : 'none' }}
            onClick={() => handleNavigation('/add-book')}
          >
            Add Books
          </MenuItem>
          <MenuItem
            key="5"
            style={{ display: isLoggedIn() ? '' : 'none' }}
            onClick={handleLogout}
          >
            Log out
          </MenuItem>
          <MenuItem
            key="5"
            style={{ display: isLoggedIn() ? 'none' : '' }}
            onClick={() => navigate('/login')}
          >
            Log in
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
