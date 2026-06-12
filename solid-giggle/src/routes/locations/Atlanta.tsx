import LocationPage from "./LocationPage";

export default function AtlantaPage() {
  return (
    <LocationPage
      city="Atlanta"
      state="Georgia"
      stateAbbr="GA"
      population="6.1 million"
      latitude="33.7490"
      longitude="-84.3880"
      geoRegion="US-GA"
      geoPlacename="Atlanta, Georgia, United States"
      nearbyCities={[
        "Sandy Springs",
        "Marietta",
        "Alpharetta",
        "Decatur",
        "Roswell",
        "Johns Creek",
        "Dunwoody",
        "Smyrna",
        "Brookhaven",
        "Peachtree City",
      ]}
      federalAgencies={[
        "Centers for Disease Control and Prevention (CDC)",
        "Federal Reserve Bank of Atlanta",
        "U.S. Army Corps of Engineers — South Atlantic",
        "Department of Veterans Affairs — Atlanta",
        "General Services Administration — Region 4",
        "U.S. Environmental Protection Agency — Region 4",
        "Federal Aviation Administration — Southern Region",
      ]}
      customDescription="GSA Schedule consulting in Atlanta, Georgia. We help Atlanta businesses navigate GSA MAS Contracts near the CDC, Federal Reserve, and GSA Region 4. 98% approval rate. Call (813) 665-0308."
    />
  );
}
