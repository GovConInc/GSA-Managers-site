import LocationPage from "./LocationPage";

export default function OrlandoPage() {
  return (
    <LocationPage
      city="Orlando"
      state="Florida"
      stateAbbr="FL"
      population="2.7 million"
      latitude="28.5384"
      longitude="-81.3789"
      geoRegion="US-FL"
      geoPlacename="Orlando, Florida, United States"
      nearbyCities={[
        "Kissimmee",
        "Sanford",
        "Winter Park",
        "Altamonte Springs",
        "Oviedo",
        "Lake Mary",
        "St. Cloud",
        "Apopka",
        "Ocoee",
        "Winter Garden",
      ]}
      federalAgencies={[
        "NASA Kennedy Space Center",
        "U.S. Army Simulation & Training (PEO STRI)",
        "Naval Support Activity Orlando",
        "Department of Veterans Affairs — Orlando VA",
        "U.S. Postal Service — Orlando Processing",
        "Transportation Security Administration",
      ]}
      customDescription="GSA Schedule consulting in Orlando, Florida. We help Central Florida businesses win federal contracts near NASA KSC, PEO STRI, and Naval Support Orlando. 98% approval rate. Call (813) 665-0308."
    />
  );
}
