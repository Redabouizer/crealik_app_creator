"use client"

import React, { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  Input,
  IconButton,
  Tabs,
  TabsHeader,
  Tab,
  Badge,
  Textarea,
} from "@material-tailwind/react"
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  FaceSmileIcon,
  EllipsisVerticalIcon,
  PhoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline"

// Mock data for conversations
const mockConversations = [
  {
    id: "conv1",
    user: {
      name: "Sarah Creator",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Creator&background=FF5733&color=fff",
      online: true,
      lastSeen: new Date(),
    },
    lastMessage: {
      text: "I've just uploaded the final version of the video. Let me know what you think!",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      unread: true,
    },
    mission: "Summer Collection Showcase",
  },
  {
    id: "conv2",
    user: {
      name: "Mike Vlogger",
      avatar: "https://ui-avatars.com/api/?name=Mike+Vlogger&background=9C27B0&color=fff",
      online: false,
      lastSeen: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
    },
    lastMessage: {
      text: "Thanks for the feedback! I'll make those changes and get back to you tomorrow.",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      unread: false,
    },
    mission: "Product Unboxing Video",
  },
  {
    id: "conv3",
    user: {
      name: "Emma Beauty",
      avatar: "https://ui-avatars.com/api/?name=Emma+Beauty&background=E91E63&color=fff",
      online: true,
      lastSeen: new Date(),
    },
    lastMessage: {
      text: "I'd love to work on this project! When do you need it completed by?",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      unread: false,
    },
    mission: "Makeup Tutorial Series",
  },
]

// Mock messages for the selected conversation
const mockMessages = [
  {
    id: "msg1",
    sender: "user",
    text: "Hi Sarah, I hope you're doing well!",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
  {
    id: "msg2",
    sender: "other",
    text: "Hi there! I'm great, thanks for asking. How can I help you today?",
    timestamp: new Date(Date.now() - 28 * 60 * 1000), // 28 minutes ago
  },
  {
    id: "msg3",
    sender: "user",
    text: "I'm looking for someone to create content for our summer collection. I saw your portfolio and I think your style would be perfect for this project.",
    timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
  },
  {
    id: "msg4",
    sender: "other",
    text: "That sounds exciting! I'd love to hear more about the project. What kind of content are you looking for specifically?",
    timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
  },
  {
    id: "msg5",
    sender: "user",
    text: "We need 5-6 high-quality photos showcasing our summer dresses in outdoor settings. The vibe should be casual, fun, and summery. We'd also like one 30-second video for Instagram Reels.",
    timestamp: new Date(Date.now() - 18 * 60 * 1000), // 18 minutes ago
  },
  {
    id: "msg6",
    sender: "other",
    text: "That sounds right up my alley! I have some great outdoor locations in mind that would work perfectly for this. When would you need this completed by?",
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
  },
  {
    id: "msg7",
    sender: "user",
    text: "We're looking to launch the collection in about 3 weeks, so ideally we'd need the content in 2 weeks. Does that timeline work for you?",
    timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
  },
  {
    id: "msg8",
    sender: "other",
    text: "Yes, that timeline works for me! I can definitely deliver within 2 weeks. Would you be providing the dresses or should I source them?",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
  },
]

export function Messages({ user }) {
  const [conversations, setConversations] = useState(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const messagesEndRef = React.useRef(null)

  useEffect(() => {
    // In a real app, you would fetch conversations from Firebase here
    // For now, we'll use the mock data
    setConversations(mockConversations)
  }, [])

  useEffect(() => {
    // When a conversation is selected, load its messages
    if (selectedConversation) {
      // In a real app, you would fetch messages from Firebase here
      // For now, we'll use the mock data
      setMessages(mockMessages)

      // Mark conversation as read
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === selectedConversation.id
            ? {
                ...conv,
                lastMessage: {
                  ...conv.lastMessage,
                  unread: false,
                },
              }
            : conv,
        ),
      )
    }
  }, [selectedConversation])

  useEffect(() => {
    // Scroll to bottom of messages when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation) return

    const newMsg = {
      id: `msg${messages.length + 1}`,
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  const filteredConversations = conversations.filter((conv) => {
    // Filter by search query
    const matchesSearch = conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab
    if (activeTab === "all") return matchesSearch
    if (activeTab === "unread") return matchesSearch && conv.lastMessage.unread
    return matchesSearch
  })

  const formatTime = (date) => {
    const now = new Date()
    const diffMs = now - date
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffMs / (1000 * 60))

    if (diffDays > 0) {
      return `${diffDays}d ago`
    } else if (diffHours > 0) {
      return `${diffHours}h ago`
    } else if (diffMinutes > 0) {
      return `${diffMinutes}m ago`
    } else {
      return "Just now"
    }
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card className="overflow-hidden">
        <CardHeader variant="gradient" color="blue" className="mb-0 p-6">
          <Typography variant="h6" color="white">
            Messages
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          <div className="flex h-[calc(80vh-10rem)] flex-col md:flex-row">
            {/* Conversations List */}
            <div className="w-full md:w-1/3 border-r border-blue-gray-100">
              <div className="p-4 border-b border-blue-gray-100">
                <Input
                  label="Search conversations"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="p-2">
                <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
                  <TabsHeader>
                    <Tab value="all">All</Tab>
                    <Tab value="unread">
                      Unread
                      <Badge content={conversations.filter((c) => c.lastMessage.unread).length} className="ml-2" />
                    </Tab>
                  </TabsHeader>
                </Tabs>
              </div>
              <div className="overflow-y-auto h-[calc(80vh-16rem)]">
                {filteredConversations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <Typography variant="small" color="blue-gray" className="font-normal text-center">
                      No conversations found
                    </Typography>
                  </div>
                ) : (
                  filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-blue-gray-50 transition-colors ${
                        selectedConversation?.id === conversation.id ? "bg-blue-gray-50" : ""
                      } ${conversation.lastMessage.unread ? "bg-blue-50" : ""}`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="relative">
                        <Avatar
                          src={conversation.user.avatar}
                          alt={conversation.user.name}
                          size="md"
                          className="border border-blue-gray-50"
                        />
                        {conversation.user.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <Typography variant="small" color="blue-gray" className="font-semibold truncate">
                            {conversation.user.name}
                          </Typography>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {formatTime(conversation.lastMessage.timestamp)}
                          </Typography>
                        </div>
                        <Typography
                          variant="small"
                          color={conversation.lastMessage.unread ? "blue-gray" : "blue-gray"}
                          className={`truncate ${conversation.lastMessage.unread ? "font-medium" : "font-normal opacity-70"}`}
                        >
                          {conversation.lastMessage.text}
                        </Typography>
                        <Typography variant="small" color="blue" className="font-normal text-xs">
                          {conversation.mission}
                        </Typography>
                      </div>
                      {conversation.lastMessage.unread && <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Chat Area */}
            {selectedConversation ? (
              <div className="flex flex-col w-full md:w-2/3">
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b border-blue-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar
                        src={selectedConversation.user.avatar}
                        alt={selectedConversation.user.name}
                        size="md"
                        className="border border-blue-gray-50"
                      />
                      {selectedConversation.user.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                      )}
                    </div>
                    <div>
                      <Typography variant="h6" color="blue-gray">
                        {selectedConversation.user.name}
                      </Typography>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {selectedConversation.user.online
                          ? "Online"
                          : `Last seen ${formatTime(selectedConversation.user.lastSeen)}`}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconButton variant="text" color="blue-gray">
                      <PhoneIcon className="h-5 w-5" />
                    </IconButton>
                    <IconButton variant="text" color="blue-gray">
                      <VideoCameraIcon className="h-5 w-5" />
                    </IconButton>
                    <IconButton variant="text" color="blue-gray">
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </IconButton>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-blue-gray-50/30">
                  <div className="flex flex-col gap-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.sender === "user"
                              ? "bg-blue-500 text-white rounded-br-none"
                              : "bg-white text-blue-gray-800 rounded-bl-none shadow"
                          }`}
                        >
                          <Typography variant="small" className="font-normal">
                            {message.text}
                          </Typography>
                          <Typography
                            variant="small"
                            className={`text-xs mt-1 text-right ${
                              message.sender === "user" ? "text-blue-100" : "text-blue-gray-400"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </Typography>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-blue-gray-100">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <IconButton variant="text" color="blue-gray" type="button">
                      <PaperClipIcon className="h-5 w-5" />
                    </IconButton>
                    <div className="flex-1">
                      <Textarea
                        rows={1}
                        resize={false}
                        placeholder="Type a message..."
                        className="min-h-[40px] !border-0 focus:border-transparent"
                        containerProps={{
                          className: "grid h-full",
                        }}
                        labelProps={{
                          className: "hidden",
                        }}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                    </div>
                    <IconButton variant="text" color="blue-gray" type="button">
                      <FaceSmileIcon className="h-5 w-5" />
                    </IconButton>
                    <Button
                      type="submit"
                      color="blue"
                      className="flex items-center gap-2 rounded-full w-10 h-10 p-0 justify-center"
                      disabled={!newMessage.trim()}
                    >
                      <PaperAirplaneIcon className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full md:w-2/3 p-8">
                <div className="rounded-full bg-blue-50 p-6 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-12 w-12 text-blue-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  Your Messages
                </Typography>
                <Typography variant="small" color="blue-gray" className="font-normal text-center max-w-md">
                  Select a conversation from the list to view messages. You can communicate with creators and brands
                  directly through this messaging system.
                </Typography>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Messages
