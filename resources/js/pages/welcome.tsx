import { Head, Link, usePage } from '@inertiajs/react';
import {
    Clapperboard,
    Armchair,
    CreditCard,
    ShieldCheck,
    Star,
    Ticket,
    ChevronDown,
    Facebook,
    Instagram,
    Twitter,
} from 'lucide-react';

import { dashboard, login, register, logout } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    const movies = [
        {
            title: 'Interstellar',
            genre: 'Sci-Fi • Adventure',
            rating: '8.7',
            image: '/assets/images/movies/interstellar.jpg',
        },
        {
            title: 'The Dark Knight',
            genre: 'Action • Crime',
            rating: '9.0',
            image: '/assets/images/movies/dark-knight.jpg',
        },
        {
            title: 'Inception',
            genre: 'Thriller • Sci-Fi',
            rating: '8.8',
            image: '/assets/images/movies/inception.jpg',
        },
        {
            title: 'Avatar',
            genre: 'Fantasy • Adventure',
            rating: '7.9',
            image: '/assets/images/movies/avatar.jpg',
        },
    ];

    const features = [
        {
            icon: Clapperboard,
            title: 'Latest Movies',
            description:
                'Watch the newest releases and trending movies from around the world.',
        },
        {
            icon: Armchair,
            title: 'Choose Your Seats',
            description:
                'Pick your preferred seats with our interactive seating system.',
        },
        {
            icon: CreditCard,
            title: 'Secure Payments',
            description:
                'Fast and secure checkout with multiple payment options.',
        },
        {
            icon: ShieldCheck,
            title: 'Safe Booking',
            description:
                'Your tickets and payments are protected with industry standards.',
        },
    ];

    const faqs = [
        'How can I book movie tickets?',
        'Can I cancel or modify my booking?',
        'Which payment methods are supported?',
        'Can I select my preferred seats?',
    ];

    return (
        <>
            <Head title="Movie Ticket Booking" />

            <div className="min-h-screen bg-background text-foreground">
                {/* Header */}
                <header className="border-b border-border">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                        <Link href="/" className="text-2xl font-bold">
                            <img
                                src="/assets/images/logo/logo.png"
                                className="h-16 rounded"
                            />
                        </Link>

                        <nav className="flex items-center gap-3">
                            {auth.user ? (
                                auth.user.role === "admin" ? (
                                    <Link href={dashboard()} className="rounded-xl bg-primary px-5 py-2 font-medium text-primary-foreground">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={logout()}
                                        method="post"
                                        as="button"
                                        className="rounded-xl bg-red-500 px-5 py-2 font-medium text-white flex"
                                    >
                                        Logout
                                    </Link>
                                )
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded-xl px-5 py-2 hover:bg-muted"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href={register()}
                                        className="rounded-xl bg-primary px-5 py-2 font-medium text-primary-foreground"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero */}
                <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
                    <div>
                        <span className="rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary">
                            Now Showing
                        </span>

                        <h1 className="mt-6 text-5xl leading-tight font-bold lg:text-7xl">
                            Book your movie
                            <br />
                            <span className="text-primary">
                                experience today.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                            Discover movies, select your favorite seats, choose
                            nearby cinemas and enjoy hassle-free online ticket
                            booking.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <Link
                                href={register()}
                                className="rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg"
                            >
                                Book Tickets
                            </Link>

                            <Link
                                href="/movies"
                                className="rounded-xl border border-border px-8 py-3 font-semibold hover:bg-muted"
                            >
                                Browse Movies
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-primary/10 p-8">
                        <div className="rounded-3xl bg-card p-8 shadow-xl">
                            <div className="flex aspect-square items-center justify-center rounded-2xl bg-muted">
                                <Ticket className="h-32 w-32 text-primary" />
                            </div>

                            <h3 className="mt-6 text-2xl font-bold">
                                Instant Movie Booking
                            </h3>

                            <p className="mt-2 text-muted-foreground">
                                Skip queues and get your digital tickets
                                instantly.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Movies */}

                <section className="mx-auto max-w-7xl px-6 py-20">
                    <div className="mb-10 flex justify-between">
                        <div>
                            <h2 className="text-3xl font-bold">
                                Featured Movies
                            </h2>

                            <p className="text-muted-foreground">
                                Trending movies near you
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {movies.map((movie) => (
                            <div
                                key={movie.title}
                                className="overflow-hidden rounded-2xl border border-border bg-card"
                            >
                                <img
                                    src={movie.image}
                                    className="aspect-[2/3] w-full object-cover"
                                />

                                <div className="p-5">
                                    <h3 className="font-bold">{movie.title}</h3>

                                    <p className="text-sm text-muted-foreground">
                                        {movie.genre}
                                    </p>

                                    <div className="mt-3 flex items-center gap-2">
                                        <Star className="h-4 w-4 fill-current text-primary" />

                                        {movie.rating}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features */}

                <section className="bg-muted/40 py-20">
                    <div className="mx-auto max-w-7xl px-6">
                        <h2 className="text-center text-3xl font-bold">
                            Why Choose Us?
                        </h2>

                        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {features.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="rounded-2xl border border-border bg-card p-6"
                                    >
                                        <Icon className="h-10 w-10 text-primary" />

                                        <h3 className="mt-5 font-bold">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Stats */}

                <section className="mx-auto grid max-w-7xl gap-6 px-6 py-20 md:grid-cols-4">
                    {[
                        ['50+', 'Cities'],
                        ['500+', 'Cinemas'],
                        ['15K+', 'Shows Weekly'],
                        ['1M+', 'Customers'],
                    ].map(([number, label]) => (
                        <div
                            key={label}
                            className="rounded-2xl border bg-card p-8 text-center"
                        >
                            <h3 className="text-4xl font-bold text-primary">
                                {number}
                            </h3>

                            <p className="mt-2 text-muted-foreground">
                                {label}
                            </p>
                        </div>
                    ))}
                </section>

                {/* FAQ */}

                <section className="mx-auto max-w-4xl px-6 py-20">
                    <h2 className="text-center text-3xl font-bold">
                        Frequently Asked Questions
                    </h2>

                    <div className="mt-10 space-y-4">
                        {faqs.map((faq) => (
                            <div
                                key={faq}
                                className="flex items-center justify-between rounded-xl border p-5"
                            >
                                {faq}

                                <ChevronDown className="h-5 w-5" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}

                <footer className="border-t border-border">
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
                        <div>
                            <Link href="/" className="text-2xl font-bold">
                                <img
                                    src="/assets/images/logo/logo.png"
                                    className="h-10 rounded"
                                />
                            </Link>

                            <p className="mt-3 text-muted-foreground">
                                Your destination for easy movie ticket booking.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold">Company</h4>

                            <p className="mt-3 text-muted-foreground">About</p>

                            <p className="text-muted-foreground">Careers</p>
                        </div>

                        <div>
                            <h4 className="font-semibold">Support</h4>

                            <p className="mt-3 text-muted-foreground">
                                Help Center
                            </p>

                            <p className="text-muted-foreground">Contact</p>
                        </div>

                        <div>
                            <h4 className="font-semibold">Follow</h4>

                            <div className="mt-4 flex gap-4">
                                <Facebook />
                                <Instagram />
                                <Twitter />
                            </div>
                        </div>
                    </div>

                    <div className="border-t py-5 text-center text-sm text-muted-foreground">
                        © 2026 Golden. All rights reserved.
                    </div>
                </footer>
            </div>
        </>
    );
}
