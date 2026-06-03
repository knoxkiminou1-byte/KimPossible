declare module "react-helmet" {
  import type { ComponentType, ReactNode } from "react";

  export const Helmet: ComponentType<{ children?: ReactNode }>;
}
