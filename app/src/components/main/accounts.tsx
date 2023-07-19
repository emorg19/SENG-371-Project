import { Button, Modal, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { theme } from '@/styles/appTheme';
import { useAcc } from '@/context/AccountContext';
import { useRouter } from 'next/router';
import React from 'react';
import AddFunds from './AddFunds';

export const accountComponent = (value: number, title: string) => (
  <Paper elevation={1}>
    <Box
      m={2}
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
        <Typography color="black" fontSize={40} textAlign="left">
          {title}
        </Typography>
      </Box>
      <Box
        p={4}
        sx={{
          flexGrow: 0,
          height: '100%'
        }}>
        <Typography color={theme.palette.primary.main} fontSize={40} textAlign="left">
          ${value}
        </Typography>
      </Box>
    </Box>
  </Paper>
);

export default function Accounts() {
  const accountContext = useAcc();
  const router = useRouter();

  const account = accountContext.currentAccount();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        onClose={handleClose}
        open={open}>
        <>
          <AddFunds handleClose={handleClose} />
        </>
      </Modal>

      <Paper elevation={1}>
        <Box p={4}>
          <Button onClick={() => router.push('/bankPages/accounts')}>
            <Typography color="black" fontSize={20} textAlign="left">
              Bank accounts
            </Typography>
          </Button>

          <Button color="tertiary" onClick={handleOpen} sx={{ padding: '15px' }} variant="contained">
            Transfer Between Accounts
          </Button>

          {accountComponent(account?.checking || 0.0, 'Chequing')}

          {accountComponent(account?.savings || 0.0, 'Savings')}
        </Box>
      </Paper>
    </>
  );
}
