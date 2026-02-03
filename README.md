# Event Finder

Event Finder is a modern web application built with Next.js that helps users discover and track events in Turkiye.

To see the deployed version [click here](https://events.cgk.dev)

## Features

- Search and filter events by location, date, and category
- See event details and link to the ticketing site
- Responsive design for optimal viewing on all devices
- Dark/light theme support

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **API**: Ticketmaster API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/cankiziloglu/event-finder.git
cd event-finder
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory and add the following variables:

```
TM_API_KEY=your-Ticketmaster-API-key
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE Version 3 - see the LICENSE file for details.
