"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Chip,
  Button,
  Input,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Rating,
  Tooltip,
  Badge,
} from "@material-tailwind/react"
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  FunnelIcon,
  UserPlusIcon,
  ChatBubbleLeftRightIcon,
  BriefcaseIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline"
import { fetchRecommendedCreators } from "../../services/firebase-service"

export function Creators({ user }) {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const userType = user?.profile?.userType || "brand"
  const categories = ["All", "Fashion", "Beauty", "Tech", "Lifestyle", "Food", "Travel", "Fitness"]

  useEffect(() => {
    const loadCreators = async () => {
      setLoading(true)
      try {
        const category = user?.profile?.primaryCategory || "general"
        const { data } = await fetchRecommendedCreators(user?.uid, category)
        setCreators(data || [])
      } catch (error) {
        console.error("Error loading creators:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user?.uid && userType === "brand") {
      loadCreators()
    }
  }, [user, userType])

  const filteredCreators = creators.filter((creator) => {
    // Filter by search query
    const matchesSearch =
      creator.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.categories?.some((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase())) ||
      creator.skills?.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    // Filter by category tab
    if (activeTab === "all") return matchesSearch
    return matchesSearch && creator.categories?.includes(activeTab.toLowerCase())
  })

  if (userType !== "brand") {
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardBody className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-blue-50 p-6 mb-4">
              <UserPlusIcon className="h-12 w-12 text-blue-500" />
            </div>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Creator Access Restricted
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="font-normal text-center max-w-md">
              This section is only available to brands. As a creator, you can focus on completing missions and building
              your portfolio.
            </Typography>
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Typography variant="h6" color="white">
                Creator Directory
              </Typography>
              <Typography variant="small" color="white" className="mt-1 font-normal">
                Find and collaborate with talented UGC creators for your brand
              </Typography>
            </div>
            <Button className="flex items-center gap-2 bg-white text-blue-500">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
              Invite Creator
            </Button>
          </div>
        </CardHeader>
        <CardBody className="px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full md:w-72">
              <Input
                label="Search creators"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
                <TabsHeader>
                  {categories.map((category) => (
                    <Tab key={category.toLowerCase()} value={category.toLowerCase()}>
                      {category}
                    </Tab>
                  ))}
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
          ) : filteredCreators.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="rounded-full bg-blue-50 p-3 mb-4">
                <UserPlusIcon className="h-8 w-8 text-blue-500" />
              </div>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                No creators found
              </Typography>
              <Typography variant="small" color="blue-gray" className="font-normal opacity-70 max-w-sm text-center">
                {searchQuery
                  ? "Try adjusting your search or filters to find what you're looking for."
                  : "We couldn't find any creators matching your criteria."}
              </Typography>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredCreators.map((creator) => (
                <Card key={creator.id} className="overflow-hidden">
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 p-6 bg-gradient-to-r from-blue-50 to-blue-100"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={
                            creator.photoURL ||
                            `https://ui-avatars.com/api/?name=${creator.firstName}+${creator.lastName}&background=0D8ABC&color=fff`
                          }
                          alt={`${creator.firstName} ${creator.lastName}`}
                          size="lg"
                          className="border-2 border-white"
                        />
                        <div>
                          <Typography variant="h6" color="blue-gray">
                            {creator.firstName} {creator.lastName}
                          </Typography>
                          <div className="flex items-center gap-2">
                            <Rating value={creator.rating || 0} readonly />
                            <Typography color="blue-gray" className="font-medium">
                              {creator.rating || 0}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      {creator.verified && (
                        <Tooltip content="Verified Creator">
                          <Badge color="blue">
                            <CheckBadgeIcon className="h-5 w-5" />
                          </Badge>
                        </Tooltip>
                      )}
                    </div>
                  </CardHeader>
                  <CardBody className="p-6">
                    <div className="mb-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {creator.bio || "No bio available"}
                      </Typography>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {creator.categories?.map((category) => (
                        <Chip
                          key={category}
                          value={category}
                          variant="ghost"
                          color="blue"
                          size="sm"
                          className="capitalize"
                        />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {creator.skills?.map((skill) => (
                        <Chip
                          key={skill}
                          value={skill}
                          variant="outlined"
                          size="sm"
                          className="bg-blue-gray-50 text-blue-gray-800"
                        />
                      ))}
                    </div>
                  </CardBody>
                  <CardFooter className="pt-0 px-6 pb-6">
                    <div className="flex gap-2">
                      <Button color="blue" className="flex-1 flex items-center justify-center gap-2">
                        <BriefcaseIcon strokeWidth={2} className="h-4 w-4" />
                        Invite to Mission
                      </Button>
                      <Button variant="outlined" color="blue" className="flex items-center justify-center gap-2">
                        <ChatBubbleLeftRightIcon strokeWidth={2} className="h-4 w-4" />
                        Message
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
}

export default Creators
