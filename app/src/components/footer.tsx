import { Box } from '@mui/system';
import type { NextPage } from 'next';

const useStyles = {
  footer: {
    backgroundColor: 'primary.main',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0
  }
};

const Footer: NextPage = () => (
  <Box p={4} sx={useStyles.footer}>
    Created by: Group #13 | Kjartan Einarsson V00885049 | Amy Finck V00878512 | Charlie Wager V00959352 | Connor Newbery
    V00921506 | Ewan Morgan V00948587
  </Box>
);

export default Footer;
