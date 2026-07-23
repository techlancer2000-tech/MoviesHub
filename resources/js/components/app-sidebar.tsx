import { Link } from '@inertiajs/react';
import { LayoutGrid, Users2, Database, Languages, MapPin, Map, BadgeCheck } from 'lucide-react';

import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { dashboard } from '@/routes';
import { index as users } from '@/routes/users/index';
import { index as languages } from '@/routes/languages';
import { index as countries } from '@/routes/countries';
import { index as states } from '@/routes/states';
import { index as certifications } from '@/routes/certifications';

import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: users(),
        icon: Users2,
    },
    {
        title: 'Master',
        icon: Database,
        items: [
            {
                title: 'Certifications',
                href: certifications(),
                icon: BadgeCheck,
            },
            {
                title: 'Countries',
                href: countries(),
                icon: Map,
            },
            {
                title: 'States',
                href: states(),
                icon: MapPin,
            },
            {
                title: 'Languages',
                href: languages(),
                icon: Languages,
            },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
