'use client';

import { useState, useEffect } from 'react';
import { generatePerson } from './generatePerson';

// =============================================================
// 1. DATA & INTERFACES (Global Scope)
// =============================================================
interface Card {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  website?: string;
  category: string;
}

const cards: Card[] = [
  {
    name: 'Maria Garcia',
    title: 'Web Developer',
    company: 'Garcia Digital',
    phone: '(925) 555-0101',
    email: 'maria@garciadigital.com',
    website: 'https://garciadigital.com',
    category: 'Technology',
  },
  {
    name: 'James Chen',
    title: 'Licensed Acupuncturist',
    company: 'Harmony Wellness Center',
    phone: '(925) 555-0202',
    email: 'james@harmonywellness.com',
    website: 'https://harmonywellness.com',
    category: 'Health',
  },
  {
    name: 'Priya Patel',
    title: 'CPA',
    company: 'Patel & Associates',
    phone: '(925) 555-0303',
    email: 'priya@patelcpa.com',
    website: 'https://patelcpa.com',
    category: 'Finance',
  },
  {
    name: 'Robert Jones',
    title: 'CFO',
    company: 'Jones & Associates',
    phone: '(925) 555-1231',
    email: 'rjones@gmail.com',
    website: 'https://rjonesBIZ.com',
    category: 'Business',
  },
  {
    name: 'Marin Testudo',
    title: 'Mgr',
    company: 'Pancake House',
    phone: '(925) 555-0404',
    email: 'mtestudo@gmail.com',
    website: 'https://pancakehouse.com',
    category: 'Restaurant',
  },
  {
    name: 'Carris Sandoval',
    title: 'MD',
    company: 'Star Support and Education',
    phone: '(925) 555-0505',
    email: 'csandoval@gmail.com',
    website: 'https://starse.com',
    category: 'Education',
  },
  {
    name: 'Wayne Schlegle',
    title: 'Insurance Agent',
    company: 'Michigan Life and Casualty',
    phone: '(925) 555-0606',
    email: 'wschlegle@gmail.com',
    website: 'https://michiganlandc.com',
    category: 'Services',
  },
  {
    name: 'Jennifer Wertz',
    title: 'CEO',
    company: 'Wertz and Associates',
    phone: '(925) 555-0707',
    email: 'jwertz@gmail.com',
    website: 'https://wertzrealestate.com',
    category: 'Real Estate',
  },
  // ADD 4 MORE CARDS HERE TO REACH THE 8-CARD REQUIREMENT!
];

const categoryColors: Record<string, string> = {
  Technology: 'bg-blue-100 text-blue-800',
  Health: 'bg-green-100 text-green-800',
  Finance: 'bg-amber-100 text-amber-800',
  Business: 'bg-indigo-100 text-indigo-800',
  'Real Estate': 'bg-orange-100 text-orange-800',
  Education: 'bg-purple-100 text-purple-800',
  Services: 'bg-teal-100 text-teal-800',
  Restaurant: 'bg-gray-100 text-gray-800',
};

// =============================================================
// 2. THE PAGE COMPONENT
// =============================================================
export default function Home() {
  // Use state to wait for the browser (prevents "document is not defined" error)
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Business Card Directory
        </h1>
        <p className="text-lg text-gray-600">
          Connecting {cards.length} local professionals and services.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              {/* Avatar Logic */}
              <div className="w-16 h-16 rounded-full bg-gray-50 flex-shrink-0 overflow-hidden ring-4 ring-gray-50">
                {isClient ? (
                  <img
                    src={generatePerson(card.name, 200)}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                  {card.name}
                </h2>
                <p className="text-blue-600 font-medium text-sm">{card.title}</p>
              </div>
            </div>

            <div className="space-y-2 text-gray-600 text-sm mb-6 flex-grow">
              <p className="font-semibold text-gray-800 uppercase tracking-tight italic">
                {card.company}
              </p>
              <div className="flex flex-col gap-1">
                <span>📞 {card.phone}</span>
                <span className="truncate">📧 {card.email}</span>
              </div>
              
              {card.website && (
                <a
                  href={card.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-blue-500 hover:underline font-medium"
                >
                  Visit Website →
                </a>
              )}
            </div>

            <div className="pt-4 border-t border-gray-50">
              <span
                className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  categoryColors[card.category] || 'bg-gray-100 text-gray-800'
                }`}
              >
                {card.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}