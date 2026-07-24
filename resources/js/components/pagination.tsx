import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Props {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export default function Pagination({ links }: Props) {
    return (
        <div className="mt-4 flex justify-end">
            {links.map((link, index) => {
                const label = link.label.toLowerCase();

                const isPrevious =
                    label.includes('previous') || label.includes('laquo');

                const isNext =
                    label.includes('next') || label.includes('raquo');

                return (
                    <Button
                        key={index}
                        variant={link.active ? 'default' : 'outline'}
                        size="icon"
                        className="-ml-px rounded-none first:rounded-l-md last:rounded-r-md"
                        disabled={!link.url}
                        asChild={!!link.url}
                    >
                        {link.url ? (
                            <Link href={link.url} preserveState>
                                {isPrevious ? (
                                    <ChevronLeft className="h-4 w-4" />
                                ) : isNext ? (
                                    <ChevronRight className="h-4 w-4" />
                                ) : (
                                    link.label
                                )}
                            </Link>
                        ) : (
                            <span>
                                {isPrevious ? (
                                    <ChevronLeft className="h-4 w-4" />
                                ) : isNext ? (
                                    <ChevronRight className="h-4 w-4" />
                                ) : (
                                    link.label
                                )}
                            </span>
                        )}
                    </Button>
                );
            })}
        </div>
    );
}
