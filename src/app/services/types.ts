import { z } from 'zod';

export const LocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
});

export const WaypointEntriesSchema = z.object({
  locations: LocationSchema.array(),
  distances: z.tuple([z.string(), z.number()]).array(),
  waypoints: z.tuple([z.string(), z.string().array()]).array(),
});

export const ExportV1Schema = WaypointEntriesSchema.extend({
  Fahrtenaberechnung_Version: z.literal('v20180930'),
});
