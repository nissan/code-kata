import { logger } from '@/lib/logger';
import Image from 'next/image'

async function initaliseApplication() {
    const res = await fetch(`${process.env.API_PREFIX}${process.env.API_HOST}:${process.env.API_PORT}/api/application`)
    
    if (!res.ok) {
        logger.error("GET /apply: Failed to initialise the application");
        throw new Error('Failed to initialise application')
    }
    
    const json = await res.json();
    logger.info(`GET /apply: Received response from ${process.env.API_PREFIX}${process.env.API_HOST}:${process.env.API_PORT}/api/application : ${JSON.stringify(json)}`)


    return json;
}

export default async function Apply() {
    const {appId} = await initaliseApplication();
    logger.info(`GET /apply: Initialised new application page with id: ${appId}`)
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <h1>Loan Application Page</h1>
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    {"Let's apply for this loan!"}
                </p>
            </div>
        </main>
    )
}
