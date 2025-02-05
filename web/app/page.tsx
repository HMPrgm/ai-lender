import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-col justify-center items-center text-center gap-4 mt-32">
      <h1 className="text-dark_1 text-7xl font-light">AI Loan Reporting</h1>
      <h2 className="text-dark_3 text-3xl font-light mb-12 mt-4">Spend less time reviewing loans, and more time making an impact</h2>
      <Link className="bg-primary text-light_1 px-8 py-4 text-2xl rounded-full hover:bg-light_1 hover:text-primary border-primary border-2 transition-colors"   href={'/auth/login'}>Start Today</Link>
    </div>
  )
}
