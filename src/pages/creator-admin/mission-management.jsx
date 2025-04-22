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
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Tabs,
  TabsHeader,
  Tab,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react"
import {
  EllipsisVerticalIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"
import { fetchCreatorMissions } from "../../services/firebase-service"

export function MissionManagement() {
  const [missions, setMissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedMission, setSelectedMission] = useState(null)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    const loadMissions = async () => {
      setLoading(true)
      try {
        // In a real implementation, this would fetch from your database
        const response = await fetchCreatorMissions()
        if (response.success) {
          setMissions(response.data)
        }
      } catch (error) {
        console.error("Error loading missions:", error)
      } finally {
        setLoading(false)
      }
    }

    loadMissions()
  }, [])

  // Filter missions based on active tab
  const filteredMissions = missions.filter((mission) => {
    if (activeTab === "all") return true
    return mission.status === activeTab
  })

  // Status badge colors
  const statusColors = {
    pending: "amber",
    inProgress: "blue",
    review: "purple",
    completed: "green",
    rejected: "red",
  }

  const handleOpenFeedback = (mission) => {
    setSelectedMission(mission)
    setFeedback(mission.feedback || "")
    setFeedbackOpen(true)
  }

  const handleSendFeedback = () => {
    // In a real implementation, this would update the database
    console.log(`Sending feedback for mission ${selectedMission.id}: ${feedback}`)
    setFeedbackOpen(false)
  }

  const handleApproveMission = (mission) => {
    // In a real implementation, this would update the database
    console.log(`Approving mission ${mission.id}`)
  }

  const handleRejectMission = (mission) => {
    // In a real implementation, this would update the database
    console.log(`Rejecting mission ${mission.id}`)
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Mission Management
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <div className="px-4 py-2">
            <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
              <TabsHeader>
                <Tab value="all">All Missions</Tab>
                <Tab value="pending">Pending</Tab>
                <Tab value="inProgress">In Progress</Tab>
                <Tab value="review">Under Review</Tab>
                <Tab value="completed">Completed</Tab>
              </TabsHeader>
            </Tabs>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredMissions.length === 0 ? (
            <div className="text-center py-8">
              <Typography color="blue-gray" className="font-normal">
                No missions found
              </Typography>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Mission", "Creator", "Status", "Deadline", "Budget", "Actions"].map((el) => (
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
                                `https://ui-avatars.com/api/?name=${mission.assignedTo?.name}`
                              }
                              alt={mission.assignedTo?.name}
                              size="sm"
                              className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                            />
                            <div>
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                {mission.assignedTo?.name}
                              </Typography>
                              <div className="flex items-center gap-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-3 h-3 text-amber-500"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <Typography variant="small" color="blue-gray" className="text-xs font-normal">
                                  {mission.assignedTo?.rating || "N/A"}
                                </Typography>
                              </div>
                            </div>
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
                          <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {new Date(mission.deadline).toLocaleDateString()}
                            </Typography>
                            {new Date(mission.deadline) < new Date() ? (
                              <Typography
                                variant="small"
                                color="red"
                                className="text-xs font-normal flex items-center gap-1"
                              >
                                <ClockIcon className="h-3 w-3" /> Overdue
                              </Typography>
                            ) : (
                              <Typography variant="small" color="blue-gray" className="text-xs font-normal">
                                {Math.ceil((new Date(mission.deadline) - new Date()) / (1000 * 60 * 60 * 24))} days left
                              </Typography>
                            )}
                          </div>
                        </td>
                        <td className={className}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            ${mission.budget}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-2">
                            {mission.status === "review" && (
                              <>
                                <IconButton
                                  variant="text"
                                  color="green"
                                  className="rounded-full"
                                  onClick={() => handleApproveMission(mission)}
                                >
                                  <CheckCircleIcon className="h-4 w-4" />
                                </IconButton>
                                <IconButton
                                  variant="text"
                                  color="red"
                                  className="rounded-full"
                                  onClick={() => handleRejectMission(mission)}
                                >
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
                                <MenuItem>View Details</MenuItem>
                                <MenuItem onClick={() => handleOpenFeedback(mission)}>Send Feedback</MenuItem>
                                {mission.status === "review" && (
                                  <>
                                    <MenuItem onClick={() => handleApproveMission(mission)}>Approve Mission</MenuItem>
                                    <MenuItem onClick={() => handleRejectMission(mission)}>Reject Mission</MenuItem>
                                  </>
                                )}
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

      {/* Feedback Dialog */}
      <Dialog open={feedbackOpen} handler={() => setFeedbackOpen(false)}>
        <DialogHeader>Provide Feedback</DialogHeader>
        <DialogBody>
          <div className="mb-4">
            <Typography variant="small" className="font-semibold mb-2">
              Mission: {selectedMission?.title}
            </Typography>
            <Typography variant="small" className="font-normal">
              Creator: {selectedMission?.assignedTo?.name}
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
    </div>
  )
}

export default MissionManagement
