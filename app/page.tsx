import Navbar from "@/components/shared/Navbar";
import SearchBar from "@/components/shared/SearchBar";
import HeroCarousel from "@/components/home/Herocarousel";
import TopCompanies from "@/components/home/TopCompanies";
import PopularProducts from "@/components/home/PopularProducts";
import FooterNav from "@/components/shared/FooterNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pb-24 max-w-7xl mx-auto">
        <SearchBar />
        <HeroCarousel />
        <TopCompanies />
        <PopularProducts />
      </main>

      <FooterNav />
    </div>
  );
}