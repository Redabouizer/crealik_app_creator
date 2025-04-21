"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  IconButton,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Progress,
} from "@material-tailwind/react"
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  ArrowDownTrayIcon,
  BanknotesIcon,
  CreditCardIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"

// Mock payment data
const mockPayments = [
  {
    id: "pay1",
    mission: "Summer Collection Showcase",
    creator: "Sarah Creator",
    amount: 500,
    status: "completed",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    invoice: "INV-2023-001",
  },
  {
    id: "pay2",
    mission: "Product Unboxing Video",
    creator: "Mike Vlogger",
    amount: 750,
    status: "pending",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    invoice: "INV-2023-002",
  },
  {
    id: "pay3",
    mission: "Lifestyle Integration",
    creator: "Emma Beauty",
    amount: 300,
    status: "processing",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    invoice: "INV-2023-003",
  },
  {
    id: "pay4",
    mission: "Tech Review Series",
    creator: "Alex Tech",
    amount: 1200,
    status: "completed",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    invoice: "INV-2023-004",
  },
  {
    id: "pay5",
    mission: "Fitness Challenge",
    creator: "John Fitness",
    amount: 600,
    status: "failed",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    invoice: "INV-2023-005",
  },
]

// Mock payment stats
const mockPaymentStats = {
  brand: {
    totalSpent: 3350,
    pendingPayments: 750,
    completedPayments: 2000,
    failedPayments: 600,
  },
  creator: {
    totalEarned: 2000,
    pendingPayments: 750,
    completedPayments: 1250,
    failedPayments: 0,
  },
}

export function Payments({ user }) {
  const [payments, setPayments] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const userType = user?.profile?.userType || "brand"

  useEffect(() => {
    // In a real app, you would fetch payments from Firebase here
    // For now, we'll use the mock data
    setLoading(true)
    setTimeout(() => {
      setPayments(mockPayments)
      setStats(mockPaymentStats[userType])
      setLoading(false)
    }, 500)
  }, [userType])

  const filteredPayments = payments.filter((payment) => {
    // Filter by search query
    const matchesSearch =
      payment.mission.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.invoice.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab
    if (activeTab === "all") return matchesSearch
    return matchesSearch && payment.status === activeTab
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green"
      case "processing":
        return "blue"
      case "pending":
        return "amber"
      case "failed":
        return "red"
      default:
        return "blue-gray"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon className="h-4 w-4" />
      case "processing":
      case "pending":
        return <ClockIcon className="h-4 w-4" />
      case "failed":
        return <ExclamationTriangleIcon className="h-4 w-4" />
      default:
        return null
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* Payment Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border border-blue-gray-100">
          <CardBody className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-blue-50 p-2">
                <BanknotesIcon className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {userType === "brand" ? "Total Spent" : "Total Earned"}
                </Typography>
                <Typography variant="h5" color="blue-gray">
                  ${stats.totalSpent || stats.totalEarned || 0}
                </Typography>
              </div>
            </div>
            <Progress value={100} color="blue" className="mt-4 h-1" />
          </CardBody>
        </Card>

        <Card className="border border-blue-gray-100">
          <CardBody className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-green-50 p-2">
                <CheckCircleIcon className="h-8 w-8 text-green-500" />
              </div>
              <div>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  Completed Payments
                </Typography>
                <Typography variant="h5" color="blue-gray">
                  ${stats.completedPayments || 0}
                </Typography>
              </div>
            </div>
            <Progress
              value={(stats.completedPayments / (stats.totalSpent || stats.totalEarned || 1)) * 100}
              color="green"
              className="mt-4 h-1"
            />
          </CardBody>
        </Card>

        <Card className="border border-blue-gray-100">
          <CardBody className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-amber-50 p-2">
                <ClockIcon className="h-8 w-8 text-amber-500" />
              </div>
              <div>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  Pending Payments
                </Typography>
                <Typography variant="h5" color="blue-gray">
                  ${stats.pendingPayments || 0}
                </Typography>
              </div>
            </div>
            <Progress
              value={(stats.pendingPayments / (stats.totalSpent || stats.totalEarned || 1)) * 100}
              color="amber"
              className="mt-4 h-1"
            />
          </CardBody>
        </Card>

        <Card className="border border-blue-gray-100">
          <CardBody className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-red-50 p-2">
                <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
              </div>
              <div>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  Failed Payments
                </Typography>
                <Typography variant="h5" color="blue-gray">
                  ${stats.failedPayments || 0}
                </Typography>
              </div>
            </div>
            <Progress
              value={(stats.failedPayments / (stats.totalSpent || stats.totalEarned || 1)) * 100}
              color="red"
              className="mt-4 h-1"
            />
          </CardBody>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Typography variant="h6" color="white">
                Payment History
              </Typography>
              <Typography variant="small" color="white" className="mt-1 font-normal">
                {userType === "brand" ? "Track all your payments to creators" : "Track all your earnings from missions"}
              </Typography>
            </div>
            <Button className="flex items-center gap-2 bg-white text-blue-500">
              <CreditCardIcon strokeWidth={2} className="h-4 w-4" />
              {userType === "brand" ? "Add Payment Method" : "Set Payout Method"}
            </Button>
          </div>
        </CardHeader>
        <CardBody className="px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full md:w-72">
              <Input
                label="Search payments"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
                <TabsHeader>
                  <Tab value="all">All</Tab>
                  <Tab value="completed">Completed</Tab>
                  <Tab value="pending">Pending</Tab>
                  <Tab value="processing">Processing</Tab>
                  <Tab value="failed">Failed</Tab>
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
          ) : filteredPayments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="rounded-full bg-blue-50 p-3 mb-4">
                <BanknotesIcon className="h-8 w-8 text-blue-500" />
              </div>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                No payments found
              </Typography>
              <Typography variant="small" color="blue-gray" className="font-normal opacity-70 max-w-sm text-center">
                {searchQuery
                  ? "Try adjusting your search or filters to find what you're looking for."
                  : userType === "brand"
                    ? "You haven't made any payments yet. Create a mission to get started."
                    : "You haven't received any payments yet. Complete missions to earn money."}
              </Typography>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] table-auto mt-4">
                <thead>
                  <tr>
                    {[
                      "invoice",
                      "mission",
                      userType === "brand" ? "creator" : "from",
                      "amount",
                      "date",
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
                  {filteredPayments.map((payment, index) => {
                    const className = `py-3 px-5 ${
                      index === filteredPayments.length - 1 ? "" : "border-b border-blue-gray-50"
                    }`
                    const statusColor = getStatusColor(payment.status)
                    const statusIcon = getStatusIcon(payment.status)

                    return (
                      <tr key={payment.id}>
                        <td className={className}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {payment.invoice}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {payment.mission}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {payment.creator}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            ${payment.amount}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-1">
                            <CalendarDaysIcon className="h-4 w-4 text-blue-gray-500" />
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {formatDate(payment.date)}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={payment.status}
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
                              <MenuItem className="flex items-center gap-2">
                                <ArrowDownTrayIcon className="h-4 w-4" />
                                Download Invoice
                              </MenuItem>
                              <MenuItem>View Details</MenuItem>
                              {payment.status === "pending" && userType === "brand" && (
                                <MenuItem>Process Payment</MenuItem>
                              )}
                              {payment.status === "failed" && <MenuItem>Retry Payment</MenuItem>}
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

export default Payments
