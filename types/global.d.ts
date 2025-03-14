declare module '#app' {
  interface NuxtApp {
    $bus: {
      $emit: (event: string, ...args: any[]) => void;
      $on: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}

export {};
