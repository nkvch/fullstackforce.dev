export const productsCopy = {
  hero: {
    title: "Meet InfoDot",
    subtitle: "The AI-Powered Solution That Transforms Healthcare Data Access",
    cta: {
      label: "See how it works",
      href: "#demo",
    },
  },
  problem: {
    title: "The Healthcare Challenge",
    subtitle: "Switching between systems and manually searching for data slows care and increases risk.",
    items: [
      {
        icon: "⏱️",
        title: "Time Wasted",
        body: "Healthcare professionals spend hours\nswitching between multiple systems\nto access patient data.",
      },
      {
        icon: "🔐",
        title: "Multiple Logins",
        body: "Logging into different platforms\ndisrupts workflow and reduces efficiency.",
      },
      {
        icon: "📋",
        title: "Fragmented Data",
        body: "Critical patient information\nscattered across systems creates blind spots.",
      },
      {
        icon: "😤",
        title: "User Frustration",
        body: "Complex interfaces and manual searches\nlead to errors and burnout.",
      },
    ],
  },
  solution: {
    title: "Introducing InfoDot",
    subtitle: "One Intelligent Interface. All Your Data. Zero Hassle.",
    body:
      "InfoDot is an AI-powered healthcare data interoperability platform that brings all patient information to your fingertips. No more switching systems. No more multiple logins. Just instant, intelligent access to the data you need, exactly when you need it.",
  },
  demo: {
    title: "How InfoDot Works in 6 Simple Steps",
    subtitle: "A fast, secure flow that fits into existing workflows without disruption.",
    steps: [
      { number: "1", icon: "🔐", title: "Secure Login", body: "Authenticate once with your credentials or Active Directory." },
      { number: "2", icon: "👁️", title: "Smart Monitoring", body: "InfoDot floats on your screen, automatically monitoring your active system." },
      { number: "3", icon: "🤖", title: "AI Recognition", body: "Advanced AI identifies patient IDs and relevant context from your screen." },
      { number: "4", icon: "⚡", title: "Instant Query", body: "Key information is sent to your BI system in milliseconds." },
      { number: "5", icon: "🗄️", title: "Data Aggregation", body: "All relevant patient data is gathered from multiple hospital systems." },
      { number: "6", icon: "✨", title: "Smart Display", body: "Summarized, role-specific information appears in a clean floating window." },
    ],
  },
  benefits: {
    title: "Transform Your Workflow",
    subtitle: "Built to reduce friction, improve accuracy, and keep clinicians focused on patient care.",
    items: [
      { icon: "⚡", title: "Save Time", body: "Eliminate hours of manual searching and system switching. Get instant access with zero effort." },
      { icon: "🎯", title: "Improve Accuracy", body: "Reduce errors with automated retrieval. AI helps ensure the right information at the right time." },
      { icon: "❤️", title: "Better Patient Care", body: "Make faster, more informed decisions with complete patient context across systems." },
      { icon: "🔒", title: "Stay Secure", body: "Enterprise-grade security with role-based access and audit trails for compliance." },
      { icon: "🔧", title: "Easy Integration", body: "Works with your existing systems. No disruption to workflows or expensive overhauls." },
      { icon: "📈", title: "Boost Productivity", body: "Free staff from tedious data hunting and focus attention where it matters most." },
    ],
  },
  stats: {
    title: "Results that Matter",
    subtitle: "A simple, measurable impact on time, effort, and access across sources.",
    items: [
      { value: "85%", label: "Time Saved" },
      { value: "100%", label: "Automated" },
      { value: "∞", label: "Data Sources" },
      { value: "0", label: "Extra Logins" },
    ],
  },
  cta: {
    title: "Ready to Transform Your Healthcare Data Access?",
    subtitle:
      "Join leading healthcare organizations already using InfoDot to streamline workflows and improve patient care.",
    primary: { label: "Request a Demo", href: "#contact" },
    secondary: { label: "Learn More", href: "#solution" },
  },
} as const;


