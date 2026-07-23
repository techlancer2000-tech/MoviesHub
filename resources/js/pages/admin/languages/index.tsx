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
import { create as createLanguage } from '@/routes/languages';

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
import {index as languagesIndex} from '@/routes/languages';
import Pagination from '@/components/pagination';
interface Language {
    id: number;
    name: string;
    native_name: string;
    flag: string;
    code: string;
    locale: string;
    is_active: boolean;
    created_at: string;
}

interface Props {
    languages: {
        data: Language[];
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

export default function Index({ languages, filters }: Props) {
    const tableHeads = [
        'Flag',
        'Name',
        'Native Name',
        'Code',
        'Locale',
        'Status',
        'Created',
        'Actions',
    ];

    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = (value: string) => {
        setSearch(value);

        router.get(
            languagesIndex(),
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
            <Head title="Languages" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Header */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Languages
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage available languages for movies and content.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href={createLanguage()} prefetch>
                            <Plus className="h-4 w-4" />
                            Add Language
                        </Link>
                    </Button>
                </div>

                {/* Languages Table */}

                <Card>
                    <CardHeader>
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                            <CardTitle>All Languages</CardTitle>

                            <div className="relative w-full md:w-72">
                                <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />

                                <Input
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="Search languages..."
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
                                        {tableHeads.map((title, i) => (
                                            <TableHead key={i}>
                                                {title}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {languages.data.length > 0 ? (
                                        languages.data.map((language) => (
                                            <TableRow key={language.id}>
                                                <TableCell>
                                                    <img
                                                        src={`/storage/${language.flag}`}
                                                        alt={language.name}
                                                        className="h-10 w-16 rounded object-cover"
                                                    />
                                                </TableCell>

                                                <TableCell className="font-medium">
                                                    {language.name}
                                                </TableCell>

                                                <TableCell>
                                                    {language.native_name}
                                                </TableCell>

                                                <TableCell>
                                                    {language.code}
                                                </TableCell>

                                                <TableCell>
                                                    {language.locale}
                                                </TableCell>

                                                <TableCell>
                                                    {language.is_active ? (
                                                        <Badge className="border-green-200 bg-green-100 text-green-700 hover:bg-green-100">
                                                            Active
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="destructive">
                                                            Inactive
                                                        </Badge>
                                                    )}
                                                </TableCell>

                                                <TableCell>
                                                    {new Date(language.created_at).toLocaleDateString()}
                                                </TableCell>

                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>

                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem asChild>
                                                                <Link href={`/admin/languages/${language.id}/edit`}>
                                                                    <Pencil className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>

                                                            <DropdownMenuItem
                                                                className="text-destructive focus:text-destructive"
                                                                onClick={() => {
                                                                    if (
                                                                        confirm(
                                                                            'Are you sure you want to delete this language?',
                                                                        )
                                                                    ) {
                                                                        router.delete(
                                                                            `/admin/languages/${language.id}`,
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
                                                No languages found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <Pagination links={languages.links} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Languages',
            href: dashboard(),
        },
    ],
};
