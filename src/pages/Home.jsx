import FaqAccordion from "../components/FaqAccordion";
import Features from "../components/Features";
import HeroArea from "../components/HeroArea";
import HowItWorks from "../components/HowItWorks";
import JoinUs from "../components/JoinUs";
import LogoSlider from "../components/LogoSlider";
import OurServices from "../components/OurServices";
import ReviewSlider from "../components/ReviewSlider";

const reviewPromise = fetch("/reviews.json").then((res) => res.json());

export default function Home() {
  return (
    <>
      <HeroArea></HeroArea>
      <HowItWorks></HowItWorks>
      <OurServices></OurServices>
      <LogoSlider></LogoSlider>
      <Features></Features>
      <JoinUs></JoinUs>
      <ReviewSlider reviewPromise={reviewPromise}></ReviewSlider>
      <FaqAccordion></FaqAccordion>
    </>
  );
}
