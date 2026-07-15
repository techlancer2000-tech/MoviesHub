import { PropsWithChildren } from 'react';

export default function PublicLayout({ children }: PropsWithChildren) {
    return <div className="min-h-screen bg-background">{children}</div>;
}
