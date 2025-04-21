"use client"

import React, { useEffect, useState } from "react"
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Progress,
  Button,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react"
import {
  EllipsisVerticalIcon,
  UserPlusIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline"
import { StatisticsCard } from "../../widgets/cards"
import {
  fetchDashboardStats,
  fetchBrandMissions,
  fetchCreatorMissions,
  fetchRecommendedCreators,
  fetchRecentActivities,
} from "../../services/firebase-service"

export function Home({ user }) {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [missions, setMissions] = useState([])
  const [creators, setCreators] = useState([])
  const [activities, setActivities] = useState([])
  const [activeTab, setActiveTab] = useState("overview")
  const userType = user?.profile?.userType || "brand" // Default to brand if not specified

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true)
      try {
        // Fetch dashboard stats
        const statsResponse = await fetchDashboardStats(user.uid, userType)
        if (statsResponse.success) {
          setStats(statsResponse.data)
        }

        // Fetch missions based on user type
        if (userType === "brand") {
          const missionsResponse = await fetchBrandMissions(user.uid)
          if (missionsResponse.success) {
            setMissions(missionsResponse.data)
          }

          // Fetch recommended creators
          const category = user?.profile?.primaryCategory || "general"
          const creatorsResponse = await fetchRecommendedCreators(user.uid, category)
          if (creatorsResponse.success) {
            setCreators(creatorsResponse.data)
          }
        } else if (userType === "creator") {
          const missionsResponse = await fetchCreatorMissions(user.uid)
          if (missionsResponse.success) {
            setMissions(missionsResponse.data)
          }
        }

        // Fetch recent activities
        const activitiesResponse = await fetchRecentActivities(user.uid)
        if (activitiesResponse.success) {
          setActivities(activitiesResponse.data)
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user?.uid) {
      loadDashboardData()
    }
  }, [user, userType])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Default stats if none are available
  const defaultStats = {
    totalMissions: 0,
    completedMissions: 0,
    pendingMissions: 0,
    totalEarnings: 0,
    averageRating: 0,
  }

  const dashboardStats = stats || defaultStats

  // Statistics cards data
  const statisticsCardsData =
    userType === "brand"
      ? [
          {
            color: "blue",
            icon: DocumentTextIcon,
            title: "Total Missions",
            value: dashboardStats.totalMissions || 0,
            footer: {
              color: "text-green-500",
              value: "+3%",
              label: "than last month",
            },
          },
          {
            color: "green",
            icon: CheckCircleIcon,
            title: "Completed",
            value: dashboardStats.completedMissions || 0,
            footer: {
              color: "text-green-500",
              value: "+5%",
              label: "than last month",
            },
          },
          {
            color: "orange",
            icon: ClockIcon,
            title: "Pending",
            value: dashboardStats.pendingMissions || 0,
            footer: {
              color: "text-red-500",
              value: "+2%",
              label: "than last month",
            },
          },
          {
            color: "pink",
            icon: UserPlusIcon,
            title: "Creators",
            value: dashboardStats.totalCreators || 0,
            footer: {
              color: "text-green-500",
              value: "+12%",
              label: "than last month",
            },
          },
        ]
      : [
          {
            color: "blue",
            icon: DocumentTextIcon,
            title: "Total Missions",
            value: dashboardStats.totalMissions || 0,
            footer: {
              color: "text-green-500",
              value: "+3%",
              label: "than last month",
            },
          },
          {
            color: "green",
            icon: CheckCircleIcon,
            title: "Completed",
            value: dashboardStats.completedMissions || 0,
            footer: {
              color: "text-green-500",
              value: "+5%",
              label: "than last month",
            },
          },
          {
            color: "orange",
            icon: ClockIcon,
            title: "Pending",
            value: dashboardStats.pendingMissions || 0,
            footer: {
              color: "text-red-500",
              value: "+2%",
              label: "than last month",
            },
          },
          {
            color: "pink",
            icon: CurrencyDollarIcon,
            title: "Earnings",
            value: `$${dashboardStats.totalEarnings || 0}`,
            footer: {
              color: "text-green-500",
              value: "+10%",
              label: "than last month",
            },
          },
        ]

  // Mission status colors
  const statusColors = {
    pending: "blue-gray",
    inProgress: "blue",
    review: "amber",
    completed: "green",
    rejected: "red",
  }

  return (
    <div>
      <div className="mb-12">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Welcome back, {user?.displayName || user?.email?.split("@")[0]}
        </Typography>
        <Typography variant="paragraph" color="blue-gray" className="font-normal">
          Here's what's happening with your {userType === "brand" ? "campaigns" : "content"} today.
        </Typography>
      </div>

      <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
        <TabsHeader>
          <Tab value="overview">
            <div className="flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5" />
              Overview
            </div>
          </Tab>
          <Tab value="missions">
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5" />
              {userType === "brand" ? "Missions" : "My Missions"}
            </div>
          </Tab>
          {userType === "brand" && (
            <Tab value="creators">
              <div className="flex items-center gap-2">
                <UserPlusIcon className="w-5 h-5" />
                Creators
              </div>
            </Tab>
          )}
        </TabsHeader>
        <TabsBody>
          <TabPanel value="overview">
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
              {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
                <StatisticsCard
                  key={title}
                  {...rest}
                  title={title}
                  icon={React.createElement(icon, {
                    className: "w-6 h-6 text-white",
                  })}
                  footer={
                    <Typography className="font-normal text-blue-gray-600">
                      <strong className={footer.color}>{footer.value}</strong>
                      &nbsp;{footer.label}
                    </Typography>
                  }
                />
              ))}
            </div>

            <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2">
              <Card className="border border-blue-gray-100 shadow-sm">
                <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6">
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Recent Activities
                  </Typography>
                </CardHeader>
                <CardBody className="pt-0 px-6">
                  {activities.length === 0 ? (
                    <Typography color="blue-gray" className="font-normal text-center py-4">
                      No recent activities
                    </Typography>
                  ) : (
                    activities.map((activity, index) => (
                      <div key={activity.id} className="flex items-start gap-4 py-3">
                        <div
                          className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                            index === activities.length - 1 ? "after:h-0" : "after:h-4/6"
                          }`}
                        >
                          <div className="grid h-7 w-7 place-items-center rounded-full bg-blue-gray-50">
                            {activity.icon || <ClockIcon className="h-4 w-4 text-blue-gray-500" />}
                          </div>
                        </div>
                        <div>
                          <Typography variant="small" color="blue-gray" className="block font-medium">
                            {activity.title}
                          </Typography>
                          <Typography as="span" variant="small" className="text-xs font-medium text-blue-gray-500">
                            {activity.description}
                          </Typography>
                          <Typography
                            as="span"
                            variant="small"
                            className="text-xs font-medium text-blue-gray-400 block"
                          >
                            {new Date(activity.timestamp).toLocaleString()}
                          </Typography>
                        </div>
                      </div>
                    ))
                  )}
                </CardBody>
              </Card>

              <Card className="border border-blue-gray-100 shadow-sm">
                <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6">
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    {userType === "brand" ? "Mission Status" : "Performance"}
                  </Typography>
                </CardHeader>
                <CardBody className="px-6 pt-0">
                  {userType === "brand" ? (
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            Completed
                          </Typography>
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {dashboardStats.completedMissions || 0}/{dashboardStats.totalMissions || 0}
                          </Typography>
                        </div>
                        <Progress
                          value={
                            dashboardStats.totalMissions
                              ? (dashboardStats.completedMissions / dashboardStats.totalMissions) * 100
                              : 0
                          }
                          color="green"
                          className="h-1"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            In Progress
                          </Typography>
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {dashboardStats.inProgressMissions || 0}/{dashboardStats.totalMissions || 0}
                          </Typography>
                        </div>
                        <Progress
                          value={
                            dashboardStats.totalMissions
                              ? (dashboardStats.inProgressMissions / dashboardStats.totalMissions) * 100
                              : 0
                          }
                          color="blue"
                          className="h-1"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            Pending
                          </Typography>
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {dashboardStats.pendingMissions || 0}/{dashboardStats.totalMissions || 0}
                          </Typography>
                        </div>
                        <Progress
                          value={
                            dashboardStats.totalMissions
                              ? (dashboardStats.pendingMissions / dashboardStats.totalMissions) * 100
                              : 0
                          }
                          color="amber"
                          className="h-1"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            Rating
                          </Typography>
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {dashboardStats.averageRating || 0}/5
                          </Typography>
                        </div>
                        <Progress value={(dashboardStats.averageRating / 5) * 100 || 0} color="amber" className="h-1" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            Completion Rate
                          </Typography>
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {dashboardStats.completionRate || 0}%
                          </Typography>
                        </div>
                        <Progress value={dashboardStats.completionRate || 0} color="green" className="h-1" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            On-Time Delivery
                          </Typography>
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {dashboardStats.onTimeDeliveryRate || 0}%
                          </Typography>
                        </div>
                        <Progress value={dashboardStats.onTimeDeliveryRate || 0} color="blue" className="h-1" />
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </div>
          </TabPanel>

          <TabPanel value="missions">
            <Card className="border border-blue-gray-100 shadow-sm">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 flex items-center justify-between p-6"
              >
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    {userType === "brand" ? "Your Missions" : "Available Missions"}
                  </Typography>
                  <Typography variant="small" className="flex items-center gap-1 font-normal text-blue-gray-600">
                    <CheckCircleIcon className="h-4 w-4 text-blue-gray-200" />
                    <strong>{missions.filter((m) => m.status === "completed").length} completed</strong> missions
                  </Typography>
                </div>
                {userType === "brand" && (
                  <Button size="sm" color="blue">
                    Create New Mission
                  </Button>
                )}
              </CardHeader>
              <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                {missions.length === 0 ? (
                  <div className="text-center py-8">
                    <Typography color="blue-gray" className="font-normal">
                      No missions found
                    </Typography>
                    {userType === "brand" && (
                      <Button size="sm" color="blue" className="mt-4">
                        Create Your First Mission
                      </Button>
                    )}
                  </div>
                ) : (
                  <table className="w-full min-w-[640px] table-auto">
                    <thead>
                      <tr>
                        {[
                          "mission",
                          userType === "brand" ? "creator" : "brand",
                          "deadline",
                          "budget",
                          "status",
                          "actions",
                        ].map((el) => (
                          <th key={el} className="border-b border-blue-gray-50 py-3 px-6 text-left">
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium uppercase text-blue-gray-400"
                            >
                              {el}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {missions.map((mission, index) => {
                        const className = `py-3 px-5 ${
                          index === missions.length - 1 ? "" : "border-b border-blue-gray-50"
                        }`

                        return (
                          <tr key={mission.id}>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <div className="grid h-9 w-9 place-items-center rounded-md bg-blue-gray-50">
                                  <DocumentTextIcon className="h-4 w-4 text-blue-gray-500" />
                                </div>
                                <div>
                                  <Typography variant="small" color="blue-gray" className="font-bold">
                                    {mission.title}
                                  </Typography>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="text-xs font-normal opacity-70"
                                  >
                                    {mission.type}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className={className}>
                              <div className="flex items-center gap-3">
                                <Avatar
                                  src={
                                    mission.assignedTo?.photoURL ||
                                    mission.brand?.photoURL ||
                                    "https://ui-avatars.com/api/?name=" +
                                      (mission.assignedTo?.name || mission.brand?.name)
                                  }
                                  alt="user"
                                  size="sm"
                                  className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                />
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                  {mission.assignedTo?.name || mission.brand?.name}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                {new Date(mission.deadline).toLocaleDateString()}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                ${mission.budget}
                              </Typography>
                            </td>
                            <td className={className}>
                              <div className="w-max">
                                <Typography
                                  variant="small"
                                  className={`rounded-md bg-${statusColors[mission.status]}-50 px-2 py-0.5 text-xs font-medium text-${statusColors[mission.status]}-500`}
                                >
                                  {mission.status}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <Menu placement="left-start">
                                <MenuHandler>
                                  <IconButton variant="text" color="blue-gray">
                                    <EllipsisVerticalIcon className="h-5 w-5" />
                                  </IconButton>
                                </MenuHandler>
                                <MenuList>
                                  <MenuItem>View Details</MenuItem>
                                  {userType === "brand" && mission.status === "pending" && (
                                    <MenuItem>Edit Mission</MenuItem>
                                  )}
                                  {userType === "creator" && mission.status === "pending" && (
                                    <MenuItem>Accept Mission</MenuItem>
                                  )}
                                  {mission.status === "inProgress" && <MenuItem>Submit Work</MenuItem>}
                                </MenuList>
                              </Menu>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </CardBody>
            </Card>
          </TabPanel>

          {userType === "brand" && (
            <TabPanel value="creators">
              <Card className="border border-blue-gray-100 shadow-sm">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 flex items-center justify-between p-6"
                >
                  <div>
                    <Typography variant="h6" color="blue-gray" className="mb-1">
                      Recommended Creators
                    </Typography>
                    <Typography variant="small" className="font-normal text-blue-gray-600">
                      Creators that match your brand's style and niche
                    </Typography>
                  </div>
                  <Button size="sm" color="blue">
                    Browse All Creators
                  </Button>
                </CardHeader>
                <CardBody className="px-6 pt-0 pb-6">
                  {creators.length === 0 ? (
                    <div className="text-center py-8">
                      <Typography color="blue-gray" className="font-normal">
                        No recommended creators found
                      </Typography>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {creators.map((creator) => (
                        <Card key={creator.id} className="border border-blue-gray-50">
                          <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="mx-0 mt-0 mb-4 flex items-center justify-between p-6"
                          >
                            <div className="flex items-center gap-4">
                              <Avatar
                                src={
                                  creator.photoURL ||
                                  `https://ui-avatars.com/api/?name=${creator.firstName}+${creator.lastName}`
                                }
                                alt={`${creator.firstName} ${creator.lastName}`}
                                size="lg"
                                className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                              />
                              <div>
                                <Typography variant="h6" color="blue-gray">
                                  {creator.firstName} {creator.lastName}
                                </Typography>
                                <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                                  {creator.categories?.join(", ")}
                                </Typography>
                                <div className="flex items-center gap-1 mt-1">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill={i < (creator.rating || 0) ? "currentColor" : "none"}
                                      stroke={i < (creator.rating || 0) ? "none" : "currentColor"}
                                      className="w-4 h-4 text-amber-500"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                      />
                                    </svg>
                                  ))}
                                  <Typography variant="small" color="blue-gray" className="font-normal">
                                    ({creator.rating || 0})
                                  </Typography>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardBody className="p-6 pt-0">
                            <Typography variant="small" className="font-normal text-blue-gray-500">
                              {creator.bio || "No bio available"}
                            </Typography>
                            <div className="flex flex-wrap gap-2 mt-4">
                              {creator.skills?.map((skill) => (
                                <div
                                  key={skill}
                                  className="rounded-full bg-blue-gray-50 px-3 py-1 text-xs font-medium text-blue-gray-500"
                                >
                                  {skill}
                                </div>
                              ))}
                            </div>
                          </CardBody>
                          <CardFooter className="pt-0 px-6 pb-6">
                            <Button size="sm" fullWidth>
                              Invite to Mission
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardBody>
              </Card>
            </TabPanel>
          )}
        </TabsBody>
      </Tabs>
    </div>
  )
}

export default Home
