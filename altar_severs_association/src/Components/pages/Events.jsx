import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";

const eventsData = [
  {
    id: 1,
    title: "Annual Altar Servers Retreat",
    date: "2024-05-15",
    time: "9:00 AM - 5:00 PM",
    location: "St. Peter's Cathedral, Jalingo",
    description: "A day of spiritual renewal and training for altar servers.",
    price: "₦5,000"
  },
  {
    id: 2,
    title: "Diocesan Mass Training Workshop",
    date: "2024-06-20",
    time: "10:00 AM - 4:00 PM",
    location: "Holy Family Parish Hall",
    description: "Comprehensive training on liturgical services and protocols.",
    price: "₦3,000"
  },
  {
    id: 3,
    title: "Youth Leadership Conference",
    date: "2024-07-10",
    time: "8:00 AM - 6:00 PM",
    location: "Diocesan Conference Center",
    description: "Building leadership skills for young altar servers.",
    price: "₦7,000"
  }
];

const Events = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Upcoming Events</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Join us for spiritual growth, training, and community building events across the diocese.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {eventsData.map((event) => (
          <div key={event.id} className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200 border border-slate-100">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-900">{event.title}</h3>
                <p className="text-sm text-slate-600">{event.description}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-lg font-semibold text-emerald-600">{event.price}</span>
                <Link
                  to="/payment"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  <Ticket className="h-4 w-4" />
                  Buy Ticket
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;