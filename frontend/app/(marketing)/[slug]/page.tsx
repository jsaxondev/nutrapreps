import PageContent from "@/lib/shared/pageContext";
import fetchContentType from "@/lib/strapi/fetchContentType";

export default async function Page({ params }: { params: { locale: string, slug: string } }) {
    const pageData = await fetchContentType(
        "pages",
        {
            filters: {
                slug: params.slug
            },
        },
        true,
    );

    return (
        <>
          <PageContent pageData={pageData} />
        </>
    
      );
}