import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardMedia } from "@/app/components/Card/Card";
import { PageContainer } from "@/app/components/layout";
import { Body, Heading } from "@/app/components/Text/Text";
import { otherWork } from "@/app/data/portfolio-data";

export function OtherWork() {
  return (
    <div className="min-h-screen pt-16">
      <PageContainer className="py-12" maxWidth="max-w-7xl">
        <Heading as="h1" size="large" weight="default" UNSAFE_className="text-4xl md:text-5xl mb-4">
          Other Work
        </Heading>
        <Body as="p" size="medium" color="subtle" UNSAFE_className="mb-12 pb-10">
          Coming soon
        </Body>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherWork.map((work) => (
            <Link
              key={work.id}
              to={`/other-work/${work.id}`}
              className="group no-underline text-inherit"
            >
              <Card size="small" UNSAFE_className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <CardMedia>
                  <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600" />
                </CardMedia>
                <CardHeader title={work.title} headingLevel="h3" />
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
