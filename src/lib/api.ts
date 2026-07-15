import { Event } from './mockEvents';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Booking {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  eventTime: string;
  eventPrice: number;
  eventImage?: string;
  userEmail: string;
  userName: string;
  userId: string;
  createdAt: string;
}

export async function fetchEvents(filters?: { category?: string; location?: string; search?: string; creatorEmail?: string }): Promise<Event[]> {
  const params = new URLSearchParams();
  if (filters) {
    if (filters.category) params.append('category', filters.category);
    if (filters.location) params.append('location', filters.location);
    if (filters.search) params.append('search', filters.search);
    if (filters.creatorEmail) params.append('creatorEmail', filters.creatorEmail);
  }
  
  const res = await fetch(`${API_BASE_URL}/events?${params.toString()}`);
  if (!res.ok) {
    throw new Error('Failed to fetch events');
  }
  return res.json();
}

export async function fetchEventById(id: string): Promise<Event> {
  const res = await fetch(`${API_BASE_URL}/events/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch event');
  }
  return res.json();
}

export async function createEvent(eventData: any): Promise<Event> {
  const res = await fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to create event');
  }
  return res.json();
}

export async function bookEvent(id: string, userData: { userId: string; userEmail: string; userName: string }): Promise<{ message: string; booking: Booking; event: Event }> {
  const res = await fetch(`${API_BASE_URL}/events/${id}/book`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to book event');
  }
  return res.json();
}

export async function addEventReview(id: string, reviewData: { userName: string; rating: number; comment: string }): Promise<{ message: string; reviews: any[]; rating: number }> {
  const res = await fetch(`${API_BASE_URL}/events/${id}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to add review');
  }
  return res.json();
}

export async function fetchUserBookings(email: string): Promise<Booking[]> {
  const res = await fetch(`${API_BASE_URL}/bookings?email=${encodeURIComponent(email)}`);
  if (!res.ok) {
    throw new Error('Failed to fetch bookings');
  }
  return res.json();
}
