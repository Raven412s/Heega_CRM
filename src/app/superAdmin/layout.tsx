import Navbar from "@/components/Navbar"



export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
       <Navbar />
       <div className="flex relative">
        <div className="hidden relative md:block h-[100vh] max-w-[300px]  ">
       </div>
        <div className="p-5 w-full md:max-w-[1140px]">
        {children}
        </div>
       </div>
      </section>
    )
  }
