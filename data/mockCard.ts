export type CardData = {
  customerName: string
  cardNumber: string
  memberSince: string
  qrValue: string
  currentStamps: number
  targetStamps: number
  totalPurchases: number
  status: string
}

export const mockCard: CardData = {
  customerName: "Maria Santos",
  cardNumber: "1200 1200 0034 8890",
  memberSince: "May 14, 2026",
  qrValue: "SHEILZ-123456789",
  currentStamps: 3,
  targetStamps: 10,
  totalPurchases: 43,
  status: "Active",
}
