import { Formik } from 'formik';
import * as Yup from 'yup';
import { Alert, Box, Button, Paper, Snackbar, TextField, Typography } from '@mui/material';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/UserContext';
import { useState } from 'react';
import { Container } from '@mui/system';
import { theme } from '@/styles/appTheme';

export const loginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required').min(3, 'Too Short!')
});

function LoginForm() {
  const router = useRouter();
  const userContext = useAuth();

  const [snackbar, setSnackbar] = useState<boolean>(false);

  const sendLogin = async (loginDetails: { username: string; password: string }) => {
    try {
      const user = await userContext.login(loginDetails.username, loginDetails.password);

      if (user) {
        router.push('/main');
      }
    } catch (error) {
      setSnackbar(true);
    }
  };

  return (
    <Container maxWidth="xl">
      <Snackbar autoHideDuration={6000} onClose={() => setSnackbar(false)} open={snackbar}>
        <Alert onClose={() => setSnackbar(false)} severity="error" sx={{ width: '100%', alignContent: 'center' }}>
          Incorrect Username or Password
        </Alert>
      </Snackbar>

      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          sendLogin(values);
        }}
        validationSchema={loginSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }: any) => (
          <Box>
            <Paper elevation={3}>
              <Box
                pb={4}
                px={2}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  height: '14vh'
                }}
              >
                <Typography color="white" fontSize={100} textAlign="left">
                  <strong>Sign in</strong>
                </Typography>
              </Box>
            </Paper>
            <Paper elevation={2}>
              <Box mx={8} p={4}>
                <Box m={2}>
                  <TextField
                    fullWidth
                    helperText={errors.username && touched.username && errors.username}
                    id="username"
                    label="Username"
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter username id / username"
                    type="username"
                    value={values.username}
                    variant="outlined"
                  />
                </Box>
                <Box m={2}>
                  <TextField
                    fullWidth
                    helperText={errors.password && touched.password && errors.password}
                    label="Password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter password"
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                </Box>
                <Box m={2}>
                  <Button fullWidth onClick={handleSubmit} size="large" type="submit" variant="contained">
                    Login
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        )}
      </Formik>
    </Container>
  );
}

export default LoginForm;
