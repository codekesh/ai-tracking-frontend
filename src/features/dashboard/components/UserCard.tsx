import type { UserSummary } from "../types";

export default function UserCard({ user }: {user: UserSummary}) {
  return (
    <div style={{ border: "1px solid gray", padding: "15px" }}>
      <h3>Welcome User👋</h3>
      <h4>{user.email}</h4>
    </div>
  );
}