import { FormEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Bot, Loader2, Pause, Play, Send, SkipForward, Volume2, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const initialMessage: ChatMessage = {
  role: "assistant",
  content:
    "Namaste! I can help with Nirmal Restaurant, menu, party hall, bookings, location and timings. What would you like to know?",
};

// ── Voice website tour ──────────────────────────────────────────────────────
type TourStop = {
  path: string;
  title: string;
  script: string;
};

const TOUR_STOPS: TourStop[] = [
  {
    path: "/",
    title: "Home",
    script:
      "नमस्ते! मैं आपका सहायक हूं। यह निर्मल फैमिली रेस्टोरेंट और पार्टी हॉल की वेबसाइट है, जहां परंपरा के साथ असली भारतीय स्वाद परोसा जाता है। यहां एक सौ पचास से अधिक सिग्नेचर व्यंजन, तथा पांच सौ मेहमानों की क्षमता वाला बैंक्वेट हॉल है। पच्चीस वर्षों से अधिक की विरासत के साथ, परिवार के हर सदस्य के लिए गर्मजोशी भरा वातावरण यहां आपका स्वागत करता है।",
  },
  {
    path: "/about",
    title: "Our Story",
    script:
      "यह पेज हमारी कहानी है। सन दो हजार पच्चीस में एक छोटे से सपने से शुरू हुआ यह सफर, आज एक खास जगह बन गया है, जहां पारंपरिक स्वाद और आधुनिक पहल मिलते हैं। हमारे मूल्य हैं — शुद्धता और स्वच्छता, प्रामाणिकता, तथा 'अतिथि देवो भव' की भावना। हम चाहते हैं कि हर मेहमान घर जैसा महसूस करे, और पूरी तरह प्रमाणित लाइसेंस के साथ आप हम पर भरोसा कर सकते हैं।",
  },
  {
    path: "/menu",
    title: "Menu",
    script:
      "यह हमारा मेनू पेज है। मीठे स्पेशल में चॉकलेट ट्राइफल, रसमलाई, काजू कतली, गुलाब जामुन और बहुत सी देसी मिठाइयां मिलती हैं। वहीं स्पाइसी स्पेशल में हैदराबादी डम बिरयानी, मक्खन चिकन, पनीर टिक्का और दाल मखनी जैसे लोकप्रिय व्यंजन हैं। सब कुछ ताज़ा बनाया जाता है, और कीमतें उनहत्तर रुपये से शुरू होती हैं, ताकि हर स्वाद के लिए कुछ न कुछ जरूर मिले।",
  },
  {
    path: "/banquet",
    title: "Party Hall",
    script:
      "यह है निर्मल पार्टी हॉल। विवाह, जन्मदिन, सगाई, कॉरपोरेट इवेंट और किटी पार्टी — हर तरह के समारोह के लिए यह हॉल पांच सौ मेहमानों की क्षमता के साथ पूरी तरह एयरकंडीशन्ड है। चार हजार पांच सौ वर्ग फीट एरिया, वैलेट पार्किंग और दो ब्राइडल रूम की सुविधा भी मिलती है। अपने इवेंट की जानकारी भरकर आप कुछ ही देर में कोटेशन प्राप्त कर सकते हैं।",
  },
  {
    path: "/gallery",
    title: "Gallery",
    script:
      "यह गैलरी पेज है, जहां निर्मल की झलक देखने को मिलती है। यहां रेस्टोरेंट के बाहरी हिस्से की खूबसूरत रोशनी, सजा हुआ बैंक्वेट हॉल, और खुशियों से भरे जश्न की तस्वीरें हैं। किसी भी तस्वीर पर क्लिक करने से वह बड़ी हो जाती है, ताकि आप हर पल को करीब से देख सकें।",
  },
  {
    path: "/testimonials",
    title: "Reviews",
    script:
      "यह गेस्ट बुक पेज है, जहां हमारे मेहमानों की राय दिखती है। निर्मल को अब तक चार दशमलव आठ की रेटिंग और एक हजार दो सौ से अधिक रिव्यू मिले हैं। मेहमान हमारे मक्खन चिकन, बिरयानी, दाल मखनी और पनीर टिक्का की तारीफ करते हैं, और यह भी कहते हैं कि यहां वे हमेशा घर जैसा प्यार महसूस करते हैं।",
  },
  {
    path: "/contact",
    title: "Contact",
    script:
      "और यह है आखिरी पेज — संपर्क पेज। निर्मल फैमिली रेस्टोरेंट हबरी रोड, गौसला मार्केट, जशान कॉम्प्लेक्स के पास स्थित है। रेस्तरां सुबह आठ बजे से रात दस बजे तक खुला रहता है, और सप्ताहांत पर सुबह दस बजे से रात साढ़े ग्यारह बजे तक। टेबल बुकिंग या किसी भी सवाल के लिए, नौ आठ एक तीन नौ — पांच चार तीन नौ नौ पर कॉल करें, या नीचे फॉर्म से मैसेज भेजें। धन्यवाद!",
  },
];

const NO_SPEECH_MSG = "आपका ब्राउज़र आवाज़ सपोर्ट नहीं करता। टूर बिना आवाज़ के जारी रहेगा।";

function supportsSpeechSynthesis() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function pickHindiVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const normalize = (lang: string) => lang.toLowerCase().replace("_", "-");
  return (
    voices.find((v) => normalize(v.lang) === "hi-in" && v.localService) ||
    voices.find((v) => normalize(v.lang) === "hi-in") ||
    voices.find((v) => normalize(v.lang).startsWith("hi")) ||
    voices.find((v) => normalize(v.lang) === "en-in") ||
    null
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [loading, setLoading] = useState(false);

  // Tour state
  const [tourActive, setTourActive] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [noSpeech, setNoSpeech] = useState(false);

  const [, setLocation] = useLocation();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const speakingIdRef = useRef(0);
  const busyRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const tourActiveRef = useRef(false);
  const indexRef = useRef(0);
  const isPausedRef = useRef(false);

  useEffect(() => {
    tourActiveRef.current = tourActive;
    indexRef.current = tourIndex;
    isPausedRef.current = isPaused;
  }, [tourActive, tourIndex, isPaused]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Preload voices (Chrome loads them asynchronously).
  useEffect(() => {
    const load = () => {
      if (supportsSpeechSynthesis()) {
        voicesRef.current = window.speechSynthesis.getVoices();
      }
    };
    load();
    if (!supportsSpeechSynthesis()) {
      return;
    }
    const synth = window.speechSynthesis;
    synth.addEventListener("voiceschanged", load);
    return () => synth.removeEventListener("voiceschanged", load);
  }, []);

  // Stop everything on unmount.
  useEffect(() => {
    return () => {
      clearTimer();
      if (supportsSpeechSynthesis()) {
        speakingIdRef.current += 1;
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function clearTimer() {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function speakFor(index: number) {
    const stop = TOUR_STOPS[index];
    if (!stop) return;
    clearTimer();

    if (!supportsSpeechSynthesis()) {
      scheduleFallback(index);
      return;
    }

    const synth = window.speechSynthesis;
    const id = ++speakingIdRef.current;
    synth.cancel();
    timerRef.current = window.setTimeout(() => {
      if (speakingIdRef.current !== id) return;
      const utterance = new SpeechSynthesisUtterance(stop.script);
      const voice = pickHindiVoice(voicesRef.current);
      if (voice) utterance.voice = voice;
      utterance.lang = voice ? voice.lang : "hi-IN";
      utterance.rate = 0.92;
      utterance.pitch = 1.02;
      utterance.volume = 1;
      utterance.onend = () => {
        if (speakingIdRef.current !== id) return;
        clearTimer();
        timerRef.current = window.setTimeout(() => advance(), 900);
      };
      utterance.onerror = (event) => {
        if (speakingIdRef.current !== id) return;
        if (event.error === "interrupted" || event.error === "canceled") return;
        scheduleFallback(index);
      };
      try {
        synth.speak(utterance);
      } catch {
        scheduleFallback(index);
      }
    }, 90);
  }

  function scheduleFallback(index: number) {
    const stop = TOUR_STOPS[index];
    if (!stop) return;
    clearTimer();
    const duration = Math.max(4000, stop.script.length * 85 + 3000);
    timerRef.current = window.setTimeout(() => {
      const next = index + 1;
      if (next < TOUR_STOPS.length) {
        setTourIndex(next);
        setLocation(TOUR_STOPS[next].path);
      } else {
        finishTour();
      }
    }, duration);
  }

  function advance() {
    if (busyRef.current || !tourActiveRef.current) return;
    busyRef.current = true;
    clearTimer();
    if (supportsSpeechSynthesis()) {
      speakingIdRef.current += 1;
      window.speechSynthesis.cancel();
    }
    setIsPaused(false);
    const next = indexRef.current + 1;
    if (next < TOUR_STOPS.length) {
      setTourIndex(next);
      setLocation(TOUR_STOPS[next].path);
    } else {
      finishTour();
    }
    window.setTimeout(() => {
      busyRef.current = false;
    }, 350);
  }

  function finishTour() {
    clearTimer();
    if (supportsSpeechSynthesis()) {
      speakingIdRef.current += 1;
      window.speechSynthesis.cancel();
    }
    setTourActive(false);
    setTourIndex(0);
    setIsPaused(false);
    setNoSpeech(false);
  }

  function startTour() {
    if (tourActiveRef.current) return;
    busyRef.current = true;
    setNoSpeech(!supportsSpeechSynthesis());
    setOpen(false);
    clearTimer();
    if (supportsSpeechSynthesis()) {
      speakingIdRef.current += 1;
      window.speechSynthesis.cancel();
    }
    setTourActive(true);
    setTourIndex(0);
    setIsPaused(false);
    setLocation("/");
    window.setTimeout(() => {
      busyRef.current = false;
    }, 350);
  }

  function togglePause() {
    if (!tourActiveRef.current || noSpeech) return;
    if (isPausedRef.current) {
      const synth = window.speechSynthesis;
      if (synth.paused) synth.resume();
      else if (synth.speaking || synth.pending) speakFor(indexRef.current);
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }

  // Speak each section after its page has rendered.
  useEffect(() => {
    if (!tourActive) return;
    const index = tourIndex;
    const timeout = window.setTimeout(() => {
      if (tourActiveRef.current) speakFor(index);
    }, 500);
    return () => window.clearTimeout(timeout);
  }, [tourActive, tourIndex]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    const userMessage: ChatMessage = { role: "user", content: question };
    const history = messages.slice(-6);
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history }),
      });
      const data = (await response.json()) as { answer?: string; error?: string };
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.answer ??
            data.error ??
            "Please call +91 98139 54399 for assistance.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "The assistant is temporarily unavailable. Please call +91 98139 54399.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const tourStop = TOUR_STOPS[tourIndex];

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[60]">
        {open && (
          <section
            aria-label="Nirmal restaurant assistant"
            className="mb-3 flex h-[min(560px,calc(100vh-120px))] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-[#e7d7bf] bg-[#fffaf4] shadow-2xl"
          >
            <header className="flex items-center justify-between bg-[#8B1A1A] px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5C842] text-[#8B1A1A]">
                  <Bot className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-serif text-lg font-bold">Nirmal Assistant</h2>
                  <p className="text-xs text-white/70">Restaurant & Party Hall</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 transition-colors hover:bg-white/15"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {/* Website tour launcher */}
            <div className="mt-3 px-3">
              <button
                type="button"
                onClick={startTour}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F5C842] px-4 py-2.5 text-sm font-bold text-[#8B1A1A] shadow-sm transition-colors hover:bg-[#f0bb2f]"
              >
                <Volume2 className="h-4 w-4" />
                वेबसाइट टूर लें
              </button>
              <p className="mt-1.5 text-center text-[10px] text-[#9d9187]">
                आवाज़ के साथ पूरी वेबसाइट की सैर करें
              </p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "rounded-br-sm bg-[#8B1A1A] text-white"
                        : "rounded-bl-sm border border-[#eadbc8] bg-white text-[#3b302a]"
                    }`}
                  >
                    {message.content}
                  </p>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm border border-[#eadbc8] bg-white px-4 py-3 text-[#8B1A1A]">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t border-[#eadbc8] bg-white p-3">
              <div className="flex items-center gap-2 rounded-xl border border-[#ddcbb5] bg-[#fffaf4] px-3 py-1.5 focus-within:ring-2 focus-within:ring-[#F5C842]">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about our restaurant..."
                  maxLength={500}
                  aria-label="Ask the restaurant assistant"
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-[#2c2c2c] outline-none placeholder:text-[#9d9187]"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8B1A1A] text-white transition-colors hover:bg-[#6f1111] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-[#9d9187]">
                Ask only about Nirmal Restaurant & Party Hall
              </p>
            </form>
          </section>
        )}

        {/* AI assistant toggle button — robot icon with a soft pulse glow */}
        <div className="relative ml-auto flex items-center justify-center">
          {!open && (
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-[#F5C842]/40"
              animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0, 0.55] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <button
            type="button"
            aria-label={open ? "Close restaurant assistant" : "Open restaurant assistant"}
            onClick={() => setOpen((current) => !current)}
            className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#8B1A1A] text-white shadow-xl ring-4 ring-[#F5C842]/40 transition-all hover:scale-105 hover:bg-[#6f1111]"
          >
            {open ? <X className="h-6 w-6" /> : <Bot className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Voice tour caption + controls */}
      {tourActive && tourStop && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 left-4 right-20 z-[120] sm:left-1/2 sm:right-auto sm:w-[430px] sm:-translate-x-1/2"
        >
          <div className="overflow-hidden rounded-2xl border border-[#e7d7bf] bg-[#fffaf4] shadow-2xl">
            <div
              className="h-1 bg-[#F5C842] transition-all duration-500"
              style={{ width: `${((tourIndex + 1) / TOUR_STOPS.length) * 100}%` }}
            />
            <div className="flex items-center justify-between gap-2 bg-[#8B1A1A] px-4 py-2.5 text-white">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Volume2 className="h-4 w-4 text-[#F5C842]" />
                <span>वेबसाइट टूर</span>
                <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs tabular-nums">
                  {tourIndex + 1} of {TOUR_STOPS.length}
                </span>
              </div>
              <button
                type="button"
                onClick={finishTour}
                aria-label="Stop tour"
                className="rounded-full p-1.5 transition-colors hover:bg-white/15"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="px-4 py-3">
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#8B1A1A]">
                {tourStop.title}
              </p>
              <p aria-live="assertive" className="text-sm leading-relaxed text-[#3b302a]">
                {tourStop.script}
              </p>
              {noSpeech && <p className="mt-2 text-xs text-[#9d9187]">{NO_SPEECH_MSG}</p>}
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-[#eadbc8] bg-white px-3 py-2">
              <button
                type="button"
                onClick={togglePause}
                disabled={noSpeech}
                aria-label={isPaused ? "Play tour narration" : "Pause tour narration"}
                className="flex items-center gap-2 rounded-lg border border-[#ddcbb5] px-3 py-1.5 text-sm font-medium text-[#8B1A1A] transition-colors hover:bg-[#fff7e0] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                {isPaused ? "चलाएं" : "रोकें"}
              </button>
              <button
                type="button"
                onClick={advance}
                aria-label={tourIndex >= TOUR_STOPS.length - 1 ? "Finish tour" : "Next stop"}
                className="flex items-center gap-2 rounded-lg bg-[#8B1A1A] px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#6f1111]"
              >
                <SkipForward className="h-4 w-4" />
                {tourIndex >= TOUR_STOPS.length - 1 ? "समाप्त करें" : "अगला"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}