import './styles/BankForm.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as yup from 'yup';

const Signup = () => {
  const navigate = useNavigate()
  let URL = "http://localhost:5000/student/register"
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },

    validationSchema: yup.object({
      firstName: yup
        .string()
        .required('first name required')
        .max(15, 'Must be 15 characters or less')
        .min(3, "Must be  3 characters or less"),
      lastName: yup
        .string()
        .required('last name required')
        .max(15, 'Must be 15 characters or less')
        .min(3, "Must be  3 characters or less"),
      email: yup
        .string().
        email('Invalid email address')
        .required('Required'),

      password: yup
        .string()
        .min(8, 'password must be at least 8 characters')
        .matches(/[A-Z]/, 'password must conatain at least one uppercase letter')
        .matches(/[a-z]/, 'password must conatain at least one lowercase letter')
        .matches(/[0-9]/, 'password must conatain at least one number')
        .matches(/[A-Za-z0-9]/, 'password must conatain at least one symbol')
        .required('password is required'),
    }),

    onSubmit: (values) => {
      if (values.firstName === "" || values.lastName === "" || values.email === "" || values.password === "") {
        console.log("Please enter");
      }
      const errors = {};
      if (!values.firstName) {
        errors.firstName = 'Required';
        console.log("Required");
      } else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less';
        console.log("Must be 15 characters or less");
      }
      if (!values.lastName) {
        errors.lastName = 'Required';
      } else if (values.lastName.length > 20) {
        errors.lastName = 'Must be 20 characters or less';
        console.log("Must be 20 characters or less");
      }
      if (!values.email) {
        errors.email = 'Required';
        console.log("Required");
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
        console.log("Invalid email address");
      }
      else {
        console.log(values);
        axios.post(URL, values)
          .then((response) => {
            console.log(response);
            console.log("User saved successfully");
            toast.success("User saved successfully");
            navigate("/sigin")
          })
          .catch((err) => {
            console.log(err);
            toast.error("This did not work");
          });
      }
    }
  });

  return (
    <>
    <div className="Ohoona flex flex-nowrap justify-center">
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          onBlur={formik.handleBlur}
          type="text"
          placeholder='Enter first name'
          id='firstName'
          name='firstName'
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className='text-red-500'>{formik.errors.firstName}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          onBlur={formik.handleBlur}
          type="text"
          placeholder='Enter last name'
          id='lastName'
          name='lastName'
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className='text-red-500'>{formik.errors.lastName}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          onBlur={formik.handleBlur}
          type="text"
          placeholder='Enter email'
          id='email'
          name='email'
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className='text-red-500'>{formik.errors.email}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          onBlur={formik.handleBlur}
          type="text"
          placeholder='Enter password'
          id='password'
          name='password'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className='text-red-500'>{formik.errors.password}</div>
        ) : null}
      </div>
      <button type="submit">SIGN UP</button>
    </form>
    </div>
    </>
  )
}

export default Signup