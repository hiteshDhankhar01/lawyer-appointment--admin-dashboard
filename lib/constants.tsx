import { CalendarCheck2, LayoutDashboard, Shapes, Users } from "lucide-react";

export const navLink = [
    {
        url: "/",
        icon: <LayoutDashboard strokeWidth={1} />,
        label: "Dashboard"
    },
    {
        url: "/appointments",
        icon: <CalendarCheck2 strokeWidth={1} />,
        label: "Appointments"
    },
    {
        url: "/blogs",
        icon: <Shapes strokeWidth={1} />,
        label: "Blogs"
    },
    {
        url: "/users",
        icon: <Users strokeWidth={1} />,
        label: "Users"
    }
]
