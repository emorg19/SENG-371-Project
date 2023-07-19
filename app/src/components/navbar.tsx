import { useAuth } from '@/context/UserContext';
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar: NextPage = () => {
  const router = useRouter();
  const userContext = useAuth();
  const user = userContext.currentUser();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" >
      <Container maxWidth="xl" color="tertiary">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={() => router.push('/')}>
              <Image alt="piggy bank" height={32} loading="lazy" src="/piggy-bank.png" width={32} />
            </Button>
          </Box>

          <Box px={2} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={() => router.push('/')}>
              <Typography color="white" fontSize={30} textAlign="center">
                <strong>PiggyBank</strong>
              </Typography>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              aria-label="account of current user"
              color="inherit"
              onClick={handleClick}
              size="large"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              id="menu-appbar"
              onClose={handleClose}
              open={open}
              sx={{ marginTop: '40px' }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              {!user && (
                <Box>
                  <MenuItem key="login">
                    <Button onClick={() => router.push('/user/login')}>
                      <Typography color="black" textAlign="center">
                        Login
                      </Typography>
                    </Button>
                  </MenuItem>

                  <Button onClick={() => router.push('/user/signup')}>
                    <MenuItem key="signup">
                      <Typography color="black" textAlign="center">
                        Signup
                      </Typography>
                    </MenuItem>
                  </Button>
                </Box>
              )}

              {user && user.username ? (
                <Box>
                  <Button onClick={() => router.push('/main')}>
                    <MenuItem key="main">
                      <Typography color="black" textAlign="center">
                        Main
                      </Typography>
                    </MenuItem>
                  </Button>

                  <Button onClick={() => router.push('/bankPages/accounts')}>
                    <MenuItem key="accounts">
                      <Typography color="black" textAlign="center">
                        Accounts
                      </Typography>
                    </MenuItem>
                  </Button>

                  <Button onClick={() => router.push('/bankPages/budgets')}>
                    <MenuItem key="budget">
                      <Typography color="black" textAlign="center">
                        Budget
                      </Typography>
                    </MenuItem>
                  </Button>

                  <Button onClick={() => router.push('/bankPages/payments')}>
                    <MenuItem key="budget">
                      <Typography color="black" textAlign="center">
                        Payments
                      </Typography>
                    </MenuItem>
                  </Button>

                  <Button onClick={() => router.push('/bankPages/investments')}>
                    <MenuItem key="budget">
                      <Typography color="black" textAlign="center">
                        Investing
                      </Typography>
                    </MenuItem>
                  </Button>

                  <Button onClick={() => userContext.logout()}>
                    <MenuItem key="logout">
                      <Typography color="black" textAlign="center">
                        Logout
                      </Typography>
                    </MenuItem>
                  </Button>
                </Box>
              ) : null}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
