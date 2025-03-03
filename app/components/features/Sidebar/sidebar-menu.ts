import { BarChart3, Home, Settings, User, Users, LifeBuoy, Send } from "lucide-react";

export const mainNavItems = [
    {
        title: "Dashboard",
        url: "/",
        icon: Home,
        items: [
            {
                title: "Overview",
                url: "#",
            },
            {
                title: "CRM",
                url: "#",
            },
            {
                title: "Analytics",
                url: "#",
            },
        ],
    },
    {
        title: "Profiles",
        url: "#",
        icon: User,
        // items: [
        //     {
        //         title: "Browse Profiles",
        //         url: "#",
        //     },
        //     {
        //         title: "Search",
        //         url: "#",
        //     },
        //     {
        //         title: "Favorites",
        //         url: "#",
        //     },
        // ],
    },
    // {
    //     title: "Followers",
    //     url: "#",
    //     icon: Users,
    //     items: [
    //         {
    //             title: "Manage Followers",
    //             url: "#",
    //         },
    //         {
    //             title: "Engagement",
    //             url: "#",
    //         },
    //         {
    //             title: "Growth",
    //             url: "#",
    //         },
    //     ],
    // },
    // {
    //     title: "Analytics",
    //     url: "#",
    //     icon: BarChart3,
    //     items: [
    //         {
    //             title: "Performance",
    //             url: "#",
    //         },
    //         {
    //             title: "Reports",
    //             url: "#",
    //         },
    //         {
    //             title: "Insights",
    //             url: "#",
    //         },
    //     ],
    // },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
        items: [
            {
                title: "Account",
                url: "#",
            },
            // {
            //     title: "Preferences",
            //     url: "#",
            // },
            // {
            //     title: "API",
            //     url: "#",
            // },
        ],
    },
];

export const secondaryNavItems = [
    // {
    //     title: "Support",
    //     url: "#",
    //     icon: LifeBuoy,
    // },
    // {
    //     title: "Feedback",
    //     url: "#",
    //     icon: Send,
    // },
];