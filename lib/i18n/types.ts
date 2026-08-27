import { en } from "./en";

/** The English dictionary is the shape of record; every other locale is
 * type-checked structurally against it. */
export type Dictionary = typeof en;
