# Vercel Production Domain Configuration: akmediaindia.com

This document outlines the exact, step-by-step DNS configuration required to connect the client's existing domain **akmediaindia.com** to the **Vercel Production Deployment** of this project.

---

## 1. Architecture & Routing Overview

```
[ Visitor / Browser ]
         │
         ▼
[ DNS Resolution (Hostinger / GoDaddy) ]
    ├─ akmediaindia.com (A Record)        ──► 76.76.21.21 (Vercel Anycast Edge)
    └─ www.akmediaindia.com (CNAME Record)──► cname.vercel-dns.com (Vercel Edge)
         │
         ▼
[ Vercel Global Edge Network ]
         │
         ▼
[ Production Deployment (Next.js App) ]
```

- **Environment:** `Production` (Branch: `main`)
- **Apex Domain:** `akmediaindia.com`
- **Subdomain:** `www.akmediaindia.com`
- **SSL / TLS:** Managed automatically by Vercel via Let's Encrypt once DNS records resolve.

---

## 2. Vercel Dashboard Configuration (Developer Setup)

Before or immediately after the client applies the DNS records, add the domains in the Vercel Project Dashboard:

1. Go to **Vercel Dashboard** → Select the project (`akmedia`).
2. Navigate to **Settings** → **Domains**.
3. In the input field, enter: `akmediaindia.com` and click **Add**.
4. When prompted by Vercel:
   - Select **"Add `akmediaindia.com` and redirect `www.akmediaindia.com` to it"** (Recommended for SEO and canonical URL standardization).
   - Ensure the Target Environment is set to **Production** (Branch: `main`).
   - Do **NOT** set it as a redirect to Preview or Custom Environment.
5. Vercel will now show the domain status as **"Validating Configuration"** / **"Invalid Configuration"** until the client adds the DNS records below.

---

## 3. Required DNS Records (To be Added by Domain Owner)

The client/domain owner must add the following **exact** DNS records in their DNS management panel (currently hosted with Hostinger nameservers `ns1.dns-parking.com` / `ns2.dns-parking.com`):

### Record 1: Apex / Root Domain (`akmediaindia.com`)

| Field | Value |
| :--- | :--- |
| **Record Type** | `A` |
| **Name / Host** | `@` *(leave blank if the provider doesn't accept `@`)* |
| **Value / Target** | `76.76.21.21` |
| **TTL** | `3600` (or 1 Hour / Automatic) |
| **Purpose** | Points the root domain (`akmediaindia.com`) directly to Vercel's global Anycast Edge Network for the Production deployment. |

### Record 2: Subdomain (`www.akmediaindia.com`)

| Field | Value |
| :--- | :--- |
| **Record Type** | `CNAME` |
| **Name / Host** | `www` |
| **Value / Target** | `cname.vercel-dns.com` |
| **TTL** | `3600` (or 1 Hour / Automatic) |
| **Purpose** | Routes traffic from `www.akmediaindia.com` to Vercel's Anycast CNAME edge handler for automatic SSL generation and routing to the production app. |

---

## 4. Optional DNS Ownership Verification (Only If Prompted by Vercel)

If the domain was previously associated with another Vercel account or requires verification, Vercel will display a verification prompt in the dashboard:

| Field | Value |
| :--- | :--- |
| **Record Type** | `TXT` |
| **Name / Host** | `_vercel` |
| **Value / Target** | `vc-domain-verify=akmediaindia.com,<verification-code>` *(from Vercel dashboard)* |
| **TTL** | `60` or `3600` |
| **Purpose** | Proves domain ownership to Vercel without transferring nameservers. |

*(Note: If Vercel does not ask for TXT verification, this record is NOT needed).*

---

## 5. Existing Records: What to Keep vs. What to Modify

### ⚠️ DO NOT DELETE OR MODIFY (Crucial Services):
The client currently has active business email running on this domain. Deleting or modifying these will **break their emails immediately**:

1. **MX Records (Email Receiving):**
   - `mx1.hostinger.com` (Priority 5) — **KEEP TOUCHLESS**
   - `mx2.hostinger.com` (Priority 10) — **KEEP TOUCHLESS**
2. **TXT Records (Email Deliverability / SPF):**
   - `v=spf1 include:_spf.mail.hostinger.com ~all` — **KEEP TOUCHLESS**
   - Any DKIM, DMARC (`_dmarc`), or Google/Microsoft verification TXT records — **KEEP TOUCHLESS**
3. **Nameservers:**
   - Do **NOT** change the nameservers (`ns1.dns-parking.com`, `ns2.dns-parking.com`). Keep the existing DNS manager.

### 🔄 WHAT TO EDIT / REPLACE (Web Traffic Only):
1. **Existing Root A Record:**
   - Current value: `145.223.17.60`
   - **Action:** Replace this IP with `76.76.21.21` (or delete the old `145.223.17.60` and add the new one).
2. **Existing Root AAAA Record (IPv6):**
   - Current value: `2a02:4780:11:1841:0:f08:dec4:2`
   - **Action:** **Delete or Disable this AAAA record.** Vercel Anycast routing for apex domains uses the IPv4 A record (`76.76.21.21`). Leaving the old Hostinger IPv6 AAAA record will cause IPv6 visitors to hit the old server instead of Vercel.
3. **Existing WWW CNAME Record:**
   - Current value: points internally to `akmediaindia.com`
   - **Action:** Update the Target/Value to `cname.vercel-dns.com`.

---

## 6. WWW Handling: CNAME vs Redirect Explained

- **At the DNS Level:** `www.akmediaindia.com` **must be configured as a CNAME record** pointing to `cname.vercel-dns.com`. DNS does not support HTTP redirects natively.
- **At the Vercel Level:** Once traffic reaches Vercel via the CNAME, Vercel performs an automated **HTTP 308 Permanent Redirect** from `www.akmediaindia.com` to `akmediaindia.com` (or serves it seamlessly as an alias).
  - This ensures that visitors entering either `akmediaindia.com` or `www.akmediaindia.com` reach the exact same Production site.
  - It preserves SEO rank by avoiding duplicate content penalties.

---

## 7. Verification & Propagation Timeline

1. **DNS Propagation:** DNS changes usually update within 5 to 30 minutes, though global propagation can take up to 24–48 hours depending on TTL.
2. **SSL Certificate Issuance:** As soon as Vercel detects that `76.76.21.21` and `cname.vercel-dns.com` are resolving, Vercel automatically generates and installs a free Let's Encrypt SSL/TLS certificate.
3. **Status Check:** In Vercel Project Settings → Domains, a blue/green checkmark with **"Valid Configuration"** will appear once connected.

---

## 8. Client Instructions (Ready to Copy & Paste)

Send the following message directly to the client or their domain manager:

```markdown
Hi Team,

We are ready to connect our new website deployment to your domain (akmediaindia.com). 

Please log in to your DNS provider (e.g. Hostinger, GoDaddy, or Cloudflare) and make the following updates in your DNS Management settings.

IMPORTANT NOTE:
Please DO NOT touch or delete your MX records (mx1.hostinger.com, mx2.hostinger.com) or your SPF TXT records. Those handle your business emails and must remain untouched.

Here are the 2 DNS records to update for the website:

1. Root Domain (akmediaindia.com):
   - Record Type: A
   - Name / Host: @ (or leave blank if your provider does not use @)
   - Value / Points to: 76.76.21.21
   - TTL: 3600 (or 1 hour / Automatic)
   *(Note: Please replace or remove the old IP 145.223.17.60 and remove any existing AAAA record for @ so there is no conflict).*

2. WWW Subdomain (www.akmediaindia.com):
   - Record Type: CNAME
   - Name / Host: www
   - Value / Points to: cname.vercel-dns.com
   - TTL: 3600 (or 1 hour / Automatic)

Once these two records are saved, please let us know. It usually takes 15–30 minutes for DNS to propagate, after which our secure SSL certificate will activate automatically.

Thank you!
```
