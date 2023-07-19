import { Button, Modal, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { theme } from '@/styles/appTheme';
import { useAcc } from '@/context/AccountContext';
import { useRouter } from 'next/router';
import React from 'react';
import AddFunds from './investFunds';

export const investComponent = (value: number, title: string) => (
  <Paper elevation={1}>
    <Box
      m={2}
      sx={{
        flexGrow: 0,
        display: { xs: 'none', md: 'flex' }
      }}
    >
      <Box
        p={4}
        sx={{
          flexGrow: 1,
          height: '100%'
        }}
      >
        <Typography color="black" fontSize={40} textAlign="left">
          {title}
        </Typography>
      </Box>
      <Box
        p={4}
        sx={{
          flexGrow: 0,
          height: '100%'
        }}
      >
        <Typography color={theme.palette.primary.main} fontSize={40} textAlign="left">
          ${value}
        </Typography>
      </Box>
    </Box>
  </Paper>
);

export default function Invest() {
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
        open={open}
      >
        <AddFunds handleClose={handleClose} />
      </Modal>

      <Box
        p={4}
        sx={{
          width: 1,
          backgroundColor: 'white',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly'
        }}
      >
        <Button color="tertiary" onClick={handleOpen} sx={{ padding: '15px' }} variant="contained">
          Stocks
        </Button>

        <Button color="tertiary" onClick={handleOpen} sx={{ padding: '15px' }} variant="contained">
          Bonds
        </Button>

        <Button color="tertiary" onClick={handleOpen} sx={{ padding: '15px' }} variant="contained">
          Real Estate
        </Button>

        <Button color="tertiary" onClick={handleOpen} sx={{ padding: '15px' }} variant="contained">
          Mutual Funds
        </Button>
      </Box>
    </>
  );
}
