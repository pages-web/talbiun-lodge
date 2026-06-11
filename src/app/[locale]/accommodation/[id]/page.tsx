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

export default function AccommodationDetailPage({ params }: { params: { locale: string; id: string } }) {
  return <AccommodationDetailClient id={params.id} />;
}
