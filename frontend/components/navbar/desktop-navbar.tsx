import { cn } from "@/lib/utils";
import { Logo } from "../logo";
import { NavbarItem } from "./navbar-item";
import { Button } from "../elements/button";
import Link from "next/link";

type Props = {
    leftNavbarItems: {
        URL: string;
        text: string;
        target?: string;
    }[];
    rightNavbarItems: {
        URL: string;
        text: string;
        target?: string;
    }[];
    logo: any;
};

export const DesktopNavbar = ({ leftNavbarItems, rightNavbarItems, logo }: Props) => {

    return (
        <div className={cn("w-full flex relative justify-between px-4 py-3 rounded-md mx-auto")}>
            <div className="flex flex-row gap-2 items-center h-20">
                <Logo image={logo?.image} company={logo?.company} />
                <div className="flex items-center gap-1.5">
                    {leftNavbarItems.map((item) => (
                        <NavbarItem href={`/${item.URL}` as never} key={item.text} target={item.target}>
                            {item.text}
                        </NavbarItem>
                    ))}
                </div>
            </div>
            <div className="flex space-x-2 items-center">
                {rightNavbarItems.map((item, index) => (
                    <Button key={item.text} variant="outline" as={Link} href={`/${item.URL}`}>
                        {item.text}
                    </Button>
                ))}

            </div>
        </div>
    )
}
