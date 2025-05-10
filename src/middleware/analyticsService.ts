import { logEvent } from "firebase/analytics";
import { initAnalytics } from "./firebase";

export const sendMatchDetailEvent = async (
  matchId: string,
  homeTeam: string,
  awayTeam: string,
) => {
  try {
    const analytics = await initAnalytics();
    if (!analytics) return;

    logEvent(analytics, "view_match_detail", {
      match_id: matchId,
      home_team: homeTeam,
      away_team: awayTeam,
    });

    console.log("✅ Match detail event sent");
  } catch (error) {
    console.error("❌ Failed to log match detail event:", error);
  }
};

export const sendAddToCartEvent = async (
  itemId: string,
  itemName: string,
  price: number,
) => {
  try {
    const analytics = await initAnalytics();
    if (!analytics) return;

    logEvent(analytics, "add_to_cart", {
      item_id: itemId,
      item_name: itemName,
      price,
    });

    console.log("✅ Add to cart event sent");
  } catch (error) {
    console.error("❌ Failed to log add to cart event:", error);
  }
};

export const sendRemoveFromCartEvent = async (
  itemId: string,
  itemName: string,
  price: number,
) => {
  try {
    const analytics = await initAnalytics();
    if (!analytics) return;

    logEvent(analytics, "remove_from_cart", {
      item_id: itemId,
      item_name: itemName,
      price,
    });

    console.log("✅ Remove from cart event sent");
  } catch (error) {
    console.error("❌ Failed to log remove from cart event:", error);
  }
};
