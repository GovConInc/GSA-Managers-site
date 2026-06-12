import LocationPage from "./LocationPage";

export default function DallasPage() {
  return (
    <LocationPage
      city="Dallas"
      state="Texas"
      stateAbbr="TX"
      population="7.6 million"
      latitude="32.7767"
      longitude="-96.7970"
      geoRegion="US-TX"
      geoPlacename="Dallas, Texas, United States"
      nearbyCities={[
        "Fort Worth",
        "Arlington",
        "Plano",
        "Irving",
        "Frisco",
        "Garland",
        "McKinney",
        "Grand Prairie",
        "Denton",
        "Richardson",
      ]}
      federalAgencies={[
        "U.S. Army Corps of Engineers — Fort Worth District",
        "Federal Reserve Bank of Dallas",
        "Department of Veterans Affairs — Dallas VA",
        "U.S. Customs and Border Protection",
        "Federal Aviation Administration — Southwest Region",
        "General Services Administration — Region 7",
        "NASA Johnson Space Center (Houston)",
      ]}
      customDescription="GSA Schedule consulting in Dallas, Texas. We help DFW businesses obtain GSA MAS Contracts near federal agencies across North Texas. 98% approval rate. Call (813) 665-0308."
    />
  );
}
