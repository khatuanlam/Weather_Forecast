
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export default function WeatherCardSkeleton() {
    return (
        <Card className="transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="bg-blue-500 text-white rounded-lg">
                <CardTitle className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-16 w-16 sm:h-24 sm:w-24 rounded-full" />
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                    <div>
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="text-center sm:text-right">
                        <Skeleton className="h-6 w-24" />
                    </div>
                </div>
                <Skeleton className="h-10 w-full sm:w-24 mt-2" />
            </CardContent>
        </Card>
    )
}