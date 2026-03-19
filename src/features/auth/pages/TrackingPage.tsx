import { useEffect, useState } from "react";
import { trackingAPI } from "../../../shared/api/axios";
import { useNavigate } from "react-router-dom";

interface Tracker {
  id: number;
  domain: string;
}

export default function TrackingPage() {
  const navigate = useNavigate();
  const [modules, setModules] = useState<Tracker[]>([]);

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

  const handleAddTracker = async () => {
    const type = prompt("Enter tracker type (e.g. diet, exercise, sleep)");

    if (!type) return;

    await trackingAPI.post("/trackers", {
      domain: type,
    });

    // refresh
    const res = await trackingAPI.get("/trackers");
    setModules(res.data);
  };

  return (
    <div>
      <h2>Tracking</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <div
          onClick={handleAddTracker}
          style={{
            width: "150px",
            height: "150px",
            border: "2px dashed gray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "30px",
            cursor: "pointer",
          }}
        >
          +
        </div>

        {modules.map((module) => (
          <div
            key={module.id}
            onClick={() => navigate(`/dashboard/tracking/${module.domain}`)}
            style={{
              width: "150px",
              height: "150px",
              border: "1px solid black",
              borderRadius: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            {module.domain.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}
