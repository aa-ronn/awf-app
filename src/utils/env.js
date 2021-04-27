const LIVE_HOST_URL = "https://monkey-business-api.herokuapp.com";
const LOCAL_HOST_URL = "http://localhost:5000";

export const isDevelopment = process.env.NODE_ENV === "development";
export const host = isDevelopment ? LIVE_HOST_URL : LOCAL_HOST_URL;
