import { Suspense } from "react";
import PreviewContent from "./PreviewContent";
import prisma from "@/lib/db";

async function getPresentation(id: string) {
  const presentation = await prisma.presentation.findFirst({
    where: { id }
  });
  return presentation;
}

export default async function Preview(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const initialData = await getPresentation(id);
  
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Loading...</h2>
          <div className="animate-pulse flex justify-center">
            <div className="h-8 w-8 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    }>
      <PreviewContent initialData={initialData} />
    </Suspense>
  );
}
