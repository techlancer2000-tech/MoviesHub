import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { MapPinned, Search } from 'lucide-react';
import { dashboard } from '@/routes';
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
import { index as statesIndex } from '@/routes/states';
import Pagination from '@/components/pagination';
import { Switch } from '@/components/ui/switch';

interface State {
    id: number;
    name: string;
    native: string;
    flag: string;
}

interface Props {
    states: {
        data: State[];
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

export default function Index({ states, filters }: Props) {
    const tableHeads = ['Name', 'Country Name', 'Native', 'Map', 'Status'];

    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = (value: string) => {
        setSearch(value);

        router.get(
            statesIndex(),
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
            <Head title="States" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Header */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            States
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage available states for movies and content.
                        </p>
                    </div>
                </div>

                {/* States Table */}

                <Card>
                    <CardHeader>
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                            <CardTitle>All States</CardTitle>

                            <div className="relative w-full md:w-72">
                                <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />

                                <Input
                                    value={search}
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    placeholder="Search states..."
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
                                    {states.data.length > 0 ? (
                                        states.data.map((state) => (
                                            <TableRow key={state.id}>
                                                <TableCell className="font-medium">
                                                    {state.name}
                                                </TableCell>

                                                <TableCell>
                                                    {state.country.name}
                                                </TableCell>

                                                <TableCell>
                                                    {state.native}
                                                </TableCell>

                                                <TableCell>
                                                    {state.latitude &&
                                                    state.longitude ? (
                                                        <a
                                                            href={`https://www.google.com/maps?q=${state.latitude},${state.longitude}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                                                        >
                                                            <MapPinned className="h-4 w-4" />

                                                            <span>
                                                                View Map
                                                            </span>
                                                        </a>
                                                    ) : (
                                                        <span className="text-muted-foreground">
                                                            -
                                                        </span>
                                                    )}
                                                </TableCell>

                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Switch
                                                            checked={
                                                                !!state.flag
                                                            }
                                                            onCheckedChange={(
                                                                checked,
                                                            ) => {
                                                                router.patch(
                                                                    `/admin/states/${state.id}/toggle-status`,
                                                                    {
                                                                        flag: checked,
                                                                    },
                                                                    {
                                                                        preserveScroll: true,
                                                                    },
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={tableHeads.length}
                                                className="h-16 text-center text-muted-foreground"
                                            >
                                                No states found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <Pagination links={states.links} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'States',
            href: dashboard(),
        },
    ],
};
