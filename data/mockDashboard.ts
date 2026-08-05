export type Purchase = {
  id: string
  drink: string
  date: string
  earnedStamp: boolean
  isRewardRedeemed?: boolean
}

export type DashboardData = {
  customer: {
    firstName: string
    lastName: string
  }
  loyalty: {
    currentStamps: number
    targetStamps: number
    availableRewards: number
    redeemedRewards: number
  }
  recentPurchases: Purchase[]
}

export const mockDashboard: DashboardData = {
  customer: {
    firstName: "Maria",
    lastName: "Santos",
  },
  loyalty: {
    currentStamps: 3,
    targetStamps: 10,
    availableRewards: 1,
    redeemedRewards: 5,
  },
  recentPurchases: [
    {
      id: "p_1",
      drink: "Large Latte",
      date: "Yesterday",
      earnedStamp: true,
    },
    {
      id: "p_2",
      drink: "Free Pastry Reward",
      date: "July 12",
      earnedStamp: false,
      isRewardRedeemed: true,
    },
    {
      id: "p_21",
      drink: "Spanish Latte",
      date: "July 5",
      earnedStamp: true,
    },
    {
      id: "p_3",
      drink: "Iced Mocha",
      date: "July 2",
      earnedStamp: true,
    },
  ],
}
