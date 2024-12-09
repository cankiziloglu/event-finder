
import { SearchParamsType } from '@/lib/types';
import { EventResults } from './event-results';
import { FilterDropdown } from './filter-dropdown';
import Image from 'next/image';

export default function EventsPage({ searchParams }: { searchParams: SearchParamsType }) {
  return (
    <main className='flex flex-col'>
      <section className="relative top-[-4rem] z-10 h-[20vh] flex place-items-end justify-center py-8 px-2">
        <Image
          src="/hero-background.jpg"
          alt="Events in Turkey"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative z-10 text-3xl lg:text-4xl font-bold text-white text-center">
          { searchParams.city && searchParams.category ? `${searchParams.category} Events in ${searchParams.city}` : 'Events in Turkey' }
        </h1>
      </section>
        <section className='container px-2 md:px-4 -mt-4'>
          <FilterDropdown />
        </section>
      <section className='container px-2 md:px-4 -mt-4'>
        <EventResults searchParams={searchParams} />
      </section>
    </main>
  );
}
