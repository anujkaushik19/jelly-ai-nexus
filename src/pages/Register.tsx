<<<<<<< Updated upstream
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
=======
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../Firebase.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import RegisterNavbar from './RegisterNavbar.js';
>>>>>>> Stashed changes

const Register = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
<<<<<<< Updated upstream
    name: isLogin
      ? Yup.string()
      : Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
=======
    name: isLogin ? Yup.string() : Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
>>>>>>> Stashed changes
  });

  const handleSubmit = async (
    values: { name: string; email: string; password: string },
    { setSubmitting, setFieldError }: any
  ) => {
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;
<<<<<<< Updated upstream
        localStorage.setItem("token", await user.getIdToken());
        navigate("/dashboard");
=======
        localStorage.setItem('token', await user.getIdToken());
        navigate('/');
>>>>>>> Stashed changes
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;
<<<<<<< Updated upstream
        localStorage.setItem("token", await user.getIdToken());
        navigate("/dashboard");
      }
    } catch (error: any) {
      if (isLogin) {
        if (error.code === "auth/user-not-found") {
          alert("Unregistered user. Please sign up.");
        } else if (error.code === "auth/wrong-password") {
          alert("Wrong credentials. Please try again.");
=======
        localStorage.setItem('token', await user.getIdToken());
        navigate('/');
      }
    } catch (error: any) {
      if (isLogin) {
        if (error.code === 'auth/user-not-found') {
          alert('Unregistered user. Please sign up.');
        } else if (error.code === 'auth/wrong-password') {
          alert('Wrong credentials. Please try again.');
>>>>>>> Stashed changes
        } else {
          alert(error.message);
        }
      } else {
<<<<<<< Updated upstream
        if (error.code === "auth/email-already-in-use") {
          setFieldError("email", "Email is already in use");
        } else {
          setFieldError("email", error.message);
=======
        if (error.code === 'auth/email-already-in-use') {
          setFieldError('email', 'Email is already in use');
        } else {
          setFieldError('email', error.message);
>>>>>>> Stashed changes
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
<<<<<<< Updated upstream
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {isLogin ? "Login to your Account" : "Create an Account"}
        </h2>
        <p className="text-sm text-center text-gray-500 mt-2">
          {isLogin ? "Welcome back!" : "Start using the dashboard today"}
        </p>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
=======
    <div className="min-h-screen flex flex-col items-center  bg-gray-50 px-4">
      <RegisterNavbar />

      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8  mt-[15rem]">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {isLogin ? 'Login to your Account' : 'Create an Account'}
        </h2>
        <p className="text-sm text-center text-gray-500 mt-2">
          {isLogin
            ? 'Welcome back!'
            : 'Integrate our intelligence to your docs.'}
        </p>

        <Formik
          initialValues={{ name: '', email: '', password: '' }}
>>>>>>> Stashed changes
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5 mt-6">
              {!isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <Field
                    name="name"
                    type="text"
<<<<<<< Updated upstream
                    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
                    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none "
>>>>>>> Stashed changes
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
<<<<<<< Updated upstream
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none "
>>>>>>> Stashed changes
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
<<<<<<< Updated upstream
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
>>>>>>> Stashed changes
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
              >
                {isSubmitting
                  ? isLogin
<<<<<<< Updated upstream
                    ? "Logging in..."
                    : "Registering..."
                  : isLogin
                  ? "Login"
                  : "Register"}
              </button>

              <p className="text-sm text-center text-gray-500">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
=======
                    ? 'Logging in...'
                    : 'Registering...'
                  : isLogin
                  ? 'Login'
                  : 'Register'}
              </button>

              <p className="text-sm text-center text-gray-500">
                {isLogin
                  ? "Don't have an account?"
                  : 'Already have an account?'}{' '}
>>>>>>> Stashed changes
                <span
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={() => setIsLogin(!isLogin)}
                >
<<<<<<< Updated upstream
                  {isLogin ? "Register" : "Log in"}
=======
                  {isLogin ? 'Register' : 'Log in'}
>>>>>>> Stashed changes
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
