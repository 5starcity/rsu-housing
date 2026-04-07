// components/listings/FilterBar.jsx
"use client";

import { UST_GATE_AREAS, OTHER_PH_AREAS, LOCATIONS } from "@/lib/locations";
import "@/styles/filter-bar.css";

const ustAreas = LOCATIONS.filter((l) => UST_GATE_AREAS.includes(l.value));
const otherAreas = LOCATIONS.filter((l) => OTHER_PH_AREAS.includes(l.value));

export default function FilterBar({
  search,
  setSearch,
  location,
  setLocation,
  type,
  setType,
  price,
  setPrice,
  verified,
  setVerified,
  availability,
  setAvailability,
}) {
  function handleReset() {
    setSearch("");
    setLocation("All");
    setType("All");
    setPrice("All");
    setVerified(false);
    setAvailability("All");
  }

  const hasActiveFilters =
    search !== "" ||
    location !== "All" ||
    type !== "All" ||
    price !== "All" ||
    verified ||
    availability !== "All";

  return (
    <div className="filter-bar">
      {/* Search */}
      <div className="filter-bar__search-wrap">
        <input
          type="text"
          placeholder="Search by title or area..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-bar__input"
        />
        {search && (
          <button className="filter-bar__clear" onClick={() => setSearch("")}>✕</button>
        )}
      </div>

      {/* Location — grouped by UST gate areas first */}
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="filter-bar__select"
      >
        <option value="All">All Areas</option>
        <optgroup label="Near UST">
          {ustAreas.map((loc) => (
            <option key={loc.value} value={loc.value}>
              {loc.label}
            </option>
          ))}
        </optgroup>
        <optgroup label="Port Harcourt">
          {otherAreas.map((loc) => (
            <option key={loc.value} value={loc.value}>
              {loc.label}
            </option>
          ))}
        </optgroup>
      </select>

      {/* Property Type */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="filter-bar__select"
      >
        <option value="All">All Types</option>
        <option value="Self Contain">Self Contain</option>
        <option value="Single Room">Single Room</option>
        <option value="Mini Flat">Mini Flat</option>
        <option value="1 Bedroom Flat">1 Bedroom Flat</option>
        <option value="2 Bedroom Flat">2 Bedroom Flat</option>
        <option value="3 Bedroom Flat">3 Bedroom Flat</option>
        <option value="Shared Room">Shared Room</option>
        <option value="Studio Apartment">Studio Apartment</option>
      </select>

      {/* Price */}
      <select
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="filter-bar__select"
      >
        <option value="All">Any Price</option>
        <option value="100000">Up to ₦100,000</option>
        <option value="200000">Up to ₦200,000</option>
        <option value="300000">Up to ₦300,000</option>
        <option value="500000">Up to ₦500,000</option>
        <option value="700000">Up to ₦700,000</option>
        <option value="1000000">Up to ₦1,000,000</option>
        <option value="2000000">Up to ₦2,000,000</option>
      </select>

      {/* Availability */}
      <select
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
        className="filter-bar__select"
      >
        <option value="All">Any Availability</option>
        <option value="Available Now">Available Now</option>
        <option value="Available Soon">Available Soon</option>
        <option value="Not Available">Not Available</option>
      </select>

      {/* Bottom row — verified + reset */}
      <div className="filter-bar__bottom">
        <label className="filter-bar__verified">
          <input
            type="checkbox"
            checked={verified}
            onChange={(e) => setVerified(e.target.checked)}
          />
          <span>Verified only</span>
        </label>

        {hasActiveFilters && (
          <button className="filter-bar__reset" onClick={handleReset}>
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}