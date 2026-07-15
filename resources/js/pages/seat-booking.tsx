import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PublicLayout from '@/layouts/public-layout';
import { Separator } from '@/components/ui/separator';

type SeatStatus = 'available' | 'occupied' | 'selected';

type Seat = {
    id: string;
    price: number;
    status: SeatStatus;
};

const seatSections = [
    {
        name: 'Premium',
        price: 350,
        rows: ['A', 'B'],
    },
    {
        name: 'Executive',
        price: 250,
        rows: ['C', 'D', 'E'],
    },
    {
        name: 'Normal',
        price: 150,
        rows: ['F', 'G', 'H'],
    },
];

const occupiedSeats = ['A3', 'A8', 'B5', 'C4', 'D7', 'E9', 'F2', 'G6', 'H10'];

const createSeats = () => {
    const seats: Seat[] = [];

    seatSections.forEach((section) => {
        section.rows.forEach((row) => {
            for (let i = 1; i <= 10; i++) {
                const id = `${row}${i}`;

                seats.push({
                    id,
                    price: section.price,
                    status: occupiedSeats.includes(id)
                        ? 'occupied'
                        : 'available',
                });
            }
        });
    });

    return seats;
};
function SeatBooking() {
    const [seats, setSeats] = useState(createSeats());

    const selectedSeats = seats.filter((seat) => seat.status === 'selected');

    const totalAmount = selectedSeats.reduce(
        (sum, seat) => sum + seat.price,
        0,
    );

    const toggleSeat = (id: string) => {
        setSeats((current: any) =>
            current.map((seat) => {
                if (seat.id !== id) return seat;

                if (seat.status === 'occupied') return seat;

                return {
                    ...seat,
                    status:
                        seat.status === 'selected' ? 'available' : 'selected',
                };
            }),
        );
    };

    return (
        <>
            <Head title="Select Seats" />

            <div className="min-h-screen bg-background p-6">
                <div className="mx-auto max-w-6xl space-y-10">
                    {/* Movie Info */}

                    <Card className="overflow-hidden border-border/60 shadow-sm">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                {/* Movie Info */}
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                    <img
                                        src="/assets/images/movies/interstellar.jpg"
                                        className="h-48 w-32 rounded-xl object-cover shadow-md sm:h-52 sm:w-36"
                                        alt="Interstellar"
                                    />

                                    <div className="space-y-3">
                                        <div>
                                            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                                Interstellar
                                            </h1>

                                            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                                                PVR Phoenix Mall • IMAX
                                                Experience
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <Badge className="px-3 py-1">
                                                Today
                                            </Badge>

                                            <Badge
                                                variant="secondary"
                                                className="px-3 py-1"
                                            >
                                                7:30 PM
                                            </Badge>

                                            <Badge
                                                variant="secondary"
                                                className="px-3 py-1"
                                            >
                                                Hindi
                                            </Badge>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span>🎬</span>
                                            Dolby Atmos • IMAX • 3h 00m
                                        </div>
                                    </div>
                                </div>

                                {/* Seat Legend */}
                                <div className="rounded-xl bg-muted/40 p-4">
                                    <p className="mb-3 text-sm font-semibold">
                                        Seat Availability
                                    </p>

                                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="h-4 w-4 rounded border border-border bg-background" />
                                            Available
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="h-4 w-4 rounded bg-primary" />
                                            Selected
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="h-4 w-4 rounded bg-muted-foreground" />
                                            Occupied
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Seat Sections */}

                    <div className="space-y-12">
                        <Card className="overflow-hidden">
                            <CardContent className="p-5 sm:p-8">
                                {/* Seat Sections */}
                                <div className="space-y-8">
                                    {seatSections.map((section, index) => (
                                        <div key={section.name}>
                                            {/* Section Header */}
                                            <div className="mb-5 flex items-center justify-between">
                                                <div>
                                                    <h2 className="text-lg font-bold">
                                                        {section.name}
                                                    </h2>

                                                    <p className="text-sm text-muted-foreground">
                                                        ₹{section.price} per
                                                        seat
                                                    </p>
                                                </div>

                                                <Badge
                                                    variant="outline"
                                                    className="rounded-full px-3"
                                                >
                                                    {section.rows.length * 10}{' '}
                                                    Seats
                                                </Badge>
                                            </div>

                                            {/* Seats */}
                                            <div className="overflow-x-auto pb-2">
                                                <div className="min-w-[600px] space-y-3">
                                                    {section.rows.map((row) => (
                                                        <div
                                                            key={row}
                                                            className="flex items-center justify-center gap-3"
                                                        >
                                                            {/* Row Number */}
                                                            <span className="w-6 text-sm font-semibold text-muted-foreground">
                                                                {row}
                                                            </span>

                                                            <div className="flex gap-2">
                                                                {[
                                                                    1, 2, 3, 4,
                                                                    5, 6, 7, 8,
                                                                    9, 10,
                                                                ].map(
                                                                    (
                                                                        number,
                                                                    ) => {
                                                                        const seat =
                                                                            seats.find(
                                                                                (
                                                                                    s,
                                                                                ) =>
                                                                                    s.id ===
                                                                                    `${row}${number}`,
                                                                            );

                                                                        return (
                                                                            <button
                                                                                key={
                                                                                    seat?.id
                                                                                }
                                                                                disabled={
                                                                                    seat?.status ===
                                                                                    'occupied'
                                                                                }

                                                                                onClick={() =>
                                                                                    toggleSeat(
                                                                                        seat!
                                                                                            .id,
                                                                                    )
                                                                                }

                                                                                className={`flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium transition-all ${
                                                                                    seat?.status ===
                                                                                    'selected'
                                                                                        ? 'scale-105 border-primary bg-primary text-primary-foreground shadow-md'
                                                                                        : ''
                                                                                } ${
                                                                                    seat?.status ===
                                                                                    'occupied'
                                                                                        ? 'cursor-not-allowed border-muted-foreground bg-muted-foreground text-background'
                                                                                        : 'hover:border-primary hover:bg-primary/10'
                                                                                } `}
                                                                            >
                                                                                {
                                                                                    number
                                                                                }
                                                                            </button>
                                                                        );
                                                                    },
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Separator */}
                                            {index !==
                                                seatSections.length - 1 && (
                                                <Separator className="mt-8" />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Bottom Message */}
                                <div className="mt-10 flex justify-center">
                                    <span className="rounded-full bg-muted px-5 py-2 text-xs text-muted-foreground">
                                        Select your preferred seats
                                    </span>
                                </div>

                                {/* Screen */}
                                <div className="mt-20 flex flex-col items-center">
                                    <div className="h-1.5 w-3/4 rounded-full bg-primary shadow-md" />

                                    <p className="mt-3 text-xs font-medium tracking-[0.35em] text-muted-foreground uppercase">
                                        Screen
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Summary */}

                    <Card>
                        <CardContent className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-xl font-bold">
                                    Selected Seats
                                </h2>

                                <p className="mt-2 text-muted-foreground">
                                    {selectedSeats.length
                                        ? selectedSeats
                                              .map((seat) => seat.id)
                                              .join(', ')
                                        : 'No seats selected'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total
                                </p>

                                <p className="text-3xl font-bold">
                                    ₹{totalAmount}
                                </p>
                            </div>

                            <Button disabled={selectedSeats.length === 0}>
                                Continue
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

SeatBooking.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);

export default SeatBooking;
