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
import { create as createCast, index as castsIndex } from '@/routes/casts';

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

interface Cast {
    id: number;
    name: string;
    slug: string;
    profile_image?: string | null;
    biography?: string | null;
    date_of_birth?: string | null;
    gender?: string | null;
    country?: {
        id: number;
        name: string;
    } | null;
    is_active: boolean;
    is_cast: boolean;
    created_at: string;
}

interface Props {
    casts: {
        data: Cast[];
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

export default function Index({ casts, filters }: Props) {
    const tableHeads = [
        'Cast',
        'Country',
        'Gender',
        'Date Of Birth',
        'Type',
        'Status',
        'Created',
        'Actions',
    ];

    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = (value: string) => {
        setSearch(value);

        router.get(
            castsIndex(),
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
            <Head title="Casts" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Header */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Cast & Crew
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage actors and actresses for movies.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href={createCast()} prefetch>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Cast
                        </Link>
                    </Button>
                </div>

                {/* Table */}

                <Card>
                    <CardHeader>
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                            <CardTitle>All Cast & Crew</CardTitle>

                            <div className="relative w-full md:w-72">
                                <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />

                                <Input
                                    value={search}
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    placeholder="Search casts..."
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
                                    {casts.data.length > 0 ? (
                                        casts.data.map((cast) => (
                                            <TableRow key={cast.id}>
                                                {/* Cast */}

                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        {cast.profile_image ? (
                                                            <img
                                                                src={`/storage/${cast.profile_image}`}
                                                                alt={cast.name}
                                                                className="h-10 w-10 rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-medium">
                                                                {cast.name
                                                                    .charAt(0)
                                                                    .toUpperCase()}
                                                            </div>
                                                        )}

                                                        <div>
                                                            <p className="font-medium">
                                                                {cast.name}
                                                            </p>

                                                            <p className="text-xs text-muted-foreground">
                                                                {cast.slug}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                {/* Country */}

                                                <TableCell>
                                                    {cast.country?.name ?? '-'}
                                                </TableCell>

                                                {/* Gender */}

                                                <TableCell>
                                                    <Badge variant="secondary">
                                                        {cast.gender_data
                                                            ?.name ?? 'Unknown'}
                                                    </Badge>
                                                </TableCell>

                                                {/* DOB */}

                                                <TableCell>
                                                    {cast.date_of_birth
                                                        ? new Date(
                                                              cast.date_of_birth,
                                                          ).toLocaleDateString()
                                                        : '-'}
                                                </TableCell>

                                                {/* Status */}

                                                <TableCell>
                                                    {cast.is_cast ? (
                                                        <Badge variant="default">
                                                            Cast
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="ghost">
                                                            Crew
                                                        </Badge>
                                                    )}
                                                </TableCell>

                                                <TableCell>
                                                    {cast.is_active ? (
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
                                                        cast.created_at,
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
                                                                    href={`/admin/casts/${cast.id}/edit`}
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
                                                                            'Are you sure you want to delete this cast?',
                                                                        )
                                                                    ) {
                                                                        router.delete(
                                                                            `/admin/casts/${cast.id}`,
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
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={tableHeads.length}
                                                className="h-16 text-center text-muted-foreground"
                                            >
                                                No casts found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <Pagination links={casts.links} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Cast & Crew',
            href: dashboard(),
        },
    ],
};
