"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchListings } from "@/lib/firestoreListings";
import ListingCard from "@/components/listings/ListingCard";
import "@/styles/featured.css";

export default function FeaturedListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchListings();

        // Show verified first
        const sorted = data.sort((a, b) => {
          if (a.verified && !b.verified) return -1;
          if (!a.verified && b.verified) return 1;
          return 0;
        });

        setListings(sorted.slice(0, 6));
      } catch (error) {
        console.error("Error fetching featured listings:", error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="featured">
      <div className="featured__header">
        <p className="featured__tag">Featured Properties</p>

        <h2>Explore Available Homes</h2>

        <p>
          Discover verified properties with transparent pricing, real photos,
          and everything you need to make the right decision.
        </p>
      </div>

      {loading ? (
        <div className="featured__loading">
          <p>Loading listings...</p>
        </div>
      ) : listings.length === 0 ? (
        <div className="featured__empty">
          <p>No listings available yet.</p>

          <Link href="/listings" className="featured__empty-btn">
            Browse Listings
          </Link>
        </div>
      ) : (
        <>
          <div className="featured__grid">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          <div className="featured__footer">
            <Link href="/listings" className="featured__view-all">
              View All Listings →
            </Link>
          </div>
        </>
      )}
    </section>
  );
}