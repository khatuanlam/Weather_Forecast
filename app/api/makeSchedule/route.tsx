// pages/api/start-cron-job.ts
import { NextResponse } from 'next/server';
import { scheduleDaily } from '../../services/scheduleDaily';


export async function POST(request: Request) {
    const { email } = await request.json(); // Lấy email từ body của yêu cầu POST

    // Gọi hàm để lên lịch công việc hàng ngày
    scheduleDaily(email);

    return NextResponse.json({ message: "Daily email schedule set" });
}

