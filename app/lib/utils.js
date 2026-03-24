import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Safely merge Tailwind + conditional classNames
 * Does NOT affect components that don't use it
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
