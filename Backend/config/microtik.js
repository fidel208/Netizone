import { RouterOSClient } from "routeros-client";

export const connectToRouter = async (routerData) => {
  const client = new RouterOSClient({
    host: routerData.ipAddress,
    user: routerData.username,
    password: routerData.secret || "",
    port: 8728,
    timeout: 5000,
  });

  try {
    return await client.connect();
  } catch (err) {
    console.error(
      `MikroTik Connection Failure to ${routerData.ipAddress}:`,
      err.message,
    );
    throw new Error(
      `Failed to reach the router gateway device: ${err.message}`,
    );
  }
};
