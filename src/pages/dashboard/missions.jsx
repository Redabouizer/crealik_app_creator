"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react"
import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowPathIcon,
  FunnelIcon,
  CalendarDaysIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline"
import { CheckCircleIcon, ClockIcon as ClockSolidIcon } from "@heroicons/react/24/solid"
import { fetchBrandMissions, fetchCreatorMissions } from "../../services/firebase-service"

export function Missions({ user }) {
  const [missions, setMissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const userType = user?.profile?.userType || "brand"

  useEffect(() => {
    const loadMissions = async () => {
      setLoading(true)
      try {
        if (userType === "brand") {
          const { data } = await fetchBrandMissions(user?.uid)
          setMissions(data || [])
        } else {
          const { data } = await fetchCreatorMissions(user?.uid)
          setMissions(data || [])
        }
      } catch (error) {
        console.error("Error loading missions:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user?.uid) {
      loadMissions()
    }
  }, [user, userType])

  const filteredMissions = missions.filter((mission) => {
    // Filter by search query
    const matchesSearch =
      mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.type.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab
    if (activeTab === "all") return matchesSearch
    return matchesSearch && mission.status === activeTab
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green"
      case "inProgress":
        return "blue"
      case "pending":
        return "amber"
      case "rejected":
        return "red"
      default:
        return "blue-gray"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon className="h-4 w-4" />
      case "inProgress":
      case "pending":
        return <ClockSolidIcon className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Typography variant="h6" color="white">
                {userType === "brand" ? "Your Missions" : "Available Missions"}
              </Typography>
              <Typography variant="small" color="white" className="mt-1 font-normal">
                {userType === "brand"
                  ? "Manage and track your content creation missions"
                  : "Browse and apply for available content creation opportunities"}
              </Typography>
            </div>
            {userType === "brand" && (
              <Button className="flex items-center gap-2 bg-white text-blue-500">
                <PlusIcon strokeWidth={2} className="h-4 w-4" />
                Create New Mission
              </Button>
            )}
          </div>
        </CardHeader>
        <CardBody className="px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full md:w-72">
              <Input
                label="Search missions"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
                <TabsHeader>
                  <Tab value="all">All</Tab>
                  <Tab value="pending">Pending</Tab>
                  <Tab value="inProgress">In Progress</Tab>
                  <Tab value="completed">Completed</Tab>
                </TabsHeader>
              </Tabs>
              <IconButton variant="outlined" color="blue-gray" className="ml-auto">
                <FunnelIcon strokeWidth={2} className="h-4 w-4" />
              </IconButton>
              <IconButton variant="outlined" color="blue-gray">
                <ArrowPathIcon strokeWidth={2} className="h-4 w-4" />
              </IconButton>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredMissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="rounded-full bg-blue-50 p-3 mb-4">
                <ClockIcon className="h-8 w-8 text-blue-500" />
              </div>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                No missions found
              </Typography>
              <Typography variant="small" color="blue-gray" className="font-normal opacity-70 max-w-sm text-center">
                {searchQuery
                  ? "Try adjusting your search or filters to find what you're looking for."
                  : userType === "brand"
                    ? "Create your first mission to start collaborating with creators."
                    : "Check back later for new mission opportunities."}
              </Typography>
              {userType === "brand" && !searchQuery && (
                <Button className="mt-4 flex items-center gap-2">
                  <PlusIcon strokeWidth={2} className="h-4 w-4" />
                  Create First Mission
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] table-auto mt-4">
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
                      <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                        <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredMissions.map((mission, index) => {
                    const className = `py-3 px-5 ${
                      index === filteredMissions.length - 1 ? "" : "border-b border-blue-gray-50"
                    }`
                    const statusColor = getStatusColor(mission.status)
                    const statusIcon = getStatusIcon(mission.status)
                    const isOverdue =
                      mission.status !== "completed" &&
                      new Date(mission.deadline) < new Date() &&
                      mission.status !== "rejected"

                    return (
                      <tr key={mission.id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div
                              className={`grid h-9 w-9 place-items-center rounded-md bg-${statusColor}-100 text-${statusColor}-500`}
                            >
                              {statusIcon}
                            </div>
                            <div>
                              <Typography variant="small" color="blue-gray" className="font-bold">
                                {mission.title}
                              </Typography>
                              <Typography variant="small" color="blue-gray" className="text-xs font-normal opacity-70">
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
                                `https://ui-avatars.com/api/?name=${
                                  mission.assignedTo?.name || mission.brand?.name || "User"
                                }&background=0D8ABC&color=fff`
                              }
                              alt="user"
                              size="sm"
                              className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                            />
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {mission.assignedTo?.name || mission.brand?.name || "Unassigned"}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-1">
                            <CalendarDaysIcon className="h-4 w-4 text-blue-gray-500" />
                            <Typography
                              variant="small"
                              color={isOverdue ? "red" : "blue-gray"}
                              className={`font-normal ${isOverdue ? "font-medium" : ""}`}
                            >
                              {new Date(mission.deadline).toLocaleDateString()}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-1">
                            <CurrencyDollarIcon className="h-4 w-4 text-blue-gray-500" />
                            <Typography variant="small" color="blue-gray" className="font-medium">
                              ${mission.budget}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={mission.status.replace(/([A-Z])/g, " $1").trim()}
                              color={statusColor}
                              icon={statusIcon}
                              className="capitalize"
                            />
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
                              {mission.status === "completed" && <MenuItem>View Submission</MenuItem>}
                            </MenuList>
                          </Menu>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
}

export default Missions
