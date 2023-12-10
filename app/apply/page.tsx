import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { logger } from '@/lib/logger';

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
    logger.debug(`GET /apply: Retrieved a list of supported accounting providers: ${JSON.stringify(products)}`)
    async function requestBalanceSheet() {
        return 10000
    }
    async function submitLoanApplication(formData: FormData) {
        'use server'

        const rawFormData = Object.fromEntries(formData);
        // {
        //     businessName: formData.get('businessName'),
        //     yearEstablished: formData.get('businessEstYear'),
        //     loanAmount: formData.get('loanAmount'),
        // }
        logger.info(`"raw-form-data":[${JSON.stringify(rawFormData)}]`);
        const res = await fetch(`${process.env.API_PREFIX}${process.env.API_HOST}:${process.env.API_PORT}/api/decision`)
        if (!res.ok) {
            logger.error("GET /apply: Failed to get a new application decision");
            throw new Error('Failed to get a new application deision')
        }
        console.log("Reached line after calling fetch");
        const json = await res.json();

        // mutate data
        // revalidate cache
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form action={submitLoanApplication}>
                <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                    <h1>Loan Application Page - Application ID: {appId}</h1>
                </div>
                <hr />
                <Input type="hidden" id="applicationId" name="applicationId" value={appId} />
                <div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="businessName">Business Name:</Label>
                        <Input type="text" name="businessName" id="businessName" placeholder="Acme Trading Inc" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="businessEstYear">Year Established:</Label>
                        <Input type="number" name="businessEstYear" id="businessEstYear" placeholder="2020" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="loanAmount">Loan Amount Requested (AUD): $</Label>
                        <Input type="number" id="loanAmount" name="loanAmount" placeholder="10000" />
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
                        {/* <Button onClick={requestBalanceSheet}>Request Balance Sheet</Button> */}
                        <Label htmlFor="balanceSheetSummary">Last 12 months Profit (AUD): $</Label>
                        <Input type="number" id="balanceSheetSummary" name="balanceSheetSummary" placeholder="10000" disabled={true} />

                        <Checkbox id="review" />
                        <label
                            htmlFor="review"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I have reviewed my statements and am ready to submit my loan application
                        </label>
                    </div>
                    <br />
                    <Button id="submitApplication" type="submit">Submit Application</Button>
                </div>
            </form>
            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">

            </div>
        </main>
    )
}
