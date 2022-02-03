import React from 'react';
import { Form, ErrorMessage, Field, Formik} from 'formik'
import * as yup from 'yup'
import { createUser } from './functions/users'
import { useNavigate } from 'react-router-dom'
import { findOne } from './functions/users'

const seePassword = () => {
  const el = document.getElementById('password')
  el.type === 'password'? el.type = 'text' : el.type = 'password'
  const view = document.getElementById('viewPassword')
  view.innerHTML === 'view ' ? view.innerHTML = 'hide ' : view.innerHTML = 'view '
}
const inputUnique = (type, status) => {
  switch (type) {
    case 'email':
      let emailUnique = document.getElementById('emailUnique')  
      status === true ? emailUnique.innerHTML = 'email available' : emailUnique.innerHTML = 'email already used'
      break;
    case 'username':
      let usernameUnique = document.getElementById('usernameUnique')  
      status === true ? usernameUnique.innerHTML = 'username available' : usernameUnique.innerHTML = 'username already used'
      break;
    default:
      console.log('error')
      break;
  }
}
const SignupForm = () => {
  const nav = useNavigate()
  return (  
  <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
            email: '',
            userName: '',
            password: '',
            firstName: '',
            lastName: '',
            // birthday: ''
        }}
        validationSchema={ yup.object({
          email: yup.string().email('invalid email address').required('Required'),
          firstName: yup.string().required('Required'),
          lastName: yup.string().required('Required'),
          // birthday: yup.date().required('Required'),
          userName: yup.string().min(3, 'Must be at least 3 characters').max(12, 'Must be less than 12 characters').required('Required'),
          password: yup.string().min(8, 'Too short').max(15, 'Must be 15 characters or less').required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
        console.log(JSON.stringify(values))
        setSubmitting(false)
        createUser(values).then( nav('/signin') )
      }}
      >
        {({ values }) => (
        <Form>

            <label htmlFor='email'>Email:</label>
            <Field name="email" type="email" onKeyUp={async () => {
                let User
                values.email.includes('@' && '.') ? User = await findOne('email', values) : User = null 
                if(User != null){
                    !User.data.id ? inputUnique('email', true) : inputUnique('email', false)
                    console.log(User)
                }else{
                  const emailUniqueEl = document.getElementById('emailUnique')
                  if(values.email === '') { emailUniqueEl.innerHTML = '' }
                }
            }}/>
            <span id='emailUnique'></span>
            <ErrorMessage name="email" />

            <label htmlFor='password'>Password:</label>
            <Field id="password" name="password" type="password"/>
            <span id='viewPassword' onClick={()=>{
              seePassword()
            }}>view </span>
            <ErrorMessage name="password" />


            <label htmlFor='userName'>Username:</label>
            <Field name="userName" type="text" onKeyUp={async () => {
                let User
                let username = values.userName
                username.length >= 3 ? User = await findOne('username', values) : User = null 
                if(User != null){
                    !User.data.id ? inputUnique('username', true) : inputUnique('username', false)
                }else{
                  const usernameUniqueEl = document.getElementById('usernameUnique')
                  if(values.email === '') { usernameUniqueEl.innerHTML = '' }
                }
            }}/><span id="usernameUnique"></span>
            <ErrorMessage name="userName" />


            <label htmlFor='firstName'>First Name:</label>
            <Field name="firstName" type="text" />
            <ErrorMessage name="firstName" />

            <label htmlFor='lastName'>Last Name:</label>
            <Field name="lastName" type="text"/>
            <ErrorMessage name="lastName" />

            {/* <label htmlFor='birthday'>Birthday:</label>
            <Field name="birthday" type="date" />
            <ErrorMessage name="birthday" /> */}

            <button type="submit">Sign me up</button>
        </Form>
         )}
      </Formik>
  </div>
)
}

export default SignupForm;