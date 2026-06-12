import LocationPage from "./LocationPage";

export default function HuntsvillePage() {
  return (
    <LocationPage
      city="Huntsville"
      state="Alabama"
      stateAbbr="AL"
      population="500,000"
      latitude="34.7304"
      longitude="-86.5861"
      geoRegion="US-AL"
      geoPlacename="Huntsville, Alabama, United States"
      nearbyCities={[
        "Madison",
        "Decatur",
        "Athens",
        "Meridianville",
        "Harvest",
        "Owens Cross Roads",
        "Hampton Cove",
        "Toney",
        "Ardmore",
        "Falkville",
      ]}
      federalAgencies={[
        "NASA Marshall Space Flight Center",
        "U.S. Army Aviation & Missile Command (AMCOM)",
        "U.S. Space & Rocket Center",
        "FBI Hazardous Devices School",
        "Missile Defense Agency",
        "U.S. Army Corps of Engineers — Mobile District",
        "Department of Veterans Affairs — Huntsville",
      ]}
      customDescription="GSA Schedule consulting in Huntsville, Alabama — Rocket City. We help defense and aerospace contractors near NASA Marshall and AMCOM obtain GSA MAS Contracts. 98% approval rate. Call (813) 665-0308."
    />
  );
}
