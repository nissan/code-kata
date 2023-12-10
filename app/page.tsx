import { Button } from "@/components/ui/button"
import { randomUUID } from "crypto";
import Link from 'next/link'


export default function Home() {
  const appId=randomUUID();
  return (
    <>
      <header>
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">

          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            Submission By Nissan Dookeran
          </div>
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

        <div>
          <Button asChild={true}>
            <Link href={`/loan/${appId}`}>
              Apply for a loan
            </Link>
          </Button></div>


        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">

        </div>
      </main >
    </>
  )
}
