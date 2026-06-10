import { getApolloClient } from "@/lib/apollo/client";
import { CP_PAGES } from "@/graphql/cms/queries/page";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const client = getApolloClient();
  const { data } = await client.query({
    query: CP_PAGES,
    variables: {},
  });
  
  const pages = (data as any)?.cpPages ?? [];
  const slugs = pages.map((p: any) => p.slug).filter(Boolean);
  
  const params = [];
  for (const locale of ["en", "mn"]) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export default async function CmsPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  
  const client = getApolloClient();
  const { data } = await client.query({
    query: CP_PAGES,
    variables: { language: locale },
  });
  
  const pages = (data as any)?.cpPages ?? [];
  const page = pages.find((p: any) => p.slug === slug);
  
  if (!page) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 bg-[#F5F0E8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif text-[#3D2314] mb-8">
          {page.name}
        </h1>
        <div
          className="prose prose-lg max-w-none text-[#3D2314]/80"
          dangerouslySetInnerHTML={{ __html: page.content ?? "" }}
        />
      </div>
    </div>
  );
}
