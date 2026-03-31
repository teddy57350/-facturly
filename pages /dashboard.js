import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [plan, setPlan] = useState("free");

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
        return;
      }

      setUser(data.user);
      setIsOnline(true);

      // récup plan user dans Supabase
      const { data: dbUser } = await supabase
        .from("users")
        .select("plan")
        .eq("email", data.user.email)
        .single();

      if (dbUser) setPlan(dbUser.plan);

      setLoading(false);
    };

    loadUser();
  }, []);

  const toggleSession = async () => {
    if (isOnline) {
      await supabase.auth.signOut();
      setIsOnline(false);
      router.push("/login");
    }
  };

  const upgradeToPro = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Dashboard 🚀</h1>

      {/* USER INFO */}
      <p>👤 Email : {user?.email}</p>

      {/* PLAN */}
      <div
        style={{
          marginTop: 10,
          padding: 10,
          display: "inline-block",
          borderRadius: 10,
          background: plan === "pro" ? "#4f46e5" : "#e5e7eb",
          color: plan === "pro" ? "white" : "black",
          fontWeight: "bold",
        }}
      >
        {plan === "pro" ? "💎 PLAN PRO" : "🆓 PLAN FREE (10 factures/mois)"}
      </div>

      {/* ON / OFF BUTTON */}
      <div>
        <button
          onClick={toggleSession}
          style={{
            marginTop: 20,
            padding: "10px 20px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            background: isOnline ? "green" : "red",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {isOnline ? "🟢 ON (Connecté)" : "🔴 OFF"}
        </button>
      </div>

      {/* UPGRADE */}
      {plan === "free" && (
        <button
          onClick={upgradeToPro}
          style={{
            marginTop: 20,
            padding: "12px 24px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            background: "#7c3aed",
            color: "white",
            fontWeight: "bold",
            display: "block",
          }}
        >
          💎 Passer Pro - 19€/mois
        </button>
      )}

      {/* INFO LIMIT FREE */}
      {plan === "free" && (
        <p style={{ marginTop: 15, color: "#666" }}>
          Limite : 10 factures / mois
        </p>
      )}
    </div>
  );
}
