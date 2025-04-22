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
  PhotoIcon,
  StarIcon,
} from "@heroicons/react/24/solid"

import { Home, Profile, Missions, Creators, Messages, Payments  } from "@/pages/dashboard";
import { SignIn, SignUp, ForgotPassword} from "@/pages/auth";


// Import creator admin pages
import { CreatorAdmin } from "@/pages/creator-admin"
import { CreatorList } from "@/pages/creator-admin/creator-list"
import { CreatorProfile } from "@/pages/creator-admin/creator-profile"
import { PortfolioReview } from "@/pages/creator-admin/portfolio-review"
import { MissionManagement } from "@/pages/creator-admin/mission-management"
import { RatingManagement } from "@/pages/creator-admin/rating-management"
import { PaymentManagement } from "@/pages/creator-admin/payment-management"


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
    title: "Creator Admin",
    pages: [
      {
        icon: <UserGroupIcon {...icon} />,
        name: "creator admin",
        path: "/creator-admin",
        element: <CreatorAdmin />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "creator list",
        path: "/creator-admin/creators",
        element: <CreatorList />,
        hidden: true,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "creator profile",
        path: "/creator-admin/creator/:id",
        element: <CreatorProfile />,
        hidden: true,
      },
      {
        icon: <PhotoIcon {...icon} />,
        name: "portfolio review",
        path: "/creator-admin/portfolio",
        element: <PortfolioReview />,
        hidden: true,
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "mission management",
        path: "/creator-admin/missions",
        element: <MissionManagement />,
        hidden: true,
      },
      {
        icon: <StarIcon {...icon} />,
        name: "rating management",
        path: "/creator-admin/ratings",
        element: <RatingManagement />,
        hidden: true,
      },
      {
        icon: <CurrencyDollarIcon {...icon} />,
        name: "payment management",
        path: "/creator-admin/payments",
        element: <PaymentManagement />,
        hidden: true,
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
