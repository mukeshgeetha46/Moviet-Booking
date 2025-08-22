import React, { useMemo, useRef, useState } from "react";
import axiosInstance from "../api/axiosInstance";

// Tailwind-only, single-file component
// Drop this into your React app and render <MovieForm onSubmitMovie={...} />
// Pass an onSubmitMovie function to POST to your Node API.

// Types
export type MoviePayload = {
  title: string;
  interest_count?: string | null;
  tagline?: string | null;
  languages?: string | null; // comma-separated string per your schema
  release_date?: string | null; // YYYY-MM-DD
  show_time?: string | null; // e.g., "19:00"
  genres?: string | null; // comma-separated string
  certification?: string | null; // e.g., "UA"
  description?: string | null;
  director?: string | null;
  lead_actor?: string | null;
  cast_members?: string[] | null; // text[] in Postgres
  duration_minutes?: number | null;
  rating?: number | null; // numeric(3,1)
  production_company?: string | null;
  image_url?: string | null;
};

interface MovieFormProps {
  onSubmitMovie?: (payload: MoviePayload) => Promise<void> | void;
  defaultValues?: Partial<MoviePayload>;
}

const CERTIFICATIONS = ["U", "UA", "UA13+", "UA16+", "A"];

export default function MovieForm({ onSubmitMovie, defaultValues }: MovieFormProps) {
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [interestCount, setInterestCount] = useState(defaultValues?.interest_count ?? "");
  const [tagline, setTagline] = useState(defaultValues?.tagline ?? "");
  const [languages, setLanguages] = useState(defaultValues?.languages ?? "");
  const [releaseDate, setReleaseDate] = useState(defaultValues?.release_date ?? "");
  const [showTime, setShowTime] = useState(defaultValues?.show_time ?? "");
  const [genres, setGenres] = useState(defaultValues?.genres ?? "");
  const [certification, setCertification] = useState(defaultValues?.certification ?? "UA");
  const [description, setDescription] = useState(defaultValues?.description ?? "");
  const [director, setDirector] = useState(defaultValues?.director ?? "");
  const [leadActor, setLeadActor] = useState(defaultValues?.lead_actor ?? "");
  const [castMembers, setCastMembers] = useState<string[]>(defaultValues?.cast_members ?? []);
  const [castInput, setCastInput] = useState("");
  const [duration, setDuration] = useState<number | "">(defaultValues?.duration_minutes ?? "");
  const [rating, setRating] = useState<number | "">(defaultValues?.rating ?? "");
  const [prodCompany, setProdCompany] = useState(defaultValues?.production_company ?? "");
  const [imageUrl, setImageUrl] = useState(defaultValues?.image_url ?? "");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const castInputRef = useRef<HTMLInputElement | null>(null);
interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}
  const posterSrc = useMemo(() => {
    if (!imageUrl) return "https://placehold.co/400x600?text=Poster";
    return imageUrl;
  }, [imageUrl]);

  function addCastFromInput() {
    const tokens = castInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (!tokens.length) return;
    setCastMembers((prev) => Array.from(new Set([...prev, ...tokens])));
    setCastInput("");
    castInputRef.current?.focus();
  }

  function removeCast(name: string) {
    setCastMembers((prev) => prev.filter((n) => n !== name));
  }

  function resetForm() {
    setTitle("");
    setInterestCount("");
    setTagline("");
    setLanguages("");
    setReleaseDate("");
    setShowTime("");
    setGenres("");
    setCertification("UA");
    setDescription("");
    setDirector("");
    setLeadActor("");
    setCastMembers([]);
    setCastInput("");
    setDuration("");
    setRating("");
    setProdCompany("");
    setImageUrl("");
    setError(null);
    setSuccess(null);
  }

  function buildPayload(): MoviePayload {
    return {
      title: title.trim(),
      interest_count: interestCount?.trim() || null,
      tagline: tagline?.trim() || null,
      languages: languages?.trim() || null,
      release_date: releaseDate || null,
      show_time: showTime?.trim() || null,
      genres: genres?.trim() || null,
      certification: certification || null,
      description: description?.trim() || null,
      director: director?.trim() || null,
      lead_actor: leadActor?.trim() || null,
      cast_members: castMembers.length ? castMembers : null,
      duration_minutes: typeof duration === "number" ? duration : null,
      rating: typeof rating === "number" ? Number(rating.toFixed(1)) : null,
      production_company: prodCompany?.trim() || null,
      image_url: imageUrl?.trim() || null,
    };
  }

  function validate(payload: MoviePayload): string[] {
    const issues: string[] = [];
    if (!payload.title) issues.push("Title is required.");
    if (!payload.release_date) issues.push("Release date is required.");
    if (!payload.description) issues.push("Description is required.");
    if (payload.rating != null) {
      if (payload.rating < 0 || payload.rating > 10) issues.push("Rating must be between 0 and 10.");
      const asText = String(payload.rating);
      if (!/^\d{1,2}(?:\.\d)?$/.test(asText)) issues.push("Rating must have at most one decimal place (e.g., 8.5).");
    }
    if (payload.duration_minutes != null && payload.duration_minutes <= 0) {
      issues.push("Duration must be a positive number.");
    }
    return issues;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const payload = buildPayload();
    const issues = validate(payload);
    if (issues.length) {
      setError(issues.join("\n"));
      return;
    }

    try {
      setSubmitting(true);
      if (onSubmitMovie) {
        await onSubmitMovie(payload);
      } else {
       
        const response = await axiosInstance.post<ApiResponse<any>>(
              "/add/movie",
              payload,
              {
                headers: {
                  "Content-Type": "application/json"
                }
              }
            );
      }
      setSuccess("Movie saved successfully.");
    } catch (err: any) {
      setError(err?.message || "Failed to save movie.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 py-8">
      <div className="mx-auto w-full max-w-7xl px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Add / Edit Movie</h1>
            <p className="text-sm text-gray-500">Postgres-ready fields mapped to your schema</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={resetForm}
              className="rounded-2xl border bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              type="submit"
              form="movie-form"
              className="rounded-2xl bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Save Movie"}
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Form Card */}
          <form id="movie-form" onSubmit={handleSubmit} className="lg:col-span-2">
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Title <span className="text-red-500">*</span></label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Superman: Legacy"
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Interest Count */}
                <div>
                  <label className="mb-1 block text-sm font-medium">Interest Count</label>
                  <input
                    value={interestCount}
                    onChange={(e) => setInterestCount(e.target.value)}
                    placeholder="e.g., 3.2M Votes or 1.1M are interested"
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Tagline */}
                <div>
                  <label className="mb-1 block text-sm font-medium">Tagline</label>
                  <input
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="The dawn of a new Superman saga begins"
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Languages */}
                <div>
                  <label className="mb-1 block text-sm font-medium">Languages (comma separated)</label>
                  <input
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    placeholder="English, Hindi"
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Release Date */}
                <div>
                  <label className="mb-1 block text-sm font-medium">Release Date <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Show Time */}
                <div>
                  <label className="mb-1 block text-sm font-medium">Show Time</label>
                  <input
                    type="time"
                    value={showTime}
                    onChange={(e) => setShowTime(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Genres */}
                <div>
                  <label className="mb-1 block text-sm font-medium">Genres (comma separated)</label>
                  <input
                    value={genres}
                    onChange={(e) => setGenres(e.target.value)}
                    placeholder="Action, Adventure, Fantasy"
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Certification */}
                <div>
                  <label className="mb-1 block text-sm font-medium">Certification</label>
                  <select
                    value={certification}
                    onChange={(e) => setCertification(e.target.value)}
                    className="w-full rounded-xl border bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  >
                    {CERTIFICATIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Director */}
                <div>
                  <label className="mb-1 block text-sm font-medium">Director</label>
                  <input
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    placeholder="James Gunn"
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Lead Actor */}
                <div>
                  <label className="mb-1 block text-sm font-medium">Lead Actor</label>
                  <input
                    value={leadActor}
                    onChange={(e) => setLeadActor(e.target.value)}
                    placeholder="David Corenswet"
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Cast Members (chips) */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Cast Members (press Enter or , to add)</label>
                  <div className="flex items-center gap-2">
                    <input
                      ref={castInputRef}
                      value={castInput}
                      onChange={(e) => setCastInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === ",") {
                          e.preventDefault();
                          addCastFromInput();
                        }
                      }}
                      placeholder="Type a name and press Enter"
                      className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                    />
                    <button
                      type="button"
                      onClick={addCastFromInput}
                      className="whitespace-nowrap rounded-xl border bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
                    >
                      Add
                    </button>
                  </div>
                  {castMembers.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {castMembers.map((name) => (
                        <span key={name} className="group inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                          {name}
                          <button type="button" onClick={() => removeCast(name)} className="rounded-full p-0.5 text-gray-500 transition hover:bg-gray-100 hover:text-black">×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <label className="mb-1 block text-sm font-medium">Duration (minutes)</label>
                  <input
                    type="number"
                    min={1}
                    step={1}
                    value={duration}
                    onChange={(e) => setDuration(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="155"
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="mb-1 block text-sm font-medium">Rating (0–10, 1 decimal)</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    step={0.1}
                    value={rating}
                    onChange={(e) => setRating(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="9.0"
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Production Company */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Production Company</label>
                  <input
                    value={prodCompany}
                    onChange={(e) => setProdCompany(e.target.value)}
                    placeholder="DC Studios"
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Description <span className="text-red-500">*</span></label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    placeholder="Storyline / synopsis"
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  />
                  <p className="mt-1 text-xs text-gray-500">Mapped to <code>description</code> in DB</p>
                </div>

                {/* Image URL */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Poster Image URL</label>
                  <input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://...jpg"
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              {/* Alerts */}
              {(error || success) && (
                <div className="mt-5">
                  {error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      <strong className="mr-1">Validation:</strong> {error}
                    </div>
                  )}
                  {success && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                      {success}
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>

          {/* Preview Card */}
          <div className="lg:sticky lg:top-6">
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Live Preview</h2>
              <div className="flex gap-4">
                <img
                  src={posterSrc}
                  alt="Poster"
                  className="h-[220px] w-[150px] rounded-xl object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "https://placehold.co/400x600?text=Poster";
                  }}
                />
                <div className="min-w-0">
                  <h3 className="truncate text-xl font-bold">{title || "Movie Title"}</h3>
                  <p className="text-sm text-gray-500">{tagline || "—"}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div><span className="font-medium">Release:</span> {releaseDate || "—"}</div>
                    <div><span className="font-medium">Time:</span> {showTime || "—"}</div>
                    <div className="col-span-2"><span className="font-medium">Languages:</span> {languages || "—"}</div>
                    <div className="col-span-2"><span className="font-medium">Genres:</span> {genres || "—"}</div>
                    <div><span className="font-medium">Cert:</span> {certification || "—"}</div>
                    <div><span className="font-medium">Rating:</span> {rating !== "" && rating != null ? rating : "—"}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="mb-1 text-sm font-semibold">Cast</h4>
                {castMembers?.length ? (
                  <p className="text-sm text-gray-700 line-clamp-3">{castMembers.join(", ")}</p>
                ) : (
                  <p className="text-sm text-gray-400">No cast added yet.</p>
                )}
              </div>

              <div className="mt-4">
                <h4 className="mb-1 text-sm font-semibold">Payload (JSON)</h4>
                <pre className="max-h-64 overflow-auto rounded-xl bg-gray-100 p-3 text-xs">
{JSON.stringify(buildPayload(), null, 2)}
                </pre>
                <p className="mt-1 text-[11px] text-gray-500">Send this body to your Node API → insert into Postgres.</p>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  form="movie-form"
                  className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
                >
                  Save Movie
                </button>
              </div>
            </div>

            {/* Small helper */}
            <div className="mt-4 rounded-2xl border bg-white p-4 text-xs text-gray-600 shadow-sm">
              <p className="mb-2 font-semibold">DB mapping</p>
              <ul className="space-y-1 list-disc pl-5">
                <li><code>languages, genres</code> are stored as comma-separated strings (per schema).</li>
                <li><code>cast_members</code> is an array (<code>text[]</code>) → we collect as a list of chips.</li>
                <li><code>rating</code> enforces one decimal place; server can re-validate.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
