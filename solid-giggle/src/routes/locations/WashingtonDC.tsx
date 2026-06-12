import LocationPage from "./LocationPage";

export default function WashingtonDCPage() {
  return (
    <LocationPage
      city="Washington"
      state="DC"
      stateAbbr="DC"
      population="700,000"
      latitude="38.9072"
      longitude="-77.0369"
      geoRegion="US-DC"
      geoPlacename="Washington, District of Columbia, United States"
      nearbyCities={[
        "Arlington",
        "Alexandria",
        "Bethesda",
        "Silver Spring",
        "Reston",
        "Tysons",
        "Rockville",
        "Fairfax",
        "Falls Church",
        "McLean",
      ]}
      federalAgencies={[
        "Department of Defense (Pentagon)",
        "General Services Administration (GSA HQ)",
        "Department of Homeland Security",
        "Department of State",
        "Department of Justice",
        "Department of Energy",
        "NASA Headquarters",
        "Small Business Administration (SBA HQ)",
        "Department of Veterans Affairs",
        "Department of Health and Human Services",
      ]}
      customDescription="Premier GSA Schedule consulting in Washington, DC. We help DC-area contractors navigate GSA MAS Contracts near the Pentagon, GSA HQ, and every federal agency. 98% approval rate. Call (813) 665-0308."
    />
  );
}
