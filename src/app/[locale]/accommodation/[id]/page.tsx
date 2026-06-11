import AccommodationDetailClient from "./AccommodationDetailClient";

export function generateStaticParams() {
  return [
    { locale: "en", id: "deluxe" },
    { locale: "en", id: "family" },
    { locale: "en", id: "standard" },
    { locale: "mn", id: "deluxe" },
    { locale: "mn", id: "family" },
    { locale: "mn", id: "standard" },
  ];
}

export default async function AccommodationDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { id } = await params;
  return <AccommodationDetailClient id={id} />;
}
