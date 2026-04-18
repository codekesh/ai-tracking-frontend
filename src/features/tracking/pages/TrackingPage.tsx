import { useEffect, useState } from "react";
import { trackingAPI } from "../../../shared/api/axios";
import { useNavigate } from "react-router-dom";
import "./TrackingPage.css";
import type { Tracker } from "../types";

export default function TrackingPage() {
  const navigate = useNavigate();
  const [modules, setModules] = useState<Tracker[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTrackerType, setNewTrackerType] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrackers() {
      try {
        const res = await trackingAPI.get("/trackers");
        setModules(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchTrackers();
  }, []);

  const openAddTrackerModal = () => {
    setNewTrackerType("");
    setError(null);
    setIsModalOpen(true);
  };

  const closeAddTrackerModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

  const submitAddTracker = async () => {
    if (!newTrackerType.trim()) {
      setError("Tracker type is required");
      return;
    }

    try {
      await trackingAPI.post("/trackers", { domain: newTrackerType.trim() });
      const res = await trackingAPI.get("/trackers");
      setModules(res.data);
      closeAddTrackerModal();
    } catch (err) {
      console.error(err);
      setError("Failed to add tracker. Please try again.");
    }
  };

  return (
    <div className="tracking-page">
      <div className="tracking-header">
        <h2>Tracking Modules</h2>
        <p>Select a tracker or create a new one</p>
      </div>

      <div className="tracking-grid">
        {/* Add Tracker Card */}
        <div className="tracker-card add-card" onClick={openAddTrackerModal}>
          <span className="card-main-text">+</span>
          <span className="card-hover-text">ADD TRACKER</span>
        </div>

        {/* Tracker Cards */}
        {modules.map((module) => (
          <div
            key={module.id}
            className="tracker-card"
            onClick={() => navigate(`/dashboard/tracking/${module.domain}`)}
          >
            <span className="card-main-text">
              {module.domain.toUpperCase()}
            </span>
            <span className="card-hover-text">OPEN MODULE</span>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeAddTrackerModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Create New Tracker</h3>
            <input
              type="text"
              value={newTrackerType}
              onChange={(e) => setNewTrackerType(e.target.value)}
              placeholder="Type (e.g. diet, exercise, sleep)"
              onKeyDown={(e) => {
                if (e.key === "Enter") submitAddTracker();
              }}
            />
            {error && <p className="modal-error">{error}</p>}
            <div className="modal-actions">
              <button className="btn btn-cancel" onClick={closeAddTrackerModal}>
                Cancel
              </button>
              <button className="btn btn-submit" onClick={submitAddTracker}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
