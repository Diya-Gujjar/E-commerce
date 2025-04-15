import React from 'react'
import { useFormik } from "formik"
import registerSchema from '../../schemas';
import WhyFlipkart from '../WhyFlipkart/WhyFlipkart';

const initialValues = { name: '', email: '', gst: '' }
function RegisterAdmin() {
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
        validationSchema: registerSchema,
        onSubmit: (values) => {
            const storedData = JSON.parse(localStorage.getItem('AdminRegistration'));
            const userArray = Array.isArray(storedData) ? storedData : [];
            userArray.push(values);
            localStorage.setItem("AdminRegistration", JSON.stringify(userArray));
            alert('Registration data saved in localStorage!');
            resetForm();
        },
    });

    const handleClear = () => {
        resetForm();
    };
    return (
        <div>
            <nav className="nav">
                <li className='logo'>
                    <img src="/logo192.png" alt="logo" />
                </li>
            </nav>
            <div className='admin-register-container'>
                <form onSubmit={handleSubmit}>
                    <div className='admin-input'>
                        <input placeholder='Enter Your Name'
                            name='name'
                            id='Name'
                            onChange={handleChange}
                            value={values.name}
                            onBlur={handleBlur}>
                        </input>
                        {errors.name && touched.name ?
                            (<p className="form-error">{errors.name}</p>) : null}
                    </div>
                    <div className='admin-input'>
                        <input placeholder='Enter Your Mobile Number'
                            name='contactNo'
                            id='MobileNo'
                            onChange={handleChange}
                            value={values.contactNo}
                            onBlur={handleBlur}>
                        </input>
                        {errors.contactNo && touched.contactNo ?
                            (<p className="form-error">{errors.contactNo}</p>) : null}
                    </div>
                    <div className='admin-input'>
                        <input placeholder='Email ID'
                            name='email'
                            id='emailID'
                            onChange={handleChange}
                            value={values.email}
                            onBlur={handleBlur}>
                        </input>
                        {errors.email && touched.email ?
                            (<p className="form-error">{errors.email}</p>) : null}
                    </div>
                    <div className='admin-input'>
                        <input placeholder='GST IN'
                            name='gst'
                            id='gst'
                            onChange={handleChange}
                            value={values.gst}
                            onBlur={handleBlur}>
                        </input>
                        {errors.gst && touched.gst ?
                            (<p className="form-error">{errors.gst}</p>) : null}
                    </div>
                    <div className='admin-input'>
                        <input placeholder='Create Strong Password'
                            name='password'
                            id='pswd'
                            onChange={handleChange}
                            value={values.gst}
                            onBlur={handleBlur}>
                        </input>
                        {errors.password && touched.password ?
                            (<p className="form-error">{errors.password}</p>) : null}
                    </div>
                    <button type='submit'>Register & Continue</button>
                    <button type="button" onClick={handleClear}>Clear Form</button>
                </form>
            </div>
            <WhyFlipkart/>
        </div>
    )
}

export default RegisterAdmin