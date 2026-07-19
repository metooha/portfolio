import React from "react";
import { Body } from "@/app/components/Text/Text";
import {
  Eyebrow,
  ImageCarousel,
  Lead,
  Section,
  SectionTitle,
} from "@/app/components/CaseStudyPrimitives";
import imgGolf1 from "@/app/assets/pages/case-study/academy-sports/golf/1.jpg";
import imgGolf2 from "@/app/assets/pages/case-study/academy-sports/golf/2-3.jpg";
import imgGolf3 from "@/app/assets/pages/case-study/academy-sports/golf/4-5.jpg";
import imgGolf4 from "@/app/assets/pages/case-study/academy-sports/golf/6.jpg";
import imgFreshWater1 from "@/app/assets/pages/case-study/academy-sports/fresh-water/1.jpg";
import imgFreshWater2 from "@/app/assets/pages/case-study/academy-sports/fresh-water/2-3.jpg";
import imgFreshWater3 from "@/app/assets/pages/case-study/academy-sports/fresh-water/4-5.jpg";
import imgFreshWater4 from "@/app/assets/pages/case-study/academy-sports/fresh-water/6.jpg";
import imgSaltwater1 from "@/app/assets/pages/case-study/academy-sports/saltwater/1.jpg";
import imgSaltwater2 from "@/app/assets/pages/case-study/academy-sports/saltwater/2-3.jpg";
import imgSaltwater3 from "@/app/assets/pages/case-study/academy-sports/saltwater/4-5.jpg";
import imgSaltwater4 from "@/app/assets/pages/case-study/academy-sports/saltwater/6.jpg";
import imgDucks1 from "@/app/assets/pages/case-study/academy-sports/ducks-unlimited/1.jpg";
import imgDucks2 from "@/app/assets/pages/case-study/academy-sports/ducks-unlimited/2-3.jpg";
import imgDucks3 from "@/app/assets/pages/case-study/academy-sports/ducks-unlimited/4-5.jpg";
import imgDucks4 from "@/app/assets/pages/case-study/academy-sports/ducks-unlimited/6.jpg";

const ACCENT = "#0055A6";

export function AcademyChallengeSection() {
  return (
    <Section id="challenge">
      <Eyebrow color={ACCENT}>The Challenge</Eyebrow>
      <SectionTitle>Creating unified catalogs across sport categories</SectionTitle>
      <Body as="p" size="medium" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7]">
        The challenge was maintaining brand consistency while showcasing each sport's unique characteristics,
        all while managing the complexity of coordinating design, production timelines, and delivering
        high-quality printed materials on schedule.
      </Body>
    </Section>
  );
}

export function AcademySolutionSection() {
  return (
    <Section id="solution">
      <Eyebrow color={ACCENT}>The Solution</Eyebrow>
      <SectionTitle>A system for seasonal storytelling</SectionTitle>
      <Lead>
        I developed a comprehensive catalog design approach that balanced brand consistency with
        category-specific visual narratives. Each quarterly campaign was crafted to inspire and inform
        customers about Academy's product offerings across all their sporting interests.
      </Lead>
      <Body as="p" size="medium" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7] mb-8">
        The work spanned the full creative cycle:
      </Body>

      <div className="grid md:grid-cols-2 gap-6 max-w-[900px] mb-12">
        <div className="p-6 rounded-xl" style={{ backgroundColor: "#E8F1FB" }}>
          <h3 className="font-semibold mb-2" style={{ color: ACCENT }}>
            Category-Specific Design
          </h3>
          <p className="text-sm text-gray-700">
            Unique visual treatments for each sport category while maintaining cohesive brand identity.
          </p>
        </div>
        <div className="p-6 rounded-xl" style={{ backgroundColor: "#E8F1FB" }}>
          <h3 className="font-semibold mb-2" style={{ color: ACCENT }}>
            Print Production Management
          </h3>
          <p className="text-sm text-gray-700">
            End-to-end oversight ensuring high-quality printed materials and on-time delivery.
          </p>
        </div>
        <div className="p-6 rounded-xl" style={{ backgroundColor: "#E8F1FB" }}>
          <h3 className="font-semibold mb-2" style={{ color: ACCENT }}>
            Cross-Channel Integration
          </h3>
          <p className="text-sm text-gray-700">
            Seamless coordination between print and digital campaigns for omnichannel experience.
          </p>
        </div>
        <div className="p-6 rounded-xl" style={{ backgroundColor: "#E8F1FB" }}>
          <h3 className="font-semibold mb-2" style={{ color: ACCENT }}>
            Seasonal Campaigns
          </h3>
          <p className="text-sm text-gray-700">
            Quarterly themes aligned with sports seasons and customer interests throughout the year.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        <div>
          <h4 className="font-semibold mb-4" style={{ color: ACCENT }}>Golf</h4>
          <ImageCarousel
            ariaLabel="Golf catalog pages"
            images={[
              { src: imgGolf1, alt: "Golf catalog cover", caption: "Cover" },
              { src: imgGolf2, alt: "Golf catalog interior pages", caption: "Interior" },
              { src: imgGolf3, alt: "Golf catalog spread", caption: "Spread" },
              { src: imgGolf4, alt: "Golf catalog back", caption: "Back" },
            ]}
          />
        </div>
        <div>
          <h4 className="font-semibold mb-4" style={{ color: ACCENT }}>Fresh Water Fishing</h4>
          <ImageCarousel
            ariaLabel="Fresh Water Fishing catalog pages"
            images={[
              { src: imgFreshWater1, alt: "Fresh water catalog cover", caption: "Cover" },
              { src: imgFreshWater2, alt: "Fresh water catalog interior", caption: "Interior" },
              { src: imgFreshWater3, alt: "Fresh water catalog spread", caption: "Spread" },
              { src: imgFreshWater4, alt: "Fresh water catalog back", caption: "Back" },
            ]}
          />
        </div>
        <div>
          <h4 className="font-semibold mb-4" style={{ color: ACCENT }}>Saltwater Fishing</h4>
          <ImageCarousel
            ariaLabel="Saltwater Fishing catalog pages"
            images={[
              { src: imgSaltwater1, alt: "Saltwater catalog cover", caption: "Cover" },
              { src: imgSaltwater2, alt: "Saltwater catalog interior", caption: "Interior" },
              { src: imgSaltwater3, alt: "Saltwater catalog spread", caption: "Spread" },
              { src: imgSaltwater4, alt: "Saltwater catalog back", caption: "Back" },
            ]}
          />
        </div>
        <div>
          <h4 className="font-semibold mb-4" style={{ color: ACCENT }}>Ducks Unlimited</h4>
          <ImageCarousel
            ariaLabel="Ducks Unlimited campaign pages"
            images={[
              { src: imgDucks1, alt: "Ducks Unlimited cover", caption: "Cover" },
              { src: imgDucks2, alt: "Ducks Unlimited interior", caption: "Interior" },
              { src: imgDucks3, alt: "Ducks Unlimited spread", caption: "Spread" },
              { src: imgDucks4, alt: "Ducks Unlimited back", caption: "Back" },
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

export function AcademyImpactSection() {
  return (
    <Section id="impact" style={{ backgroundColor: "#E8F1FB" }}>
      <Eyebrow color={ACCENT}>Impact</Eyebrow>
      <SectionTitle>Results</SectionTitle>
      <div className="space-y-4 max-w-[660px]">
        <div className="flex items-center gap-4">
          <span className="text-2xl" style={{ color: ACCENT }}>
            ✓
          </span>
          <Body as="p" size="medium" color="subtlest">
            Produced multiple quarterly catalogs across all major sport categories
          </Body>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-2xl" style={{ color: ACCENT }}>
            ✓
          </span>
          <Body as="p" size="medium" color="subtlest">
            Managed complete production pipeline from concept through print delivery
          </Body>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-2xl" style={{ color: ACCENT }}>
            ✓
          </span>
          <Body as="p" size="medium" color="subtlest">
            Maintained consistent brand experience across print and digital touchpoints
          </Body>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-2xl" style={{ color: ACCENT }}>
            ✓
          </span>
          <Body as="p" size="medium" color="subtlest">
            Enhanced customer engagement through compelling seasonal visual storytelling
          </Body>
        </div>
      </div>
    </Section>
  );
}
