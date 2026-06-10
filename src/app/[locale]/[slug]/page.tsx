import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = ["about", "experiences", "contact"];
  const params = [];
  for (const locale of ["en", "mn"]) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export default function CmsPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  return (
    <div className="pt-32 pb-24 bg-[#F5F0E8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif text-[#3D2314] mb-8">
          Page
        </h1>
        <p className="text-[#3D2314]/70">
          This page is loading...
        </p>
      </div>
    </div>
  );
}
