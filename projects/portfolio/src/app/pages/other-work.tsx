import { Link } from "react-router-dom";
import { otherWork } from "@/data/portfolio-data";

export function OtherWork() {
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold mb-12">Other Work</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherWork.map((work) => (
          <Link
            key={work.id}
            to={`/other-work/${work.id}`}
            className="group"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600" />
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-600 transition-colors">
                  {work.title}
                </h3>
                <p className="text-gray-600 text-sm">{work.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}