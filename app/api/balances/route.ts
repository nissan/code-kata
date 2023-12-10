import { MYOBSheet, XeroSheet, sheet } from "@/data/sample/balance-sheet";

export async function POST(request: Request) {
    const { provider } = await request.json();
    let balances: {
        year: number;
        month: number;
        profitOrLoss: number;
        assetsValue: number;
    }[];
    const currentYear = new Date().getFullYear();
    if (provider === "myob") balances = await getMyobBalances(currentYear);
    if (provider === "xero") balances = await getXeroBalances(currentYear);

    else balances = await getSheet();

    let totalRevenue = 0;
    const monthsToAverage = balances.length
    if (monthsToAverage > 0) {
        balances.forEach((balance) => totalRevenue += balance.profitOrLoss)
    }
    return Response.json({ "averageBalance": totalRevenue / monthsToAverage });
}


async function getXeroBalances(year: number) {
    return XeroSheet.map(balance => balance, year === year) ?? [];
}

async function getMyobBalances(year: number) {
    return MYOBSheet.map(balance => balance, year === year) ?? [];
}

async function getSheet() {
    return sheet.map(balance => balance) ?? [];
}