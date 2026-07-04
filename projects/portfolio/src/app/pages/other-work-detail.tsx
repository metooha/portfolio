import { useParams, useNavigate } from "react-router-dom";
import { LinkButton } from "@/app/components/LinkButton/LinkButton";
import { ChevronLeftIcon } from "@/app/components/Icons/Icons";
import { PageContainer } from "@/app/components/layout";
import { Body, Heading } from "@/app/components/Text/Text";
import { otherWork } from "@/app/data/portfolio-data";

export function OtherWorkDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const work = otherWork.find((item) => item.id === id);

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Body as="p" size="medium">
          Work not found
        </Body>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <PageContainer className="py-12" maxWidth="max-w-7xl">
        <LinkButton
          size="small"
          leading={<ChevronLeftIcon size="small" decorative />}
          onClick={() => navigate("/work")}
          UNSAFE_className="mb-8"
        >
          Back to Other Work
        </LinkButton>

        <Heading as="h1" size="large" weight="default" UNSAFE_className="text-4xl md:text-5xl mb-4">
          {work.title}
        </Heading>
        <Body as="p" size="large" color="subtle" UNSAFE_className="mb-8">
          {work.description}
        </Body>

        <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-12" />

        <Body as="p" size="medium" UNSAFE_className="leading-relaxed">
          {work.description}
        </Body>
      </PageContainer>
    </div>
  );
}
