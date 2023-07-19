import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useAuth } from '../../context/UserContext';
import { Container } from '@mui/system';
import { theme } from '@/styles/appTheme';

export const signupSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email().required('Required'),
  password1: Yup.string().required('Required').min(3, 'Too Short!'),
  password2: Yup.string().required('Required').min(3, 'Too Short!')
});

export interface ISignupForm {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

function SignupForm() {
  const userContext = useAuth();

  const sendSignup = async (signupDetails: ISignupForm) => {
    if (signupDetails.password1 != signupDetails.password2) {
      alert('passwords do no match');

      return;
    }
    userContext.register(signupDetails);
  };

  return (
    <Container maxWidth="xl">
      <Formik
        initialValues={{
          username: '',
          email: '',
          password1: '',
          password2: ''
        }}
        onSubmit={(values: ISignupForm) => {
          sendSignup(values);
        }}
        validationSchema={signupSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }: any) => (
          <Box>
            <Paper elevation={3}>
              <Box
                px={2}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  height: '10vh'
                }}
              >
                <Typography color="white" fontSize={100} textAlign="left">
                  <strong>Sign up</strong>
                </Typography>
              </Box>
            </Paper>
            <Paper elevation={2}>
              <Box mx={8} p={4}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField
                      className="form-control inp_text"
                      error={!!errors.username}
                      fullWidth
                      id="username"
                      label="Username:"
                      name="username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter username"
                      type="username"
                      value={values.username}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      className="form-control inp_text"
                      error={!!errors.email}
                      fullWidth
                      helperText={errors.email && touched.email && errors.email}
                      id="email"
                      label="Email:"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter email"
                      type="email"
                      value={values.email}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      className="form-control"
                      error={!!errors.password1}
                      fullWidth
                      helperText={errors.password1 && touched.password1 && errors.password1}
                      label="Password:"
                      name="password1"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter password"
                      type="password"
                      value={values.password1}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      className="form-control"
                      error={!!errors.password2}
                      fullWidth
                      helperText={errors.password2 && touched.password2 && errors.password2}
                      label="Password:"
                      name="password2"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Repeat password"
                      type="password"
                      value={values.password2}
                    />
                  </Grid>
                  <Grid item>
                    <Button onClick={handleSubmit} sx={{ width: '50%' }} type="submit" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        )}
      </Formik>
    </Container>
  );
}

export default SignupForm;
