export interface GeocodeResult {
  lat: number;
  lng: number;
}

export interface ReverseGeocodeResult {
  province: string;
  city: string;
}

export async function reverseGeocode(lat: number, lng: number): Promise<ReverseGeocodeResult | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=fa`,
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { address?: Record<string, string> };
    const address = data.address;
    if (!address) return null;
    const province = address.state ?? '';
    const city = address.city ?? address.town ?? address.county ?? address.village ?? '';
    if (!province) return null;
    return { province, city };
  } catch {
    return null;
  }
}

export async function geocodeCity(city: string, provinceName: string): Promise<GeocodeResult | null> {
  try {
    const query = encodeURIComponent(`${city}, ${provinceName}, Iran`);
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${query}`);
    if (!res.ok) return null;
    const results = (await res.json()) as Array<{ lat: string; lon: string }>;
    if (!results.length) return null;
    const lat = Number(results[0].lat);
    const lng = Number(results[0].lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    return { lat, lng };
  } catch {
    return null;
  }
}
