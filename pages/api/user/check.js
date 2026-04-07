import { createClient } from "@supabase/supabase-js";
 
const FREE_LIMIT = 10;
 
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
 
  const { email } = req.body;
 
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Email invalide" });
  }
 
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
 
  try {
    // Cherche l'utilisateur
    const { data: user, error } = await supabase
      .from("users")
      .select("email, count")
      .eq("email", email)
      .single();
 
    if (error && error.code !== "PGRST116") {
      return res.status(500).json({ error: "Erreur base de données" });
    }
 
    // Nouvel utilisateur
    if (!user) {
      await supabase.from("users").insert({ email, count: 0 });
      return res.status(200).json({ count: 0, allowed: true });
    }
 
    // Utilisateur existant — vérifie la limite
    if (user.count >= FREE_LIMIT) {
      return res.status(200).json({
        count: user.count,
        allowed: false,
        message: "Limite gratuite atteinte"
      });
    }
 
    return res.status(200).json({
      count: user.count,
      allowed: true
    });
 
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
 
