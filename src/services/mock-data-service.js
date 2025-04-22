// Mock data for user profiles
export const mockUserProfiles = {
  brand: {
    id: "brand1",
    name: "Acme Corp",
    email: "info@acmecorp.com",
    userType: "brand",
    profileComplete: true,
  },
  creator: {
    id: "creator1",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    userType: "creator",
    profileComplete: true,
  },
}

// Mock data for dashboard stats
export const mockDashboardStats = {
  brand: {
    totalMissions: 5,
    activeMissions: 2,
    completedMissions: 3,
    totalSpend: 1500,
  },
  creator: {
    totalMissions: 10,
    activeMissions: 3,
    completedMissions: 7,
    averageRating: 4.5,
    totalEarnings: 3200,
  },
}

// Mock data for recent activities
export const mockActivities = [
  {
    id: "activity1",
    userId: "user1",
    type: "mission_created",
    message: "New mission created: Summer Campaign",
    timestamp: new Date(),
  },
  {
    id: "activity2",
    userId: "user2",
    type: "mission_completed",
    message: "Mission completed: Product Review",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
  },
]

// Mock data for notifications
export const mockNotifications = [
  {
    id: "notification1",
    userId: "user1",
    type: "mission_update",
    message: "Your mission 'Summer Campaign' has been updated.",
    timestamp: new Date(),
    read: false,
  },
  {
    id: "notification2",
    userId: "user2",
    type: "payment_received",
    message: "You have received a payment of $500 for 'Product Review'.",
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    read: true,
  },
]

// Mock data for Creator Admin

// Mock creators
export const mockCreators = [
  {
    id: "creator1",
    firstName: "Sarah",
    lastName: "Creator",
    email: "sarah@creator.com",
    photoURL: "https://ui-avatars.com/api/?name=Sarah+Creator&background=FF5733&color=fff",
    categories: ["fashion", "beauty", "lifestyle"],
    skills: ["Photography", "Video Editing", "Storytelling"],
    bio: "Content creator specializing in fashion and lifestyle content with over 5 years of experience.",
    rating: 4.8,
    reviewCount: 24,
    status: "approved",
    badge: "Gold",
    joinedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(), // 180 days ago
    completionRate: 95,
    onTimeDeliveryRate: 98,
    revisionRate: 12,
    responseTime: 4,
    completedMissions: 32,
    totalEarnings: 8500,
    averageMissionDuration: 7,
    socialMedia: [
      {
        platform: "Instagram",
        followers: 15000,
        engagement: 3.2,
      },
      {
        platform: "TikTok",
        followers: 25000,
        engagement: 4.5,
      },
      {
        platform: "YouTube",
        followers: 5000,
        engagement: 2.8,
      },
    ],
    missions: [
      {
        id: "mission1",
        title: "Summer Collection Showcase",
        brand: {
          name: "Fashion Brand",
          photoURL: "https://ui-avatars.com/api/?name=Fashion+Brand&background=0D8ABC&color=fff",
        },
        status: "completed",
        deadline: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
        budget: 500,
      },
      {
        id: "mission2",
        title: "Product Unboxing Video",
        brand: {
          name: "Tech Company",
          photoURL: "https://ui-avatars.com/api/?name=Tech+Company&background=4CAF50&color=fff",
        },
        status: "inProgress",
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        budget: 750,
      },
      {
        id: "mission3",
        title: "Lifestyle Integration",
        brand: {
          name: "Lifestyle Brand",
          photoURL: "https://ui-avatars.com/api/?name=Lifestyle+Brand&background=FF9800&color=fff",
        },
        status: "pending",
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
        budget: 300,
      },
    ],
    portfolio: [
      {
        id: "portfolio1",
        title: "Summer Fashion Lookbook",
        type: "image",
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=840&q=80",
        status: "approved",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      },
      {
        id: "portfolio2",
        title: "Product Review Video",
        type: "video",
        url: "https://example.com/video1.mp4",
        status: "pending",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      },
      {
        id: "portfolio3",
        title: "Lifestyle Photoshoot",
        type: "image",
        url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        status: "approved",
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
      },
    ],
  },
  {
    id: "creator2",
    firstName: "Mike",
    lastName: "Vlogger",
    email: "mike@vlogger.com",
    photoURL: "https://ui-avatars.com/api/?name=Mike+Vlogger&background=9C27B0&color=fff",
    categories: ["tech", "gaming", "reviews"],
    skills: ["Video Production", "Tech Reviews", "Unboxing"],
    bio: "Tech enthusiast and product reviewer with a focus on honest, detailed reviews.",
    rating: 4.6,
    reviewCount: 18,
    status: "approved",
    badge: "Silver",
    joinedAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(), // 120 days ago
    completionRate: 88,
    onTimeDeliveryRate: 92,
    revisionRate: 18,
    responseTime: 6,
    completedMissions: 24,
    totalEarnings: 6200,
    averageMissionDuration: 9,
  },
  {
    id: "creator3",
    firstName: "Emma",
    lastName: "Beauty",
    email: "emma@beauty.com",
    photoURL: "https://ui-avatars.com/api/?name=Emma+Beauty&background=E91E63&color=fff",
    categories: ["beauty", "skincare", "makeup"],
    skills: ["Makeup Tutorials", "Product Reviews", "Before/After"],
    bio: "Certified makeup artist sharing beauty tips, product reviews, and tutorials.",
    rating: 4.9,
    reviewCount: 32,
    status: "pending",
    joinedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: "creator4",
    firstName: "Alex",
    lastName: "Fitness",
    email: "alex@fitness.com",
    photoURL: "https://ui-avatars.com/api/?name=Alex+Fitness&background=4CAF50&color=fff",
    categories: ["fitness", "health", "nutrition"],
    skills: ["Workout Videos", "Meal Prep", "Fitness Challenges"],
    bio: "Personal trainer and nutrition coach helping people achieve their fitness goals.",
    rating: 4.7,
    reviewCount: 15,
    status: "approved",
    badge: "Bronze",
    joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
    completionRate: 85,
    onTimeDeliveryRate: 90,
    revisionRate: 20,
    responseTime: 8,
    completedMissions: 18,
    totalEarnings: 4500,
    averageMissionDuration: 10,
  },
  {
    id: "creator5",
    firstName: "Jordan",
    lastName: "Travel",
    email: "jordan@travel.com",
    photoURL: "https://ui-avatars.com/api/?name=Jordan+Travel&background=FF9800&color=fff",
    categories: ["travel", "adventure", "lifestyle"],
    skills: ["Travel Vlogs", "Photography", "Destination Guides"],
    bio: "Travel enthusiast documenting adventures around the world.",
    rating: 4.5,
    reviewCount: 12,
    status: "rejected",
    joinedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
]

// Mock portfolio items
export const mockPortfolioItems = [
  {
    id: "portfolio1",
    title: "Summer Fashion Lookbook",
    type: "image",
    url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=840&q=80",
    description: "A collection of summer fashion looks featuring the latest trends.",
    creator: {
      id: "creator1",
      name: "Sarah Creator",
      photoURL: "https://ui-avatars.com/api/?name=Sarah+Creator&background=FF5733&color=fff",
    },
    status: "approved",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    feedback: "Great work! The colors and styling are perfect for our summer campaign.",
  },
  {
    id: "portfolio2",
    title: "Product Review Video",
    type: "video",
    url: "https://example.com/video1.mp4",
    description: "An in-depth review of the latest smartphone, covering all features and performance.",
    creator: {
      id: "creator2",
      name: "Mike Vlogger",
      photoURL: "https://ui-avatars.com/api/?name=Mike+Vlogger&background=9C27B0&color=fff",
    },
    status: "pending",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },
  {
    id: "portfolio3",
    title: "Lifestyle Photoshoot",
    type: "image",
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    description: "A lifestyle photoshoot showcasing our products in everyday settings.",
    creator: {
      id: "creator1",
      name: "Sarah Creator",
      photoURL: "https://ui-avatars.com/api/?name=Sarah+Creator&background=FF5733&color=fff",
    },
    status: "approved",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
    feedback: "Beautiful composition and lighting. The lifestyle context really helps showcase the products.",
  },
  {
    id: "portfolio4",
    title: "Makeup Tutorial",
    type: "video",
    url: "https://example.com/video2.mp4",
    description: "A step-by-step tutorial for creating a natural everyday makeup look.",
    creator: {
      id: "creator3",
      name: "Emma Beauty",
      photoURL: "https://ui-avatars.com/api/?name=Emma+Beauty&background=E91E63&color=fff",
    },
    status: "pending",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    id: "portfolio5",
    title: "Fitness Routine",
    type: "video",
    url: "https://example.com/video3.mp4",
    description: "A 30-minute home workout routine that requires no equipment.",
    creator: {
      id: "creator4",
      name: "Alex Fitness",
      photoURL: "https://ui-avatars.com/api/?name=Alex+Fitness&background=4CAF50&color=fff",
    },
    status: "rejected",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    feedback:
      "The workout is good, but we need better lighting and camera angles. Please reshoot with better production quality.",
  },
  {
    id: "portfolio6",
    title: "Travel Vlog: Paris",
    type: "video",
    url: "https://example.com/video4.mp4",
    description: "A travel vlog showcasing the best places to visit in Paris.",
    creator: {
      id: "creator5",
      name: "Jordan Travel",
      photoURL: "https://ui-avatars.com/api/?name=Jordan+Travel&background=FF9800&color=fff",
    },
    status: "pending",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
]

// Mock missions
export const mockMissions = [
  {
    id: "mission1",
    title: "Summer Collection Showcase",
    type: "Product Photography",
    description: "Create a series of lifestyle photos showcasing our summer collection in outdoor settings.",
    brand: {
      id: "brand1",
      name: "Fashion Brand",
      photoURL: "https://ui-avatars.com/api/?name=Fashion+Brand&background=0D8ABC&color=fff",
    },
    assignedTo: {
      id: "creator1",
      name: "Sarah Creator",
      photoURL: "https://ui-avatars.com/api/?name=Sarah+Creator&background=FF5733&color=fff",
      rating: 4.8,
    },
    status: "inProgress",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    budget: 500,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
  {
    id: "mission2",
    title: "Product Unboxing Video",
    type: "Video Content",
    description: "Create an unboxing and first impressions video for our new smartphone.",
    brand: {
      id: "brand2",
      name: "Tech Company",
      photoURL: "https://ui-avatars.com/api/?name=Tech+Company&background=4CAF50&color=fff",
    },
    assignedTo: {
      id: "creator2",
      name: "Mike Vlogger",
      photoURL: "https://ui-avatars.com/api/?name=Mike+Vlogger&background=9C27B0&color=fff",
      rating: 4.6,
    },
    status: "review",
    deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    budget: 750,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
  },
  {
    id: "mission3",
    title: "Lifestyle Integration",
    type: "Instagram Post",
    description: "Create an Instagram post showing how our product fits into your daily routine.",
    brand: {
      id: "brand3",
      name: "Lifestyle Brand",
      photoURL: "https://ui-avatars.com/api/?name=Lifestyle+Brand&background=FF9800&color=fff",
    },
    assignedTo: {
      id: "creator1",
      name: "Sarah Creator",
      photoURL: "https://ui-avatars.com/api/?name=Sarah+Creator&background=FF5733&color=fff",
      rating: 4.8,
    },
    status: "completed",
    deadline: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    budget: 300,
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days ago
  },
  {
    id: "mission4",
    title: "Makeup Tutorial",
    type: "YouTube Video",
    description: "Create a tutorial using our new makeup collection for a natural everyday look.",
    brand: {
      id: "brand4",
      name: "Beauty Brand",
      photoURL: "https://ui-avatars.com/api/?name=Beauty+Brand&background=E91E63&color=fff",
    },
    assignedTo: {
      id: "creator3",
      name: "Emma Beauty",
      photoURL: "https://ui-avatars.com/api/?name=Emma+Beauty&background=E91E63&color=fff",
      rating: 4.9,
    },
    status: "pending",
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    budget: 600,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    id: "mission5",
    title: "Fitness Challenge",
    type: "Video Series",
    description: "Create a 7-day fitness challenge using our fitness equipment.",
    brand: {
      id: "brand5",
      name: "Fitness Brand",
      photoURL: "https://ui-avatars.com/api/?name=Fitness+Brand&background=4CAF50&color=fff",
    },
    assignedTo: {
      id: "creator4",
      name: "Alex Fitness",
      photoURL: "https://ui-avatars.com/api/?name=Alex+Fitness&background=4CAF50&color=fff",
      rating: 4.7,
    },
    status: "inProgress",
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
    budget: 800,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
]

// Mock payments
export const mockPayments = [
  {
    id: "payment1",
    invoiceNumber: "INV-2023-001",
    creator: {
      id: "creator1",
      name: "Sarah Creator",
      email: "sarah@creator.com",
      photoURL: "https://ui-avatars.com/api/?name=Sarah+Creator&background=FF5733&color=fff",
    },
    mission: {
      id: "mission3",
      title: "Lifestyle Integration",
      description: "Create an Instagram post showing how our product fits into your daily routine.",
    },
    amount: 300,
    status: "paid",
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    paymentMethod: "Bank Transfer",
  },
  {
    id: "payment2",
    invoiceNumber: "INV-2023-002",
    creator: {
      id: "creator2",
      name: "Mike Vlogger",
      email: "mike@vlogger.com",
      photoURL: "https://ui-avatars.com/api/?name=Mike+Vlogger&background=9C27B0&color=fff",
    },
    mission: {
      id: "mission2",
      title: "Product Unboxing Video",
      description: "Create an unboxing and first impressions video for our new smartphone.",
    },
    amount: 750,
    status: "pending",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    paymentMethod: "PayPal",
  },
  {
    id: "payment3",
    invoiceNumber: "INV-2023-003",
    creator: {
      id: "creator4",
      name: "Alex Fitness",
      email: "alex@fitness.com",
      photoURL: "https://ui-avatars.com/api/?name=Alex+Fitness&background=4CAF50&color=fff",
    },
    mission: {
      id: "mission5",
      title: "Fitness Challenge",
      description: "Create a 7-day fitness challenge using our fitness equipment.",
    },
    amount: 400, // Partial payment
    status: "paid",
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    paymentMethod: "Bank Transfer",
  },
  {
    id: "payment4",
    invoiceNumber: "INV-2023-004",
    creator: {
      id: "creator4",
      name: "Alex Fitness",
      email: "alex@fitness.com",
      photoURL: "https://ui-avatars.com/api/?name=Alex+Fitness&background=4CAF50&color=fff",
    },
    mission: {
      id: "mission5",
      title: "Fitness Challenge",
      description: "Create a 7-day fitness challenge using our fitness equipment.",
    },
    amount: 400, // Remaining payment
    status: "pending",
    date: new Date().toISOString(), // Today
    paymentMethod: "Bank Transfer",
  },
  {
    id: "payment5",
    invoiceNumber: "INV-2023-005",
    creator: {
      id: "creator1",
      name: "Sarah Creator",
      email: "sarah@creator.com",
      photoURL: "https://ui-avatars.com/api/?name=Sarah+Creator&background=FF5733&color=fff",
    },
    mission: {
      id: "mission1",
      title: "Summer Collection Showcase",
      description: "Create a series of lifestyle photos showcasing our summer collection in outdoor settings.",
    },
    amount: 500,
    status: "failed",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    paymentMethod: "Credit Card",
  },
]
