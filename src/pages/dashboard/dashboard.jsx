"use client"

import { useState, useEffect } from "react"
import { Button, Typography } from "@material-tailwind/react"
import { ChangePasswordModal } from "./change-password-modal"
import { auth } from "../../firebase/config"
import { validateSession } from "../../firebase/auth"

export function Dashboard() {
  const [user, setUser] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    // Get current user
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // Validate session in addition to auth state
        if (validateSession()) {
          setUser(currentUser)
        } else {
          // Session expired, redirect to login
          localStorage.removeItem("token")
          localStorage.removeItem("userData")
          sessionStorage.clear()
          window.location.href = "/auth/sign-in"
        }
      } else {
        // Redirect to login if no user
        window.location.href = "/auth/sign-in"
      }
    })

    return () => unsubscribe()
  }, [])

  const handleOpenModal = () => setOpenModal(!openModal)

  // Show change password prompt when user first arrives after verification
  useEffect(() => {
    const hasJustVerified = sessionStorage.getItem("justVerified")

    if (hasJustVerified === "true" && user) {
      // Clear the flag
      sessionStorage.removeItem("justVerified")

      // Show the modal
      setOpenModal(true)
    }
  }, [user])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <Typography variant="h4" className="mb-4">
          Welcome to your Dashboard
        </Typography>

        <div className="mb-6">
          <Typography variant="h6">Account Information</Typography>
          <div className="mt-2">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Name:</strong> {user.displayName || "Not set"}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={handleOpenModal}>Change Password</Button>
        </div>
      </div>

      <ChangePasswordModal open={openModal} handleOpen={handleOpenModal} email={user?.email} />
    </div>
  )
}

export default Dashboard
