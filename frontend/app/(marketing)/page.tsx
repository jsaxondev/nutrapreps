import PageContent from '@/lib/shared/pageContext';
import fetchContentType from '@/lib/strapi/fetchContentType';

export default async function HomePage({ params }: { params: {} }) {
    const pageData = await fetchContentType(
        'pages',
        {
            filters: {
                slug: "homepage"
            },
        },
        true
    );

    return <>
        <PageContent pageData={pageData}/>
    </>;
}