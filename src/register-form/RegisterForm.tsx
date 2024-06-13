import './RegisterForm.css';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { useApi } from '../api/ApiProvider';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const navigate = useNavigate();
  const apiClient = useApi();

  const onSubmit = useCallback(
    (
      values: {
        username: string;
        password: string;
        email: string;
        name: string;
        lastName: string;
      },
      formik: any,
    ) => {
      apiClient.register(values).then((response) => {
        console.debug(response);
        if (response.success) {
          navigate('/login');
        } else {
          formik.setFieldError();
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
        email: yup.string().required('Required'),
        name: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
      }),
    [],
  );

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        email: '',
        name: '',
        lastName: '',
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
    >
      {(formik: any) => (
        <form
          className="Register-form"
          id="registerForm"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <h1 style={{ fontStyle: 'italic' }}>Welcome in the library</h1>
          <h2 style={{ fontStyle: 'italic' }}>Register User</h2>
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
          <TextField
            id="email"
            label="Email"
            variant="standard"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="name"
            label="Name"
            variant="standard"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            id="lastName"
            label="Last name"
            variant="standard"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />

          <Button
            variant="contained"
            type="submit"
            form="registerForm"
            style={{ backgroundColor: 'purple' }}
            disabled={!(formik.isValid && formik.dirty)}
            onClick={formik.handleSubmit}
          >
            Register
          </Button>
          <h4 style={{ fontStyle: 'italic' }}>Have an account?</h4>
          <Button
            variant="contained"
            style={{ backgroundColor: 'purple' }}
            onClick={() => navigate('/login')}
          >
            Log in
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default RegisterForm;
