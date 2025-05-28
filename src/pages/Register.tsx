
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../Firebase.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, LogIn, UserPlus, User, Mail, Lock, Sparkles, Shield, Zap } from 'lucide-react';

import RegisterNavbar from './RegisterNavbar.js';
import Footer from '../components/Footer.tsx';

const Register = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: isLogin ? Yup.string() : Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
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
        localStorage.setItem('token', await user.getIdToken());
        navigate('/');
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;
        localStorage.setItem('token', await user.getIdToken());
        navigate('/');
      }
    } catch (error: any) {
      if (isLogin) {
        if (error.code === 'auth/user-not-found') {
          setFieldError('email', 'No account found with this email');
        } else if (error.code === 'auth/wrong-password') {
          setFieldError('password', 'Incorrect password');
        } else if (error.code === 'auth/invalid-credential') {
          setFieldError('email', 'Invalid email or password');
        } else {
          setFieldError('email', 'Login failed. Please try again.');
        }
      } else {
        if (error.code === 'auth/email-already-in-use') {
          setFieldError('email', 'Email is already in use');
        } else {
          setFieldError('email', error.message);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#13294B]/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-500/10 to-[#13294B]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-indigo-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <RegisterNavbar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-32">
        <div className="w-full max-w-md relative">
          {/* Logo and Branding with Animation */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#13294B] to-[#1e3a5f] mb-6 shadow-2xl animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-[#13294B] mb-3 bg-gradient-to-r from-[#13294B] to-[#1e3a5f] bg-clip-text text-transparent">
              JELLY Doc-AI
            </h1>
            <p className="text-gray-600 text-lg">Intelligent Document Processing</p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-3 gap-4 mb-8 animate-fade-in delay-200">
            <div className="text-center p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/70 transition-all duration-300 hover:scale-105">
              <Shield className="w-6 h-6 text-[#13294B] mx-auto mb-2" />
              <p className="text-xs text-gray-600">Secure</p>
            </div>
            <div className="text-center p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/70 transition-all duration-300 hover:scale-105">
              <Zap className="w-6 h-6 text-[#13294B] mx-auto mb-2" />
              <p className="text-xs text-gray-600">Fast</p>
            </div>
            <div className="text-center p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/70 transition-all duration-300 hover:scale-105">
              <Sparkles className="w-6 h-6 text-[#13294B] mx-auto mb-2" />
              <p className="text-xs text-gray-600">Smart</p>
            </div>
          </div>

          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-lg animate-scale-in delay-300">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-[#13294B] flex items-center justify-center gap-2">
                {isLogin ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
                {isLogin ? 'Welcome Back' : 'Join the Future'}
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                {isLogin
                  ? 'Access your intelligent document dashboard'
                  : 'Transform how you process documents with AI'}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values, handleChange, handleBlur }) => (
                  <Form className="space-y-6">
                    {!isLogin && (
                      <div className="space-y-2 animate-slide-in-right">
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <User className="w-4 h-4 text-[#13294B]" />
                          Full Name
                        </Label>
                        <Field
                          name="name"
                          type="text"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13294B] focus:border-transparent transition-all duration-300 bg-white hover:border-[#13294B]/50 transform hover:scale-[1.02]"
                          placeholder="Enter your full name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-sm mt-1 animate-fade-in"
                        />
                      </div>
                    )}

                    <div className="space-y-2 animate-slide-in-right delay-100">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#13294B]" />
                        Email Address
                      </Label>
                      <Field
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13294B] focus:border-transparent transition-all duration-300 bg-white hover:border-[#13294B]/50 transform hover:scale-[1.02]"
                        placeholder="Enter your email address"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1 animate-fade-in"
                      />
                    </div>

                    <div className="space-y-2 animate-slide-in-right delay-200">
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-[#13294B]" />
                        Password
                      </Label>
                      <div className="relative">
                        <Field
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13294B] focus:border-transparent transition-all duration-300 bg-white hover:border-[#13294B]/50 transform hover:scale-[1.02]"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#13294B] transition-all duration-200 hover:scale-110"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm mt-1 animate-fade-in"
                      />
                    </div>

                    {isLogin && (
                      <div className="flex items-center justify-between animate-fade-in">
                        <div className="flex items-center">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-[#13294B] focus:ring-[#13294B] border-gray-300 rounded transition-all duration-200"
                          />
                          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                            Remember me
                          </label>
                        </div>
                        <button
                          type="button"
                          className="text-sm text-[#13294B] hover:text-[#1e3a5f] font-medium hover:underline transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#13294B] to-[#1e3a5f] hover:from-[#1e3a5f] hover:to-[#13294B] text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-50 shadow-lg hover:shadow-xl animate-fade-in delay-300"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {isLogin ? 'Signing in...' : 'Creating account...'}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                          {isLogin ? 'Sign In' : 'Create Account'}
                        </div>
                      )}
                    </Button>

                    <div className="text-center pt-4 border-t border-gray-200 animate-fade-in delay-400">
                      <p className="text-sm text-gray-600">
                        {isLogin
                          ? "Don't have an account?"
                          : 'Already have an account?'}{' '}
                        <span
                          className="text-[#13294B] hover:text-[#1e3a5f] font-medium hover:underline cursor-pointer transition-all duration-200 hover:scale-105 inline-block"
                          onClick={() => setIsLogin(!isLogin)}
                        >
                          {isLogin ? 'Create account' : 'Sign in'}
                        </span>
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
         
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
