import AgentHome from "./components/AgentHome";
import RiderHome from "./components/RiderHome";

const role = "agent"; // or "rider"

export default function Home() {
  return <>{role === "agent" ? <AgentHome /> : <RiderHome />}</>;
}
