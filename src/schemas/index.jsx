import * as Yup from "yup"

const registerSchema = Yup.object ({
    name: Yup.string().min(3).max(25).matches(/^[A-Za-z]+([ ]?[A-Za-z]+)*$/,"Name should be alphabet !!").required("** Please Enter Name !!"),
    email: Yup.string().email().required("** Please Enter Email !!"),
    password: Yup.string().min(6).required("** Please Enter Password !!"),
    contactNo: Yup.string().matches(/^[0-9]{10}$/, "Contact No. must be a 10-digit No. !!").required("** Please Enter Contact Number !!"),
    gst: Yup.string().required("** GST IN is required to sell product !!")
})

export default registerSchema;