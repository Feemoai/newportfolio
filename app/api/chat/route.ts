import { cv } from "@/data/cv";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

// Back to gemini-2.5-flash as requested, using v1beta
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

function buildSystemPrompt(): string {
  const skills = [
    ...cv.skills.languages.map((s) => s.name),
    ...cv.skills.frameworks.map((s) => s.name),
    ...cv.skills.tools.map((s) => s.name),
    ...cv.skills.design.map((s) => s.name),
  ].join(", ");

  const experience = cv.experience
    .map(
      (e) =>
        `- ${e.role} at ${e.organization} (${e.start_date} – ${e.end_date ?? "present"})`
    )
    .join("\n");

  const education = cv.education
    .map((e) => `- ${e.degree} at ${e.institution} (${e.status})`)
    .join("\n");

  const achievements = cv.achievements
    .map(
      (a) =>
        `- ${a.title}: ${a.event} (${a.year})${a.details ? " — " + a.details : ""}`
    )
    .join("\n");

  const projects = cv.projects
    .map(
      (p) =>
        `- ${p.title} (${p.year}): ${p.description} | Stack: ${p.stack.join(", ")}`
    )
    .join("\n");

  return `You are FeemoAI, the cool, fun, and friendly AI assistant for Fajril's (Ahmad Fajril Falah) portfolio.
Your personality is "seru dan asik" (engaging and energetic) but you always stay polite and respectful.
Use friendly emojis naturally. 

Main Goal: Help users get to know Fajril using the facts provided below.
If a user asks something unrelated to Fajril (like general knowledge or small talk), you can still answer them in your fun FeemoAI style, but try to bring the conversation back to Fajril if it makes sense.
Do NOT invent fake facts about Fajril. If you don't know something about him, just say so nicely.
Reply in the same language the user uses — Indonesian or English.
Keep responses concise and lively (max 3-4 sentences).

=== FAJRIL'S DATA ===
Name: ${cv.personal.full_name} (usually called Fajril)
Headline: ${cv.personal.headline}
Location: ${cv.personal.location}
Email: ${cv.personal.contacts.email}
LinkedIn: ${cv.personal.contacts.linkedin}
Website: ${cv.personal.contacts.website}
Availability: ${cv.personal.status}

=== ABOUT ===
${cv.summary}

=== EDUCATION ===
${education}

=== EXPERIENCE & ORGANIZATIONS ===
${experience}

=== SKILLS ===
${skills}

=== PROJECTS ===
${projects}

=== ACHIEVEMENTS ===
${achievements}

=== LANGUAGES SPOKEN ===
${cv.languages.map((l) => `${l.name} (${l.level})`).join(", ")}`;
}

export async function POST(req: Request) {
  if (!GEMINI_API_KEY) {
    return Response.json(
      { text: "⚠️ API key belum dikonfigurasi. Tambahkan GEMINI_API_KEY di .env.local" },
      { status: 200 }
    );
  }

  const { messages } = (await req.json()) as {
    messages: Array<{ role: string; content: string }>;
  };

  if (!messages?.length) {
    return Response.json({ error: "No messages." }, { status: 400 });
  }

  const lastUserMessage = messages[messages.length - 1].content;

  // --- SECURITY: Input Sanitization ---
  if (lastUserMessage.length > 500) {
    return Response.json(
      { text: "Waduh, pesannya kepanjangan nih! Coba perpendek jadi kurang dari 500 karakter ya biar FeemoAI nggak bingung. 🙏" },
      { status: 200 }
    );
  }
  // ------------------------------------

  // Build conversation history (exclude last user message — sent separately below)
  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const systemPrompt = buildSystemPrompt();

  // contents array: system context first, then conversation history, then user message
  const contents = [
    {
      role: "user",
      parts: [{ text: `[SYSTEM CONTEXT]\n${systemPrompt}` }],
    },
    {
      role: "model",
      parts: [
        {
          text: `Siap! Aku FeemoAI, asisten keren Ahmad Fajril Falah. Aku bakal jawab pertanyaanmu dengan seru tapi tetep sopan! 🚀`,
        },
      ],
    },
    ...history,
    {
      role: "user",
      parts: [{ text: lastUserMessage }],
    },
  ];

  try {
    // Retry up to 2 times for rate limit (429) errors
    let lastError = "";
    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt > 0) {
        // Wait before retry: 1s, then 2s
        await new Promise((r) => setTimeout(r, attempt * 1000));
      }

      const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 512,
            topP: 0.9,
          },
        }),
      });

      // Rate limited (429) or Service Unavailable (503) — retry
      if (res.status === 429 || res.status === 503) {
        lastError = `${res.status} error (attempt ${attempt + 1})`;
        console.warn(`[chat] ${lastError}`);
        continue;
      }

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(`Gemini ${res.status}: ${JSON.stringify(errBody)}`);
      }

      const data = await res.json();
      const text: string =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

      if (!text) throw new Error("Empty response from Gemini");

      return Response.json({ text });
    }

    // All retries exhausted
    throw new Error(lastError || "Max retries reached");
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("[chat/route] Gemini error:", errMsg);

    // Always gracefully fallback to local CV data
    const fallback = getLocalFallback(lastUserMessage);
    return Response.json({
      text: fallback ?? getGenericFallback(),
    });
  }
}

// Generic helpful response when nothing else matches
function getGenericFallback(): string {
  return `Halo! Aku FeemoAI, chatbot asisten **Ahmad Fajril Falah**. Aku bisa bantu jawab pertanyaanmu tentang:

- 💻 **Skills** — PHP, JavaScript, ReactJS, Laravel, dll.
- 📁 **Projects** — Jalan Tani, Personal Portfolio, dsb.
- 🎓 **Education** — Politeknik Negeri Semarang (TRK)
- 🏆 **Achievements** — Semifinalist MANIFEST ITS, Awardee Perintis
- 📬 **Contact** — Email, LinkedIn, Website
- 👥 **Experience** — GDG, Novo Club, OSBIT, OSIS, dll.

Tanya apa aja yuk, bakal aku jawab dengan asik! ✨`;
}

// Local keyword-based fallback — always works without API
function getLocalFallback(input: string): string | null {
  if (!input) return null;

  if (/skill|kemampuan|bisa|language|framework|tool|teknologi|coding/i.test(input)) {
    return `Wih, Ahmad punya beberapa skills keren nih! 🚀\n\n- **Languages:** ${cv.skills.languages.map((x) => x.name).join(", ")}\n- **Frameworks:** ${cv.skills.frameworks.map((x) => x.name).join(", ")}\n- **Tools:** ${cv.skills.tools.map((x) => x.name).join(", ")}\n- **Design:** ${cv.skills.design.map((x) => x.name).join(", ")}`;
  }
  if (/contact|email|kontak|reach|hubungi|phone|hp|linkedin|website/i.test(input)) {
    return `Mau ngobrol langsung sama Fajril? Boleh banget! Ini kontaknya: ✨\n\n- Email: ${cv.personal.contacts.email}\n- LinkedIn: ${cv.personal.contacts.linkedin}\n- Website: ${cv.personal.contacts.website}\n- Phone: ${cv.personal.contacts.phone}`;
  }
  if (/project|proyek|karya|built|website|app/i.test(input)) {
    return `Cek deh beberapa karya Ahmad yang mantap ini: 📁\n\n` + cv.projects
      .map((p) => `**${p.title}** (${p.year})\n${p.description}`)
      .join("\n\n");
  }
  if (/achievement|prestasi|award|competition|beasiswa|scholarship|menang|juara/i.test(input)) {
    return `Fajril juga punya prestasi lho, keren kan? 🏆\n\n` + cv.achievements
      .map(
        (a) =>
          `**${a.title}** — ${a.event} (${a.year})${a.details ? "\n" + a.details : ""}`
      )
      .join("\n\n");
  }
  if (/education|kuliah|sekolah|study|belajar|kampus|college|university/i.test(input)) {
    return `Sekarang Ahmad lagi menimba ilmu di sini nih: 🎓\n\n` + cv.education
      .map((e) => `**${e.institution}**\n${e.degree} (${e.status})`)
      .join("\n\n");
  }
  if (/experience|organisasi|organization|kerja|volunteer|komunitas|osis|club/i.test(input)) {
    const active = cv.experience
      .filter((e) => !e.end_date)
      .map((e) => `- ${e.role} @ ${e.organization}`)
      .join("\n");
    const past = cv.experience
      .filter((e) => e.end_date)
      .slice(0, 4)
      .map((e) => `- ${e.role} @ ${e.organization}`)
      .join("\n");
    return `Ahmad aktif banget di berbagai komunitas dan organisasi lho! 👥\n\n**Aktif Sekarang:**\n${active}\n\n**Pengalaman Sebelumnya:**\n${past}`;
  }
  if (/hello|halo|hai|hi|hey|apa kabar|how are|assalamu/i.test(input)) {
    return `Halo sobat! Aku FeemoAI, asisten chatbot **${cv.personal.full_name}**. Tanya-tanya soal skills, projects, atau pengalamannya yuk, pasti seru! ✨`;
  }
  if (/about|tentang|siapa|who is|cerita|profil|profile/i.test(input)) {
    return `Kenalin, ini **${cv.personal.full_name}**! 😎\n${cv.personal.headline}\n📍 ${cv.personal.location}\n\n${cv.summary}`;
  }
  return null;
}
