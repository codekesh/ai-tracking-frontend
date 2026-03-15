import { useEffect, useState } from "react";
import { trackingAPI } from "../../../shared/api/axios";

interface TrackingEvent {
  id: number;
  eventType: string;
  timestamp: string;
}

export default function TrackingPage() {
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await trackingAPI.get("/tracking");
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Tracking Events</h2>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Type</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.eventType}</td>
              <td>{event.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
