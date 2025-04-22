"use client"

import { useState } from "react"
import { Tabs, TabsHeader, Tab, TabsBody, TabPanel, Typography } from "@material-tailwind/react"
import { UserGroupIcon, DocumentTextIcon, PhotoIcon, StarIcon, BanknotesIcon } from "@heroicons/react/24/outline"

import CreatorList from "./creator-list"
import PortfolioReview from "./portfolio-review"
import MissionManagement from "./mission-management"
import RatingManagement from "./rating-management"
import PaymentManagement from "./payment-management"

export function CreatorAdmin() {
  const [activeTab, setActiveTab] = useState("creators")

  return (
    <div className="mt-12">
      <Typography variant="h4" color="blue-gray" className="mb-4">
        Creator Admin
      </Typography>
      <Typography variant="paragraph" color="blue-gray" className="mb-8">
        Manage UGC creators, review content, track missions, and process payments.
      </Typography>

      <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
        <TabsHeader>
          <Tab value="creators">
            <div className="flex items-center gap-2">
              <UserGroupIcon className="w-5 h-5" />
              Creators
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
          <Tab value="ratings">
            <div className="flex items-center gap-2">
              <StarIcon className="w-5 h-5" />
              Ratings
            </div>
          </Tab>
          <Tab value="payments">
            <div className="flex items-center gap-2">
              <BanknotesIcon className="w-5 h-5" />
              Payments
            </div>
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel value="creators">
            <CreatorList />
          </TabPanel>
          <TabPanel value="portfolio">
            <PortfolioReview />
          </TabPanel>
          <TabPanel value="missions">
            <MissionManagement />
          </TabPanel>
          <TabPanel value="ratings">
            <RatingManagement />
          </TabPanel>
          <TabPanel value="payments">
            <PaymentManagement />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  )
}

export default CreatorAdmin
