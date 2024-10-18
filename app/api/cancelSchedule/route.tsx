import { cancelDailySchedule } from '@/app/services/scheduleDaily';
import { NextResponse } from 'next/server';

export async function POST() {
    // Gọi hàm hủy cron job
    cancelDailySchedule();
    return NextResponse.json({ message: 'Cron job canceled.' });
}
