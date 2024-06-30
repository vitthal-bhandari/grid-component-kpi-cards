This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It uses the following libraries/frameworks -
- **Material UI** for reusable components
- **Tailwind CSS** for styling, and 
- **Recharts** for displaying time series data.

This assignment aims to show a simple grid-based component for displaying data on KPI cards, fetched from the Sundial endpoints.

![Screenshot of the UI built for KPI cards grid component.](https://github.com/vitthal-bhandari/grid-component-kpi-cards/blob/master/assets/images/UI_screenshot.png)


## Features

The UI offers simple features as explained below - 
1. Each KPI Card offers the user to choose between a list of available **Metrics** and **Segments**. Metrics and Segments are fetched from endpoints [sundial-fe-interview.vercel.app/api/metrics](https://sundial-fe-interview.vercel.app/api/metrics) and [sundial-fe-interview.vercel.app/api/segments](https://sundial-fe-interview.vercel.app/api/segments) respectively.
2. Corresponding the chosen Metric and Segment, the card displays a graph of the data from last 28 days.
3. Each card has 2 modes - a view mode corresponding to point 2 and an edit mode corresponding to point 1. User can switch from view mode to edit mode by simply clicking anywhere on a card.
4. A row can accommodate a maximum of 3 cards. However cards less than 3 equally divide/take up the entire available width of the container.
5. There are plus icons on either side of a card to enable user to add a new card to that particular position.

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
