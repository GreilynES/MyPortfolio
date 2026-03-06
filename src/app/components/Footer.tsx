import { profile } from "../../modules/cv/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="flex flex-col items-center px-6 py-4">
        © {year} {profile.fullName}
      </div>
    </footer>
  );
}