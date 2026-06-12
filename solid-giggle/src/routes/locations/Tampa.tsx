import LocationPage from "./LocationPage";

export default function TampaPage() {
  return (
    <LocationPage
      city="Tampa"
      state="Florida"
      stateAbbr="FL"
      population="3.2 million"
      latitude="27.9506"
      longitude="-82.4572"
      geoRegion="US-FL"
      geoPlacename="Tampa, Florida, United States"
      nearbyCities={[
        "St. Petersburg",
        "Clearwater",
        "Brandon",
        "Lakeland",
        "Sarasota",
        "Bradenton",
        "Plant City",
        "Wesley Chapel",
        "Riverview",
        "Palm Harbor",
      ]}
      federalAgencies={[
        "MacDill Air Force Base (CENTCOM / SOCOM)",
        "U.S. Coast Guard Sector St. Petersburg",
        "VA Bay Pines Healthcare System",
        "Department of Homeland Security",
        "U.S. Army Corps of Engineers — Jacksonville District",
        "NOAA National Weather Service — Tampa Bay",
        "General Services Administration — Region 4",
      ]}
      customDescription="Expert GSA Schedule consulting in Tampa, Florida. We help Tampa Bay businesses obtain and manage GSA MAS Contracts. Near MacDill AFB and major federal agencies. 98% approval rate. Call (813) 665-0308."
    />
  );
}
