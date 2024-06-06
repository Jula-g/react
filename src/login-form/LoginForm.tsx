import './LoginForm.css';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { useApi } from '../api/ApiProvider';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const apiClient = useApi();

  const onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      apiClient.login(values).then((response) => {
        console.log(response);
        if (response.success) {
          navigate('/home');
        } else {
          formik.setFieldError(
            'username',
            'Invalid username, password or no connection',
          );
        }
      });
    },
    [apiClient, navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Required'),
        password: yup
          .string()
          .required('Required')
          .min(5, 'Password too short'),
      }),
    [],
  );

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
    >
      {(formik: any) => (
        <form
          className="Login-form"
          id="signForm"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <h1 style={{ fontStyle: 'italic' }}>Welcome in the library</h1>
          <h2 style={{ fontStyle: 'italic' }}>Sign in</h2>
          <TextField
            id="username"
            label="Username"
            variant="standard"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            id="password"
            label="Password"
            variant="standard"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.password)}
            helperText={formik.touched.username && formik.errors.password}
          />
          <Button
            variant="contained"
            type="submit"
            form="signForm"
            style={{ backgroundColor: 'purple' }}
            disabled={!(formik.isValid && formik.dirty)}
          >
            Sign in
          </Button>
          <h4 style={{ fontStyle: 'italic' }}>Don't have an account?</h4>
          <Button
            variant="contained"
            style={{ backgroundColor: 'purple' }}
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
