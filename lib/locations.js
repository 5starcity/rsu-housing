// lib/locations.js
// Single source of truth for all Port Harcourt / UST-area locations used
// across add-listing, filter bar, and listings page.
//
// value  — stored in Firestore, used for filtering
// label  — shown in dropdowns and filter pills
// hint   — short description shown as a sub-label where space allows
// mapQuery — appended to Google Maps search URL

export const LOCATIONS = [
    {
      value: "Choba (Back Gate)",
      label: "Choba (Back Gate)",
      hint: "Behind UST — most popular student area",
      mapQuery: "Choba, Port Harcourt, Nigeria",
    },
    {
      value: "Obirikwe (Main Gate)",
      label: "Obirikwe (Main Gate)",
      hint: "Front of UST campus",
      mapQuery: "Obirikwe, Port Harcourt, Nigeria",
    },
    {
      value: "Alakahia",
      label: "Alakahia",
      hint: "Close to Back Gate",
      mapQuery: "Alakahia, Choba, Port Harcourt, Nigeria",
    },
    {
      value: "Ozuoba",
      label: "Ozuoba",
      hint: "Along Back Gate road",
      mapQuery: "Ozuoba, Port Harcourt, Nigeria",
    },
    {
      value: "Mgbuoba",
      label: "Mgbuoba",
      hint: "Off Back Gate axis",
      mapQuery: "Mgbuoba, Port Harcourt, Nigeria",
    },
    {
      value: "Rumuola",
      label: "Rumuola",
      hint: "Trans-Amadi area",
      mapQuery: "Rumuola, Port Harcourt, Nigeria",
    },
    {
      value: "Rumuokoro",
      label: "Rumuokoro",
      hint: "Rumuokoro junction axis",
      mapQuery: "Rumuokoro, Port Harcourt, Nigeria",
    },
    {
      value: "Rumuigbo",
      label: "Rumuigbo",
      hint: "Off Aba Road",
      mapQuery: "Rumuigbo, Port Harcourt, Nigeria",
    },
    {
      value: "Woji",
      label: "Woji",
      hint: "Woji Road axis",
      mapQuery: "Woji, Port Harcourt, Nigeria",
    },
    {
      value: "GRA",
      label: "GRA",
      hint: "Government Reserved Area",
      mapQuery: "GRA, Port Harcourt, Nigeria",
    },
    {
      value: "Peter Odili",
      label: "Peter Odili",
      hint: "Peter Odili Road",
      mapQuery: "Peter Odili Road, Port Harcourt, Nigeria",
    },
    {
      value: "Eliozu",
      label: "Eliozu",
      hint: "Eliozu axis",
      mapQuery: "Eliozu, Port Harcourt, Nigeria",
    },
    {
      value: "Rumuepirikom",
      label: "Rumuepirikom",
      hint: "Off Aba Road",
      mapQuery: "Rumuepirikom, Port Harcourt, Nigeria",
    },
    {
      value: "Other",
      label: "Other",
      hint: "Anywhere else in Port Harcourt",
      mapQuery: "Port Harcourt, Nigeria",
    },
  ];
  
  // For filter bar — prepend "All" option
  export const LOCATION_FILTER_OPTIONS = [
    { value: "All", label: "All Areas" },
    ...LOCATIONS,
  ];
  
  // UST-gate grouped labels for the filter bar section headers
  export const UST_GATE_AREAS = [
    "Choba (Back Gate)",
    "Obirikwe (Main Gate)",
    "Alakahia",
    "Ozuoba",
    "Mgbuoba",
  ];
  
  export const OTHER_PH_AREAS = [
    "Rumuola",
    "Rumuokoro",
    "Rumuigbo",
    "Woji",
    "GRA",
    "Peter Odili",
    "Eliozu",
    "Rumuepirikom",
    "Other",
  ];