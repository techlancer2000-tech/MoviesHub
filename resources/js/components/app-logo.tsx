import AppLogoIcon from '@/components/app-logo-icon';
import { useSidebar } from '@/components/ui/sidebar';

export default function AppLogo() {
    const { open } = useSidebar();

    return (
        <div className="flex w-full items-center justify-center">
            <img
                src={
                    open
                        ? '/assets/images/logo/logo.png'
                        : '/assets/images/logo/favicon.png'
                }
                className={open ? 'h-14' : 'h-8'}
                alt="Logo"
            />
        </div>
    );
}
