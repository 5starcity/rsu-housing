"use client";

import "@/styles/filter-bar.css";

export default function FilterBar({
  search,
  setSearch,
  location,
  setLocation,
  type,
  setType,
  price,
  setPrice,
}) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search by title or location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="filter-bar__input"
      />

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="filter-bar__select"
      >
        <option value="All">All Locations</option>
        <option value="Alakahia">Alakahia</option>
        <option value="Choba">Choba</option>
        <option value="Rumuosi">Rumuosi</option>
        <option value="Nkpolu">Nkpolu</option>
      </select>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="filter-bar__select"
      >
        <option value="All">All Types</option>
        <option value="Self Contain">Self Contain</option>
        <option value="Single Room">Single Room</option>
        <option value="Mini Flat">Mini Flat</option>
        <option value="Shared Apartment">Shared Apartment</option>
      </select>

      <select
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="filter-bar__select"
      >
        <option value="All">Any Price</option>
        <option value="200000">Up to ₦200,000</option>
        <option value="300000">Up to ₦300,000</option>
        <option value="500000">Up to ₦500,000</option>
        <option value="700000">Up to ₦700,000</option>
      </select>
    </div>
  );
}