import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  Timestamp,
} from "firebase/firestore"
import app from "./config"

// Initialize Firestore
const db = getFirestore(app)

/**
 * Save user data to Firestore
 * @param {string} userId - The user's ID
 * @param {object} userData - The user data to save
 * @returns {Promise<object>} - Result of the operation
 */
export const saveUserData = async (userId, userData) => {
  try {
    // Reference to the user document
    const userRef = doc(db, "users", userId)

    // Check if the user document already exists
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      // Update existing user document
      await updateDoc(userRef, {
        ...userData,
        updatedAt: new Date(),
      })
      return { success: true, message: "User data updated successfully" }
    } else {
      // Create new user document
      await setDoc(userRef, {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return { success: true, message: "User data saved successfully" }
    }
  } catch (error) {
    console.error("Error saving user data:", error)
    return { success: false, error }
  }
}

/**
 * Get user data from Firestore
 * @param {string} userId - The user's ID
 * @returns {Promise<object>} - The user data
 */
export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() }
    } else {
      return { success: false, message: "User not found" }
    }
  } catch (error) {
    console.error("Error getting user data:", error)
    return { success: false, error }
  }
}

/**
 * Get user by email from Firestore
 * @param {string} email - The user's email
 * @returns {Promise<object>} - The user data
 */
export const getUserByEmail = async (email) => {
  try {
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("email", "==", email))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      // Return the first matching user
      const userDoc = querySnapshot.docs[0]
      return {
        success: true,
        data: { ...userDoc.data(), id: userDoc.id },
      }
    } else {
      return { success: false, message: "User not found" }
    }
  } catch (error) {
    console.error("Error getting user by email:", error)
    return { success: false, error }
  }
}

/**
 * Check if user profile is complete
 * @param {string} userId - The user's ID
 * @returns {Promise<boolean>} - Whether the profile is complete
 */
export const isProfileComplete = async (userId) => {
  try {
    const { success, data } = await getUserData(userId)

    if (!success || !data) return false

    // Check if all required fields are present
    return !!(data.firstName && data.lastName && data.phoneNumber && data.address && data.location)
  } catch (error) {
    console.error("Error checking profile completion:", error)
    return false
  }
}

/**
 * Save verification code to Firestore
 * @param {string} email - User's email
 * @param {string} code - Verification code
 * @returns {Promise<object>} - Result of the operation
 */
export const saveVerificationCode = async (email, code) => {
  try {
    // Delete any existing verification codes for this email
    await deleteExistingCodes(email)

    // Create a new verification code document
    const verificationRef = collection(db, "verificationCodes")

    // Set expiration time to 15 minutes from now
    const expiresAt = Timestamp.fromDate(new Date(Date.now() + 15 * 60 * 1000))

    await addDoc(verificationRef, {
      email,
      code,
      createdAt: Timestamp.now(),
      expiresAt,
      used: false,
    })

    return { success: true }
  } catch (error) {
    console.error("Error saving verification code:", error)
    return { success: false, error }
  }
}

/**
 * Delete existing verification codes for an email
 * @param {string} email - User's email
 * @returns {Promise<void>}
 */
const deleteExistingCodes = async (email) => {
  try {
    const codesRef = collection(db, "verificationCodes")
    const q = query(codesRef, where("email", "==", email))
    const querySnapshot = await getDocs(q)

    const deletePromises = []
    querySnapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref))
    })

    await Promise.all(deletePromises)
  } catch (error) {
    console.error("Error deleting existing codes:", error)
  }
}

/**
 * Verify a code for a given email
 * @param {string} email - User's email
 * @param {string} code - Verification code to verify
 * @returns {Promise<object>} - Result of verification
 */
export const verifyCode = async (email, code) => {
  try {
    const codesRef = collection(db, "verificationCodes")
    const q = query(codesRef, where("email", "==", email), where("code", "==", code), where("used", "==", false))

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return { success: true, valid: false, message: "Invalid code" }
    }

    let validCode = false
    let codeDoc = null

    // Check if any of the codes are still valid (not expired)
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      const expiresAt = data.expiresAt.toDate()

      if (expiresAt > new Date()) {
        validCode = true
        codeDoc = doc
      }
    })

    if (!validCode) {
      return { success: true, valid: false, message: "Code has expired" }
    }

    // Mark the code as used
    await updateDoc(codeDoc.ref, { used: true })

    return { success: true, valid: true }
  } catch (error) {
    console.error("Error verifying code:", error)
    return { success: false, error }
  }
}
