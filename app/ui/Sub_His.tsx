import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { HistoryProps } from "@/types";
import { useEffect, useState } from "react";


export default function History({ historyList, action, data }: HistoryProps) {
    const [subscribed, setSubscribed] = useState(false);
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    // Check if email is valid
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Handle subscribe
    const handleSubscribe = () => {
        if (!validateEmail(email)) {
            setIsValidEmail(false);
            return;
        }
        setIsValidEmail(true);
        toast({
            title: 'Confirmation',
            description: `A confirmation email has been sent to ${email}. Please confirm to complete your subscription.`,
        });
        setSubscribed(true);

        // Gửi mail thông báo sẽ nhận được thông báo thời tiết
        const sendEmailAnnouced = async () => {
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, message: 'Bạn sẽ nhận được thông báo thời tiết vào 7 AM hằng ngày' }),
            });
        }

        const startCronJob = async () => {
            const response = await fetch('/api/makeSchedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            console.log(data);
        };
        // Call action to perform the subscription
        action().then((e) => {
            console.log("Subscribed successfully");
            sendEmailAnnouced();
            startCronJob()
        });

    };



    // Handle unsubscribe
    const handleUnsubscribe = () => {
        toast({
            title: "Unsubscribed",
            description: "You have been unsubscribed from daily weather forecasts.",
        });
        setSubscribed(false);

        const cancelCronJob = async () => {
            const response = await fetch('/api/cancelSchedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log(data);
        };
        cancelCronJob();
    };

    useEffect(() => {
        if (subscribed) {
            const interval = setInterval(async () => {
                console.log('Sending daily weather emails...');
                const weatherData = await action(); // Fetch weather data
                console.log(weatherData);
            }, 24 * 60 * 60 * 1000); // 24 hours interval

            return () => clearInterval(interval);
        }
    }, [subscribed, action]);

    return (
        <>
            <Card className="transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                    <CardTitle>Weather Forecast Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                    {!subscribed ? (
                        <div className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.currentTarget.value)}
                                required
                            />
                            {!isValidEmail && <p style={{ color: "red" }}>Invalid email format!</p>}
                            <Button onClick={handleSubscribe}>Subscribe</Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p>You are subscribed to daily weather forecasts.</p>
                            <Button onClick={handleUnsubscribe} variant="destructive">Unsubscribe</Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">View Search History</Button>
                </DialogTrigger>
                <DialogContent aria-describedby="" className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Search History</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        {historyList.map((item, index) => (
                            <div
                                key={index}
                                className="mb-2 flex justify-between items-center p-2 rounded-lg transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-100 hover:shadow-md active:bg-gray-200 active:scale-95"
                                onClick={() => action()}
                            >
                                <span className="font-medium">{item.location.name}</span>
                                <span className="text-sm text-gray-600">{item.current.last_updated}</span>
                                <img srcSet={item.current.condition.icon} alt="Weather Icon" className="h-8 w-8" />
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
