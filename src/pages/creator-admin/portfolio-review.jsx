"use client"

import { useState, useEffect } from "react"
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  IconButton,
} from "@material-tailwind/react"
import { CheckCircleIcon, XCircleIcon, ChatBubbleLeftRightIcon, EyeIcon } from "@heroicons/react/24/outline"
import { fetchPortfolioItems } from "../../services/firebase-service"

export function PortfolioReview() {
  const [portfolioItems, setPortfolioItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("pending")
  const [selectedItem, setSelectedItem] = useState(null)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    const loadPortfolioItems = async () => {
      setLoading(true)
      try {
        // In a real implementation, this would fetch from your database
        const response = await fetchPortfolioItems()
        if (response.success) {
          setPortfolioItems(response.data)
        }
      } catch (error) {
        console.error("Error loading portfolio items:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPortfolioItems()
  }, [])

  // Filter portfolio items based on active tab
  const filteredItems = portfolioItems.filter((item) => {
    if (activeTab === "all") return true
    return item.status === activeTab
  })

  // Status badge colors
  const statusColors = {
    pending: "amber",
    approved: "green",
    rejected: "red",
  }

  const handleOpenFeedback = (item) => {
    setSelectedItem(item)
    setFeedback(item.feedback || "")
    setFeedbackOpen(true)
  }

  const handleOpenPreview = (item) => {
    setSelectedItem(item)
    setPreviewOpen(true)
  }

  const handleSendFeedback = () => {
    // In a real implementation, this would update the database
    console.log(`Sending feedback for item ${selectedItem.id}: ${feedback}`)
    setFeedbackOpen(false)
  }

  const handleApprove = (item) => {
    // In a real implementation, this would update the database
    console.log(`Approving item ${item.id}`)
  }

  const handleReject = (item) => {
    // In a real implementation, this would update the database
    console.log(`Rejecting item ${item.id}`)
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Portfolio Review
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <div className="px-4 py-2">
            <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
              <TabsHeader>
                <Tab value="pending">
                  <div className="flex items-center gap-2">
                    Pending Review
                    <Chip
                      value={portfolioItems.filter((item) => item.status === "pending").length}
                      color="amber"
                      className="rounded-full h-5 w-5 p-0"
                    />
                  </div>
                </Tab>
                <Tab value="approved">Approved</Tab>
                <Tab value="rejected">Rejected</Tab>
                <Tab value="all">All Content</Tab>
              </TabsHeader>
            </Tabs>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-8">
              <Typography color="blue-gray" className="font-normal">
                No portfolio items found
              </Typography>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative h-48 cursor-pointer" onClick={() => handleOpenPreview(item)}>
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
                    <div className="flex justify-between items-start">
                      <div>
                        <Typography variant="small" className="font-semibold">
                          {item.title}
                        </Typography>
                        <Typography variant="small" className="font-normal text-blue-gray-500">
                          By {item.creator.name}
                        </Typography>
                      </div>
                      <Typography variant="small" className="font-normal text-blue-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </Typography>
                    </div>
                    {item.description && (
                      <Typography variant="small" className="font-normal mt-2">
                        {item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}
                      </Typography>
                    )}
                  </CardBody>
                  <CardFooter className="pt-0 px-3 pb-3">
                    <div className="flex justify-between">
                      <Button
                        variant="text"
                        color="blue"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleOpenPreview(item)}
                      >
                        <EyeIcon className="h-4 w-4" /> View
                      </Button>
                      <div className="flex gap-1">
                        {item.status === "pending" ? (
                          <>
                            <IconButton variant="text" color="green" size="sm" onClick={() => handleApprove(item)}>
                              <CheckCircleIcon className="h-4 w-4" />
                            </IconButton>
                            <IconButton variant="text" color="red" size="sm" onClick={() => handleReject(item)}>
                              <XCircleIcon className="h-4 w-4" />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton variant="text" color="blue" size="sm" onClick={() => handleOpenFeedback(item)}>
                            <ChatBubbleLeftRightIcon className="h-4 w-4" />
                          </IconButton>
                        )}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Feedback Dialog */}
      <Dialog open={feedbackOpen} handler={() => setFeedbackOpen(false)}>
        <DialogHeader>Provide Feedback</DialogHeader>
        <DialogBody>
          <div className="mb-4">
            <Typography variant="small" className="font-semibold mb-2">
              Content: {selectedItem?.title}
            </Typography>
            <Typography variant="small" className="font-normal">
              Creator: {selectedItem?.creator.name}
            </Typography>
          </div>
          <Textarea label="Feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={6} />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setFeedbackOpen(false)} className="mr-1">
            Cancel
          </Button>
          <Button variant="gradient" color="blue" onClick={handleSendFeedback}>
            Send Feedback
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog size="xl" open={previewOpen} handler={() => setPreviewOpen(false)}>
        <DialogHeader className="flex justify-between">
          <div>
            <Typography variant="h6">{selectedItem?.title}</Typography>
            <Typography variant="small" className="font-normal">
              By {selectedItem?.creator.name}
            </Typography>
          </div>
          <Chip
            variant="gradient"
            color={selectedItem ? statusColors[selectedItem.status] : "blue-gray"}
            value={selectedItem?.status}
            className="py-0.5 px-2 text-[11px] font-medium"
          />
        </DialogHeader>
        <DialogBody divider className="p-0">
          <div className="relative w-full" style={{ height: "70vh" }}>
            {selectedItem?.type === "image" ? (
              <img
                src={selectedItem?.url || "/placeholder.svg"}
                alt={selectedItem?.title}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="h-full w-full bg-black flex items-center justify-center">
                <video src={selectedItem?.url} controls className="h-full max-h-full max-w-full"></video>
              </div>
            )}
          </div>
          {selectedItem?.description && (
            <div className="p-4">
              <Typography variant="small" className="font-semibold mb-2">
                Description
              </Typography>
              <Typography variant="small" className="font-normal">
                {selectedItem?.description}
              </Typography>
            </div>
          )}
        </DialogBody>
        <DialogFooter className="flex justify-between">
          <div>
            {selectedItem?.status === "pending" && (
              <>
                <Button
                  color="green"
                  onClick={() => {
                    handleApprove(selectedItem)
                    setPreviewOpen(false)
                  }}
                  className="mr-2"
                >
                  Approve
                </Button>
                <Button
                  color="red"
                  onClick={() => {
                    handleReject(selectedItem)
                    setPreviewOpen(false)
                  }}
                >
                  Reject
                </Button>
              </>
            )}
          </div>
          <Button
            variant="text"
            color="blue"
            onClick={() => {
              handleOpenFeedback(selectedItem)
              setPreviewOpen(false)
            }}
          >
            Provide Feedback
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default PortfolioReview
