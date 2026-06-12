import LocationPage from "./LocationPage";

export default function NorfolkPage() {
  return (
    <LocationPage
      city="Norfolk"
      state="Virginia"
      stateAbbr="VA"
      population="1.7 million"
      latitude="36.8508"
      longitude="-76.2859"
      geoRegion="US-VA"
      geoPlacename="Norfolk, Virginia, United States"
      nearbyCities={[
        "Virginia Beach",
        "Chesapeake",
        "Newport News",
        "Hampton",
        "Portsmouth",
        "Suffolk",
        "Williamsburg",
        "Yorktown",
        "Poquoson",
        "Suffolk",
      ]}
      federalAgencies={[
        "Naval Station Norfolk (World's largest naval base)",
        "Joint Expeditionary Base Little Creek-Fort Story",
        "Naval Air Station Oceana",
        "Shipyard Norfolk (NNSY)",
        "U.S. Coast Guard Sector Virginia",
        "Department of Veterans Affairs — Hampton Roads",
        "NASA Langley Research Center",
      ]}
      customDescription="GSA Schedule consulting in Norfolk, Virginia. We help Hampton Roads defense contractors and maritime businesses obtain GSA MAS Contracts near the world's largest naval base. 98% approval rate. Call (813) 665-0308."
    />
  );
}
