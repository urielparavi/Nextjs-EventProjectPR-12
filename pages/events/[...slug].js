// 📌 Difference between Catch-all and Optional Catch-all routes in Next.js:
//
// ✅ Catch-all route: [...slug]
// - Matches URLs with *at least one* segment after the base path.
// - Example: pages/blog/[...slug].js matches:
//     /blog/react
//     /blog/react/hooks
// - But does NOT match: /blog
//
// ✅ Optional Catch-all route: [[...slug]]
// - Matches the base path *and* any number of segments after it.
// - Example: pages/blog/[[...slug]].js matches:
//     /blog
//     /blog/react
//     /blog/react/hooks
//
// 🧠 Note: In both cases, `slug` is an array. In the optional version, if no segments are provided, `slug` is undefined.

import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';

function FilteredEventsPage() {
  const router = useRouter();

  const filterData = router.query.slug;
  // console.log(filterData); // Output: ["2021", "5"]

  // ⚠️ NOTE: This behavior only applies to the **old Page Router** (Next.js ≤ 13).
  // - When using useRouter().query.slug, the value is initially `undefined`
  //   during the first render on the client side.
  // - It gets populated only after hydration (once the router is ready).
  //
  // ✅ In the **new App Router** (Next.js 13+ with /app folder):
  // - You no longer use useRouter().query.
  // - Route parameters (like [...slug]) are passed directly to the `params` object
  //   in the Page function (Server Component) — and are always defined during render.
  //

  // ⚠️ This check is needed only when using the old Page Router (Next.js ≤ 13).
  // On the first render, router.query.slug is undefined because it's a client-side value.
  // We display a loading state until the query params become available after hydration.
  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  // Output: ["2021", "5"]
  const filteredYear = filterData[0]; // ["2021", "5"] => "2021"
  const filteredMonth = filterData[1]; // ["2021", "5"] => "5"

  const numYear = +filteredYear; // 2021
  const numMonth = +filteredMonth; // 5

  // Validate the extracted year and month parameters:
  // - Check if either is NaN (not a number)
  // - Check if the year is outside the allowed range (2021 to 2030)
  // - Check if the month is outside the valid range (1 to 12)
  // If any check fails, show an error message to the user.
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p>Invalid filter. Please adjust your values!</p>;
  }

  // Get events filtered by the specified year and month
  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  // Check if the filteredEvents array is missing or empty:
  // - If getFilteredEvents() returned undefined/null (just to be safe)
  // - Or if it returned an empty array with no matching events
  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter!</p>;
  }

  return (
    <div>
      <h1>Filtered Events</h1>
    </div>
  );
}

export default FilteredEventsPage;
