---
name: AI integration security
description: Durable handling rule for third-party AI provider credentials.
---

Provider API keys must be stored as Replit Secrets and read only by the server. Client-side chat requests should call the app's own backend endpoint, which applies the product-scope guard before contacting the provider.

**Why:** A key pasted into chat or bundled into frontend JavaScript can be copied and abused by anyone who can view the conversation or website.

**How to apply:** When adding or changing an AI provider, request the credential through the secure secrets flow, use a server-only environment variable, and advise rotating any credential that was previously pasted into chat.