"use client";
import { Container } from "@/components/container";
import { Heading } from "@/components/elements/heading";
import { Subheading } from "@/components/elements/subheading";
import Image from "next/image";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { useEffect, useState, useRef } from "react";

export const ExploreOurMenu = ({ heading, sub_heading, meals }: { heading: string; sub_heading: string; meals: any }) => {
    const [startIndex, setStartIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(3);
    const [isMobile, setIsMobile] = useState(false);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            setItemsToShow(mobile ? 1 : 3);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleNext = () => {
        setStartIndex((prevStartIndex) => {
            return (prevStartIndex + 1) % meals.length;
        });
    };

    const handlePrev = () => {
        setStartIndex((prevStartIndex) => {
            return (prevStartIndex - 1 + meals.length) % meals.length;
        });
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current && touchEndX.current) {
            const diffX = touchStartX.current - touchEndX.current;
            if (diffX > 50) {
                handleNext();
            } else if (diffX < -50) {
                handlePrev();
            }
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    const visibleMeals = Array.from({ length: itemsToShow }, (_, i) => meals[(startIndex + i) % meals.length]);

    const getActiveDotIndex = () => {
        if (isMobile) {
            return startIndex;
        }
        return startIndex + Math.floor(itemsToShow / 2);
    };

    const calculateDotIndex = (index: number) => {
        return index;
    };

    const getNumberOfDots = () => {
        return meals.length;
    };

    return (
        <div className="relative bg-white">
            <Container className="py-10 max-w-7xl mx-auto relative z-40">
                <Heading className="pt-4 text-slate-900">{heading}</Heading>
                <Subheading className="max-w-3xl mx-auto text-slate-900">
                    {sub_heading}
                </Subheading>
                <div
                    className="flex items-center justify-center relative pt-5"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {!isMobile && (
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 p-2 cursor-pointer text-3xl text-gray-400"
                        >
                            {"<"}
                        </button>
                    )}

                    <div className={`grid grid-cols-1 ${isMobile ? 'gap-2' : 'lg:grid-cols-3 gap-4'} w-full max-w-5xl mx-auto`}>
                        {visibleMeals.map((item: { name: string; description: string; image: any }, index: number) => (
                            <div key={index} className="p-0 shadow-lg">
                                <Image
                                    src={strapiImage(item.image?.url)}
                                    alt={item.name}
                                    width={400}
                                    height={200}
                                    className="w-full rounded-tl-lg rounded-tr-lg object-cover"
                                    style={{ height: '248px' }}
                                />
                                <h3 className="bg-white text-slate-900 text-md font-semibold h-16 flex items-center justify-center rounded-bl-lg rounded-br-lg py-2 px-2">
                                    {item.name}
                                </h3>
                            </div>
                        ))}
                    </div>

                    {!isMobile && (
                        <button
                            onClick={handleNext}
                            className="absolute right-4 p-2 rounded-full cursor-pointer text-3xl text-gray-400"
                        >
                            {">"}
                        </button>
                    )}
                </div>
                <div className="flex justify-center mt-4">
                    {meals.map((_, index) => (
                        <button
                            key={index}
                            className={`h-2 w-2 rounded-full mx-1 ${
                                index === getActiveDotIndex() % meals.length ? 'bg-slate-700' : 'bg-gray-300'
                            }`}
                            onClick={() => setStartIndex(calculateDotIndex(index))}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
};