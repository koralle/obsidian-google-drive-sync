import z from "zod";

export const versionSchema = z.string().brand("version");
export type Version = z.infer<typeof versionSchema>;

export const minAppVersionSchema = versionSchema.brand("minAppVersion");
export type MinAppVersion = z.infer<typeof minAppVersionSchema>;

export const manifestSchema = z.object({
  author: z.string(),
  minAppVersion: minAppVersionSchema,
  name: z.string(),
  version: versionSchema,
  authorUrl: z.string().nullable(),
  fundingUrl: z.string().nullable(),
});

export type Manifest = z.infer<typeof manifestSchema>;

export const versionsSchema = z.record(versionSchema, versionSchema);

export type Versions = z.infer<typeof versionsSchema>;
