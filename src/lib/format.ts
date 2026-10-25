export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatBathrooms(bathrooms: number): string {
  return Number.isInteger(bathrooms) ? String(bathrooms) : bathrooms.toFixed(1);
}

function getYouTubeVideoId(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, "");

  if (host === "youtu.be") {
    return parsed.pathname.slice(1) || null;
  }

  if (host === "youtube.com" || host === "m.youtube.com") {
    if (parsed.pathname === "/watch") return parsed.searchParams.get("v");
    if (parsed.pathname.startsWith("/embed/")) return parsed.pathname.split("/embed/")[1] || null;
    if (parsed.pathname.startsWith("/shorts/")) return parsed.pathname.split("/shorts/")[1] || null;
  }

  return null;
}

export function getYouTubeEmbedUrl(url: string): string | null {
  const id = getYouTubeVideoId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}
