import React, { useState } from 'react';
import { DollarSign, Users, Star, TrendingUp, Award, Clock, Target, Zap, BarChart2, Camera, Video, Briefcase, Globe, Smile, ThumbsUp, Heart, Share2, MessageCircle, TrendingDown } from 'lucide-react';
import StatCard from './StatCard';
import ProgressBar from './ProgressBar';
import ChartContainer from './ChartContainer';
import MissionCard from './MissionCard';
import ActivityItem from './ActivityItem';

export function CreatorAdmin() {
  const [activeMissions] = useState([
    {
      title: "Summer Collection Showcase",
      brand: {
        name: "Fashion Brand",
        photoURL: "https://ui-avatars.com/api/?name=Fashion+Brand&background=0D8ABC&color=fff"
      },
      status: "inProgress",
      deadline: "2024-04-01",
      budget: 500
    },
    {
      title: "Product Review Video",
      brand: {
        name: "Tech Company",
        photoURL: "https://ui-avatars.com/api/?name=Tech+Company&background=4CAF50&color=fff"
      },
      status: "review",
      deadline: "2024-03-25",
      budget: 750
    }
  ]);

  const [recentActivity] = useState([
    {
      type: "mission_completed",
      message: "Completed mission: Spring Collection Photography",
      timestamp: "2024-03-15T10:30:00Z"
    },
    {
      type: "payment_received",
      message: "Received payment: $500 for Product Review",
      timestamp: "2024-03-14T15:45:00Z"
    },
    {
      type: "new_mission",
      message: "New mission invitation: Summer Lifestyle Campaign",
      timestamp: "2024-03-13T09:15:00Z"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
              <p className="text-blue-100">Welcome back! Here's your performance overview.</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
                <p className="text-sm text-white/90">Last updated: {new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 -mt-6">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Earnings"
              value="$3,250"
              icon={<DollarSign className="w-6 h-6" />}
              change={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Active Missions"
              value="5"
              icon={<Users className="w-6 h-6" />}
              change={{ value: 2, isPositive: true }}
            />
            <StatCard
              title="Average Rating"
              value="4.8"
              icon={<Star className="w-6 h-6" />}
              change={{ value: 0.3, isPositive: true }}
            />
            <StatCard
              title="Completion Rate"
              value="95%"
              icon={<TrendingUp className="w-6 h-6" />}
              change={{ value: 5, isPositive: true }}
            />
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Response Time"
              value="2.5h"
              icon={<Clock className="w-6 h-6" />}
              className="bg-blue-50"
            />
            <StatCard
              title="Achievement Points"
              value="850"
              icon={<Award className="w-6 h-6" />}
              className="bg-purple-50"
            />
            <StatCard
              title="Conversion Rate"
              value="78%"
              icon={<Target className="w-6 h-6" />}
              className="bg-green-50"
            />
            <StatCard
              title="Engagement Rate"
              value="12.4%"
              icon={<Zap className="w-6 h-6" />}
              className="bg-yellow-50"
            />
          </div>

          {/* Social Media Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Reach"
              value="125K"
              icon={<Globe className="w-6 h-6" />}
              change={{ value: 8, isPositive: true }}
              className="bg-indigo-50"
            />
            <StatCard
              title="Avg. Likes"
              value="2.8K"
              icon={<Heart className="w-6 h-6" />}
              change={{ value: 15, isPositive: true }}
              className="bg-pink-50"
            />
            <StatCard
              title="Comments/Post"
              value="156"
              icon={<MessageCircle className="w-6 h-6" />}
              change={{ value: 5, isPositive: false }}
              className="bg-orange-50"
            />
            <StatCard
              title="Share Rate"
              value="18%"
              icon={<Share2 className="w-6 h-6" />}
              change={{ value: 3, isPositive: true }}
              className="bg-teal-50"
            />
          </div>

          {/* Content Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <ChartContainer title="Content Distribution" className="col-span-1">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Camera className="w-5 h-5 text-blue-500 mr-2" />
                    <span>Photos</span>
                  </div>
                  <span className="font-medium">45%</span>
                </div>
                <ProgressBar value={45} max={100} color="bg-blue-500" />
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Video className="w-5 h-5 text-purple-500 mr-2" />
                    <span>Videos</span>
                  </div>
                  <span className="font-medium">35%</span>
                </div>
                <ProgressBar value={35} max={100} color="bg-purple-500" />
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Briefcase className="w-5 h-5 text-green-500 mr-2" />
                    <span>Reviews</span>
                  </div>
                  <span className="font-medium">20%</span>
                </div>
                <ProgressBar value={20} max={100} color="bg-green-500" />
              </div>
            </ChartContainer>

            <ChartContainer title="Monthly Goals" className="col-span-2">
              <div className="space-y-4">
                <ProgressBar
                  value={8}
                  max={10}
                  label="Completed Missions"
                  color="bg-blue-500"
                />
                <ProgressBar
                  value={2500}
                  max={3000}
                  label="Earnings Target"
                  color="bg-green-500"
                />
                <ProgressBar
                  value={18}
                  max={20}
                  label="Content Pieces"
                  color="bg-purple-500"
                />
                <ProgressBar
                  value={85}
                  max={100}
                  label="Client Satisfaction"
                  color="bg-yellow-500"
                />
                <ProgressBar
                  value={92}
                  max={100}
                  label="On-Time Delivery"
                  color="bg-indigo-500"
                />
              </div>
            </ChartContainer>
          </div>

          {/* Activity and Missions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartContainer title="Recent Activity" className="bg-white h-full">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <ActivityItem
                    key={index}
                    type={activity.type}
                    message={activity.message}
                    timestamp={activity.timestamp}
                  />
                ))}
              </div>
            </ChartContainer>

            <div className="h-full">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Missions</h2>
              <div className="space-y-4">
                {activeMissions.map((mission, index) => (
                  <MissionCard
                    key={index}
                    title={mission.title}
                    brand={mission.brand}
                    status={mission.status}
                    deadline={mission.deadline}
                    budget={mission.budget}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ChartContainer title="Top Performing Categories" className="h-full">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Lifestyle</span>
                  <span className="text-sm font-medium">32%</span>
                </div>
                <ProgressBar value={32} max={100} color="bg-blue-500" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tech Reviews</span>
                  <span className="text-sm font-medium">28%</span>
                </div>
                <ProgressBar value={28} max={100} color="bg-purple-500" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Fashion</span>
                  <span className="text-sm font-medium">25%</span>
                </div>
                <ProgressBar value={25} max={100} color="bg-pink-500" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Travel</span>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <ProgressBar value={15} max={100} color="bg-yellow-500" />
              </div>
            </ChartContainer>

            <ChartContainer title="Audience Demographics" className="h-full">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">18-24</span>
                  <span className="text-sm font-medium">35%</span>
                </div>
                <ProgressBar value={35} max={100} color="bg-green-500" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">25-34</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <ProgressBar value={45} max={100} color="bg-blue-500" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">35-44</span>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <ProgressBar value={15} max={100} color="bg-purple-500" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">45+</span>
                  <span className="text-sm font-medium">5%</span>
                </div>
                <ProgressBar value={5} max={100} color="bg-gray-500" />
              </div>
            </ChartContainer>

            <ChartContainer title="Platform Performance" className="h-full">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Instagram</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <ProgressBar value={45} max={100} color="bg-pink-500" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">TikTok</span>
                  <span className="text-sm font-medium">30%</span>
                </div>
                <ProgressBar value={30} max={100} color="bg-blue-500" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">YouTube</span>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <ProgressBar value={15} max={100} color="bg-red-500" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Others</span>
                  <span className="text-sm font-medium">10%</span>
                </div>
                <ProgressBar value={10} max={100} color="bg-gray-500" />
              </div>
            </ChartContainer>
          </div>
        </div>
      </div>
    </div>
  );
}


export default CreatorAdmin
