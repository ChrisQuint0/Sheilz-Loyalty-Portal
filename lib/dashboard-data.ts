import { createSupabaseServerClient } from "@/lib/supabase/server";

export type DashboardSnapshot = {
  customer: {
    firstName: string;
    lastName: string;
  };
  loyalty: {
    currentStamps: number;
    targetStamps: number;
  };
  card: {
    customerName: string;
    cardNumber: string;
    memberSince: string;
    qrValue: string;
    status: string;
    totalPurchases: number;
  };
  recentPurchases: Array<{
    id: string;
    drink: string;
    date: string;
    earnedStamp: boolean;
    isRewardRedeemed?: boolean;
  }>;
};

type LoyaltyEvent = {
  id: string;
  event_type?: string | null;
  description?: string | null;
  points_change?: number | null;
  created_at?: string | null;
};

type DashboardCustomer = {
  loyalty_log_count?: Array<{ count: number | null }>;
  recent_purchases?: LoyaltyEvent[];
};

export async function getDashboardData(email: string | null): Promise<DashboardSnapshot> {
  const supabase = await createSupabaseServerClient();

  const { data: customer, error } = await supabase
    .from("customers")
    .select(
      `
        id,
        First_name,
        last_name,
        email_address,
        loyalty_progress,
        membership_date,
        card_status,
        card_number,
        recent_purchases:loyalty_log (
          id,
          event_type,
          description,
          points_change,
          created_at
        ),
        loyalty_log_count:loyalty_log (count)
      `,
    )
    .eq("email_address", email ?? "")
    .order("created_at", {
      ascending: false,
      nullsFirst: false,
      referencedTable: "recent_purchases",
    })
    .limit(4, { referencedTable: "recent_purchases" })
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load dashboard: ${error.message}`);
  }

  const customerRecord = customer as DashboardCustomer | null;
  const recentEvents = Array.isArray(customerRecord?.recent_purchases)
    ? customerRecord.recent_purchases
    : [];
  const loyaltyLogCount = customerRecord?.loyalty_log_count?.[0]?.count ?? 0;

  const recentPurchases = recentEvents.map((event) => {
    const eventType = event.event_type ?? "Loyalty Event";
    const description = event.description ?? eventType;
    const earnedStamp = Number(event.points_change ?? 0) > 0;
    const isRewardRedeemed =
      /redeem|reward/i.test(eventType) || /redeem|reward/i.test(description);

    return {
      id: event.id,
      drink: description,
      date: event.created_at
        ? new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
          }).format(new Date(event.created_at))
        : "Recent",
      earnedStamp,
      isRewardRedeemed: isRewardRedeemed && !earnedStamp,
    };
  });

  const currentStamps = Number(customer?.loyalty_progress ?? 0);
  const targetStamps = 10;
  const cardNumber = customer?.card_number ?? "N/A";
  const memberSince = customer?.membership_date
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(customer.membership_date))
    : "N/A";

  return {
    customer: {
      firstName: customer?.First_name ?? "Customer",
      lastName: customer?.last_name ?? "",
    },
    loyalty: {
      currentStamps: Number.isFinite(currentStamps) ? currentStamps : 0,
      targetStamps:
        Number.isFinite(targetStamps) && targetStamps > 0 ? targetStamps : 10,
    },
    card: {
      customerName:
        `${customer?.First_name ?? "Customer"} ${customer?.last_name ?? ""}`.trim(),
      cardNumber,
      memberSince,
      qrValue: cardNumber.replace(/\s+/g, ""),
      status: customer?.card_status === false ? "Inactive" : "Active",
      totalPurchases: loyaltyLogCount,
    },
    recentPurchases,
  };
}
