export type ToLower = {
  (value: string): string;
  (value: string[]): string[];
}

export type UseLocationEffect = {
  (path: string[], handler: () => void, waitForExitComplete?: boolean): void;
  (path: string, handler: () => void, waitForExitComplete?: boolean): void;
};
