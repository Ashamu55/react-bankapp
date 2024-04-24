import './styles/LoginForm.css';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const Sigin = () => {
    const navigate = useNavigate()
    const URL = "http://localhost:5000/student/login";

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        onSubmit: (values, { setValues }) => {
            if (values.email == "" || values.password == "") {
                console.log("fill invalid");
            }
            const errors = {};
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
                        if (response.data && response.data.user) {
                            console.log("User login successfully");
                            toast.success("login successfully")
                            let token = response.data.token
                            localStorage.setItem("token", token)
                            console.log(token);
                            navigate("/dashboard")
                            setValues({
                                ...values,
                                email: "",
                                password: ""
                            });
                        } else {
                            console.log("User not found");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        toast.error("login error");
                    });
                    
                    formik.setFieldValue('email', '');
                    formik.setFieldValue('password', '');
            }
        },
    });

    return (
        <div className="web flex flex-nowrap justify-center mx-auto">
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        placeholder='Enter email'
                        id='email'
                        name='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label> {/* Change to lowercase "password" */}
                    <input
                        type="password" // Change input type to "password"
                        placeholder='Enter password'
                        id='password'
                        name='password' // Change to lowercase "password"
                        onChange={formik.handleChange}
                        value={formik.values.password} // Change to lowercase "password"
                    />
                </div>
                <button type="submit">LOGIN</button>
            </form>
        </div>
    )
}

export default Sigin