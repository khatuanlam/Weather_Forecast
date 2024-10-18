import { DetailWeather } from '@/types';
import cron from 'node-cron';
import { getForecast } from '.';
let scheduledJob: cron.ScheduledTask | null = null;

// Lịch trình cron để gửi email vào lúc 7 giờ sáng mỗi ngày
export const scheduleDaily = (email: string) => {
    cron.schedule('0 7 * * *', async () => {
        try {
            const cEmail = email; // Thay đổi địa chỉ email người nhận
            const weatherData: DetailWeather = await getForecast('Ho Chi Minh City'); // Lấy dữ liệu thời tiết từ API
            await sendEmail(cEmail, weatherData);
        } catch (error) {
            console.error('Error in cron job:', error);
        }
    });
}

const sendEmail = async (email: string, data: DetailWeather) => {
    try {
        const response = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, data }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Email sent:', data);
        } else {
            console.error('Error sending email:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Hàm hủy cron job
export const cancelDailySchedule = () => {
    if (scheduledJob) {
        scheduledJob.stop();
        scheduledJob = null; // Đặt lại biến cron job
        console.log('Cron job has been canceled.');
    }
};
