import prisma from "@/lib/db";
import SlideCard from "./SlidesCard";

interface Slide {
  title: string;
  content: string[];
  visuals: string;
  layout: string;
}

interface PresentationContent {
  slides: Slide[];
}

export default async function Preview(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const slideData = await prisma.presentation.findFirst({
    where: { id },
  });

  if (!slideData || !slideData.generated_content) {
    return <div>No presentation found</div>;
  }

  const content = JSON.parse(
    slideData.generated_content,
  ) as PresentationContent;

  // Ensure content.slides exists and each slide's content is an array
  const processedContent = {
    slides: content.slides.map((slide) => ({
      ...slide,
      content: Array.isArray(slide.content) ? slide.content : [slide.content],
    })),
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-5xl">
        {processedContent.slides.map((slide, idx) => (
          <SlideCard
            key={idx}
            title={slide.title}
            content={slide.content}
            visuals={slide.visuals}
            layout={slide.layout}
          />
        ))}
      </div>
    </div>
  );
}
