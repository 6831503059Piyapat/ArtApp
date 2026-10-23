// app/dashboard/[id]/page.tsx

// กำหนด Type สำหรับ Params
interface DashboardDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardDetailPage({ params }: DashboardDetailPageProps) {
  // รอรับค่าจาก Params
  const resolvedParams = await params;
  
  // ดึงค่า id ออกมา
  const dashboardId = resolvedParams.id;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard Detail</h1>
      
      <div className="bg-white/5 p-6 rounded-lg border border-[#ff6600]">
        <p className="text-lg">
          You are viewing data for ID: <span className="text-[#ff6600] font-bold">{dashboardId}</span>
        </p>
      </div>
    </div>
  );
}