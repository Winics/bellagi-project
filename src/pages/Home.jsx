import Hero from "../components/Hero/Hero";
import Products from "../components/Products/Products";
import Categories from "../components/Categories/Categories";
import About from "../components/About/About";
import Instagram from "../components/Instagram/Instagram";
import Footer from "../components/Footer/Footer";

export default function Home({ addToCart }) {
  return (
    <>
      <Hero />
      <Products addToCart={addToCart} />
      <Categories />
      <About />
      <Instagram />
    </>
  );
}