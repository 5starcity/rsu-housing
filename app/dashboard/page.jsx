// app/dashboard/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineHomeModern,
  HiOutlineEye,
  HiOutlineBolt,
  HiOutlineCheckCircle,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineChartBarSquare,
  HiOutlineMapPin,
  HiOutlineBanknotes,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlinePhoto,
  HiOutlinePlayCircle,
} from "react-icons/hi2";
import { useAuth } from "@/context/AuthContext";
import {
  fetchListingsByLandlord,
  deleteListing,
  updateListingAvailability,
} from "@/lib/firestoreListings";
import "@/styles/dashboard.css";

const AVAILABILITY_OPTIONS = ["Available Now", "Available Soon", "Not Available"];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, userRole, loading: authLoading } = useAuth();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.push("/login"); return; }
    if (userRole && userRole !== "landlord") { router.push("/listings"); return; }
  }, [user, userRole, authLoading]);

  useEffect(() => {
    if (!user) return;
    async function load() {
      try {
        const data = await fetchListingsByLandlord(user.uid);
        setListings(data);
      } catch (e) {
        console.error("Error loading dashboard:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  if (authLoading || loading) {
    return (
      <main className="dashboard">
        <div className="dashboard__loading">
          <motion.div
            className="dashboard__loading-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="dashboard__spinner" />
            <p>Loading your dashboard...</p>
          </motion.div>
        </div>
      </main>
    );
  }

  if (!user || userRole !== "landlord") return null;

  // ── Stats ──
  const totalViews = listings.reduce((sum, l) => sum + (Number(l.views) || 0), 0);
  const totalInterests = listings.reduce((sum, l) => sum + (Number(l.interests) || 0), 0);
  const availableCount = listings.filter((l) => l.availability === "Available Now").length;
  const verifiedCount = listings.filter((l) => l.verified).length;

  // ── Filter + Sort ──
  const filtered = listings
    .filter((l) => {
      if (filter === "All") return true;
      return l.availability === filter;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        const aTime = a.createdAt?.toDate?.() ?? new Date(a.createdAt ?? 0);
        const bTime = b.createdAt?.toDate?.() ?? new Date(b.createdAt ?? 0);
        return bTime - aTime;
      }
      if (sortBy === "views") return (b.views || 0) - (a.views || 0);
      if (sortBy === "interests") return (b.interests || 0) - (a.interests || 0);
      if (sortBy === "price") return (b.price || 0) - (a.price || 0);
      return 0;
    });

  async function handleDelete(id) {
    const confirmed = window.confirm("Delete this listing? This cannot be undone.");
    if (!confirmed) return;
    setDeletingId(id);
    try {
      await deleteListing(id);
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (e) {
      console.error("Delete error:", e);
    } finally {
      setDeletingId(null);
    }
  }

  async function handleAvailabilityChange(id, newValue) {
    setUpdatingId(id);
    try {
      await updateListingAvailability(id, newValue);
      setListings((prev) =>
        prev.map((l) => (l.id === id ? { ...l, availability: newValue } : l))
      );
    } catch (e) {
      console.error("Availability update error:", e);
    } finally {
      setUpdatingId(null);
    }
  }

  function formatDate(ts) {
    if (!ts) return "—";
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
  }

  const stats = [
    {
      label: "Total Listings",
      value: listings.length,
      icon: <HiOutlineHomeModern />,
      accent: "blue",
    },
    {
      label: "Total Views",
      value: totalViews.toLocaleString(),
      icon: <HiOutlineEye />,
      accent: "purple",
    },
    {
      label: "Expressions of Interest",
      value: totalInterests.toLocaleString(),
      icon: <HiOutlineBolt />,
      accent: "amber",
    },
    {
      label: "Available Now",
      value: availableCount,
      icon: <HiOutlineCheckCircle />,
      accent: "green",
    },
  ];

  return (
    <main className="dashboard">
      {/* Header */}
      <motion.div
        className="dashboard__header"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="dashboard__header-left">
          <p className="dashboard__eyebrow">
            <HiOutlineChartBarSquare /> Landlord Dashboard
          </p>
          <h1>
            {user.displayName
              ? user.displayName.split(" ")[0] + "'s Properties"
              : "Your Properties"}
          </h1>
          <p className="dashboard__subtitle">
            Manage your listings, track views and interest, and update availability.
          </p>
        </div>
        <Link href="/add-listing" className="dashboard__add-btn">
          <HiOutlinePlus /> Add Listing
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="dashboard__stats"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            className={"dashboard__stat dashboard__stat--" + s.accent}
            variants={fadeUp}
          >
            <div className="dashboard__stat-icon">{s.icon}</div>
            <div>
              <p className="dashboard__stat-value">{s.value}</p>
              <p className="dashboard__stat-label">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Controls */}
      <motion.div
        className="dashboard__controls"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.3 }}
      >
        <div className="dashboard__filters">
          {["All", "Available Now", "Available Soon", "Not Available"].map((f) => (
            <button
              key={f}
              className={"dashboard__filter-btn" + (filter === f ? " active" : "")}
              onClick={() => setFilter(f)}
            >
              {f}
              {f !== "All" && (
                <span className="dashboard__filter-count">
                  {listings.filter((l) => l.availability === f).length}
                </span>
              )}
            </button>
          ))}
        </div>
        <select
          className="dashboard__sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest first</option>
          <option value="views">Most viewed</option>
          <option value="interests">Most interest</option>
          <option value="price">Highest price</option>
        </select>
      </motion.div>

      {/* Listings */}
      {listings.length === 0 ? (
        <motion.div
          className="dashboard__empty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <HiOutlineHomeModern className="dashboard__empty-icon" />
          <h2>No listings yet</h2>
          <p>Post your first property and start receiving enquiries.</p>
          <Link href="/add-listing" className="dashboard__add-btn">
            <HiOutlinePlus /> Add Your First Listing
          </Link>
        </motion.div>
      ) : filtered.length === 0 ? (
        <motion.div
          className="dashboard__empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>No listings match this filter.</p>
        </motion.div>
      ) : (
        <motion.div
          className="dashboard__listings"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {filtered.map((listing) => {
              const thumb =
                listing.images?.[0] || listing.image || null;
              const hasVideo = !!listing.videoUrl;

              return (
                <motion.div
                  key={listing.id}
                  className="dashboard__card"
                  variants={fadeUp}
                  layout
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
                >
                  {/* Thumbnail */}
                  <div className="dashboard__card-thumb">
                    {thumb ? (
                      <img src={thumb} alt={listing.title} />
                    ) : hasVideo ? (
                      <div className="dashboard__card-thumb-video">
                        <HiOutlinePlayCircle />
                        <span>Video</span>
                      </div>
                    ) : (
                      <div className="dashboard__card-thumb-empty">
                        <HiOutlinePhoto />
                      </div>
                    )}
                    {listing.verified && (
                      <span className="dashboard__card-verified">Verified</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="dashboard__card-body">
                    <div className="dashboard__card-top">
                      <div className="dashboard__card-info">
                        <h3 className="dashboard__card-title">{listing.title}</h3>
                        <p className="dashboard__card-location">
                          <HiOutlineMapPin />
                          {listing.location}
                        </p>
                        <div className="dashboard__card-meta">
                          <span>
                            <HiOutlineHomeModern />
                            {listing.type}
                          </span>
                          <span>
                            <HiOutlineBanknotes />
                            ₦{Number(listing.price).toLocaleString()}
                            <em>/yr</em>
                          </span>
                          <span className="dashboard__card-date">
                            Listed {formatDate(listing.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="dashboard__card-actions">
                        <Link
                          href={"/listings/" + listing.id}
                          className="dashboard__action-btn dashboard__action-btn--view"
                          title="View listing"
                          target="_blank"
                        >
                          <HiOutlineArrowTopRightOnSquare />
                        </Link>
                        <Link
                          href={"/listings/" + listing.id}
                          className="dashboard__action-btn dashboard__action-btn--edit"
                          title="Edit listing"
                        >
                          <HiOutlinePencilSquare />
                        </Link>
                        <button
                          className="dashboard__action-btn dashboard__action-btn--delete"
                          title="Delete listing"
                          onClick={() => handleDelete(listing.id)}
                          disabled={deletingId === listing.id}
                        >
                          {deletingId === listing.id ? (
                            <span className="dashboard__mini-spinner" />
                          ) : (
                            <HiOutlineTrash />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="dashboard__card-stats">
                      <div className="dashboard__card-stat">
                        <HiOutlineEye />
                        <span>{listing.views || 0} views</span>
                      </div>
                      <div className="dashboard__card-stat dashboard__card-stat--interest">
                        <HiOutlineBolt />
                        <span>{listing.interests || 0} interested</span>
                      </div>

                      {/* Availability inline select */}
                      <div className="dashboard__availability-wrap">
                        <select
                          className={
                            "dashboard__availability-select " +
                            (listing.availability === "Available Now"
                              ? "available"
                              : listing.availability === "Available Soon"
                              ? "soon"
                              : "unavailable")
                          }
                          value={listing.availability || "Not Available"}
                          onChange={(e) =>
                            handleAvailabilityChange(listing.id, e.target.value)
                          }
                          disabled={updatingId === listing.id}
                        >
                          {AVAILABILITY_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {updatingId === listing.id && (
                          <span className="dashboard__mini-spinner" />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </main>
  );
}