"use client"

import { useLocation, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Badge,
} from "@material-tailwind/react"
import { UserCircleIcon, BellIcon, ClockIcon, Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { useMaterialTailwindController, setOpenSidenav } from "../../context"
import { auth } from "../../firebase/config"
import { signOut } from "firebase/auth"
import { subscribeToNotifications } from "../../services/firebase-service"

export function DashboardNavbar({ user }) {
  const [controller, dispatch] = useMaterialTailwindController()
  const { fixedNavbar, openSidenav } = controller
  const { pathname } = useLocation()
  const [layout, page] = pathname.split("/").filter((el) => el !== "")
  const [notifications, setNotifications] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Set page title
    document.title = `${page.charAt(0).toUpperCase() + page.slice(1)} | Crealik`

    // Subscribe to notifications if user is logged in
    if (user?.uid) {
      const unsubscribe = subscribeToNotifications(user.uid, (notifs) => {
        setNotifications(notifs)
      })

      return () => unsubscribe()
    }
  }, [page, user])

  const logoutHandler = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem("token")
      localStorage.removeItem("userData")
      sessionStorage.clear()
      window.location.href = "/auth/sign-in"
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

  const unreadNotifications = notifications.filter((n) => !n.read)

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5" : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""}`}>
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography variant="small" color="blue-gray" className="font-normal">
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <form onSubmit={handleSearch} className="mr-auto md:mr-4 md:w-56">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-gray-500" />
              <Input
                type="search"
                label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4"
                containerProps={{
                  className: "min-w-[100px]",
                }}
              />
            </div>
          </form>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>

          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <Badge
                  content={unreadNotifications.length}
                  withBorder
                  color="red"
                  className={unreadNotifications.length === 0 ? "hidden" : ""}
                >
                  <BellIcon className="h-5 w-5 text-blue-gray-500" />
                </Badge>
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0 max-h-[400px] overflow-y-auto">
              <MenuItem className="flex items-center gap-3 border-b border-blue-gray-50 py-2">
                <Typography variant="small" color="blue-gray" className="font-bold">
                  Notifications
                </Typography>
              </MenuItem>

              {notifications.length === 0 ? (
                <MenuItem>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    No notifications
                  </Typography>
                </MenuItem>
              ) : (
                notifications.map((notification) => (
                  <MenuItem
                    key={notification.id}
                    className={`flex items-center gap-4 py-2 pl-2 pr-8 ${!notification.read ? "bg-blue-50" : ""}`}
                  >
                    <div
                      className={`grid h-9 w-9 place-items-center rounded-full ${notification.read ? "bg-blue-gray-50" : "bg-blue-50"}`}
                    >
                      {notification.icon || <BellIcon className="h-4 w-4 text-blue-gray-500" />}
                    </div>
                    <div>
                      <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
                        {notification.message}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                      >
                        <ClockIcon className="h-3.5 w-3.5" /> {new Date(notification.timestamp).toLocaleString()}
                      </Typography>
                    </div>
                  </MenuItem>
                ))
              )}
            </MenuList>
          </Menu>

          <Menu>
            <MenuHandler>
              <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-1 rounded-full py-0.5 pl-0.5 pr-2"
              >
                <Avatar
                  variant="circular"
                  size="sm"
                  alt="User"
                  className="border border-blue-500 p-0.5"
                  src={user?.photoURL || "https://ui-avatars.com/api/?name=" + (user?.displayName || user?.email)}
                />
                <Typography variant="small" className="normal-case font-normal hidden lg:block">
                  {user?.displayName || user?.email?.split("@")[0]}
                </Typography>
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem className="flex items-center gap-2">
                <UserCircleIcon className="h-4 w-4 text-blue-gray-500" />
                <Typography variant="small" className="font-normal">
                  My Profile
                </Typography>
              </MenuItem>
              <MenuItem className="flex items-center gap-2" onClick={logoutHandler}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-blue-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                <Typography variant="small" className="font-normal">
                  Sign Out
                </Typography>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  )
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx"

export default DashboardNavbar
