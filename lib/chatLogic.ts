// Chat logic engine powered by CV data
import { cv } from "@/data/cv";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Present";
  const [year, month] = dateStr.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[parseInt(month) - 1]} ${year}`;
}

function matchKeywords(input: string, keywords: string[]): boolean {
  const lower = input.toLowerCase();
  return keywords.some((kw) => lower.includes(kw.toLowerCase()));
}

export function generateResponse(userInput: string): string {
  const input = userInput.trim();

  // Greeting
  if (matchKeywords(input, ["hello", "hi", "hey", "halo", "hai", "greetings", "p", "heyyo"])) {
    return `Halooo! Aku FeemoAI, asisten chatbot kerennya **${cv.personal.full_name}**. Tanya-tanya soal skills, projects, atau pengalamannya yuk, pasti seru! ✨`;
  }

  // Name
  if (matchKeywords(input, ["who are you", "siapa kamu", "your name", "namamu", "nama"])) {
    return `Aku FeemoAI! 😎 Aku di sini buat bantuin kamu kenal lebih dekat sama **${cv.personal.full_name}** (panggil aja **Fajril**) — ${cv.personal.headline}.`;
  }

  // Location
  if (matchKeywords(input, ["location", "where", "lokasi", "dimana", "tinggal", "city", "kota"])) {
    return `Fajril sekarang lagi stay di **${cv.personal.location}** nih.`;
  }

  // Contact
  if (matchKeywords(input, ["contact", "email", "phone", "reach", "hubungi", "kontak", "linkedin", "website"])) {
    const c = cv.personal.contacts;
    return `Mau ngobrol langsung sama Fajril? Boleh banget! Ini kontaknya: ✨\n\n- **Email:** ${c.email}\n- **Phone:** ${c.phone}\n- **LinkedIn:** ${c.linkedin}\n- **Website:** ${c.website}`;
  }

  // Skills
  if (matchKeywords(input, ["skill", "kemampuan", "bisa apa", "technology", "tech", "programming", "code", "bahasa"])) {
    const langs = cv.skills.languages.map((s) => s.name).join(", ");
    const fw = cv.skills.frameworks.map((s) => s.name).join(", ");
    const tools = cv.skills.tools.map((s) => s.name).join(", ");
    const design = cv.skills.design.map((s) => s.name).join(", ");
    return `Wih, Fajril punya beberapa skills keren nih! 🚀\n\n- **Languages:** ${langs}\n- **Frameworks:** ${fw}\n- **Tools:** ${tools}\n- **Design:** ${design}\n- **Focus:** Frontend & Backend Web Development`;
  }

  // Education
  if (matchKeywords(input, ["education", "study", "kuliah", "sekolah", "belajar", "university", "college", "degree", "pendidikan"])) {
    const edu = cv.education
      .map(
        (e) =>
          `- **${e.institution}** — ${e.degree} (${formatDate(e.start_date)} – ${e.end_date ? formatDate(e.end_date) : "Present"})`
      )
      .join("\n");
    return `Sekarang Fajril lagi menimba ilmu di sini nih: 🎓\n\n${edu}`;
  }

  // Projects
  if (matchKeywords(input, ["project", "proyek", "work", "karya", "porto", "built", "app", "website"])) {
    const projects = cv.projects
      .map((p) => `- **${p.title}** (${p.year}) — ${p.description.slice(0, 80)}...`)
      .join("\n");
    return `Cek deh beberapa karya Fajril yang mantap ini: 📁\n\n${projects}\n\nLengkapnya bisa kamu liat di bagian Projects ya!`;
  }

  // Experience / Organizations
  if (matchKeywords(input, ["experience", "organisasi", "organization", "kerja", "work", "volunteer", "komunitas", "community", "leadership"])) {
    const active = cv.experience
      .filter((e) => !e.end_date)
      .map((e) => `- **${e.role}** @ ${e.organization}`)
      .join("\n");
    const past = cv.experience
      .filter((e) => e.end_date)
      .slice(0, 3)
      .map((e) => `- **${e.role}** @ ${e.organization}`)
      .join("\n");
    return `Fajril aktif banget di berbagai komunitas dan organisasi lho! 👥\n\n**Aktif Sekarang:**\n${active}\n\n**Pengalaman Sebelumnya:**\n${past}`;
  }

  // Achievements
  if (matchKeywords(input, ["achievement", "award", "prestasi", "competition", "kompetisi", "scholarship", "beasiswa", "winner"])) {
    const ach = cv.achievements
      .map((a) => `- **${a.title}** — ${a.event} (${a.year})`)
      .join("\n");
    return `Fajril juga punya prestasi lho, keren kan? 🏆\n\n${ach}`;
  }

  // Status / availability
  if (matchKeywords(input, ["available", "hire", "freelance", "tersedia", "open to work", "job", "opportunity"])) {
    return `Kabar baik! Fajril lagi **${cv.personal.status}** buat diajak kolaborasi atau kerja bareng. Langsung aja kontak lewat email: **${cv.personal.contacts.email}** 🚀`;
  }

  // Summary / about
  if (matchKeywords(input, ["about", "tentang", "tell me", "ceritakan", "summary", "bio", "yourself", "diri"])) {
    return `Kenalin, ini **${cv.personal.full_name}** (biasa dipanggil **Fajril**)! 😎\n\n${cv.summary}\n\nFajril ini mahasiswa TRK di Polines yang lagi semangat-semangatnya di dunia web dev!`;
  }

  // Languages (spoken)
  if (matchKeywords(input, ["language spoken", "speak", "bahasa apa", "bicara", "fluent"])) {
    const langs = cv.languages.map((l) => `${l.flag} **${l.name}** — ${l.level}`).join(", ");
    return `Ahmad bisa bahasa ini nih: ${langs}`;
  }

  // Fallback
  return `Wah, aku belum tau soal itu. Coba tanya soal **skills**, **projects**, atau **kontak** Ahmad deh, pasti aku jawab! ✨`;
}
