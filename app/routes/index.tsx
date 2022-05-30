import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Remix Universe</h1>
      <div>
        <Link to="/superheroes" prefetch="intent">
          Superheroes
        </Link>
      </div>
    </div>
  );
}