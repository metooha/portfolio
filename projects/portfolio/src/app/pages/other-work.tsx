import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardMedia } from "@/app/components/Card/Card";
import { Tag } from "@/app/components/Tag/Tag";
import { PageContainer } from "@/app/components/layout";
import { Body, Heading } from "@/app/components/Text/Text";
import { otherWork } from "@/app/data/portfolio-data";

export function OtherWork() {
  return (
    <div className="min-h-screen pt-16">
      <PageContainer className="py-12" maxWidth="max-w-[1220px]">
        <Heading as="h1" size="large" weight="default" UNSAFE_className="text-4xl md:text-5xl mb-4">
          Other Work
        </Heading>
        <Body as="p" size="medium" color="subtle" UNSAFE_className="mb-12 pb-10 max-w-2xl">
          A collection of visual design work: illustration, motion, branding, and portraits made
          alongside my product and systems work.
        </Body>
        <div className="grid md:grid-cols-2 gap-8">
          {otherWork.map((work) => (
            <Link
              key={work.id}
              to={`/other-work/${work.id}`}
              className="group no-underline text-inherit"
            >
              <Card size="small" UNSAFE_className="overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full">
                <CardMedia>
                  <div className="relative aspect-video overflow-hidden bg-white">
                    <div className="absolute right-4 top-4 z-10">
                      <Tag color="gray" size="small">
                        {work.category}
                      </Tag>
                    </div>
                    {work.image ? (
                      <img
                        src={work.image}
                        alt={work.title}
                        loading="lazy"
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600" />
                    )}
                  </div>
                </CardMedia>
                <CardHeader
                  title={work.title}
                  headingLevel="h3"
                />
                <CardContent>
                  <Body as="p" size="small" color="subtle">
                    {work.description}
                  </Body>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
