"use client"

import { useState, useEffect } from "react"
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  Chip,
  Avatar,
  Progress,
  Tabs,
  TabsHeader,
  Tab,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react"
import { StarIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline"
import { fetchCreators } from "../../services/firebase-service"

export function RatingManagement() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCreator, setSelectedCreator] = useState(null)
  const [ratingOpen, setRatingOpen] = useState(false)
  const [rating, setRating] = useState(5)
  const [feedback, setFeedback] = useState("")

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

  // Filter creators based on active tab
  const filteredCreators = creators.filter((creator) => {
    if (activeTab === "all") return true
    if (activeTab === "highRated") return creator.rating >= 4.5
    if (activeTab === "lowRated") return creator.rating < 3.5
    if (activeTab === "noRating") return !creator.rating
    return true
  })

  const handleOpenRating = (creator) => {
    setSelectedCreator(creator)
    setRating(creator.rating || 5)
    setFeedback(creator.ratingComment || "")
    setRatingOpen(true)
  }

  const handleSaveRating = () => {
    // In a real implementation, this would update the database
    console.log(`Saving rating for creator ${selectedCreator.id}: ${rating}, feedback: ${feedback}`)
    setRatingOpen(false)
  }

  const getRatingColor = (rating) => {
    if (!rating) return "blue-gray"
    if (rating >= 4.5) return "green"
    if (rating >= 3.5) return "blue"
    if (rating >= 2.5) return "amber"
    return "red"
  }

  return (
    <div className="py-6">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Rating Management
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <div className="px-4 py-2">
            <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
              <TabsHeader>
                <Tab value="all">All Creators</Tab>
                <Tab value="highRated">High Rated (4.5+)</Tab>
                <Tab value="lowRated">Low Rated (&lt; 3.5)</Tab>
                <Tab value="noRating">No Rating</Tab>
              </TabsHeader>
            </Tabs>
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
            <div className="overflow-x-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCreators.map((creator) => (
                  <Card key={creator.id} className="shadow-sm">
                    <CardBody className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={
                            creator.photoURL ||
                            `https://ui-avatars.com/api/?name=${creator.firstName}+${creator.lastName}`
                          }
                          alt={`${creator.firstName} ${creator.lastName}`}
                          size="lg"
                          className="border border-blue-gray-50"
                        />
                        <div>
                          <Typography variant="h6" color="blue-gray">
                            {creator.firstName} {creator.lastName}
                          </Typography>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {creator.categories?.slice(0, 2).map((category) => (
                              <Chip
                                key={category}
                                value={category}
                                variant="ghost"
                                size="sm"
                                className="rounded-full py-1"
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="mb-2 flex items-center justify-between">
                          <Typography variant="h6" color="blue-gray">
                            Rating
                          </Typography>
                          <Chip
                            value={creator.rating ? creator.rating.toFixed(1) : "N/A"}
                            variant="gradient"
                            color={getRatingColor(creator.rating)}
                            className="rounded-full h-6 w-14 flex items-center justify-center"
                            icon={
                              <StarIcon className={`h-3 w-3 ${creator.rating ? "text-white" : "text-blue-gray-500"}`} />
                            }
                          />
                        </div>

                        <div className="flex mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              className={`h-5 w-5 ${
                                creator.rating && star <= Math.round(creator.rating)
                                  ? "text-amber-500 fill-amber-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <Typography variant="small" color="blue-gray" className="ml-2">
                            ({creator.reviewCount || 0} reviews)
                          </Typography>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <Typography variant="small" className="font-medium">
                                Satisfaction Rate
                              </Typography>
                              <Typography variant="small" className="font-medium">
                                {creator.satisfactionRate || 0}%
                              </Typography>
                            </div>
                            <Progress
                              value={creator.satisfactionRate || 0}
                              color={
                                (creator.satisfactionRate || 0) > 80
                                  ? "green"
                                  : (creator.satisfactionRate || 0) > 50
                                    ? "amber"
                                    : "red"
                              }
                              className="h-1"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <Typography variant="small" className="font-medium">
                                On-Time Delivery
                              </Typography>
                              <Typography variant="small" className="font-medium">
                                {creator.onTimeDeliveryRate || 0}%
                              </Typography>
                            </div>
                            <Progress
                              value={creator.onTimeDeliveryRate || 0}
                              color={
                                (creator.onTimeDeliveryRate || 0) > 80
                                  ? "green"
                                  : (creator.onTimeDeliveryRate || 0) > 50
                                    ? "amber"
                                    : "red"
                              }
                              className="h-1"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <Typography variant="small" className="font-medium">
                                Revision Rate
                              </Typography>
                              <Typography variant="small" className="font-medium">
                                {creator.revisionRate || 0}%
                              </Typography>
                            </div>
                            <Progress
                              value={creator.revisionRate || 0}
                              color={
                                (creator.revisionRate || 0) < 20
                                  ? "green"
                                  : (creator.revisionRate || 0) < 50
                                    ? "amber"
                                    : "red"
                              }
                              className="h-1"
                            />
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleOpenRating(creator)}
                        variant="text"
                        color="blue"
                        className="flex items-center gap-2 mt-4"
                        fullWidth
                      >
                        <ChatBubbleLeftRightIcon className="h-4 w-4" />
                        {creator.rating ? "Update Rating" : "Add Rating"}
                      </Button>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Rating Dialog */}
      <Dialog open={ratingOpen} handler={() => setRatingOpen(false)}>
        <DialogHeader>Rate Creator</DialogHeader>
        <DialogBody>
          <div className="mb-4">
            <Typography variant="small" className="font-semibold mb-2">
              Creator: {selectedCreator?.firstName} {selectedCreator?.lastName}
            </Typography>
            <div className="flex items-center">
              <Avatar
                src={
                  selectedCreator?.photoURL ||
                  `https://ui-avatars.com/api/?name=${selectedCreator?.firstName}+${selectedCreator?.lastName}`
                }
                alt={`${selectedCreator?.firstName} ${selectedCreator?.lastName}`}
                size="md"
                className="border border-blue-gray-50 mr-3"
              />
              <div>
                <Typography variant="small" className="font-normal">
                  {selectedCreator?.completedMissions || 0} missions completed
                </Typography>
                <Typography variant="small" className="font-normal text-blue-gray-500">
                  Joined:{" "}
                  {selectedCreator?.joinedAt ? new Date(selectedCreator.joinedAt).toLocaleDateString() : "Unknown"}
                </Typography>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <Typography variant="small" className="font-semibold mb-2 block">
              Rating
            </Typography>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                  <StarIcon
                    className={`h-7 w-7 ${star <= rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Typography variant="small" className="font-semibold mb-2 block">
              Feedback
            </Typography>
            <Textarea
              label="Provide detailed feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={5}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setRatingOpen(false)} className="mr-1">
            Cancel
          </Button>
          <Button variant="gradient" color="blue" onClick={handleSaveRating}>
            Save Rating
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default RatingManagement
