import React, { useState } from 'react'
import "../App.css"
import { useFormik } from "formik"
import SignIn from './SignIn';

// function Register() {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [contactNo, setContactNo] = useState();
//     const [password, setPassword] = useState("");
//     const handleSubmit = () => {
//         console.log("Form Submitted");
//         console.log(`Name: ${name}, Email: ${email}, Contact No: ${contactNo}, password: ${password}`)
//     }
//   return (
//     <div>
//       <h3>Registration Form</h3>
//         <form onSubmit={handleSubmit} >
//             <div className='form-container'>
//             <div className='input-lbl'>
//             <label htmlFor='name'>Enter your Name</label>
//             <input name='name'
//             id='name'
//             type='name'
//             value={name}
//             onChange={(e) => setName(e.target.value)}/>
//             </div>
//             <div className='input-lbl'>
//             <label htmlFor='email'>Enter your Email</label>
//             <input name='email'
//             id='email'
//             type='email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}/>
//             </div>
//             <div className='input-lbl'>
//             <label htmlFor='contactNo'>Enter your Contact Number</label>
//             <input name='contactNo'
//             id='contactNo'
//             type='contactNo'
//             value={contactNo}
//             onChange={(e) => setContactNo(e.target.value)}/>
//             </div>
//             <div className='input-lbl'>
//             <label htmlFor='password'>Enter your Password</label>
//             <input name='password'
//             id='password'
//             type='password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}/>
//             </div>
//             <button type='Submit'>Submit</button>
//             </div>
//         </form>
//     </div>
//   )
// }

 // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [contactNo, setContactNo] = useState();
  // const [password, setPassword] = useState("");


const initialValues = { name: '', email: '', password: '', contactNo: '' }
function Register() {
 const [isRegistered, setIsRegistered] = useState(false);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm
  } = useFormik({
    initialValues: initialValues,
    // validationSchema: registerSchema,
    onSubmit: (values) => {
      const storedData = JSON.parse(localStorage.getItem('userRegistration'));
      const userArray = Array.isArray(storedData) ? storedData : [];
      userArray.push(values);
      localStorage.setItem("userRegistration", JSON.stringify(userArray));
      alert('Registration data saved in localStorage!');
      setIsRegistered(true);
      console.log("Sign In")
    },
  });

  const handleClear = () => {
    resetForm();
  };

  return (
    <div>
      <div><h1>New User! Register Your Self</h1></div>
      <form onSubmit={handleSubmit}>
        <div className='form-container'>
          <div className='input-lbl'>
            <label htmlFor='name'>Name:</label>
            <input
              placeholder="Enter your Name"
              name='name'
              id='name'
              onChange={handleChange}
              value={values.name}
              onBlur={handleBlur}>
            </input>
            {errors.name && touched.name ?
              (<p className="form-error">{errors.name}</p>) : null}
          </div>

          <div className='input-lbl'>
            <label htmlFor='email'>Email:</label>
            <input
              placeholder="Enter your Email"
              name='email'
              id='email'
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}>
            </input>
            {errors.email && touched.email ?
              (<p className="form-error">{errors.email}</p>) : null}
          </div>

          <div className='input-lbl'>
            <label htmlFor='contactNo'>Contact Number:</label>
            <input
              placeholder="Enter your Email"
              name='contactNo'
              id='contactNo'
              type='contactNo'
              value={values.contactNo}
              onChange={handleChange} />
          </div>

          <div className='input-lbl'>
            <label htmlFor='password'>Password:</label>
            <input
              placeholder="Enter your Password"
              name='password'
              id='password'
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}>
            </input>
            {errors.password && touched.password ?
              (<p className="form-error">{errors.password}</p>) : null}
          </div>

          <div>
            <button type='submit'>Register</button>
            <button type="button" onClick={handleClear}>Clear Form</button>
          </div>

          <div>Already a User <a href="/signin" className='clk-lnk' >SignIn</a> </div>
        </div>
      </form>
     { <div>
        {isRegistered} ? <SignIn/> 
      </div> }
    </div>
  )
}

export default Register