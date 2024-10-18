import { DetailWeather } from '@/types';
import nodemailer from 'nodemailer';

export const sendWeatherUpdateEmail = async (email: string, weatherData: DetailWeather) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,  // Set in .env
                pass: process.env.GMAIL_PASS,  // Set in .env
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: `Weather Update for ${weatherData.location.name}`,
            text: `
        Weather Update for ${weatherData.location.name}
        ----------------------------------------------
        Temperature: ${weatherData.current.temp_c} °C
        Condition: ${weatherData.current.condition.text}
        Humidity: ${weatherData.current.humidity} %
        Wind: ${weatherData.current.wind_kph} kph
      `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error('utils Error sending email:', error);
    }
};