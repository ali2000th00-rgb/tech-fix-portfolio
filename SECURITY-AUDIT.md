# TECH FIX — Security audit and rebuild notes

**Scope:** static HTML/CSS/JavaScript portfolio as delivered in this project. This is a source/configuration review plus repeatable local smoke checks (`scripts/security-smoke-test.py`), not a penetration test or an external deployment scan.

## Findings repaired

- **External executable dependency:** removed the remote Lucide CDN script and replaced it with `icons.js`, a local, dependency-free SVG icon renderer using constant icon paths and DOM APIs. No icon data is injected with `innerHTML`.
- **Third-party privacy/network dependency:** removed Google Fonts remote stylesheets. The design uses system font stacks, so normal page rendering no longer requires third-party requests.
- **Inline-style CSP exception:** replaced project-card meter style attributes and JS-injected transition-delay styles with fixed CSS classes. The deployed CSP can therefore deny inline scripts and styles.
- **Missing browser security headers:** added strict CSP, anti-framing, MIME sniffing protection, referrer/privacy policies, COOP/CORP, and HSTS examples for Netlify/Cloudflare Pages (`_headers`), Vercel (`vercel.json`), Apache (`.htaccess`), and Nginx (`nginx-security-headers.conf`). Configure only the file that matches your host; verify the real response headers after deployment.
- **Misleading sitemap:** removed the active `sitemap.xml` pointing at `example.com`; provided `sitemap.xml.template` and a `robots.txt` that does not advertise a fake domain.
- **Client-side field checks:** service selection is checked against the rendered allow-list; email/name/message lengths are bounded in JavaScript as well as HTML attributes; error descriptions are linked to form controls for assistive technology. Escape closes the mobile menu and restores focus; interactive reveal sections are exposed immediately on keyboard focus.
- **Progressive enhancement:** content stays visible when JavaScript or IntersectionObserver is unavailable. Theme preference storage is non-sensitive and guarded against storage failures.

## Remaining limits / required deployment actions

- This is a **static frontend**. The form opens a `mailto:` URL. It does not send/store requests on a server, so there is no server-side form endpoint to secure, no true server rate limiting, no server-side validation, and no reliable CAPTCHA/honeypot enforcement. If direct delivery is required, implement a separate backend or a reputable form service with server-side validation, rate limiting, spam controls, strict size limits, logging/privacy rules, and secret management.
- Browser validation can be bypassed by a visitor. This is acceptable for the current mailto-only flow but must never be treated as a security boundary for a future API/backend.
- Update GitHub/LinkedIn placeholders, verify the country code/WhatsApp number, set your real site domain, add canonical and absolute Open Graph image URL, and generate the production sitemap before launch.
- HSTS is included as a header for HTTPS deployment. Do not serve the site over plain HTTP in production. If your domain has subdomains with mixed HTTPS status, do not add `includeSubDomains` without checking first.
- The current project has no dependencies, secrets, authentication, database, API calls, uploads, cookies, or privileged browser capabilities.

## Deploy verification checklist

1. Deploy using one platform's header config (not all of them); enable HTTPS.
2. Inspect response headers for CSP and confirm there are no CSP violations in the browser console.
3. Confirm `script-src` and `style-src` do not include `'unsafe-inline'` or third-party origins.
4. Validate the page and accessibility on mobile, keyboard-only navigation, and with reduced motion enabled.
5. Test the form's allowed/invalid inputs and confirm it only launches the user's email client.
6. Add the production `sitemap.xml` after choosing the real domain; test it in search-console tooling.
