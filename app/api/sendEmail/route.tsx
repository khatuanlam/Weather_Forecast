import CONFIG from '@/site.config';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// OAuth2 Credentials

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export async function POST(request: Request) {
    const { email, message } = await request.json();
    console.log({ email, message });
    try {
        // Get access token
        const accessToken = await oAuth2Client.getAccessToken();

        if (!accessToken || !accessToken.token) {
            throw new Error('Failed to retrieve access token');
        }

        console.log('Access Token:', accessToken.token);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 587,
            auth: {
                type: 'OAuth2',
                user: CONFIG.EMAIL_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });

        const mailOptions = {
            from: CONFIG.EMAIL_USER, // Sender address
            to: email, // Receiver address
            subject: 'Weather Update',
            text: message,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent:', result.response);
        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('api Error sending email:', error);
        return NextResponse.json({ message: 'Failed to send email', error: error || error }, { status: 500 });
    }
}
