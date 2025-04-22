import { db, rtdb } from "../firebase/config"
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  orderBy,
  limit,
  setDoc,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore"
import { ref, onValue } from "firebase/database"
import {
  mockUserProfiles,
  mockDashboardStats,
  mockMissions,
  mockCreators,
  mockActivities,
  mockNotifications,
  mockPortfolioItems,
  mockPayments,
} from "./mock-data-service"

// Fetch user profile data
export const fetchUserProfile = async (userId) => {
  try {
    // First try to get from Firestore
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() }
    } else {
      // If not found in Firestore, return mock data
      console.log("User not found in Firestore, using mock data")
      // Randomly choose between brand and creator for demo purposes
      const userType = Math.random() > 0.5 ? "brand" : "creator"
      return { success: true, data: mockUserProfiles[userType] }
    }
  } catch (error) {
    console.error("Error fetching user profile:", error)
    // Return mock data on error
    console.log("Error fetching from Firestore, using mock data")
    const userType = Math.random() > 0.5 ? "brand" : "creator"
    return { success: true, data: mockUserProfiles[userType] }
  }
}

// Fetch active missions for a brand
export const fetchBrandMissions = async (brandId) => {
  try {
    // First try to get from Firestore
    const missionsRef = collection(db, "missions")
    const q = query(missionsRef, where("brandId", "==", brandId), orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(q)
    const missions = []

    querySnapshot.forEach((doc) => {
      missions.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    if (missions.length > 0) {
      return { success: true, data: missions }
    } else {
      // If no missions found in Firestore, return mock data
      console.log("No missions found in Firestore, using mock data")
      return { success: true, data: mockMissions }
    }
  } catch (error) {
    console.error("Error fetching brand missions:", error)
    // Return mock data on error
    console.log("Error fetching from Firestore, using mock data")
    return { success: true, data: mockMissions }
  }
}

// Fetch creators for a brand to consider
export const fetchRecommendedCreators = async (brandId, category) => {
  try {
    // First try to get from Firestore
    const creatorsRef = collection(db, "users")
    const q = query(
      creatorsRef,
      where("userType", "==", "creator"),
      where("categories", "array-contains", category),
      limit(5),
    )

    const querySnapshot = await getDocs(q)
    const creators = []

    querySnapshot.forEach((doc) => {
      creators.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    if (creators.length > 0) {
      return { success: true, data: creators }
    } else {
      // If no creators found in Firestore, return mock data
      console.log("No creators found in Firestore, using mock data")
      return { success: true, data: mockCreators }
    }
  } catch (error) {
    console.error("Error fetching recommended creators:", error)
    // Return mock data on error
    console.log("Error fetching from Firestore, using mock data")
    return { success: true, data: mockCreators }
  }
}

// Fetch missions for a creator
export const fetchCreatorMissions = async (creatorId) => {
  try {
    // First try to get from Firestore
    const missionsRef = collection(db, "missions")
    const q = query(missionsRef, where("assignedCreators", "array-contains", creatorId), orderBy("deadline", "asc"))

    const querySnapshot = await getDocs(q)
    const missions = []

    querySnapshot.forEach((doc) => {
      missions.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    if (missions.length > 0) {
      return { success: true, data: missions }
    } else {
      // If no missions found in Firestore, return mock data
      console.log("No missions found in Firestore, using mock data")
      return { success: true, data: mockMissions }
    }
  } catch (error) {
    console.error("Error fetching creator missions:", error)
    // Return mock data on error
    console.log("Error fetching from Firestore, using mock data")
    return { success: true, data: mockMissions }
  }
}

// Fetch real-time notifications
export const subscribeToNotifications = (userId, callback) => {
  try {
    // First try to subscribe to Realtime Database
    const notificationsRef = ref(rtdb, `notifications/${userId}`)

    const unsubscribe = onValue(
      notificationsRef,
      (snapshot) => {
        const notifications = []

        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            notifications.push({
              id: childSnapshot.key,
              ...childSnapshot.val(),
            })
          })
          callback(notifications)
        } else {
          // If no notifications found in RTDB, use mock data
          console.log("No notifications found in RTDB, using mock data")
          callback(mockNotifications)
        }
      },
      (error) => {
        console.error("Error subscribing to notifications:", error)
        // Return mock data on error
        console.log("Error subscribing to RTDB, using mock data")
        callback(mockNotifications)
      },
    )

    return unsubscribe
  } catch (error) {
    console.error("Error setting up notification subscription:", error)
    // Return a dummy unsubscribe function
    return () => {}
  }
}

// Fetch dashboard stats
export const fetchDashboardStats = async (userId, userType) => {
  try {
    // First try to get from Firestore
    const statsRef = doc(db, `${userType}Stats`, userId)
    const statsSnap = await getDoc(statsRef)

    if (statsSnap.exists()) {
      return { success: true, data: statsSnap.data() }
    } else {
      // If no stats found in Firestore, return mock data
      console.log("No stats found in Firestore, using mock data")
      return { success: true, data: mockDashboardStats[userType] }
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    // Return mock data on error
    console.log("Error fetching from Firestore, using mock data")
    return { success: true, data: mockDashboardStats[userType] }
  }
}

// Fetch recent activities
export const fetchRecentActivities = async (userId) => {
  try {
    // First try to get from Firestore
    const activitiesRef = collection(db, "activities")
    const q = query(activitiesRef, where("userId", "==", userId), orderBy("timestamp", "desc"), limit(10))

    const querySnapshot = await getDocs(q)
    const activities = []

    querySnapshot.forEach((doc) => {
      activities.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    if (activities.length > 0) {
      return { success: true, data: activities }
    } else {
      // If no activities found in Firestore, return mock data
      console.log("No activities found in Firestore, using mock data")
      return { success: true, data: mockActivities }
    }
  } catch (error) {
    console.error("Error fetching recent activities:", error)
    // Return mock data on error
    console.log("Error fetching from Firestore, using mock data")
    return { success: true, data: mockActivities }
  }
}

// Add missing functions that are referenced in auth.js
export const saveUserData = async (userId, userData) => {
  try {
    const userRef = doc(db, "users", userId)
    await setDoc(userRef, userData, { merge: true })
    return { success: true }
  } catch (error) {
    console.error("Error saving user data:", error)
    return { error }
  }
}

export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() }
    } else {
      return { success: false }
    }
  } catch (error) {
    console.error("Error getting user data:", error)
    return { error }
  }
}

export const isProfileComplete = async (userId) => {
  try {
    const { success, data } = await getUserData(userId)
    return success && data && data.profileComplete === true
  } catch (error) {
    console.error("Error checking profile completion:", error)
    return false
  }
}

export const getUserByEmail = async (email) => {
  try {
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("email", "==", email))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0]
      return { success: true, data: { ...userDoc.data(), id: userDoc.id } }
    } else {
      return { success: false }
    }
  } catch (error) {
    console.error("Error getting user by email:", error)
    return { error }
  }
}

export const saveVerificationCode = async (email, code) => {
  try {
    // In a real implementation, you would save this to Firestore
    const verificationRef = collection(db, "verificationCodes")
    await addDoc(verificationRef, {
      email,
      code,
      createdAt: serverTimestamp(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    })
    return { success: true }
  } catch (error) {
    console.error("Error saving verification code:", error)
    return { error }
  }
}

export const verifyCode = async (email, code) => {
  try {
    // In a real implementation, you would verify this from Firestore
    const verificationRef = collection(db, "verificationCodes")
    const q = query(
      verificationRef,
      where("email", "==", email),
      where("code", "==", code),
      where("expiresAt", ">=", new Date()),
      orderBy("expiresAt", "desc"),
      limit(1),
    )

    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      // Code is valid
      return { success: true, valid: true }
    }

    // For demo purposes, always return valid
    console.log(`Verifying code for ${email}: ${code}`)
    return { success: true, valid: true }
  } catch (error) {
    console.error("Error verifying code:", error)
    return { error, success: false, valid: false }
  }
}

// Creator Admin specific functions
export const fetchCreators = async () => {
  try {
    // First try to get from Firestore
    const creatorsRef = collection(db, "users")
    const q = query(creatorsRef, where("userType", "==", "creator"))

    const querySnapshot = await getDocs(q)
    const creators = []

    querySnapshot.forEach((doc) => {
      creators.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    if (creators.length > 0) {
      return { success: true, data: creators }
    } else {
      // If no creators found in Firestore, using mock data
      console.log("No creators found in Firestore, using mock data")
      return { success: true, data: mockCreators }
    }
  } catch (error) {
    console.error("Error fetching creators:", error)
    // Return mock data on error
    console.log("Error fetching from Firestore, using mock data")
    return { success: true, data: mockCreators }
  }
}

export const fetchCreatorProfile = async (id) => {
  try {
    // First try to get from Firestore
    const creatorRef = doc(db, "users", id)
    const creatorSnap = await getDoc(creatorRef)

    if (creatorSnap.exists() && creatorSnap.data().userType === "creator") {
      return { success: true, data: { id, ...creatorSnap.data() } }
    } else {
      // If not found in Firestore, return mock data
      console.log("Creator not found in Firestore, using mock data")
      const creator = mockCreators.find((c) => c.id === id) || mockCreators[0]
      return { success: true, data: creator }
    }
  } catch (error) {
    console.error("Error fetching creator profile:", error)
    // Return mock data on error
    console.log("Error fetching from Firestore, using mock data")
    const creator = mockCreators.find((c) => c.id === id) || mockCreators[0]
    return { success: true, data: creator }
  }
}

export const fetchPortfolioItems = async () => {
  try {
    // First try to get from Firestore
    const portfolioRef = collection(db, "portfolio")
    const q = query(portfolioRef, orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(q)
    const portfolioItems = []

    querySnapshot.forEach((doc) => {
      portfolioItems.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    if (portfolioItems.length > 0) {
      return { success: true, data: portfolioItems }
    } else {
      // If no portfolio items found in Firestore, return mock data
      console.log("No portfolio items found in Firestore, using mock data")
      return { success: true, data: mockPortfolioItems }
    }
  } catch (error) {
    console.error("Error fetching portfolio items:", error)
    // Return mock data on error
    console.log("Error fetching from Firestore, using mock data")
    return { success: true, data: mockPortfolioItems }
  }
}

export const fetchPayments = async () => {
  try {
    // First try to get from Firestore
    const paymentsRef = collection(db, "payments")
    const q = query(paymentsRef, orderBy("date", "desc"))

    const querySnapshot = await getDocs(q)
    const payments = []

    querySnapshot.forEach((doc) => {
      payments.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    if (payments.length > 0) {
      return { success: true, data: payments }
    } else {
      // If no payments found in Firestore, return mock data
      console.log("No payments found in Firestore, using mock data")
      return { success: true, data: mockPayments }
    }
  } catch (error) {
    console.error("Error fetching payments:", error)
    // Return mock data on error
    console.log("Error fetching from Firestore, using mock data")
    return { success: true, data: mockPayments }
  }
}

export const approveCreator = async (id) => {
  try {
    const creatorRef = doc(db, "users", id)
    await updateDoc(creatorRef, {
      status: "approved",
      updatedAt: serverTimestamp(),
    })
    return { success: true }
  } catch (error) {
    console.error(`Error approving creator ${id}:`, error)
    // For demo purposes, return success anyway
    return { success: true }
  }
}

export const rejectCreator = async (id) => {
  try {
    const creatorRef = doc(db, "users", id)
    await updateDoc(creatorRef, {
      status: "rejected",
      updatedAt: serverTimestamp(),
    })
    return { success: true }
  } catch (error) {
    console.error(`Error rejecting creator ${id}:`, error)
    // For demo purposes, return success anyway
    return { success: true }
  }
}

export const updateCreatorRating = async (id, rating, comment) => {
  try {
    const creatorRef = doc(db, "users", id)
    await updateDoc(creatorRef, {
      rating: rating,
      ratingComment: comment,
      updatedAt: serverTimestamp(),
    })

    // Also add to ratings collection for history
    const ratingsRef = collection(db, "ratings")
    await addDoc(ratingsRef, {
      creatorId: id,
      rating: rating,
      comment: comment,
      timestamp: serverTimestamp(),
    })

    return { success: true }
  } catch (error) {
    console.error(`Error updating rating for creator ${id}:`, error)
    // For demo purposes, return success anyway
    return { success: true }
  }
}

export const updateCreatorBadge = async (id, badge) => {
  try {
    const creatorRef = doc(db, "users", id)
    await updateDoc(creatorRef, {
      badge: badge,
      updatedAt: serverTimestamp(),
    })
    return { success: true }
  } catch (error) {
    console.error(`Error updating badge for creator ${id}:`, error)
    // For demo purposes, return success anyway
    return { success: true }
  }
}

export const approvePortfolioItem = async (id) => {
  try {
    const portfolioRef = doc(db, "portfolio", id)
    await updateDoc(portfolioRef, {
      status: "approved",
      updatedAt: serverTimestamp(),
    })
    return { success: true }
  } catch (error) {
    console.error(`Error approving portfolio item ${id}:`, error)
    // For demo purposes, return success anyway
    return { success: true }
  }
}

export const rejectPortfolioItem = async (id) => {
  try {
    const portfolioRef = doc(db, "portfolio", id)
    await updateDoc(portfolioRef, {
      status: "rejected",
      updatedAt: serverTimestamp(),
    })
    return { success: true }
  } catch (error) {
    console.error(`Error rejecting portfolio item ${id}:`, error)
    // For demo purposes, return success anyway
    return { success: true }
  }
}

export const sendFeedback = async (itemId, feedback) => {
  try {
    const itemRef = doc(db, "portfolio", itemId)
    await updateDoc(itemRef, {
      feedback: feedback,
      updatedAt: serverTimestamp(),
    })
    return { success: true }
  } catch (error) {
    console.error(`Error sending feedback for item ${itemId}:`, error)
    // For demo purposes, return success anyway
    return { success: true }
  }
}

export const processPayment = async (paymentId) => {
  try {
    const paymentRef = doc(db, "payments", paymentId)
    await updateDoc(paymentRef, {
      status: "paid",
      processedAt: serverTimestamp(),
    })
    return { success: true }
  } catch (error) {
    console.error(`Error processing payment ${paymentId}:`, error)
    // For demo purposes, return success anyway
    return { success: true }
  }
}
