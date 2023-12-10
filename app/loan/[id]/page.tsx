'use client';
import { useRouter, usePathname } from 'next/navigation'
import { createLoanApplication } from './create-loan-application';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
//import { useState } from 'react';

async function getSavedLoanData(appId: string) {
  return {}
}
export default async function LoanApplicationPage() {
  const appId = usePathname().split('/')[2];
  // const [reviewed, setReviewed] = useState(false);
  // function updateReviewed(){
  //   setReviewed(!reviewed);
  // }
  return (
    <>
      <h1>Loan Application Id: {appId}</h1>
      <form action={createLoanApplication}>
        <Input type="hidden" name="appId" id="appId" value={appId} />
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
        <Checkbox id="review" />
        <label
          htmlFor="review"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I have reviewed my statements and am ready to submit my loan application
        </label>
        <Button id="submitButton" name="submitButton" type="submit">Submit Application</Button>
      </form>
    </>
  )
}