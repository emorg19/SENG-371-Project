import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { theme } from '@/styles/appTheme';
import { useAuth } from '../context/UserContext';
import { useRouter } from 'next/router';

export default function Home() {
  const user = useAuth().currentUser();
  const router = useRouter();

  const buttonDisplay = (user: any) => {
    if (user) {
      return (
        <Box
          sx={{
            height: '100%',
            width: 1,
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: 'white'
          }}>
          <Button
            color="tertiary"
            onClick={() => router.push('/bankPages/accounts')}
            sx={{
              height: '50%',
              width: '10rem'
            }}
            variant="contained">
            Accounts
          </Button>

          <Button
            color="tertiary"
            onClick={() => router.push('/bankPages/budgets')}
            sx={{
              height: '50%',
              width: '10rem'
            }}
            variant="contained">
            Budget
          </Button>

          <Button
            color="tertiary"
            onClick={() => router.push('/main')}
            sx={{
              height: '50%',
              width: '10rem'
            }}
            variant="contained">
            Main
          </Button>

          <Button
            color="tertiary"
            onClick={() => router.push('/bankPages/payments')}
            sx={{
              height: '50%',
              width: '10rem'
            }}
            variant="contained">
            Payments
          </Button>

          <Button
            color="tertiary"
            onClick={() => router.push('/bankPages/investments')}
            sx={{
              height: '50%',
              width: '10rem'
            }}
            variant="contained">
            Investments
          </Button>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          height: '100%',
          width: 1,
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          backgroundColor: 'white'
        }}>
        <Button
          onClick={() => router.push('/user/login')}
          sx={{
            height: '50%',
            width: '10rem'
          }}
          variant="contained">
          Login
        </Button>

        <Button
          onClick={() => router.push('/user/signup')}
          sx={{
            height: '50%',
            width: '10rem'
          }}
          variant="contained">
          Signup
        </Button>
      </Box>
    );
  };

  return (
    <>
      <Head>
        <title>Piggy Bank</title>

        <meta content="Piggy Bank Home Page" name="description" />

        <meta content="width=device-width, initial-scale=1" name="viewport" />

        <link href="/piggy-bank.ico" rel="icon" />
      </Head>

      <>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            width: 1,
            height: '75%',
            position: 'top',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center'
          }}>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              height: '100%',
              padding: '25px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center'
            }}>
            <Typography color="white" fontSize={75} textAlign="left">
              <strong>Welcome to PiggyBank, {user?.username || 'please login'}</strong>
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            width: 1,
            height: '25%'
          }}>
          {buttonDisplay(user)}
        </Box>
      </>
    </>
  );
}
