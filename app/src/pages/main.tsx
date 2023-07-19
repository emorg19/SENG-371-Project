import Head from 'next/head';
import { useAuth } from '../context/UserContext';
import { useAcc } from '../context/AccountContext';
import { Button, LinearProgress, Paper, Typography, linearProgressClasses } from '@mui/material';
import { useRouter } from 'next/router';
import { Box, Container, styled } from '@mui/system';
import { theme } from '../styles/appTheme';
import Accounts from '../components/main/accounts';
import getTips from '../helpers/tips';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  marginTop: '15px',
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'
  }
}));

export default function Main() {
  const userContext = useAuth();
  const accountContext = useAcc();

  const router = useRouter();

  const user = userContext.currentUser();
  const account = accountContext.currentAccount();
  const total = Number(account?.savings) + Number(account?.checking);

  return (
    <>
      <Head>
        <title>Piggy Bank</title>

        <meta content="Piggy Bank Home Page" name="description" />

        <meta content="width=device-width, initial-scale=1" name="viewport" />

        <link href="/piggy-bank.ico" rel="icon" />
      </Head>

      <Container maxWidth="xl">
        <Paper elevation={3}>
          <Box
            px={2}
            sx={{
              flexGrow: 0,
              flexDirection: 'column',
              backgroundColor: theme.palette.secondary.main,
              display: { xs: 'none', md: 'flex' },
              height: '40vh'
            }}>
            <Box
              sx={{
                flexGrow: 1,
                flexDirection: 'column-reverse',
                display: { xs: 'none', md: 'flex' }
              }}
            />

            <Typography color="white" fontSize={100} textAlign="left">
              <strong>Good morning, {user?.username}</strong>
            </Typography>
          </Box>
        </Paper>

        <Paper elevation={1}>
          <Container maxWidth="xl">
            <Box
              p={4}
              sx={{
                flexGrow: 0,
                display: { xs: 'none', md: 'flex' }
              }}>
              <Box
                p={4}
                sx={{
                  flexGrow: 1,
                  height: '100%'
                }}>
                <Accounts />
              </Box>

              <Box
                p={4}
                sx={{
                  flexGrow: 1,
                  height: '100%'
                }}>
                <Paper elevation={1}>
                  <Box
                    p={4}
                    sx={{
                      flexGrow: 0,
                      height: '100%'
                    }}>
                    {getTips(total)}

                    <LinearProgress value={(Number(account?.budget) / 2000) * 100} variant="determinate" />
                  </Box>
                </Paper>

                <Paper elevation={1}>
                  <Box sx={{ marginTop: '25px', height: '37.5vh' }}>
                    {total > 10000 && (
                      <Box
                        p={4}
                        sx={{
                          width: 1,
                          height: '100%',
                          backgroundColor: 'white',
                          display: 'flex',
                          flexWrap: 'wrap',
                          justifyContent: 'space-evenly'
                        }}>
                        <Button
                          onClick={() => router.push('/bankPages/investments')}
                          sx={{ padding: '15px', width: '150px', height: '75px' }}
                          variant="contained">
                          Stocks
                        </Button>

                        <Button
                          onClick={() => router.push('/bankPages/investments')}
                          sx={{ padding: '15px', width: '150px', height: '75px' }}
                          variant="contained">
                          Bonds
                        </Button>

                        <Button
                          onClick={() => router.push('/bankPages/investments')}
                          sx={{ padding: '15px', width: '150px', height: '75px' }}
                          variant="contained">
                          Real Estate
                        </Button>

                        <Button
                          onClick={() => router.push('/bankPages/investments')}
                          sx={{ padding: '15px', width: '150px', height: '75px' }}
                          variant="contained">
                          Mutual Funds
                        </Button>
                      </Box>
                    )}

                    <Box
                      p={4}
                      sx={{
                        width: 1,
                        height: '100%'
                      }}>
                      <Typography color="1a90ff" fontSize={20} sx={{ paddingTop: '25px' }} textAlign="center">
                        You have {Math.round((Number(account?.spent) / Number(account?.budget)) * 100)}% ($
                          {Number(account?.budget) - Number(account?.spent)}) left in your budget for this month!
                      </Typography>

                      <BorderLinearProgress
                        value={Math.round((Number(account?.spent) / Number(account?.budget)) * 100)}
                        variant="determinate"
                      />

                      <Typography color="1a90ff" fontSize={20} sx={{ paddingTop: '25px' }} textAlign="center">
                        You have spent ${Number(account?.spent)}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Container>
        </Paper>
      </Container>
    </>
  );
}
