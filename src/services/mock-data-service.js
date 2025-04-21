// Mock data for testing the dashboard before Firebase collections are fully set up

// Mock user profiles
export const mockUserProfiles = {
    brand: {
      userType: "brand",
      name: "Acme Inc",
      email: "contact@acmeinc.com",
      primaryCategory: "fashion",
      logo: "https://ui-avatars.com/api/?name=Acme+Inc&background=0D8ABC&color=fff",
      createdAt: new Date().toISOString(),
    },
    creator: {
      userType: "creator",
      name: "Sarah Creator",
      email: "sarah@creator.com",
      categories: ["fashion", "beauty", "lifestyle"],
      bio: "Content creator specializing in fashion and lifestyle content",
      photoURL: "https://ui-avatars.com/api/?name=Sarah+Creator&background=FF5733&color=fff",
      createdAt: new Date().toISOString(),
    },
  }
  
  // Mock dashboard stats
  export const mockDashboardStats = {
    brand: {
      totalMissions: 12,
      completedMissions: 8,
      pendingMissions: 2,
      inProgressMissions: 2,
      totalCreators: 15,
    },
    creator: {
      totalMissions: 8,
      completedMissions: 6,
      pendingMissions: 1,
      inProgressMissions: 1,
      totalEarnings: 2500,
      averageRating: 4.8,
      completionRate: 95,
      onTimeDeliveryRate: 98,
    },
  }
  
  // Mock missions
  export const mockMissions = [
    {
      id: "mission1",
      title: "Summer Collection Showcase",
      type: "Product Photography",
      brandId: "brand123",
      brand: {
        name: "Fashion Brand",
        photoURL: "https://ui-avatars.com/api/?name=Fashion+Brand&background=0D8ABC&color=fff",
      },
      assignedTo: {
        id: "creator1",
        name: "Sarah Creator",
        photoURL: "https://ui-avatars.com/api/?name=Sarah+Creator&background=FF5733&color=fff",
      },
      assignedCreators: ["creator1"],
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      budget: 500,
      status: "inProgress",
      createdAt: new Date().toISOString(),
    },
    {
      id: "mission2",
      title: "Product Unboxing Video",
      type: "Video Content",
      brandId: "brand123",
      brand: {
        name: "Tech Company",
        photoURL: "https://ui-avatars.com/api/?name=Tech+Company&background=4CAF50&color=fff",
      },
      assignedTo: {
        id: "creator2",
        name: "Mike Vlogger",
        photoURL: "https://ui-avatars.com/api/?name=Mike+Vlogger&background=9C27B0&color=fff",
      },
      assignedCreators: ["creator2"],
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
      budget: 750,
      status: "pending",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    },
    {
      id: "mission3",
      title: "Lifestyle Integration",
      type: "Instagram Post",
      brandId: "brand123",
      brand: {
        name: "Lifestyle Brand",
        photoURL: "https://ui-avatars.com/api/?name=Lifestyle+Brand&background=FF9800&color=fff",
      },
      assignedTo: {
        id: "creator1",
        name: "Sarah Creator",
        photoURL: "https://ui-avatars.com/api/?name=Sarah+Creator&background=FF5733&color=fff",
      },
      assignedCreators: ["creator1"],
      deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      budget: 300,
      status: "completed",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    },
  ]
  
  // Mock creators
  export const mockCreators = [
    {
      id: "creator1",
      firstName: "Sarah",
      lastName: "Creator",
      photoURL: "https://ui-avatars.com/api/?name=Sarah+Creator&background=FF5733&color=fff",
      categories: ["fashion", "beauty", "lifestyle"],
      skills: ["Photography", "Video Editing", "Storytelling"],
      bio: "Content creator specializing in fashion and lifestyle content with over 5 years of experience.",
      rating: 4.8,
    },
    {
      id: "creator2",
      firstName: "Mike",
      lastName: "Vlogger",
      photoURL: "https://ui-avatars.com/api/?name=Mike+Vlogger&background=9C27B0&color=fff",
      categories: ["tech", "gaming", "reviews"],
      skills: ["Video Production", "Tech Reviews", "Unboxing"],
      bio: "Tech enthusiast and product reviewer with a focus on honest, detailed reviews.",
      rating: 4.6,
    },
    {
      id: "creator3",
      firstName: "Emma",
      lastName: "Beauty",
      photoURL: "https://ui-avatars.com/api/?name=Emma+Beauty&background=E91E63&color=fff",
      categories: ["beauty", "skincare", "makeup"],
      skills: ["Makeup Tutorials", "Product Reviews", "Before/After"],
      bio: "Certified makeup artist sharing beauty tips, product reviews, and tutorials.",
      rating: 4.9,
    },
  ]
  
  // Mock activities
  export const mockActivities = [
    {
      id: "activity1",
      userId: "user123",
      title: "New Mission Created",
      description: "You created a new mission: Summer Collection Showcase",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    },
    {
      id: "activity2",
      userId: "user123",
      title: "Mission Accepted",
      description: "Sarah Creator accepted your mission: Product Unboxing Video",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
      id: "activity3",
      userId: "user123",
      title: "Content Delivered",
      description: "Mike Vlogger delivered content for: Lifestyle Integration",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    },
    {
      id: "activity4",
      userId: "user123",
      title: "Payment Processed",
      description: "Payment of $300 processed for: Lifestyle Integration",
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    },
  ]
  
  // Mock notifications
  export const mockNotifications = [
    {
      id: "notif1",
      message: "Sarah Creator accepted your mission",
      timestamp: Date.now() - 30 * 60 * 1000, // 30 minutes ago
      read: false,
    },
    {
      id: "notif2",
      message: "New content delivered for review",
      timestamp: Date.now() - 3 * 60 * 60 * 1000, // 3 hours ago
      read: false,
    },
    {
      id: "notif3",
      message: "Payment for mission 'Product Showcase' processed",
      timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
      read: true,
    },
  ]
  