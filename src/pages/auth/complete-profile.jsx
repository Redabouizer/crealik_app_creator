"use client"

import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Typography } from "@material-tailwind/react"
import ProfileForm from "./profile-form"
import { auth } from "../../firebase/config"
import { onAuthStateChanged } from "firebase/auth"

export function CompleteProfile() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "Complete Your Profile"

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Not logged in, redirect to sign in
        navigate("/auth/sign-in", { replace: true })
        return
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [navigate, location])

  const handleProfileComplete = () => {
    navigate("/home", { replace: true })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h6">Loading...</Typography>
      </div>
    )
  }

  return (
    <section className="py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Typography variant="h2" className="font-bold">
            Complete Your Profile
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="mt-2">
            Please provide the following information to complete your account setup.
          </Typography>
        </div>

        <ProfileForm isNewUser={true} onComplete={handleProfileComplete} />
      </div>
    </section>
  )
}

export default CompleteProfile
