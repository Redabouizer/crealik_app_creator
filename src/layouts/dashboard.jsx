"use client"

import React from "react"

import { Routes, Route } from "react-router-dom"
import { Sidenav } from "../widgets/layout/sidenav"
import { DashboardNavbar } from "../widgets/layout/dashboard-navbar"
import { Footer } from "../widgets/layout/footer"
import routes from "../routes"
import { useMaterialTailwindController } from "../context"
import { useEffect, useState } from "react"
import { auth } from "../firebase/config"
import { onAuthStateChanged } from "firebase/auth"
import { fetchUserProfile } from "../services/firebase-service"

export function Dashboard() {
  const [controller] = useMaterialTailwindController()
  const { sidenavType } = controller
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch additional user data from Firestore
        const { success, data } = await fetchUserProfile(currentUser.uid)
        if (success) {
          setUser({ ...currentUser, profile: data })
        } else {
          setUser(currentUser)
        }
      } else {
        // Redirect to login if no user
        window.location.href = "/auth/sign-in"
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidenav
        routes={routes}
        brandImg={sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"}
        brandName="Crealik"
        userType={user?.profile?.userType}
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar user={user} />
        <div className="mt-12">
          <Routes>
            {routes.map(
              ({ layout, pages }) =>
                layout === "dashboard" &&
                pages.map(({ path, element }) => (
                  <Route key={path} exact path={path} element={React.cloneElement(element, { user })} />
                )),
            )}
          </Routes>
        </div>
        <div className="text-blue-gray-600 mt-12">
          <Footer
            brandName="Crealik"
            brandLink="https://crealik.ma"
            routes={[
              { name: "About Us", path: "/about" },
              { name: "Blog", path: "/blog" },
              { name: "Contact", path: "/contact" },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

Dashboard.displayName = "/src/layout/dashboard.jsx"

export default Dashboard
