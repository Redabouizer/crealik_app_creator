"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Chip,
  Button,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Progress,
  IconButton,
} from "@material-tailwind/react"
import {
  UserCircleIcon,
  DocumentTextIcon,
  PhotoIcon,
  ChartBarIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon,
} from "@heroicons/react/24/outline"
import { fetchCreatorProfile } from "../../services/firebase-service"

export function CreatorProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(() => {
    const loadCreatorProfile = async () => {
      setLoading(true)
      try {
        // In a real implementation, this would fetch from your database
        const response = await fetchCreatorProfile(id)
        if (response.success) {
          setCreator(response.data)
        }
      } catch (error) {
        console.error("Error loading creator profile:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadCreatorProfile()
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!creator) {
    return (
      <div className="text-center py-8">
        <Typography variant="h6" color="blue-gray">
          Creator not found
        </Typography>
        <Button className="mt-4" onClick={() => navigate("/creator-admin")}>
          Back to Creator List
        </Button>
      </div>
    )
  }

  // Status badge colors
  const statusColors = {
    pending: "amber",
    approved: "green",
    rejected: "red",
  }

  // Badge level colors
  const badgeColors = {
    bronze: "brown",
    silver: "blue-gray",
    gold: "amber",
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="flex items-center gap-4">
        <IconButton variant="text" color="blue-gray" onClick={() => navigate("/creator-admin")}>
          <ArrowLeftIcon className="h-5 w-5" />
        </IconButton>
        <Typography variant="h4" color="blue-gray">
          Creator Profile
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="col-span-1">
          <CardHeader floated={false} shadow={false} className="mx-0 mt-0 mb-4 h-64 xl:h-80">
            <div className="bg-gradient-to-r from-blue-500 to-violet-500 w-full h-full flex items-center justify-center">
              <Avatar
                src={creator.photoURL || `https://ui-avatars.com/api/?name=${creator.firstName}+${creator.lastName}`}
                alt={`${creator.firstName} ${creator.lastName}`}
                size="xxl"
                className="border-4 border-white"
              />
            </div>
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h5" color="blue-gray" className="mb-1">
              {creator.firstName} {creator.lastName}
            </Typography>
            <Typography color="blue-gray" className="font-medium" textGradient>
              {creator.categories?.join(", ")}
            </Typography>
            <div className="flex justify-center gap-2 mt-4">
              <Chip
                variant="gradient"
                color={statusColors[creator.status]}
                value={creator.status}
                className="py-0.5 px-2 text-[11px] font-medium"
              />
              {creator.badge && (
                <Chip
                  variant="gradient"
                  color={badgeColors[creator.badge.toLowerCase()]}
                  value={creator.badge}
                  className="py-0.5 px-2 text-[11px] font-medium"
                />
              )}
            </div>
            <div className="flex items-center justify-center gap-1 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-amber-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <Typography variant="h6" color="blue-gray">
                {creator.rating || "N/A"}
              </Typography>
              <Typography color="blue-gray" className="font-normal">
                ({creator.reviewCount || 0} reviews)
              </Typography>
            </div>
          </CardBody>
          <CardFooter className="flex justify-center gap-2 pt-0">
            {creator.status === "pending" ? (
              <>
                <Button color="green" size="sm" className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4" /> Approve
                </Button>
                <Button color="red" size="sm" className="flex items-center gap-2">
                  <XCircleIcon className="h-4 w-4" /> Reject
                </Button>
              </>
            ) : (
              <Button color="blue" size="sm" className="flex items-center gap-2">
                <PencilIcon className="h-4 w-4" /> Edit Profile
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card className="col-span-1 lg:col-span-2">
          <CardHeader floated={false} shadow={false} className="pt-4 px-4">
            <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
              <TabsHeader>
                <Tab value="profile">
                  <div className="flex items-center gap-2">
                    <UserCircleIcon className="w-5 h-5" />
                    Profile
                  </div>
                </Tab>
                <Tab value="portfolio">
                  <div className="flex items-center gap-2">
                    <PhotoIcon className="w-5 h-5" />
                    Portfolio
                  </div>
                </Tab>
                <Tab value="missions">
                  <div className="flex items-center gap-2">
                    <DocumentTextIcon className="w-5 h-5" />
                    Missions
                  </div>
                </Tab>
                <Tab value="analytics">
                  <div className="flex items-center gap-2">
                    <ChartBarIcon className="w-5 h-5" />
                    Analytics
                  </div>
                </Tab>
              </TabsHeader>
            </Tabs>
          </CardHeader>
          <CardBody>
            <TabsBody animate={{ mount: { y: 0 }, unmount: { y: 250 } }}>
              <TabPanel value="profile">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Typography variant="h6" color="blue-gray" className="mb-4">
                      Personal Information
                    </Typography>
                    <div className="space-y-4">
                      <div>
                        <Typography variant="small" className="font-semibold mb-1">
                          Full Name
                        </Typography>
                        <Typography variant="small" className="font-normal">
                          {creator.firstName} {creator.lastName}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="small" className="font-semibold mb-1">
                          Email
                        </Typography>
                        <Typography variant="small" className="font-normal">
                          {creator.email}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="small" className="font-semibold mb-1">
                          Phone
                        </Typography>
                        <Typography variant="small" className="font-normal">
                          {creator.phone || "Not provided"}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="small" className="font-semibold mb-1">
                          Location
                        </Typography>
                        <Typography variant="small" className="font-normal">
                          {creator.location || "Not provided"}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="small" className="font-semibold mb-1">
                          Joined
                        </Typography>
                        <Typography variant="small" className="font-normal">
                          {creator.joinedAt ? new Date(creator.joinedAt).toLocaleDateString() : "Unknown"}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray" className="mb-4">
                      Professional Information
                    </Typography>
                    <div className="space-y-4">
                      <div>
                        <Typography variant="small" className="font-semibold mb-1">
                          Bio
                        </Typography>
                        <Typography variant="small" className="font-normal">
                          {creator.bio || "No bio provided"}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="small" className="font-semibold mb-1">
                          Categories
                        </Typography>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {creator.categories?.map((category) => (
                            <Chip
                              key={category}
                              value={category}
                              variant="ghost"
                              size="sm"
                              className="rounded-full py-1.5"
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <Typography variant="small" className="font-semibold mb-1">
                          Skills
                        </Typography>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {creator.skills?.map((skill) => (
                            <Chip
                              key={skill}
                              value={skill}
                              variant="outlined"
                              size="sm"
                              className="rounded-full py-1.5"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Typography variant="h6" color="blue-gray" className="mb-4">
                    Social Media
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {creator.socialMedia?.map((social) => (
                      <Card key={social.platform} className="p-4 shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-blue-gray-50 p-2">
                            <i className={`fab fa-${social.platform.toLowerCase()} text-lg`}></i>
                          </div>
                          <div>
                            <Typography variant="small" className="font-semibold">
                              {social.platform}
                            </Typography>
                            <Typography variant="small" className="font-normal">
                              {social.followers} followers
                            </Typography>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabPanel>

              <TabPanel value="portfolio">
                <div className="flex justify-between items-center mb-6">
                  <Typography variant="h6" color="blue-gray">
                    Content Portfolio
                  </Typography>
                  <div className="flex gap-2">
                    <Button color="green" size="sm">
                      Approve All
                    </Button>
                    <Button color="blue" size="sm">
                      Send Feedback
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {creator.portfolio?.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="relative h-48">
                        {item.type === "image" ? (
                          <img
                            src={item.url || "/placeholder.svg"}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-blue-gray-50 flex items-center justify-center">
                            <i className="fas fa-play-circle text-4xl text-blue-gray-300"></i>
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <Chip
                            variant="gradient"
                            color={statusColors[item.status]}
                            value={item.status}
                            className="py-0.5 px-2 text-[11px] font-medium"
                          />
                        </div>
                      </div>
                      <CardBody className="p-3">
                        <Typography variant="small" className="font-semibold">
                          {item.title}
                        </Typography>
                        <Typography variant="small" className="font-normal text-blue-gray-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </Typography>
                      </CardBody>
                      <CardFooter className="pt-0 px-3 pb-3 flex justify-between">
                        <Button variant="text" size="sm">
                          View
                        </Button>
                        {item.status === "pending" && (
                          <div className="flex gap-1">
                            <IconButton variant="text" color="green" size="sm">
                              <CheckCircleIcon className="h-4 w-4" />
                            </IconButton>
                            <IconButton variant="text" color="red" size="sm">
                              <XCircleIcon className="h-4 w-4" />
                            </IconButton>
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabPanel>

              <TabPanel value="missions">
                <div className="flex justify-between items-center mb-6">
                  <Typography variant="h6" color="blue-gray">
                    Mission History
                  </Typography>
                  <Button color="blue" size="sm">
                    Assign New Mission
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] table-auto">
                    <thead>
                      <tr>
                        {["Mission", "Brand", "Status", "Deadline", "Budget", "Actions"].map((el) => (
                          <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                              {el}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {creator.missions?.map((mission, index) => {
                        const className = `py-3 px-5 ${
                          index === creator.missions.length - 1 ? "" : "border-b border-blue-gray-50"
                        }`

                        return (
                          <tr key={mission.id}>
                            <td className={className}>
                              <Typography variant="small" color="blue-gray" className="font-semibold">
                                {mission.title}
                              </Typography>
                            </td>
                            <td className={className}>
                              <div className="flex items-center gap-3">
                                <Avatar
                                  src={
                                    mission.brand?.photoURL || `https://ui-avatars.com/api/?name=${mission.brand?.name}`
                                  }
                                  alt={mission.brand?.name}
                                  size="xs"
                                  className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                />
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                  {mission.brand?.name}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <div className="w-max">
                                <Chip
                                  variant="gradient"
                                  color={statusColors[mission.status]}
                                  value={mission.status}
                                  className="py-0.5 px-2 text-[11px] font-medium"
                                />
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
                              <Button variant="text" size="sm">
                                View Details
                              </Button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </TabPanel>

              <TabPanel value="analytics">
                <div className="mb-6">
                  <Typography variant="h6" color="blue-gray" className="mb-4">
                    Performance Metrics
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-4">
                      <Typography variant="h6" color="blue-gray" className="mb-2">
                        Satisfaction Rate
                      </Typography>
                      <div className="flex items-center gap-4">
                        <div className="w-full">
                          <Typography variant="small" className="mb-1 block text-xs font-medium text-blue-gray-600">
                            {creator.satisfactionRate || 0}%
                          </Typography>
                          <Progress
                            value={creator.satisfactionRate || 0}
                            color={
                              creator.satisfactionRate > 80 ? "green" : creator.satisfactionRate > 50 ? "amber" : "red"
                            }
                            className="h-1"
                          />
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <Typography variant="h6" color="blue-gray" className="mb-2">
                        On-Time Delivery
                      </Typography>
                      <div className="flex items-center gap-4">
                        <div className="w-full">
                          <Typography variant="small" className="mb-1 block text-xs font-medium text-blue-gray-600">
                            {creator.onTimeDeliveryRate || 0}%
                          </Typography>
                          <Progress
                            value={creator.onTimeDeliveryRate || 0}
                            color={
                              creator.onTimeDeliveryRate > 80
                                ? "green"
                                : creator.onTimeDeliveryRate > 50
                                  ? "amber"
                                  : "red"
                            }
                            className="h-1"
                          />
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <Typography variant="h6" color="blue-gray" className="mb-2">
                        Revision Rate
                      </Typography>
                      <div className="flex items-center gap-4">
                        <div className="w-full">
                          <Typography variant="small" className="mb-1 block text-xs font-medium text-blue-gray-600">
                            {creator.revisionRate || 0}%
                          </Typography>
                          <Progress
                            value={creator.revisionRate || 0}
                            color={creator.revisionRate < 20 ? "green" : creator.revisionRate < 50 ? "amber" : "red"}
                            className="h-1"
                          />
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <Typography variant="h6" color="blue-gray" className="mb-2">
                        Response Time
                      </Typography>
                      <div className="flex items-center gap-4">
                        <div className="w-full">
                          <Typography variant="small" className="mb-1 block text-xs font-medium text-blue-gray-600">
                            {creator.responseTime || 0} hours avg.
                          </Typography>
                          <Progress
                            value={creator.responseTime ? Math.min(100, (24 - creator.responseTime) * 4) : 0}
                            color={creator.responseTime < 6 ? "green" : creator.responseTime < 12 ? "amber" : "red"}
                            className="h-1"
                          />
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                <div className="mt-8">
                  <Typography variant="h6" color="blue-gray" className="mb-4">
                    Mission Completion History
                  </Typography>
                  <Card className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <Typography variant="h3" color="blue-gray">
                          {creator.completedMissions || 0}
                        </Typography>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          Completed Missions
                        </Typography>
                      </div>
                      <div className="text-center">
                        <Typography variant="h3" color="blue-gray">
                          ${creator.totalEarnings || 0}
                        </Typography>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          Total Earnings
                        </Typography>
                      </div>
                      <div className="text-center">
                        <Typography variant="h3" color="blue-gray">
                          {creator.averageMissionDuration || 0}
                        </Typography>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          Avg. Days per Mission
                        </Typography>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabPanel>
            </TabsBody>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default CreatorProfile
