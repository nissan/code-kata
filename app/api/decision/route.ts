import { logger } from "@/lib/logger"
import { redirect } from "next/navigation";

export async function POST(request: Request) {
    const appFormData = await request.json()
    logger.info("Endpoint hit");
    logger.info(`Received the data for decision as: ${JSON.stringify(appFormData)})`)
    return redirect('/apply/decision/approved')
  }