// Domain shapes for landlord property management.

export function formatUnitLabel(unit) {
  const unitName = unit?.unit_name || "Unnamed unit";
  const county = unit?.county ? String(unit.county) : "";
  const place = unit?.place ? String(unit.place) : "";

  const location = [place, county].filter(Boolean).join(", ");
  return location ? `${unitName} — ${location}` : unitName;
}

