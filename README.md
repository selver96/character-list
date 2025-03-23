# Character Search App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## 📌 Running Unit Tests

This project uses **Jest** and **React Testing Library** for unit testing.

### 👥 Install Dependencies

If not installed, run:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

### ▶ Running Tests

To execute all unit tests, run:

```bash
npm test
```

or

```bash
yarn test
```

### 🧪 Testing Structure

- All unit tests are stored in `__tests__` or alongside components as `ComponentName.test.tsx`.
- Mocks are used for API calls and Next.js components like `next/image`.

### ✅ Example Unit Tests:

- `CharacterCard.test.tsx` - Tests the character card component rendering
- `useCharacters.test.ts` - Tests the custom hook for fetching character data
- `useDebounce.test.ts` - Tests the debounce hook functionality

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

---

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
