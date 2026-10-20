# Moving the site to a personal-name domain

Why: "mirkuztechnologies.com" sounds like a company. You are a student, not a registered
company, so a domain with your own name is more honest and easier for people to remember.

## 1. Pick and buy the domain (you do this yourself)

On 21 October 2026 these names had no DNS records, so they are probably free.
Check on the shop before you pay.

| Domain | Notes |
| --- | --- |
| **tameratgebeyehu.com** | Best choice. Full name, `.com` is the most trusted ending. |
| tamerat.dev | Short and good for a developer, but `.dev` only works with HTTPS (Vercel does this for you). |
| tameratgebeyehu.me | OK backup. |

`tamerat.com` is already taken.

You can buy it on Vercel itself (Project → Settings → Domains → Buy) or at Namecheap,
Cloudflare or Porkbun. A `.com` usually costs about 10–15 USD per year. Turn on auto-renew,
so you don't lose it.

## 2. Connect it in Vercel

1. Vercel → this project → **Settings → Domains → Add** → type `tameratgebeyehu.com`.
2. Also add `www.tameratgebeyehu.com` and let it redirect to `tameratgebeyehu.com`.
3. If you bought the domain outside Vercel, copy the DNS records that Vercel shows into your
   domain shop's DNS page. Wait until Vercel shows "Valid Configuration".

## 3. Redirect the old domain

Keep `mirkuztechnologies.com` for at least one year, so old links still work.

1. In **Settings → Domains**, click **Edit** on `mirkuztechnologies.com` and on
   `www.mirkuztechnologies.com`.
2. Choose **Redirect to** `tameratgebeyehu.com`, status **308 (permanent)**.
   Paths stay the same, for example `/book` → `tameratgebeyehu.com/book`.

## 4. Update links after the new domain works

- `public/sitemap.xml` and `public/robots.txt`: change `mirkuztechnologies.com` to the new domain.
- `index.html`: change the `"url"` in the JSON-LD block.
- Google Play developer page, LinkedIn, GitHub profile, Telegram bio, email signature,
  university applications and your DV / CV documents.
- In Google Search Console, add the new domain and use "Change of address".
