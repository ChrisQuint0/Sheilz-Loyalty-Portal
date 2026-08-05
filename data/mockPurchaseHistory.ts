export type PurchaseItem = {
  id: number
  drink: string
  purchaseDate: string
  stampEarned: boolean
  orderNumber?: string
}

export type PurchaseSummary = {
  totalPurchases: number
  currentStamps: number
  targetStamps: number
  lastPurchaseDate: string
}

export const mockPurchaseSummary: PurchaseSummary = {
  totalPurchases: 43,
  currentStamps: 3,
  targetStamps: 10,
  lastPurchaseDate: "Yesterday",
}

export const mockPurchaseHistory: PurchaseItem[] = [
  {
    id: 1,
    drink: "Large Latte",
    purchaseDate: "Yesterday",
    stampEarned: true,
    orderNumber: "#8892",
  },
  {
    id: 2,
    drink: "Iced Spanish Latte",
    purchaseDate: "July 6, 2026",
    stampEarned: true,
  },
  {
    id: 3,
    drink: "Matcha Latte",
    purchaseDate: "July 3, 2026",
    stampEarned: true,
    orderNumber: "#8410",
  },
  {
    id: 4,
    drink: "Americano",
    purchaseDate: "June 28, 2026",
    stampEarned: false,
  },
]
