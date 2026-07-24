import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Search, Clock3, Globe2 } from 'lucide-react';
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
import { index as countriesIndex } from '@/routes/countries';
import Pagination from '@/components/pagination';
import { Switch } from '@/components/ui/switch';

interface Country {
    id: number;
    name: string;
    native: string;
    flag: string;
}

interface Props {
    countries: {
        data: Country[];
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

export default function Index({ countries, filters }: Props) {
    const tableHeads = [
        'Flag',
        'Name',
        'Native',
        'Currency',
        'Timezone',
        'Status',
    ];

    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = (value: string) => {
        setSearch(value);

        router.get(
            countriesIndex(),
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
            <Head title="Countries" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Header */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Countries
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage available countries for movies and content.
                        </p>
                    </div>
                </div>

                {/* Countries Table */}

                <Card>
                    <CardHeader>
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                            <CardTitle>All Countries</CardTitle>

                            <div className="relative w-full md:w-72">
                                <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />

                                <Input
                                    value={search}
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    placeholder="Search countries..."
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
                                    {countries.data.length > 0 ? (
                                        countries.data.map((country) => (
                                            <TableRow key={country.id}>
                                                <TableCell className="text-xl">
                                                    {country.emoji}
                                                </TableCell>

                                                <TableCell className="font-medium">
                                                    {country.name}
                                                </TableCell>

                                                <TableCell>
                                                    {country.native}
                                                </TableCell>

                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="mb-1 font-medium">
                                                            {
                                                                country.currency_name
                                                            }
                                                        </span>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <span className="rounded-md bg-green-100 px-2 py-0.5 font-medium text-green-800">
                                                                {
                                                                    country.currency_symbol
                                                                }
                                                            </span>
                                                            <span className="rounded-md border px-2 py-0.5">
                                                                {
                                                                    country.currency
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    {(() => {
                                                        const timezone =
                                                            Array.isArray(
                                                                country.timezones,
                                                            )
                                                                ? country
                                                                      .timezones[0]
                                                                : JSON.parse(
                                                                      country.timezones,
                                                                  )?.[0];

                                                        if (!timezone)
                                                            return '-';

                                                        const currentTime =
                                                            new Intl.DateTimeFormat(
                                                                'en-US',
                                                                {
                                                                    timeZone:
                                                                        timezone.zoneName,
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                    second: '2-digit',
                                                                    hour12: true,
                                                                },
                                                            ).format(
                                                                new Date(),
                                                            );

                                                        return (
                                                            <div className="flex flex-col gap-1">
                                                                <div className="flex items-center gap-2">
                                                                    <Globe2 className="h-4 w-4 text-muted-foreground" />
                                                                    <span className="font-medium">
                                                                        {
                                                                            timezone.zoneName
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                    <Clock3 className="h-3.5 w-3.5" />
                                                                    <span>
                                                                        {
                                                                            currentTime
                                                                        }
                                                                    </span>
                                                                    <span className="rounded-md bg-muted px-2 py-0.5 text-xs">
                                                                        {
                                                                            timezone.gmtOffsetName
                                                                        }
                                                                    </span>
                                                                    <span className="rounded-md border px-2 py-0.5 text-xs">
                                                                        {
                                                                            timezone.abbreviation
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        );
                                                    })()}
                                                </TableCell>

                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Switch
                                                            checked={
                                                                !!country.flag
                                                            }
                                                            onCheckedChange={(
                                                                checked,
                                                            ) => {
                                                                router.patch(
                                                                    `/admin/countries/${country.id}/toggle-status`,
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
                                                No countries found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <Pagination links={countries.links} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Countries',
            href: dashboard(),
        },
    ],
};
