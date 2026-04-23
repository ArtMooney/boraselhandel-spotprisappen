const TZ = "Europe/Stockholm";

// Find the UTC timestamp that corresponds to local midnight in Stockholm for a given date.
function stockholmMidnightUTC(dateInput) {
  const d = new Date(dateInput);
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth();
  const day = d.getUTCDate();

  // Guess UTC midnight and compute the Stockholm offset at that moment.
  const guess = new Date(Date.UTC(y, m, day, 0, 0, 0));
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(guess);
  const get = (t) => parts.find((p) => p.type === t).value;
  const asIfUTC = Date.UTC(
    +get("year"),
    +get("month") - 1,
    +get("day"),
    +get("hour"),
    +get("minute"),
    +get("second"),
  );
  const offsetMs = asIfUTC - guess.getTime(); // +2h in summer, +1h in winter

  return guess.getTime() - offsetMs;
}

// span: "0" = 60 min, "1" = 15 min, "2" = 30 min (same encoding as in the components)
export function generateStockholmLabels(deliveryDate, count, span) {
  const minutesPerStep = span === "0" ? 60 : span === "1" ? 15 : 30;
  const startUTC = stockholmMidnightUTC(deliveryDate);

  const fmt = new Intl.DateTimeFormat("sv-SE", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const raw = [];
  for (let i = 0; i < count; i++) {
    const t = new Date(startUTC + i * minutesPerStep * 60_000);
    raw.push(fmt.format(t)); // "HH:mm" in Stockholm time
  }

  // Mark the duplicated hour on the autumn DST transition (e.g. 02:00 -> CEST/CET).
  const counts = raw.reduce(
    (acc, l) => acc.set(l, (acc.get(l) || 0) + 1),
    new Map(),
  );
  const seen = new Map();
  return raw.map((l) => {
    if (counts.get(l) > 1) {
      const n = (seen.get(l) || 0) + 1;
      seen.set(l, n);
      return `${l} (${n === 1 ? "CEST" : "CET"})`;
    }

    return l;
  });
}
