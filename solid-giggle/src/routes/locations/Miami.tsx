import LocationPage from "./LocationPage";

export default function MiamiPage() {
  return (
    <LocationPage
      city="Miami"
      state="Florida"
      stateAbbr="FL"
      population="2.7 million"
      latitude="25.7617"
      longitude="-80.1918"
      geoRegion="US-FL"
      geoPlacename="Miami, Florida, United States"
      nearbyCities={[
        "Fort Lauderdale",
        "Hollywood",
        "Coral Gables",
        "Hialeah",
        "Miami Beach",
        "Doral",
        "Aventura",
        "Pembroke Pines",
        "Boca Raton",
        "West Palm Beach",
      ]}
      federalAgencies={[
        "U.S. Southern Command (SOUTHCOM)",
        "U.S. Coast Guard Sector Miami",
        "Department of Homeland Security",
        "U.S. Customs and Border Protection",
        "VA Miami Healthcare System",
        "NOAA Atlantic Oceanographic Lab",
        "Federal Aviation Administration",
      ]}
      customDescription="GSA Schedule consulting in Miami, Florida. We help South Florida businesses obtain GSA MAS Contracts near SOUTHCOM, Coast Guard, and DHS. Bilingual support available. 98% approval rate. Call (813) 665-0308."
    />
  );
}
