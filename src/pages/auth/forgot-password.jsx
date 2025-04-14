"use client"

import { useState, useCallback, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { Input, Button, Typography } from "@material-tailwind/react"
import { sendVerificationCode, sendLoginVerificationCode } from "../../firebase/auth"

export function ForgotPassword() {
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoginMode, setIsLoginMode] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")

  useEffect(() => {
    // Check if we're in login mode from the location state
    if (location.state?.isLoginMode) {
      setIsLoginMode(true)
      document.title = "Sign In with Email Code"
    } else {
      document.title = "Forgot Password"
    }
  }, [location.state])

  // Validate email
  const validateEmail = useCallback(() => {
    if (!email.trim()) {
      setEmailError("Email is required")
      return false
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Email is invalid")
      return false
    }
    setEmailError("")
    return true
  }, [email])

  // Handle email change
  const handleEmailChange = useCallback(
    (e) => {
      setEmail(e.target.value)
      if (emailError) {
        setEmailError("")
      }
    },
    [emailError],
  )

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setIsSubmitting(true)

      if (!validateEmail()) {
        setIsSubmitting(false)
        return
      }

      try {
        // Use different function based on mode
        const { success, error } = isLoginMode
          ? await sendLoginVerificationCode(email)
          : await sendVerificationCode(email)

        if (error) {
          throw error
        }

        if (success) {
          await MySwal.fire({
            title: "Code Sent!",
            text: "A verification code has been sent to your email",
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          })

          // Navigate to verification code page with email and mode
          navigate("/auth/verify-code", {
            state: {
              email,
              isLoginMode,
            },
          })
        }
      } catch (error) {
        let errorMessage = isLoginMode
          ? "Failed to send login code. Please try again."
          : "Failed to send verification code. Please try again."

        if (error.code === "auth/user-not-found") {
          errorMessage = "No user found with this email address."
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
    [email, validateEmail, MySwal, navigate, isLoginMode],
  )

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" alt="Decorative background" />
      </div>

      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            {isLoginMode ? "Sign In with Email Code" : "Forgot Password"}
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            {isLoginMode
              ? "Enter your email and we'll send you a verification code to sign in"
              : "Enter your email and we'll send you a verification code"}
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
            />
            {emailError && (
              <Typography variant="small" color="red" className="-mt-3 font-medium">
                {emailError}
              </Typography>
            )}
          </div>

          <Button type="submit" className="mt-6" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Verification Code"}
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Remember your password?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  )
}

export default ForgotPassword
