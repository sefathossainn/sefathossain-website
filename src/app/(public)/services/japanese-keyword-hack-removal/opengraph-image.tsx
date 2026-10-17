import { serviceOgImage, OG_SIZE } from "@/lib/og-service";

export const alt = "Sefat Hossain — WordPress security service";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return serviceOgImage("/services/japanese-keyword-hack-removal");
}
