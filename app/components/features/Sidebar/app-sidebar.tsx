import { Sidebar } from "~/components/ui/sidebar";
import { SidebarHeader } from './sidebar-header';
import { SidebarContent } from './sidebar-content';
import { SidebarFooter } from './sidebar-footer';
import type { ComponentProps } from "react";


export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader />
            <SidebarContent />
            <SidebarFooter />
        </Sidebar>
    );
}