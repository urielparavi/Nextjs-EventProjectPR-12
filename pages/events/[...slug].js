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

function FilteredEventsPage() {
  return (
    <div>
      <h1>Filtered Events</h1>
    </div>
  );
}

export default FilteredEventsPage;
