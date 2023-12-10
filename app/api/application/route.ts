import { randomUUID } from "crypto";
import {logger} from "../../../lib/logger";

export async function GET(request: Request) {
    const appId = getAppId();
    logger.info(`GET /api/application: Initialised new application: ${appId}`)
    return Response.json({ appId })
  }

  function getAppId() {
    return randomUUID();
  }