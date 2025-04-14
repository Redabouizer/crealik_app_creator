"use client"

import { useState, useCallback, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { Input, Button, Typography } from "@material-tailwind/react"
import { verifyCodeAndResetPassword, verifyCodeAndSignIn } from "../../firebase/auth"

export function VerifyCode() {
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()
  const location = useLocation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [formErrors, setFormErrors] = useState({
    code: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoginMode, setIsLoginMode] = useState(false)

  // Get email from location state
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email)

      // Check if we're in login mode
      if (location.state?.isLoginMode) {
        setIsLoginMode(true)
        document.title = "Verify Login Code"
      } else {
        document.title = "Verify Reset Code"
      }
    } else {
      // If no email is provided, redirect to forgot password page
      navigate("/auth/forgot-password")
    }
  }, [location.state, navigate])

  // Validate form
  const validateForm = useCallback(() => {
    const errors = {}
    let formIsValid = true

    if (!code.trim()) {
      formIsValid = false
      errors.code = "Verification code is required"
    } else if (code.length !== 6 || !/^\d+$/.test(code)) {
      formIsValid = false
      errors.code = "Verification code must be 6 digits"
    }

    // Only validate password fields if not in login mode
    if (!isLoginMode) {
      if (!password) {
        formIsValid = false
        errors.password = "Password is required"
      } else if (password.length < 6) {
        formIsValid = false
        errors.password = "Password must be at least 6 characters"
      }

      if (password !== confirmPassword) {
        formIsValid = false
        errors.confirmPassword = "Passwords do not match"
      }
    }

    setFormErrors(errors)
    return formIsValid
  }, [code, password, confirmPassword, isLoginMode])

  // Handle input changes
  const handleInputChange = useCallback(
    (e, setter) => {
      const { name, value } = e.target
      setter(value)

      // Clear error when user types
      if (formErrors[name]) {
        setFormErrors((prev) => ({ ...prev, [name]: "" }))
      }
    },
    [formErrors],
  )

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setIsSubmitting(true)

      if (!validateForm()) {
        setIsSubmitting(false)
        return
      }

      try {
        if (isLoginMode) {
          // Login with verification code
          const { success, error, user } = await verifyCodeAndSignIn(email, code)

          if (error) {
            throw error
          }

          if (success) {
            await MySwal.fire({
              title: "Success!",
              text: "Your email has been verified successfully",
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            })

            // Redirect to sign-up page instead of home
            navigate("/auth/sign-up", {
              state: {
                verifiedEmail: email,
              },
            })
          }
        } else {
          // Reset password with verification code
          const { success, error } = await verifyCodeAndResetPassword(email, code, password)

          if (error) {
            throw error
          }

          if (success) {
            await MySwal.fire({
              title: "Success!",
              text: "Your password has been reset successfully",
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            })

            // Navigate to sign in page
            navigate("/auth/sign-in")
          }
        }
      } catch (error) {
        let errorMessage = isLoginMode
          ? "Failed to verify login code. Please try again."
          : "Failed to verify reset code. Please try again."

        if (error.message) {
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
    [email, code, password, validateForm, MySwal, navigate, isLoginMode],
  )

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" alt="Decorative background" />
      </div>

      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            {isLoginMode ? "Sign In with Code" : "Verify Code"}
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter the verification code sent to {email}
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Verification Code
            </Typography>
            <Input
              name="code"
              size="lg"
              placeholder="123456"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              value={code}
              onChange={(e) => handleInputChange(e, setCode)}
              error={!!formErrors.code}
            />
            {formErrors.code && (
              <Typography variant="small" color="red" className="-mt-3 font-medium">
                {formErrors.code}
              </Typography>
            )}

            {!isLoginMode && (
              <>
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  New Password
                </Typography>
                <Input
                  name="password"
                  type="password"
                  size="lg"
                  placeholder="********"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{ className: "before:content-none after:content-none" }}
                  value={password}
                  onChange={(e) => handleInputChange(e, setPassword)}
                  error={!!formErrors.password}
                />
                {formErrors.password && (
                  <Typography variant="small" color="red" className="-mt-3 font-medium">
                    {formErrors.password}
                  </Typography>
                )}

                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Confirm Password
                </Typography>
                <Input
                  name="confirmPassword"
                  type="password"
                  size="lg"
                  placeholder="********"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{ className: "before:content-none after:content-none" }}
                  value={confirmPassword}
                  onChange={(e) => handleInputChange(e, setConfirmPassword)}
                  error={!!formErrors.confirmPassword}
                />
                {formErrors.confirmPassword && (
                  <Typography variant="small" color="red" className="-mt-3 font-medium">
                    {formErrors.confirmPassword}
                  </Typography>
                )}
              </>
            )}
          </div>

          <Button type="submit" className="mt-6" fullWidth disabled={isSubmitting}>
            {isSubmitting
              ? isLoginMode
                ? "Signing In..."
                : "Verifying..."
              : isLoginMode
                ? "Sign In"
                : "Reset Password"}
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Didn't receive the code?
            <Link to="/auth/forgot-password" state={{ isLoginMode }} className="text-gray-900 ml-1">
              Resend Code
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  )
}

export default VerifyCode
