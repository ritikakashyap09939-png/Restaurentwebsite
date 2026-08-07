import { Router, type IRouter } from "express";

const router: IRouter = Router();

const WEBSITE_KEYWORDS = [
  "nirmal",
  "restaurant",
  "party hall",
  "banquet",
  "menu",
  "dish",
  "food",
  "sweet",
  "dessert",
  "spiecy",
  "spicy",
  "biryani",
  "paneer",
  "chicken",
  "dal",
  "table",
  "book",
  "booking",
  "reserve",
  "reservation",
  "contact",
  "phone",
  "call",
  "email",
  "address",
  "location",
  "where",
  "open",
  "opening",
  "close",
  "timing",
  "time",
  "hour",
  "gallery",
  "review",
  "feedback",
  "about",
  "story",
  "price",
  "cost",
  "₹",
  "rupee",
  "india",
  "gausala",
  "habri",
  "jashan",
  "whatsapp",
];

const RESTAURANT_CONTEXT = `
You are the official website assistant for Nirmal Family Restaurant and Party Hall.
Only answer questions about this business, its restaurant, food menu, Sweet Special,
Spiecy Special, party/banquet hall, reservations, gallery, reviews, contact details,
location, opening hours, and information visible on this website.

Known website information:
- Business: Nirmal Family Restaurant and Party Hall
- Address: Habri Road, Gausala Market, near Jashan Complex
- Phone: +91 98139 54399 and +91 98968 54399
- Email: namaste@nirmalrestaurant.com
- Opening hours: Monday-Friday 8:00 AM-6:00 PM; Saturday-Sunday 10:00 AM-11:30 PM
- Menu sections: Sweet Special and Spiecy Special
- Spiecy Special dishes include Hyderabadi Dum Biryani (₹299), Murgh Makhani (₹279),
  Sizzling Paneer Tikka (₹229), and Dal Makhani (₹199).
- Sweet Special contains desserts and traditional mithai shown on the Menu page.

Rules:
1. Answer only in the same language as the user's question.
2. Use only the known information and the website context. Never invent availability,
   discounts, ingredients, exact capacity, delivery options, or booking confirmation.
3. If the user asks something unrelated to this restaurant or party hall, reply exactly:
   "I can only help with questions about Nirmal Family Restaurant and Party Hall."
4. If website information is missing, say that the team can confirm it by phone and
   provide the phone numbers above.
5. Keep answers concise, friendly, and useful.
`;

function isWebsiteQuestion(message: string, history: unknown[]) {
  const normalized = message.trim().toLowerCase();
  if (!normalized) return false;

  const directMatch = WEBSITE_KEYWORDS.some((keyword) =>
    normalized.includes(keyword),
  );
  if (directMatch) return true;

  const followUpPattern =
    /^(and|also|what about|how about|aur|or|then|that|this|it|there|wahan|kitna|kya)\b/i;
  if (!followUpPattern.test(normalized)) return false;

  const recentUserMessages = history
    .filter(
      (entry): entry is { role: "user"; content: string } =>
        Boolean(entry) &&
        typeof entry === "object" &&
        (entry as { role?: unknown }).role === "user" &&
        typeof (entry as { content?: unknown }).content === "string",
    )
    .slice(-3)
    .map((entry) => entry.content.toLowerCase());

  return recentUserMessages.some((previousMessage) =>
    WEBSITE_KEYWORDS.some((keyword) => previousMessage.includes(keyword)),
  );
}

router.post("/chat", async (req, res) => {
  const message =
    typeof req.body?.message === "string" ? req.body.message.trim() : "";
  const history = Array.isArray(req.body?.history) ? req.body.history : [];

  if (!message || message.length > 500) {
    res.status(400).json({ error: "Please enter a question under 500 characters." });
    return;
  }

  if (!isWebsiteQuestion(message, history)) {
    res.json({
      answer:
        "I can only help with questions about Nirmal Family Restaurant and Party Hall.",
    });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    res.status(503).json({
      error: "The restaurant assistant is not configured yet. Please call +91 98139 54399.",
    });
    return;
  }

  const safeHistory = history
    .filter(
      (entry): entry is { role: "user" | "assistant"; content: string } =>
        Boolean(entry) &&
        typeof entry === "object" &&
        ["user", "assistant"].includes(String((entry as { role?: unknown }).role)) &&
        typeof (entry as { content?: unknown }).content === "string",
    )
    .slice(-6)
    .map((entry) => ({
      role: entry.role,
      content: entry.content.slice(0, 1000),
    }));

  try {
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          temperature: 0.2,
          max_tokens: 250,
          messages: [
            { role: "system", content: RESTAURANT_CONTEXT },
            ...safeHistory,
            { role: "user", content: message },
          ],
        }),
      },
    );

    if (!groqResponse.ok) {
      console.error("Groq chat request failed:", groqResponse.status);
      res.status(502).json({
        error: "The assistant is temporarily unavailable. Please call +91 98139 54399.",
      });
      return;
    }

    const payload = (await groqResponse.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const answer = payload.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      res.status(502).json({
        error: "The assistant could not prepare an answer. Please call +91 98139 54399.",
      });
      return;
    }

    res.json({ answer });
  } catch (error) {
    console.error("Groq chat request error:", error);
    res.status(502).json({
      error: "The assistant is temporarily unavailable. Please call +91 98139 54399.",
    });
  }
});

export default router;