import { ENV } from "./env.js";
import { StreamChat } from "stream-chat";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.log("Missing Stream API Key or Secret");
  throw new Error("Missing Stream API Key or Secret");
}

export const streamClient = new StreamChat(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    console.log(`stream user with ID ${userData.id} upserted successfully.`);
  } catch (err) {
    console.error("Error upserting Stream user:", err);
    throw err;
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await streamClient.deleteUser(userId);
    console.log(`stream user with ID ${userId} deleted successfully.`);
  } catch (err) {
    console.error("Error deleting Stream user:", err);
    throw err;
  }
};
