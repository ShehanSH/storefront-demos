# Storefront Demos

Generic, sellable website demos cloned from the Hot Bread restaurant app idea — **no Hot Bread branding, no database**.

Four client-ready storefronts live in one Vercel project:

| Demo | URL | What it shows |
|---|---|---|
| Restaurant | `/restaurant` | Menu, cart, pickup/delivery, kitchen-style admin |
| Clothing | `/clothing` | Shop, sizes, checkout, sales admin |
| Tech store | `/tech` | Phones and laptops, checkout, sales admin |
| Salon | `/salon` | Services, appointment booking, appointment admin |

Hub: `/`  
SMS tool: `/studio/sms`

All catalogues, orders, and customers are static sample data.

## Run locally

```bash
cd c:\storefront-demos
npm install
copy .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## SMS (smsgateway.lk)

Set in `.env.local` and in Vercel:

```
NEXT_PUBLIC_SITE_URL=https://your-demo.vercel.app
NEXT_PUBLIC_SALES_PHONE=0766650952
SMS_API_URL=https://app.smsgateway.lk/api/v3/sms/send
SMS_API_KEY=your_token
SMS_SENDER_ID=your_sender
```

If the API key is empty, the form still works in **preview mode** and does not charge credits.

**SMS 1** — shop offer + demo link  
**SMS 2** — “contact us on 0766650952”

If smsgateway.lk gives you a different send URL, paste it into `SMS_API_URL`. The body matches the usual Sri Lankan gateway format (`recipient`, `sender_id`, `type`, `message`).

## Deploy on Vercel

1. Import the `storefront-demos` folder as a new Vercel project (or `npx vercel`).
2. Add the environment variables above.
3. After deploy, put the live URL in `NEXT_PUBLIC_SITE_URL` so SMS links are correct.

Share these links with a client:

- `https://your-demo.vercel.app/restaurant`
- `https://your-demo.vercel.app/clothing`
- `https://your-demo.vercel.app/tech`
- `https://your-demo.vercel.app/salon`
