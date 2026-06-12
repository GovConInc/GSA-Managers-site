import LocationPage from "./LocationPage";

export default function ColoradoSpringsPage() {
  return (
    <LocationPage
      city="Colorado Springs"
      state="Colorado"
      stateAbbr="CO"
      population="750,000"
      latitude="38.8339"
      longitude="-104.8214"
      geoRegion="US-CO"
      geoPlacename="Colorado Springs, Colorado, United States"
      nearbyCities={[
        "Fountain",
        "Manitou Springs",
        "Monument",
        "Woodland Park",
        "Peyton",
        "Falcon",
        "Black Forest",
        "Cimarron Hills",
        "Gleneagle",
        "Cascade",
      ]}
      federalAgencies={[
        "U.S. Air Force Academy",
        "North American Aerospace Defense Command (NORAD)",
        "U.S. Space Command",
        "Peterson Space Force Base",
        "Schriever Space Force Base",
        "Cheyenne Mountain Space Force Station",
        "Fort Carson Army Base",
        "Department of Veterans Affairs — Colorado Springs",
      ]}
      customDescription="GSA Schedule consulting in Colorado Springs, Colorado. We help defense and space contractors near NORAD, Space Command, and multiple Space Force bases obtain GSA MAS Contracts. 98% approval rate. Call (813) 665-0308."
    />
  );
}
