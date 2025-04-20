"use client"

import { useState, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { Input, Button, Typography } from "@material-tailwind/react"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../firebase/config"
import { getUserByEmail } from "../../firebase/firestore"

export function ForgotPassword() {
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")

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

  // Verify email exists in database
  const verifyEmailExists = useCallback(async () => {
    try {
      const { success, data } = await getUserByEmail(email)
      return success && data
    } catch (error) {
      console.error("Error verifying email:", error)
      return false
    }
  }, [email])

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setIsSubmitting(true)

      if (!validateEmail()) {
        setIsSubmitting(false)
        return
      }

      // Check if email exists in database
      const emailExists = await verifyEmailExists()
      if (!emailExists) {
        MySwal.fire({
          title: "Email Not Found",
          text: "This email address is not registered in our system.",
          icon: "error",
        })
        setIsSubmitting(false)
        return
      }

      try {
        // Send password reset email using Firebase
        await sendPasswordResetEmail(auth, email)

        await MySwal.fire({
          title: "Reset Link Sent!",
          text: "A password reset link has been sent to your email. Please check your inbox and follow the instructions to reset your password.",
          icon: "success",
        })

        // Navigate back to sign in page
        navigate("/auth/sign-in")
      } catch (error) {
        let errorMessage = "Failed to send password reset link. Please try again."

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
    [email, validateEmail, verifyEmailExists, MySwal, navigate],
  )

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" alt="Decorative background" />
      </div>

      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Forgot Password
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your email and we'll send you a link to reset your password
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
            {isSubmitting ? "Sending..." : "Send Reset Link"}
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
