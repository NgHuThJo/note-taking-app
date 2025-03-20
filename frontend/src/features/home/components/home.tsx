import { Link, Outlet } from "react-router";
import { Logo } from "#frontend/components/ui/image/icon/icon";

const navList = [
  {
    path: "all-notes",
    label: "Home",
  },
  {
    path: "search",
    label: "Search",
  },
  {
    path: "archived-notes",
    label: "Archive",
  },
  {
    path: "tags",
    label: "Tags",
  },
  {
    path: "settings",
    label: "Settings",
  },
];

export function Home() {
  return (
    <main>
      <div>
        <Logo />
        <p>Notes</p>
      </div>
      <Outlet />
      <nav>
        {navList.map((item) => (
          <Link to={item.path} key={item.label}>
            {item.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
