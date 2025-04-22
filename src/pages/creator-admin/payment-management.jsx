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
} from "@material-tailwind/react"
import {
  EllipsisVerticalIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  BanknotesIcon,
  DocumentTextIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline"
import { fetchPayments } from "../../services/firebase-service"

export function PaymentManagement() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [invoiceOpen, setInvoiceOpen] = useState(false)

  useEffect(() => {
    const loadPayments = async () => {
      setLoading(true)
      try {
        // In a real implementation, this would fetch from your database
        const response = await fetchPayments()
        if (response.success) {
          setPayments(response.data)
        }
      } catch (error) {
        console.error("Error loading payments:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPayments()
  }, [])

  // Filter payments based on active tab
  const filteredPayments = payments.filter((payment) => {
    if (activeTab === "all") return true
    return payment.status === activeTab
  })

  // Status badge colors
  const statusColors = {
    pending: "amber",
    paid: "green",
    failed: "red",
  }

  const handleOpenInvoice = (payment) => {
    setSelectedPayment(payment)
    setInvoiceOpen(true)
  }

  const handleProcessPayment = (payment) => {
    // In a real implementation, this would update the database
    console.log(`Processing payment ${payment.id}`)
  }

  const handleDownloadInvoice = (payment) => {
    // In a real implementation, this would download the invoice
    console.log(`Downloading invoice for payment ${payment.id}`)
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Payment Management
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <div className="px-4 py-2">
            <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
              <TabsHeader>
                <Tab value="all">All Payments</Tab>
                <Tab value="pending">Pending</Tab>
                <Tab value="paid">Paid</Tab>
                <Tab value="failed">Failed</Tab>
              </TabsHeader>
            </Tabs>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="text-center py-8">
              <Typography color="blue-gray" className="font-normal">
                No payments found
              </Typography>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Invoice", "Creator", "Mission", "Amount", "Status", "Date", "Actions"].map((el) => (
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

                    return (
                      <tr key={payment.id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div className="grid h-9 w-9 place-items-center rounded-md bg-blue-gray-50">
                              <DocumentTextIcon className="h-4 w-4 text-blue-gray-500" />
                            </div>
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                              #{payment.invoiceNumber}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={
                                payment.creator?.photoURL || `https://ui-avatars.com/api/?name=${payment.creator?.name}`
                              }
                              alt={payment.creator?.name}
                              size="sm"
                              className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                            />
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {payment.creator?.name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {payment.mission?.title}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography variant="small" color="blue-gray" className="font-semibold">
                            ${payment.amount}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-max">
                            <Chip
                              variant="gradient"
                              color={statusColors[payment.status]}
                              value={payment.status}
                              className="py-0.5 px-2 text-[11px] font-medium"
                            />
                          </div>
                        </td>
                        <td className={className}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {new Date(payment.date).toLocaleDateString()}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-2">
                            {payment.status === "pending" && (
                              <IconButton
                                variant="text"
                                color="green"
                                className="rounded-full"
                                onClick={() => handleProcessPayment(payment)}
                              >
                                <CheckCircleIcon className="h-4 w-4" />
                              </IconButton>
                            )}
                            <Menu placement="left-start">
                              <MenuHandler>
                                <IconButton variant="text" color="blue-gray">
                                  <EllipsisVerticalIcon className="h-5 w-5" />
                                </IconButton>
                              </MenuHandler>
                              <MenuList>
                                <MenuItem onClick={() => handleOpenInvoice(payment)}>
                                  <div className="flex items-center gap-2">
                                    <EyeIcon className="h-4 w-4" />
                                    View Invoice
                                  </div>
                                </MenuItem>
                                <MenuItem onClick={() => handleDownloadInvoice(payment)}>
                                  <div className="flex items-center gap-2">
                                    <ArrowDownTrayIcon className="h-4 w-4" />
                                    Download Invoice
                                  </div>
                                </MenuItem>
                                {payment.status === "pending" && (
                                  <MenuItem onClick={() => handleProcessPayment(payment)}>
                                    <div className="flex items-center gap-2">
                                      <BanknotesIcon className="h-4 w-4" />
                                      Process Payment
                                    </div>
                                  </MenuItem>
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

      {/* Invoice Dialog */}
      <Dialog size="lg" open={invoiceOpen} handler={() => setInvoiceOpen(false)}>
        <DialogHeader>Invoice #{selectedPayment?.invoiceNumber}</DialogHeader>
        <DialogBody divider>
          {selectedPayment && (
            <div className="space-y-6">
              <div className="flex justify-between">
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Invoice To:
                  </Typography>
                  <Typography variant="small" className="font-normal">
                    {selectedPayment.creator?.name}
                  </Typography>
                  <Typography variant="small" className="font-normal">
                    {selectedPayment.creator?.email}
                  </Typography>
                  <Typography variant="small" className="font-normal">
                    {selectedPayment.creator?.address || "No address provided"}
                  </Typography>
                </div>
                <div className="text-right">
                  <Typography variant="h6" color="blue-gray">
                    Invoice Details:
                  </Typography>
                  <Typography variant="small" className="font-normal">
                    Invoice #: {selectedPayment.invoiceNumber}
                  </Typography>
                  <Typography variant="small" className="font-normal">
                    Date: {new Date(selectedPayment.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="small" className="font-normal">
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        selectedPayment.status === "paid"
                          ? "text-green-500"
                          : selectedPayment.status === "pending"
                            ? "text-amber-500"
                            : "text-red-500"
                      }`}
                    >
                      {selectedPayment.status.toUpperCase()}
                    </span>
                  </Typography>
                </div>
              </div>

              <div>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Mission Details
                </Typography>
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {["Mission", "Description", "Amount"].map((head) => (
                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {selectedPayment.mission?.title}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {selectedPayment.mission?.description || "No description provided"}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          ${selectedPayment.amount}
                        </Typography>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <div className="w-72">
                  <div className="flex justify-between border-t border-blue-gray-50 py-2">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      Subtotal:
                    </Typography>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      ${selectedPayment.amount}
                    </Typography>
                  </div>
                  <div className="flex justify-between border-t border-blue-gray-50 py-2">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      Platform Fee (20%):
                    </Typography>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      -${(selectedPayment.amount * 0.2).toFixed(2)}
                    </Typography>
                  </div>
                  <div className="flex justify-between border-t border-blue-gray-50 py-2">
                    <Typography variant="small" color="blue-gray" className="font-semibold">
                      Total:
                    </Typography>
                    <Typography variant="small" color="blue-gray" className="font-semibold">
                      ${(selectedPayment.amount * 0.8).toFixed(2)}
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="border-t border-blue-gray-50 pt-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  Payment Method: {selectedPayment.paymentMethod || "Bank Transfer"}
                </Typography>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  Payment Terms: Payment due within 14 days of invoice date
                </Typography>
              </div>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setInvoiceOpen(false)} className="mr-1">
            Close
          </Button>
          <Button variant="gradient" color="blue" onClick={() => handleDownloadInvoice(selectedPayment)}>
            Download Invoice
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default PaymentManagement
