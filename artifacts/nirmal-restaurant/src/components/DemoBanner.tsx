export default function DemoBanner() {
  return (
    <div className="relative w-full bg-primary text-white border-b border-black/20 px-3 py-1.5 text-center">
      <p
        className="text-sm leading-snug"
        style={{ fontFamily: "'Lato', 'Mukta', 'Noto Sans Devanagari', 'Segoe UI', sans-serif" }}
      >
        यह एक डेमो वेबसाइट है जो सिर्फ प्रैक्टिस के लिए बनाई गई है, ये निर्मल
        रेस्टोरेंट एंड पार्टी हॉल की असली वेबसाइट नहीं है।
      </p>
    </div>
  );
}