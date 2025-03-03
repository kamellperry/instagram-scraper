import { SidebarInset } from "~/components/ui/sidebar";
import type { ComponentProps } from "react";


export function AppInsetSidebar({ ...props }: ComponentProps<typeof SidebarInset>) {
    return (
        <SidebarInset {...props}>
            {props.children}
        </SidebarInset>
    );
}