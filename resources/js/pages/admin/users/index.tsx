import { Head } from '@inertiajs/react';
import { Search, ShieldCheck, UserRound } from 'lucide-react';

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

interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    created_at: string;
}

interface Props {
    users: User[];
}

export default function Index({ users }: Props) {
    return (
        <>
            <Head title="Users" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Header */}

                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>

                    <p className="text-muted-foreground">
                        Manage registered users and administrator accounts.
                    </p>
                </div>

                {/* Stats */}

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <UserRound className="h-4 w-4" />
                                Total Users
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <p className="text-3xl font-bold">{users.length}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <ShieldCheck className="h-4 w-4" />
                                Administrators
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <p className="text-3xl font-bold">
                                {
                                    users.filter(
                                        (user) => user.role === 'admin',
                                    ).length
                                }
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Active Users</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <p className="text-3xl font-bold">{users.length}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Users Table */}

                <Card>
                    <CardHeader>
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                            <CardTitle>All Users</CardTitle>

                            <div className="relative w-full md:w-72">
                                <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />

                                <Input
                                    placeholder="Search users..."
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
                                        <TableHead>Name</TableHead>

                                        <TableHead>Email</TableHead>

                                        <TableHead>Joined</TableHead>

                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">
                                                {user.name}
                                            </TableCell>

                                            <TableCell>{user.email}</TableCell>

                                            <TableCell>
                                                {new Date(
                                                    user.created_at,
                                                ).toLocaleDateString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: dashboard(),
        },
    ],
};
