import { AlertCircle, FileQuestion, Clock, Award } from 'lucide-react';

export default function MockTestUI() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-dark mb-2">Mock Tests</h1>
          <p className="text-brand-gray">Practice with actual board patterns and get instant analytics.</p>
        </div>
      </div>

      {/* Notice Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-4 items-start">
        <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-amber-900">Upcoming Live Test: Pre-Board Mathematics</h3>
          <p className="text-sm text-amber-800 mt-1">Scheduled for October 25th, 2026. Make sure to have a stable internet connection.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Tests */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-brand-dark">Available Tests</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { title: 'Algebra Complete Syllabus Mock', duration: '120 mins', questions: 50, standard: '10th SSC' },
              { title: 'Science-1 Physics Numericals', duration: '60 mins', questions: 25, standard: '10th SSC' },
              { title: 'English Grammar Comprehensive', duration: '90 mins', questions: 40, standard: 'All' },
            ].map((test, i) => (
              <div key={i} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-brand-dark text-lg">{test.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-brand-gray font-medium">
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {test.duration}</span>
                      <span className="flex items-center gap-1.5"><FileQuestion className="w-4 h-4" /> {test.questions} Qs</span>
                      <span className="bg-gray-100 text-brand-dark px-2 py-0.5 rounded-md">{test.standard}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white font-bold py-3 rounded-xl transition-all text-sm border border-brand-primary/20">
                  Start Test Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Previous Results */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-brand-dark">Performance Analytics</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center h-48 bg-gray-50 rounded-2xl border border-dashed border-gray-300 mb-6">
              <div className="text-center">
                <Award className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-brand-gray font-medium">Complete more tests to generate your performance chart.</p>
              </div>
            </div>

            <h3 className="font-bold text-brand-dark mb-4">Recent Results</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border border-green-100">
                <div>
                  <p className="font-semibold text-green-900">Geometry Chapter 1-3 Review</p>
                  <p className="text-xs text-green-700 mt-1">Oct 12, 2026</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-green-700">92%</div>
                  <div className="text-xs font-bold text-green-600">Grade: A+</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                <div>
                  <p className="font-semibold text-orange-900">Chemistry Balancing Equations</p>
                  <p className="text-xs text-orange-700 mt-1">Oct 05, 2026</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-orange-700">68%</div>
                  <div className="text-xs font-bold text-orange-600">Grade: C</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
