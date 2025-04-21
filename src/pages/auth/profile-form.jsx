"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { Input, Button, Typography, Card, CardBody, CardFooter } from "@material-tailwind/react"
import { updateUserProfile } from "../../firebase/auth"
import { getUserData } from "../../services/firebase-service"
import { auth } from "../../firebase/config"

export default function ProfileForm({ isNewUser = false, onComplete }) {
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    location: "",
  })

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser
      if (!user) {
        navigate("/auth/sign-in")
        return
      }

      // Try to load existing data
      setIsLoading(true)
      const { success, data } = await getUserData(user.uid)
      if (success && data) {
        // Pre-fill the form with existing data
        setUserData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          location: data.location || "",
        })
      } else if (user.displayName) {
        // For users with a display name (like from Google), try to split it
        const nameParts = user.displayName.split(" ")
        setUserData((prev) => ({
          ...prev,
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "",
          phoneNumber: user.phoneNumber || "",
        }))
      }
      setIsLoading(false)
    }

    fetchUserData()
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const user = auth.currentUser
      if (!user) {
        throw new Error("User not authenticated")
      }

      // Validate required fields
      if (!userData.firstName || !userData.lastName) {
        throw new Error("First name and last name are required")
      }

      // Update the user profile in Firestore
      const { success, error } = await updateUserProfile(user.uid, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        location: userData.location,
        displayName: `${userData.firstName} ${userData.lastName}`,
      })

      if (!success) {
        throw error || new Error("Failed to update profile")
      }

      await MySwal.fire({
        title: "Success!",
        text: "Your profile has been updated successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      })

      // Call onComplete callback if provided
      if (onComplete && typeof onComplete === "function") {
        onComplete()
      } else {
        // Redirect to home or dashboard
        navigate("/home")
      }
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: error.message || "Failed to update profile",
        icon: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardBody>
        <Typography variant="h4" color="blue-gray" className="mb-4">
          {isNewUser ? "Complete Your Profile" : "Update Your Profile"}
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                First Name
              </Typography>
              <Input
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                placeholder="John"
                required
              />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Last Name
              </Typography>
              <Input
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
              Phone Number
            </Typography>
            <Input
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
              Address
            </Typography>
            <Input
              name="address"
              value={userData.address}
              onChange={handleInputChange}
              placeholder="123 Main St, Apt 4B"
            />
          </div>

          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
              Location
            </Typography>
            <Input name="location" value={userData.location} onChange={handleInputChange} placeholder="New York, NY" />
          </div>
        </form>
      </CardBody>

      <CardFooter className="pt-0">
        <Button onClick={handleSubmit} fullWidth disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Profile"}
        </Button>

        {isNewUser && (
          <Typography variant="small" className="mt-4 text-center text-blue-gray-500">
            You can update this information later from your profile settings.
          </Typography>
        )}
      </CardFooter>
    </Card>
  )
}
