# Seefast Frontend

Modern Next.js dashboard for AI-powered data visualization.

## Features

- 🎨 **Dynamic Canvas** - Grid-based widget layout
- 💬 **Chat Interface** - Natural language queries
- 📊 **Rich Widgets** - Tables, Charts, Metrics
- ⚡ **Real-time** - Instant visualization updates
- 🎯 **Responsive** - Desktop and mobile

## Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **react-grid-layout** - Widget grid
- **Recharts** - Charts

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

App runs at http://localhost:3000

## Project Structure

```
src/
├── app/
│   ├── page.tsx         # Main dashboard
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Global styles
├── components/
│   ├── Canvas.tsx       # Widget grid
│   ├── ChatBox.tsx      # Input component
│   └── widgets/
│       ├── Table.tsx
│       ├── BarChart.tsx
│       ├── LineChart.tsx
│       ├── PieChart.tsx
│       └── MetricCard.tsx
└── lib/
    └── api.ts           # Backend API client
```

## Widget Types

| Component | Use Case |
|-----------|----------|
| `Table` | Tabular data, lists |
| `BarChart` | Comparisons |
| `LineChart` | Trends over time |
| `PieChart` | Distribution |
| `MetricCard` | KPIs, single values |

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Design

- **Dot pattern** background
- **Glassmorphism** cards
- **Floating** chat input
- **Blue** accent color (#3b82f6)

## License

MIT
