import { randomUUID } from "crypto";

export async function GET(request: Request) {
    const appId = getAppId();
    console.log(appId)
    return Response.json({ appId })
  }

  function getAppId() {
    return randomUUID();
  }