import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    Users2,
    Database,
    Languages,
    MapPin,
    Globe2,
    BadgeCheck,
    Tags,
    Building2,
    UsersRound,
} from 'lucide-react';

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
import { index as genres } from '@/routes/genres';
import { index as casts } from '@/routes/casts';
import { index as productionCompanies } from '@/routes/production-companies';

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
        title: 'Master Data',
        icon: Database,
        items: [
            {
                title: 'Genres',
                href: genres(),
                icon: Tags,
            },
            {
                title: 'Languages',
                href: languages(),
                icon: Languages,
            },
            {
                title: 'Countries',
                href: countries(),
                icon: Globe2,
            },
            {
                title: 'States',
                href: states(),
                icon: MapPin,
            },
            {
                title: 'Certifications',
                href: certifications(),
                icon: BadgeCheck,
            },
            {
                title: 'Production Companies',
                href: productionCompanies(),
                icon: Building2,
            },
            {
                title: 'Cast & Crew',
                href: casts(),
                icon: UsersRound,
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
