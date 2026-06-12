import LocationPage from "./LocationPage";

export default function SanDiegoPage() {
  return (
    <LocationPage
      city="San Diego"
      state="California"
      stateAbbr="CA"
      population="3.3 million"
      latitude="32.7157"
      longitude="-117.1611"
      geoRegion="US-CA"
      geoPlacename="San Diego, California, United States"
      nearbyCities={[
        "Chula Vista",
        "Oceanside",
        "Escondido",
        "Carlsbad",
        "El Cajon",
        "Vista",
        "San Marcos",
        "Encinitas",
        "National City",
        "La Mesa",
      ]}
      federalAgencies={[
        "Naval Base San Diego (NBSD)",
        "Marine Corps Recruit Depot (MCRD)",
        "Naval Air Station North Island",
        "Space and Naval Warfare Systems Command (SPAWAR)",
        "Department of Veterans Affairs — San Diego",
        "U.S. Customs and Border Protection",
        "NOAA Southwest Fisheries Science Center",
      ]}
      customDescription="GSA Schedule consulting in San Diego, California. We help San Diego defense contractors and businesses obtain GSA MAS Contracts near Naval Base San Diego and SPAWAR. 98% approval rate. Call (813) 665-0308."
    />
  );
}
