import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Plus } from "lucide-react"

const appointments = [
    {
        id: 1,
        title: "Technical Consultation",
        date: "2024-01-15",
        time: "10:00 AM",
        location: "Video Call (Zoom)",
        status: "confirmed",
        type: "consultation",
    },
    {
        id: 2,
        title: "Project Kickoff Meeting",
        date: "2024-01-18",
        time: "2:30 PM",
        location: "Office - Conference Room A",
        status: "pending",
        type: "meeting",
    },
    {
        id: 3,
        title: "Software Demo Session",
        date: "2024-01-22",
        time: "4:00 PM",
        location: "Video Call (Teams)",
        status: "confirmed",
        type: "demo",
    },
    {
        id: 4,
        title: "Code Review & Training",
        date: "2024-01-25",
        time: "11:00 AM",
        location: "Video Call (Google Meet)",
        status: "confirmed",
        type: "training",
    },
]

export function AppointmentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Book Appointment
                </Button>
            </div>

            <div className="grid gap-4">
                {appointments.map((appointment) => (
                    <Card key={appointment.id}>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{appointment.title}</CardTitle>
                                <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                                    {appointment.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {appointment.date}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {appointment.time}
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {appointment.location}
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <Button variant="outline" size="sm">
                                    Reschedule
                                </Button>
                                <Button variant="outline" size="sm">
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
