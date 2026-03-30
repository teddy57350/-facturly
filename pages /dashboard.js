import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard SaaS 🚀</h1>

      <p>Email: {user.email}</p>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}
