"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiOutlineCheckBadge,
  HiOutlineMapPin,
  HiOutlineHeart,
  HiHeart,
} from "react-icons/hi2";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import "@/styles/listing-card.css";

export default function ListingCard({ listing }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const saved = favorites.includes(listing.id);

  function handleToggleFavorite(event) {
    event.preventDefault();
    event.stopPropagation();
    const updated = toggleFavorite(listing.id);
    setFavorites(updated);
  }

  const imageUrl = listing.images && listing.images.length > 0
    ? listing.images[0]
    : listing.image;

  return (
    <motion.article
      className="listing-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <div className="listing-card__image-wrap">
        <img
          src={imageUrl}
          alt={listing.title}
          className="listing-card__image"
        />

        <button
          type="button"
          className={"listing-card__favorite" + (saved ? " active" : "")}
          onClick={handleToggleFavorite}
          aria-label={saved ? "Remove from favorites" : "Save listing"}
        >
          {saved ? <HiHeart /> : <HiOutlineHeart />}
        </button>

        {listing.verified && (
          <span className="listing-card__badge">
            <HiOutlineCheckBadge />
            Verified
          </span>
        )}

        {listing.availability && (
          <span className={"listing-card__availability " + (
            listing.availability === "Available Now" ? "available" :
            listing.availability === "Available Soon" ? "soon" : "unavailable"
          )}>
            {listing.availability}
          </span>
        )}

        {listing.images && listing.images.length > 1 && (
          <span className="listing-card__image-count">
            +{listing.images.length - 1} photos
          </span>
        )}
      </div>

      <div className="listing-card__content">
        <div className="listing-card__top">
          <h3>{listing.title}</h3>
          <p className="listing-card__price">
            ₦{Number(listing.price).toLocaleString()}
          </p>
        </div>

        <p className="listing-card__location">
          <HiOutlineMapPin />
          <span>{listing.location}</span>
          {listing.distanceFromRSU && (
            <span className="listing-card__distance">
              · {listing.distanceFromRSU}
            </span>
          )}
        </p>

        <div className="listing-card__meta">
          <span>{listing.type}</span>
          <span>{listing.beds || 1} Bed</span>
          <span>{listing.baths || 1} Bath</span>
          {listing.furnishing && <span>{listing.furnishing}</span>}
        </div>

        <Link href={"/listings/" + listing.id} className="listing-card__link">
          View Details
        </Link>
      </div>
    </motion.article>
  );
}