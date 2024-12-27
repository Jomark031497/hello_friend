type ClassValue = string | number | boolean | undefined | null;

export function clsx(...classes: ClassValue[]): string {
  return classes.filter((value) => typeof value === "string" || typeof value === "number").join(" ");
}
