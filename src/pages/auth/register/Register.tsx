import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/reduxHooks";
import { UserSignUpInterface } from "../../../interfaces/AuthInterface";
import toast from "react-hot-toast";
import { setUser } from "../../../app/slices/authSlice";
import { TextField } from "@mui/material";
import "./Register.scss";
//@ts-ignore
import registerWelcomeImg from "../../../assets/common/chat_img_compressed.jpg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { registerApi } from "../../../api/auth";
import * as Yup from "yup";
import { verifyInviteApi } from "../../../api/auth";


export const registerValidation = Yup.object().shape({
  name: Yup.object().shape({
    first: Yup.string().required("Please enter first name"),
    last: Yup.string().required("Please enter last name"),
  }),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required(
      "Please valid password. One uppercase, one lowercase, one special character and no spaces"
    ),
  confirmPassword: Yup.string()
    .required("Required")
    .test("password-match", "Password must match", function (value) {
      return this.parent.password === value;
    }),
});



const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.userState);
  const { isLoggedIn, error } = userState;
  const [prefilledData, setPreFilledData] = useState({ email: "", role: "" })

  useEffect(() => {
    // if (isLoggedIn) {
    //   navigate(`/${RouteEndPoint.HOME}`);
    //   toast.success("Welcome to chat bot!");
    // }
  }, [isLoggedIn]);

  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get("inviteToken");
  const handleInviteVerification = async () => {
    const respData = await verifyInviteApi({ inviteToken });
    if (respData) {
      const { email, role } = respData;
      setPreFilledData({ email, role })
    }
  }
  useEffect(() => {
    if (inviteToken?.length) {
      handleInviteVerification();
    }
  }, [inviteToken])


  const initialValues = {
    email: prefilledData.email,
    name: {
      first: "",
      last: "",
    },
    password: "",
    confirmPassword: "",
  };

  useEffect(() => {
    initialValues.email = prefilledData.email
  }, [prefilledData])
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values: UserSignUpInterface, actions: any) => {
    values = { ...values, ...prefilledData }
    const registeredUser = await registerApi({ newUser: values });
    if (registeredUser) {
      dispatch(setUser(registeredUser))
      toast("Registration successful!")
      navigate("/home")
    }
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 500);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: registerValidation,
  });

  return (
    <div id="register">
      {prefilledData.email ?

        <div className="container">
          <div className="welcome-img">
            <h1> Welcome - Register here 🖋 </h1>
            <img src={registerWelcomeImg} alt="welcome" />
          </div>

          <div className="registerForm">
            <h2>{"CREATE AN ACCOUNT"}</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="registerFullName">
                <div className="registerInput">
                  <h3>First Name</h3>
                  <TextField
                    type="text"
                    className="inputStyle"
                    onBlur={formik.handleBlur}
                    name="name.first"
                    value={formik.values.name?.first}
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched.name?.first && formik.touched.name?.first
                        ? formik.errors.name?.first
                        : null
                    }
                    error={
                      formik.touched.name?.first && formik.errors.name?.first
                        ? true
                        : false
                    }
                  />
                </div>
                <div className="registerInput">
                  <h3>Last Name</h3>
                  <TextField
                    type="text"
                    className="inputStyle"
                    onBlur={formik.handleBlur}
                    name="name.last"
                    value={formik.values.name.last}
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched.name?.last && formik.touched.name?.last
                        ? formik.errors.name?.last
                        : null
                    }
                    error={
                      formik.touched.name?.last && formik.errors.name?.last
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
              <div className="registerInput">
                <h3>Email</h3>
                <TextField
                  type="email"
                  name="email"
                  value={prefilledData.email}
                  disabled
                  className="inputStyle"
                />
              </div>
              <div className="registerInput">
                <TextField
                  type="text"
                  name="role"
                  value={"Your role: " + prefilledData.role}
                  disabled
                  className="inputStyle"
                />
              </div>

              <div className="registerInput">
                <div className="passwordHeadFunction">

                  <h3>Password</h3>
                  <p className="iconText" onClick={togglePasswordVisibility}>
                    {showPassword ?
                      <>
                        <AiFillEyeInvisible />
                        Hide
                      </>
                      : <>
                        <AiFillEye />
                        Show
                      </>}
                  </p>
                </div>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  onBlur={formik.handleBlur}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="inputStyle"
                  helperText={
                    formik.touched.password && formik.errors.password
                      ? formik.errors.password
                      : null
                  }
                  error={
                    formik.touched.password && formik.errors.password
                      ? true
                      : false
                  }
                />
              </div>

              <div className="registerInput">

                <h3>Confirm Password</h3>
                <TextField
                  type="password"
                  onBlur={formik.handleBlur}
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  className="inputStyle"
                  helperText={
                    formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                      ? formik.errors.confirmPassword
                      : null
                  }
                  error={
                    formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                      ? true
                      : false
                  }
                />
              </div>
              {error && <h4 className="errorText">{error}</h4>}
              <div className="registerButton">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="register-button"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="click-register">
              Already have an account?
              <Link to="/">Login</Link>
            </p>

          </div>
        </div>
        : <h1> Invalid Invite Link, <br/>
            {" -->>"}request Admin for invite link
        </h1>
      }
    </div>
  );
};

export default Register;