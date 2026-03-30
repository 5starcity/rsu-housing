"use client";

import { useEffect, useMemo, useState } from "react";
import ListingCard from "@/components/listings/ListingCard";
import FilterBar from "@/components/listings/FilterBar";
import { fetchListings } from "@/lib/firestoreListings";
import "@/styles/listings-page.css";

export default function ListingsPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [type, setType] = useState("All");
  const [price, setPrice] = useState("All");
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadListings() {
      try {
        const data = await fetchListings();
        console.log("Listings from Firestore:", data);
        setAllListings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setAllListings([]);
      } finally {
        setLoading(false);
      }
    }

    loadListings();
  }, []);

  const filteredListings = useMemo(() => {
    return allListings.filter((listing) => {
      const title = listing.title?.toLowerCase() || "";
      const listingLocation = listing.location?.toLowerCase() || "";
      const listingType = listing.type || "";
      const listingPrice = Number(listing.price) || 0;

      const matchesSearch =
        title.includes(search.toLowerCase()) ||
        listingLocation.includes(search.toLowerCase());

      const matchesLocation =
        location === "All" || listing.location === location;

      const matchesType =
        type === "All" || listingType === type;

      const matchesPrice =
        price === "All" || listingPrice <= Number(price);

      return matchesSearch && matchesLocation && matchesType && matchesPrice;
    });
  }, [allListings, search, location, type, price]);

  return (
    <main className="listings-page">
      <div className="listings-page__header">
        <p className="listings-page__tag">Browse Properties</p>
        <h1>Student housing around RSU</h1>
        <p>Search and filter listings by area, type and budget.</p>
      </div>

      <FilterBar
        search={search}
        setSearch={setSearch}
        location={location}
        setLocation={setLocation}
        type={type}
        setType={setType}
        price={price}
        setPrice={setPrice}
      />

      <div className="listings-page__results">
        <p>
          {loading
            ? "Loading listings..."
            : `${filteredListings.length} listing(s) found`}
        </p>
      </div>

      <div className="listings-page__grid">
        {loading ? null : filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        ) : (
          <div className="listings-page__empty">
            <h3>No listings found</h3>
            <p>Try adding a new property from the app.</p>
          </div>
        )}
      </div>
    </main>
  );
}