import {Container} from "@/components/container";
import {Heading}from "@/components/elements/heading";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const FAQ = ({ heading, sub_heading, faqs }: { heading: string, sub_heading: string, faqs: any[] }) => {
  return (
    <Container className="flex flex-col items-center justify-between pb-20">
      <div className="relative z-20 py-10 md:pt-40">
        <div className="flex justify-center items-center overflow-hidden">
          
        </div>
        <Heading as="h1" className="mt-4">
          {heading}
        </Heading>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-20">
        {faqs && faqs.map((faq: { question: string, answer: string }) => (
          <div key={faq.question}>
            <h4 className="text-lg font-bold">
              {faq.question}
            </h4>
            <Markdown children={faq.answer} remarkPlugins={[remarkGfm]}/>
          </div>
        ))}
      </div>
    </Container>
  );
};
