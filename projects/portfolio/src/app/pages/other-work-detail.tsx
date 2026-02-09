import { useParams, Link } from "react-router-dom";
import { otherWork } from "@/data/portfolio-data";
import { ArrowLeft } from "lucide-react";

export function OtherWorkDetail() {
  const { id } = useParams<{ id: string }>();
  const work = otherWork.find((w) => w.id === id);

  if (!work) {
    return <div className="min-h-screen flex items-center justify-center">Work not found</div>;
  }

  return (
    <div className="min-h-screen">
      <Link to="/work" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Other Work
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">{work.title}</h1>
      <p className="text-xl text-gray-600 mb-8">{work.description}</p>

      <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-12" />

      <div className="prose max-w-none">
        <p className="text-gray-700 leading-relaxed">{work.description}</p>
      </div>
    </div>
  );
}