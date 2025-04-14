"use client"

import { useEffect, useState, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react"
import { registerWithEmailAndPassword, signInWithGoogle } from "../../firebase/auth"
import { auth } from "../../firebase/config"
import { onAuthStateChanged } from "firebase/auth"

export function SignUp() {
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    document.title = "Register"

    // Check if user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home", { replace: true })
      }
    })

    return () => unsubscribe()
  }, [navigate])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  const [termsChecked, setTermsChecked] = useState(false)

  // Memoized validation function
  const validateForm = useCallback(() => {
    const errors = {}
    let formIsValid = true

    if (!formData.name.trim()) {
      formIsValid = false
      errors.name = "Full name is required"
    }

    if (!formData.email.trim()) {
      formIsValid = false
      errors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      formIsValid = false
      errors.email = "Email is invalid"
    }

    if (!formData.password) {
      formIsValid = false
      errors.password = "Password is required"
    } else if (formData.password.length < 8) {
      formIsValid = false
      errors.password = "Password must be at least 8 characters"
    }

    if (!formData.password_confirmation) {
      formIsValid = false
      errors.password_confirmation = "Confirmation Password is required"
    } else if (formData.password !== formData.password_confirmation) {
      formIsValid = false
      errors.password_confirmation = "Passwords do not match"
    }

    if (!termsChecked) {
      formIsValid = false
      MySwal.fire({
        title: "Terms Required",
        text: "You must agree to the terms and conditions",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
      })
    }

    setFormErrors(errors)
    return formIsValid
  }, [formData, termsChecked, MySwal])

  // Optimized input handler
  const handleInputChange = useCallback(
    (event) => {
      const { name, value } = event.target
      setFormData((prev) => ({ ...prev, [name]: value }))

      // Clear error when user types
      if (formErrors[name]) {
        setFormErrors((prev) => ({ ...prev, [name]: "" }))
      }
    },
    [formErrors],
  )

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setIsSubmitting(true)
    try {
      const { user, error, isNewUser } = await signInWithGoogle()

      if (error) {
        throw error
      }

      if (user) {
        await MySwal.fire({
          title: "Success!",
          text: "Registered successfully with Google",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        })

        // If new user or profile not complete, redirect to complete profile page
        if (isNewUser) {
          navigate("/complete-profile", { replace: true })
        } else {
          navigate("/home", { replace: true })
        }
      }
    } catch (error) {
      MySwal.fire({
        title: "Failed!",
        text: error.message || "Google sign-in failed. Please try again.",
        icon: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Optimized registration handler
  const registerHandler = useCallback(
    async (e) => {
      e.preventDefault()
      setIsSubmitting(true)

      if (!validateForm()) {
        setIsSubmitting(false)
        return
      }

      try {
        const { user, error, isNewUser } = await registerWithEmailAndPassword(
          formData.name,
          formData.email,
          formData.password,
        )

        if (error) {
          throw error
        }

        if (user) {
          await MySwal.fire({
            title: "Success!",
            text: "Registered successfully",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          })

          // Redirect to profile completion page for new users
          if (isNewUser) {
            navigate("/complete-profile", { replace: true })
          } else {
            navigate("/auth/sign-in", { replace: true })
          }
        }
      } catch (error) {
        let errorMessage = "Registration failed. Please try again."

        if (error.code === "auth/email-already-in-use") {
          errorMessage = "Email is already in use. Please use a different email."
        } else if (error.code === "auth/weak-password") {
          errorMessage = "Password is too weak. Please use a stronger password."
        } else if (error.message) {
          errorMessage = error.message
        }

        MySwal.fire({
          title: "Failed!",
          text: errorMessage,
          icon: "error",
        })
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, validateForm, navigate, MySwal],
  )

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
          alt="Decorative background"
          loading="lazy"
        />
      </div>

      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Join Us Today
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your details to register.
          </Typography>
        </div>

        <form onSubmit={registerHandler} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            {/* Name Field */}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Full Name
            </Typography>
            <Input
              name="name"
              size="lg"
              placeholder="John Doe"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              value={formData.name}
              onChange={handleInputChange}
              error={!!formErrors.name}
            />
            {formErrors.name && (
              <Typography variant="small" color="red" className="-mt-3 font-medium">
                {formErrors.name}
              </Typography>
            )}

            {/* Email Field */}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Email
            </Typography>
            <Input
              name="email"
              type="email"
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              value={formData.email}
              onChange={handleInputChange}
              error={!!formErrors.email}
            />
            {formErrors.email && (
              <Typography variant="small" color="red" className="-mt-3 font-medium">
                {formErrors.email}
              </Typography>
            )}

            {/* Password Field */}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              name="password"
              type="password"
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              value={formData.password}
              onChange={handleInputChange}
              error={!!formErrors.password}
            />
            {formErrors.password && (
              <Typography variant="small" color="red" className="-mt-3 font-medium">
                {formErrors.password}
              </Typography>
            )}

            {/* Confirm Password Field */}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Confirm Password
            </Typography>
            <Input
              name="password_confirmation"
              type="password"
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              value={formData.password_confirmation}
              onChange={handleInputChange}
              error={!!formErrors.password_confirmation}
            />
            {formErrors.password_confirmation && (
              <Typography variant="small" color="red" className="-mt-3 font-medium">
                {formErrors.password_confirmation}
              </Typography>
            )}
          </div>

          {/* Terms Checkbox */}
          <Checkbox
            checked={termsChecked}
            onChange={() => setTermsChecked(!termsChecked)}
            label={
              <Typography variant="small" color="gray" className="flex items-center justify-start font-medium">
                I agree the&nbsp;
                <a href="#" className="font-normal text-black transition-colors hover:text-gray-900 underline">
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />

          {/* Submit Button */}
          <Button type="submit" className="mt-6" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>

          {/* Google Sign In Button */}
          <Button
            type="button"
            size="lg"
            color="white"
            className="flex items-center gap-2 justify-center shadow-md mt-4"
            fullWidth
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
          >
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1156_824)">
                <path
                  d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z"
                  fill="#4285F4"
                />
                <path
                  d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z"
                  fill="#34A853"
                />
                <path
                  d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z"
                  fill="#FBBC04"
                />
                <path
                  d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_1156_824">
                  <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                </clipPath>
              </defs>
            </svg>
            <span>Sign up with Google</span>
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  )
}

export default SignUp
