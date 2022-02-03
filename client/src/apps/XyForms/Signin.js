import React from 'react';
import { useNavigate } from 'react-router-dom';

// FORMIK
import { Form, ErrorMessage, Field, Formik} from 'formik'
import * as yup from 'yup'

// FUNCTIONS
import { signinUser, findOne } from './functions/users'
// import { authenticated } from './functions/users';

const seePassword = () => {
  const el = document.getElementById('password')
  el.type === 'password'? el.type = 'text' : el.type = 'password'
  const view = document.getElementById('viewPassword')
  view.innerHTML === 'view ' ? view.innerHTML = 'hide ' : view.innerHTML = 'view '
}

const SigninForm = () => {
  const navigate = useNavigate()
  
  return (  
  <div>
      <h1>Sign In</h1>
      <Formik
        initialValues={{
            email: '',
            password: '',
        }}
        validationSchema={ yup.object({
          email: yup.string().email('invalid email address').required('Required'),
          password: yup.string().min(8, 'Too short').max(15, 'Must be 15 characters or less').required('Required')
        })}
        onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true)
        await signinUser(values)
        // if false send message
            /** */
        // if true navigate
        navigate('/profile')
      }}
      >
            <Form>
            <label htmlFor='email'>Email:</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />

            <label htmlFor='password'>Password:</label>
            <Field id="password" name="password" type="password"/>
            <span id='viewPassword' onClick={()=>{
              seePassword()
            }}>view </span>
            <ErrorMessage name="password" />

            <button type="submit">Signin</button>
            </Form>
      </Formik>
  </div>
)
}

export default SigninForm;