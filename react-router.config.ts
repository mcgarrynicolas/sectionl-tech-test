import type { Config } from "@react-router/dev/config";
import { getPropertyData } from "./app/utils/requests/properties";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  async prerender({ getStaticPaths }) {
    let properties = await getPropertyData();

    return [
      ...getStaticPaths(),
      ...properties.map((p) => `/properties/${p.slug}`)
    ]
  }
} satisfies Config;
