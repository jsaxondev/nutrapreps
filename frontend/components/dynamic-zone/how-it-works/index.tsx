import { Container } from "@/components/container"
import { Heading } from "@/components/elements/heading"
import { Subheading } from "@/components/elements/subheading"
import { Card } from "./card"

export const HowItWorks = ({ heading, sub_heading, steps }: { heading: string, sub_heading: string, steps: any }) => {
    return (
        <div className="relative bg-sky-700">
            <Container className="py-10 max-w-7xl mx-auto relative z-40">
                <Heading className="pt-4 text-white">{heading}</Heading>
                <Subheading className="max-w-3xl text-white mx-auto">
                    {sub_heading}
                </Subheading>
            </Container>

            {steps && steps.map((item: { title: string; description: string; }, index: number) => (
                <Card
                    title={item.title}
                    description={item.description}
                    index={index + 1}
                    key={"card" + index}
                />
            ))}
        </div>
    )
}