"use client"

import { useState, useEffect } from "react"
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Input,
  Chip,
  Avatar,
  IconButton,
  Tabs,
  TabsHeader,
  Tab,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Badge,
} from "@material-tailwind/react"
import { MagnifyingGlassIcon, EllipsisVerticalIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { fetchCreators } from "../../services/firebase-service"

export function CreatorList() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const loadCreators = async () => {
      setLoading(true)
      try {
        // In a real implementation, this would fetch from your database
        const response = await fetchCreators()
        if (response.success) {
          setCreators(response.data)
        }
      } catch (error) {
        console.error("Error loading creators:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCreators()
  }, [])

  // Filter creators based on search term and active tab
  const filteredCreators = creators.filter((creator) => {
    const matchesSearch =
      creator.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.email.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "pending") return matchesSearch && creator.status === "pending"
    if (activeTab === "approved") return matchesSearch && creator.status === "approved"
    if (activeTab === "rejected") return matchesSearch && creator.status === "rejected"

    return matchesSearch
  })

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
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Creator Management
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <div className="flex flex-wrap items-center justify-between px-4 py-2">
            <div className="w-full md:w-72 mb-4 md:mb-0">
              <Input
                label="Search Creator"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-auto">
              <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
                <TabsHeader>
                  <Tab value="all">All</Tab>
                  <Tab value="pending">
                    <div className="flex items-center gap-2">
                      Pending
                      <Badge content={creators.filter((c) => c.status === "pending").length} color="amber" />
                    </div>
                  </Tab>
                  <Tab value="approved">Approved</Tab>
                  <Tab value="rejected">Rejected</Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredCreators.length === 0 ? (
            <div className="text-center py-8">
              <Typography color="blue-gray" className="font-normal">
                No creators found
              </Typography>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Creator", "Category", "Status", "Rating", "Badge", "Actions"].map((el) => (
                      <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                        <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredCreators.map((creator, index) => {
                    const className = `py-3 px-5 ${
                      index === filteredCreators.length - 1 ? "" : "border-b border-blue-gray-50"
                    }`

                    return (
                      <tr key={creator.id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar
                              src={
                                creator.photoURL ||
                                `https://ui-avatars.com/api/?name=${creator.firstName}+${creator.lastName}`
                              }
                              alt={`${creator.firstName} ${creator.lastName}`}
                              size="sm"
                              className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                            />
                            <div>
                              <Typography variant="small" color="blue-gray" className="font-semibold">
                                {creator.firstName} {creator.lastName}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {creator.email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex flex-wrap gap-1">
                            {creator.categories?.slice(0, 2).map((category) => (
                              <Chip
                                key={category}
                                value={category}
                                variant="ghost"
                                size="sm"
                                className="rounded-full py-1.5"
                              />
                            ))}
                            {creator.categories?.length > 2 && (
                              <Chip
                                value={`+${creator.categories.length - 2}`}
                                variant="ghost"
                                size="sm"
                                className="rounded-full py-1.5"
                              />
                            )}
                          </div>
                        </td>
                        <td className={className}>
                          <div className="w-max">
                            <Chip
                              variant="gradient"
                              color={statusColors[creator.status]}
                              value={creator.status}
                              className="py-0.5 px-2 text-[11px] font-medium"
                            />
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4 text-amber-500"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {creator.rating || "N/A"}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          {creator.badge ? (
                            <Chip
                              variant="gradient"
                              color={badgeColors[creator.badge.toLowerCase()]}
                              value={creator.badge}
                              className="py-0.5 px-2 text-[11px] font-medium"
                            />
                          ) : (
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              None
                            </Typography>
                          )}
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-2">
                            {creator.status === "pending" && (
                              <>
                                <IconButton variant="text" color="green" className="rounded-full">
                                  <CheckCircleIcon className="h-4 w-4" />
                                </IconButton>
                                <IconButton variant="text" color="red" className="rounded-full">
                                  <XCircleIcon className="h-4 w-4" />
                                </IconButton>
                              </>
                            )}
                            <Menu placement="left-start">
                              <MenuHandler>
                                <IconButton variant="text" color="blue-gray">
                                  <EllipsisVerticalIcon className="h-5 w-5" />
                                </IconButton>
                              </MenuHandler>
                              <MenuList>
                                <MenuItem>View Profile</MenuItem>
                                <MenuItem>View Portfolio</MenuItem>
                                <MenuItem>View Missions</MenuItem>
                                <MenuItem>Edit Rating</MenuItem>
                              </MenuList>
                            </Menu>
                          </div>
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

export default CreatorList
