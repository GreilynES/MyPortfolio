import CvPage from "../modules/cv/CvPage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function AppShell() {
  return (
    <main>
      <Navbar />
      <main>
      <CvPage />
      </main>
      <Footer />
    </main>
  );
}