"use client"

import { useState, useCallback } from "react"
import { Input, Button, Typography, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export function ChangePasswordModal({ open, handleOpen, email }) {
  const MySwal = withReactContent(Swal)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [formErrors, setFormErrors] = useState({
    password: "",
    confirmPassword: "",
  })

  // Validate form
  const validateForm = useCallback(() => {
    const errors = {}
    let formIsValid = true

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

    setFormErrors(errors)
    return formIsValid
  }, [password, confirmPassword])

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
  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)

    if (!validateForm()) {
      setIsSubmitting(false)
      return
    }

    try {
      // Here you would call your API to change the password
      // For example: await changePassword(email, password);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      await MySwal.fire({
        title: "Success!",
        text: "Your password has been changed successfully",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      })

      // Close the modal and reset form
      handleOpen()
      setPassword("")
      setConfirmPassword("")
    } catch (error) {
      MySwal.fire({
        title: "Failed!",
        text: error.message || "Failed to change password. Please try again.",
        icon: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [password, validateForm, MySwal, handleOpen])

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Change Password</DialogHeader>
      <DialogBody>
        <div className="mb-1 flex flex-col gap-6">
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
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={handleOpen} className="mr-1" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button variant="gradient" color="green" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Changing..." : "Change Password"}
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default ChangePasswordModal
