import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Search, MoreHorizontal, Pencil, Trash2, Plus } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { dashboard } from '@/routes';
import {
    create as createProductionCompany,
    index as productionCompanyIndex,
} from '@/routes/production-companies';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import Pagination from '@/components/pagination';

interface ProductionCompany {
    id: number;
    name: string;
    slug: string;
    logo?: string | null;
    description?: string | null;
    is_active: boolean;
    created_at: string;
}

interface Props {
    production_companies: {
        data: ProductionCompany[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        current_page: number;
        last_page: number;
    };

    filters: {
        search?: string;
    };
}

export default function Index({ production_companies, filters }: Props) {
    const tableHeads = [
        'Logo',
        'Company Name',
        'Slug',
        'Description',
        'Status',
        'Created',
        'Actions',
    ];

    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = (value: string) => {
        setSearch(value);

        router.get(
            productionCompanyIndex(),
            {
                search: value,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <>
            <Head title="Production Companies" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Header */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Production Companies
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage actors and actresses for movies.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href={createProductionCompany()} prefetch>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Production Company
                        </Link>
                    </Button>
                </div>

                {/* Table */}

                <Card>
                    <CardHeader>
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                            <CardTitle>All Production Companies</CardTitle>

                            <div className="relative w-full md:w-72">
                                <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />

                                <Input
                                    value={search}
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    placeholder="Search production company..."
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {tableHeads.map((title) => (
                                            <TableHead key={title}>
                                                {title}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {production_companies.data.length > 0 ? (
                                        production_companies.data.map(
                                            (production_company) => (
                                                <TableRow
                                                    key={production_company.id}
                                                >
                                                    {/* Production Companies */}

                                                    <TableCell>
                                                        {production_company.logo ? (
                                                            <img
                                                                src={`/storage/${production_company.logo}`}
                                                                alt={
                                                                    production_company.name
                                                                }
                                                                className="h-16 w-full"
                                                                style={{
                                                                    objectFit:
                                                                        'contain',
                                                                }}
                                                            />
                                                        ) : (
                                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-medium">
                                                                {production_company.name
                                                                    .charAt(0)
                                                                    .toUpperCase()}
                                                            </div>
                                                        )}
                                                    </TableCell>

                                                    <TableCell>
                                                        {
                                                            production_company.name
                                                        }
                                                    </TableCell>

                                                    <TableCell>
                                                        {
                                                            production_company.slug
                                                        }
                                                    </TableCell>

                                                    <TableCell>
                                                        <div
                                                            style={{
                                                                whiteSpace:
                                                                    'normal',
                                                                overflowWrap:
                                                                    'break-word',
                                                            }}
                                                        >
                                                            {
                                                                production_company.description
                                                            }
                                                        </div>
                                                    </TableCell>

                                                    {/* Status */}

                                                    <TableCell>
                                                        {production_company.is_active ? (
                                                            <Badge className="border-green-200 bg-green-100 text-green-700 hover:bg-green-100">
                                                                Active
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="destructive">
                                                                Inactive
                                                            </Badge>
                                                        )}
                                                    </TableCell>

                                                    {/* Created */}

                                                    <TableCell>
                                                        {new Date(
                                                            production_company.created_at,
                                                        ).toLocaleDateString()}
                                                    </TableCell>

                                                    {/* Actions */}

                                                    <TableCell>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8"
                                                                >
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>

                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem
                                                                    asChild
                                                                >
                                                                    <Link
                                                                        href={`/admin/production-companies/${production_company.id}/edit`}
                                                                    >
                                                                        <Pencil className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </Link>
                                                                </DropdownMenuItem>

                                                                <DropdownMenuItem
                                                                    className="text-destructive focus:text-destructive"
                                                                    onClick={() => {
                                                                        if (
                                                                            confirm(
                                                                                'Are you sure you want to delete this production company?',
                                                                            )
                                                                        ) {
                                                                            router.delete(
                                                                                `/admin/production-companies/${production_company.id}`,
                                                                            );
                                                                        }
                                                                    }}
                                                                >
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ),
                                        )
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={tableHeads.length}
                                                className="h-16 text-center text-muted-foreground"
                                            >
                                                No production company found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <Pagination links={production_companies.links} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Production Companies',
            href: dashboard(),
        },
    ],
};
