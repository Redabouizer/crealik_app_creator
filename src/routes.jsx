import {
  HomeIcon,
  UserCircleIcon,
  DocumentTextIcon,
  ServerStackIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  RectangleStackIcon,
  BellIcon,
} from "@heroicons/react/24/solid"

// // Import dashboard pages
// import { Home } from "./pages/dashboard/home"
// import { Profile } from "./pages/dashboard/profile"
// import { Tables } from "./pages/dashboard/tables"
// import { Notifications } from "./pages/dashboard/notifications"
// import { Missions } from "./pages/dashboard/missions"
// import { Creators } from "./pages/dashboard/creators"
// import { Messages } from "./pages/dashboard/messages"
// import { Payments } from "./pages/dashboard/payments"

import { Home, Profile, Missions, Creators, Messages, Payments  } from "@/pages/dashboard";
import { SignIn, SignUp, ForgotPassword} from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
}

const routes = [
  {
    layout: "dashboard",
    title: "Dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    layout: "dashboard",
    title: "Platform",
    pages: [
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "missions",
        path: "/missions",
        element: <Missions />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "creators",
        path: "/creators",
        element: <Creators />,
        userTypes: ["brand"], // Only show for brands
      },
      {
        icon: <ChatBubbleLeftRightIcon {...icon} />,
        name: "messages",
        path: "/messages",
        element: <Messages />,
      },
      {
        icon: <CurrencyDollarIcon {...icon} />,
        name: "payments",
        path: "/payments",
        element: <Payments />,
      },
    ],
  },
  {
    layout: "dashboard",
    title: "Account",
    pages: [
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "settings",
        path: "/settings",
        element: <Profile />, // Using Profile component until Settings is created
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        name: "forgot password",
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]

export default routes
