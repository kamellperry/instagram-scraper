import {
    SidebarFooter as SidebarFooterBase,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getInitials } from '~/lib/utils';

export function SidebarFooter() {
    return (
        <SidebarFooterBase>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={"/images/logo.png"} alt={"Alchemy"} />
                            <AvatarFallback className="rounded-lg">{getInitials("Alchemy")}</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">Alchemy</span>
                            <span className="truncate text-xs">@alchemylabs</span>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooterBase>
    );
}