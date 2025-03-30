import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavBar } from "./mobile-navbar";

export function Navbar({ data }: { data: any }) {

    return (
        <div className="block bg-slate-900">
            <div className="max-w-7xl static top-4  mx-auto inset-x-0 z-50 w-[95%] lg:w-full">
                <div className="hidden lg:block w-full">
                    {data?.left_navbar_items && (
                        <DesktopNavbar leftNavbarItems={data?.left_navbar_items} rightNavbarItems={data?.right_navbar_items} logo={data?.logo} />
                    )}
                </div>
                <div className="flex h-full w-full items-center lg:hidden">
                    <MobileNavBar leftNavbarItems={data?.left_navbar_items} rightNavbarItems={data?.right_navbar_items} logo={data?.logo} />
                </div>
            </div>
        </div>
    )
}