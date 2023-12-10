import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { logger } from '@/lib/logger';
import Image from 'next/image'

async function initaliseApplication() {
    return Object.assign(await getNewApplicationId(), await getAccountingSoftwareProviders());
}

async function getAccountingSoftwareProviders() {
    const res = await fetch(`${process.env.API_PREFIX}${process.env.API_HOST}:${process.env.API_PORT}/api/integrations`)
    if (!res.ok) {
        logger.error("GET /apply: Failed to initialise the application");
        throw new Error('Failed to initialise application')
    }
    const json = await res.json();
    logger.info(`GET /apply: Received response from ${process.env.API_PREFIX}${process.env.API_HOST}:${process.env.API_PORT}/api/integrations : ${JSON.stringify(json)}`)
    return json;
}

async function getNewApplicationId() {
    const res = await fetch(`${process.env.API_PREFIX}${process.env.API_HOST}:${process.env.API_PORT}/api/application`)
    if (!res.ok) {
        logger.error("GET /apply: Failed to get a new application ID");
        throw new Error('Failed to get a new application Id')
    }
    const json = await res.json();
    logger.info(`GET /apply: Received response from ${process.env.API_PREFIX}${process.env.API_HOST}:${process.env.API_PORT}/api/application : ${JSON.stringify(json)}`)
    return json;
}


export default async function Apply() {
    const { appId, products } = await initaliseApplication();
    logger.info(`GET /apply: Initialised new application page with id: ${appId}`)
    logger.info(`GET /apply: Retrieved a list of supported accounting providers: ${JSON.stringify(products)}`)
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <h1>Loan Application Page</h1>
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    {"Let's apply for this loan!"}
                </p>
                <h2>Application ID: {appId}</h2>
            </div>
            <div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="businessName">Business Name:</Label>
                    <Input type="businessName" id="businessName" placeholder="Acme Trading Inc" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="loanAmount">Loan Amount Requested (AUD): $</Label>
                    <Input type="loanAmount" id="loanAmount" placeholder="10000" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Accounting Provider" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Accounting Providers</SelectLabel>
                                <SelectItem value="xero">Xero</SelectItem>
                                <SelectItem value="myob">MYOB</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <br />
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Checkbox id="review" disabled={true} />
                    <label
                        htmlFor="review"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        I have reviewed my statements and am ready to submit my loan application
                    </label>
                </div>
                <br />
                <Button id="submitApplication" disabled={true}>Submit Application</Button>
            </div>
            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">

            </div>
        </main>
    )
}
