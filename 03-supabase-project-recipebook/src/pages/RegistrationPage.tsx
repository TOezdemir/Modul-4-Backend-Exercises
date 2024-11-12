import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useUserContext } from "../context/userContext";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstname, last_name: lastname },
      },
    });
    if (result.error) {
      alert(result.error.message);
    } else {
      setUser(result.data.user);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl my-10">Registrierung</h1>
      <form 
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Email Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-64 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          required
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-64 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          required
        />
        <br />
        <input
          type="text"
          placeholder="Vorname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="w-64 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          required
        />
        <input
          type="text"
          placeholder="Nachname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="w-64 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          required
        />
        <button 
        className="w-64 flex items-center justify-center text-lg mt-5 bg-yellow-400 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
        Registrieren</button>
      </form>
    </div>
  );
}