// src/pages/EventsPage.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Calendar, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import EventCard from '../components/events/EventCard';
import EventForm from '../components/events/EventForm';
import { getEvents, addEvent, deleteEvent, updateEvent } from '../api/eventsApi';
import { isAdmin, isLoggedIn } from '../utils/auth';

const EventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [error, setError] = useState('');

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      // Sort: upcoming first
      const sorted = data.sort((a, b) => {
        if (a.isUpcoming && !b.isUpcoming) return -1;
        if (!a.isUpcoming && b.isUpcoming) return 1;
        return new Date(b.date) - new Date(a.date);
      });
      setEvents(sorted);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (eventData) => {
    try {
      setFormLoading(true);
      const result = await addEvent(eventData);
      setEvents([result.event, ...events]);
      setEditingEvent(null);
      setError('');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (eventData) => {
    try {
      setFormLoading(true);
      const result = await updateEvent(eventData);
      setEvents(events.map(event => event._id === eventData._id ? result.event : event));
      setEditingEvent(null);
      setError('');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      await deleteEvent(id);
      setEvents(events.filter(event => event._id !== id));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <p className="mt-4 text-gray-400">Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 text-sm font-medium text-gray-400 hover:text-green-400 transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-green-400 via-green-300 to-emerald-400 bg-clip-text text-transparent">
              Events
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join us for workshops, cleanups, and sustainability drives that make our campus greener.
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-900/30 border border-red-800/50 text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Admin Form */}
        {(isAdmin() || editingEvent) && (
          <EventForm
            onSubmit={editingEvent ? handleUpdate : handleCreate}
            onCancel={() => setEditingEvent(null)}
            initialData={editingEvent}
            loading={formLoading}
          />
        )}

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-20 h-20 text-gray-600 mx-auto mb-6 opacity-50" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No Events Yet</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Check back soon for upcoming workshops, drives, and sustainability events.
            </p>
            {isLoggedIn() && isAdmin() && (
              <p className="text-green-400">
                Create the first event above 👆
              </p>
            )}
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
