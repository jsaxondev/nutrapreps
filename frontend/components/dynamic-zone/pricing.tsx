import { Container } from "@/components/container"
import { Heading } from "@/components/elements/heading"
import { Subheading } from "@/components/elements/subheading"
import { Button } from "../elements/button"
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { cn } from "@/lib/utils";

export const Pricing = ({ heading, sub_heading, plans }: { heading: string, sub_heading: string, plans: any }) => {
    return (
        <div className="relative bg-zinc-600 pb-20">
            <Container className="py-10 max-w-7xl mx-auto relative z-40">
                <Heading className="pt-4 text-white">{heading}</Heading>
                <Subheading className="max-w-3xl mx-auto text-white">
                    {sub_heading}
                </Subheading>
            </Container>

            <div className="flex items-center justify-center relative">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full max-w-7xl mx-auto">
                    {plans && plans.map((item: { name: string; description: string; price: number, CTAs: any[], perks: any[] }, index: number) => (

                        <div key={index} className="p-0 my-3 lg:my-0 shadow-lg text-white bg-zinc-900 lg:rounded-lg">
                            <div className="m-5 p-3 rounded-lg bg-zinc-700">
                                <h3 className="text-lg h-12">{item.name}</h3>
                                <p className="text-3xl"><span className="text-zinc-400 text-lg">£</span> {item.price}.00 <span className="text-zinc-400 text-lg">/  per week</span></p>
                                <div className="mt-5">
                                    {item.CTAs && item.CTAs.map((cta) => (
                                        <Button
                                            key={cta?.id}
                                            as={Link}
                                            href={`/${cta.URL}`}
                                            {...(cta.variant && { variant: cta.variant })}
                                        >
                                            {cta.text}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-1 p-4">
                                {item.perks.map((feature, idx) => (
                                    <Step key={idx}>
                                        {feature.text}
                                    </Step>
                                ))}
                            </div>
                        </div>

                    ))}
                </div>
            </div>

        </div>
    )
}

const Step = ({
    children,
    additional,
}: {
    children: React.ReactNode;
    additional?: boolean;
}) => {
    return (
        <div className="flex items-start justify-start gap-2 my-4">
            <div
                className={cn(
                    "h-4 w-4 rounded-full bg-neutral-700 flex items-center justify-center flex-shrink-0 mt-0.5"
                )}
            >
                <FaCheck className="h-3 w-3 [stroke-width:4px] text-white-300" />
            </div>
            <div
                className={cn(
                    "font-medium text-white text-sm",
                    "text-white"
                )}
            >
                {children}
            </div>
        </div>
    );
};