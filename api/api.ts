import { ApiDataType, EventType, PaginationType, SearchParamsType } from '@/lib/types';
import cities from './cities.json';
import classifications from './classifications.json';
import { format } from 'date-fns';

export function getCities(filter?: string) {
  const lowerFilter = filter?.toLocaleLowerCase();
  if (lowerFilter)
    return cities
      .filter(({ name }) => name.toLocaleLowerCase().startsWith(lowerFilter))
      .map(({ name, id }) => ({
        value: id,
        label: `${name}`,
      }));
  else
    return cities.map(({ name, id }) => ({
      value: id,
      label: `${name}`,
    }));
}

export const categoryList = classifications._embedded.classifications
  .filter((item) => item?.segment) // Filter out items without segment
  .map((item) => ({
    id: item.segment!.id,
    name: item.segment!.name,
  }));

export const categories = [
  { value: 'KZFzniwnSyZfZ7v7nJ', label: 'Music' },
  { value: 'KZFzniwnSyZfZ7v7nE', label: 'Sports' },
  { value: 'KZFzniwnSyZfZ7v7na', label: 'Arts & Theatre' },
  { value: 'KZFzniwnSyZfZ7v7nn', label: 'Film' },
  { value: 'KZFzniwnSyZfZ7v7n1,KZFzniwnSyZfZ7v7nl', label: 'Other' },
];

export async function fetchEventsAPI(params: SearchParamsType) {
  const { city, category, startDateTime, endDateTime, page } = await params;
  let url = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=TR&apikey=${process.env.TM_API_KEY}`;
  if (city) url += `&city=${city}`;
  if (category) url += `&classificationId=${category}`;
  if (startDateTime)
    url += `&startDateTime=${format(new Date(startDateTime), "yyyy-MM-dd'T'HH:mm:ss'Z'")}`;
  if (endDateTime)
    url += `&endDateTime=${format(new Date(endDateTime), "yyyy-MM-dd'T'HH:mm:ss'Z'")}`;
  if (page) url += `&page=${page}`;
  if (!page) url += `&page=0`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data._embedded || !data._embedded.events) {
    return [];
  }

  const events: EventType[] = data._embedded?.events?.map(
    (event: ApiDataType) => ({
      id: event.id,
      name: event.name,
      url: event.url,
      images: event.images.map((image: { url: string }) => image.url),
      date: {
        localDate: event.dates.start.localDate,
        localTime: event.dates.start.localTime,
      },
      segment: {
        id: event.classifications[0]?.segment?.id || '',
        name: event.classifications[0]?.segment?.name || '',
      },
      genre: {
        id: event.classifications[0]?.genre?.id || '',
        name: event.classifications[0]?.genre?.name || '',
      },
      venue: event._embedded.venues[0]?.name || '',
      city: event._embedded.venues[0]?.city?.name || '',
      address: event._embedded.venues[0]?.address?.line1 || '',
      attractions:
        event._embedded.attractions?.map((attraction) => ({
          id: attraction.id,
          name: attraction.name,
          images: attraction.images.map((image: { url: string }) => image.url),
        })) || [],
    })
  );

  const pagination: PaginationType = {
    totalElements: data.page.totalElements,
    totalPages: data.page.totalPages,
    currentPage: data.page.number,
  };

  return { events, pagination };
}

export async function fetchEventById(id: string) {
  const url = `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=${process.env.TM_API_KEY}`;
  
  const response = await fetch(url);
  const event: ApiDataType = await response.json();
  
  if (!event) {
    return null;
  }

  return {
    id: event.id,
    name: event.name,
    url: event.url,
    images: event.images.map((image: { url: string }) => image.url),
    date: {
      localDate: event.dates.start.localDate,
      localTime: event.dates.start.localTime,
    },
    segment: {
      id: event.classifications[0]?.segment?.id || '',
      name: event.classifications[0]?.segment?.name || '',
    },
    genre: {
      id: event.classifications[0]?.genre?.id || '',
      name: event.classifications[0]?.genre?.name || '',
    },
    venue: event._embedded.venues[0]?.name || '',
    city: event._embedded.venues[0]?.city?.name || '',
    address: event._embedded.venues[0]?.address?.line1 || '',
    attractions: event._embedded.attractions?.map((attraction) => ({
      id: attraction.id,
      name: attraction.name,
      images: attraction.images.map((image: { url: string }) => image.url),
    })) || [],
  };
}
