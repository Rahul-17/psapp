// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
 
// Mock matchMedia
window.matchMedia = window.matchMedia || function(query: string): MediaQueryList {
  return {
    matches: false,
    media: query,
    onchange: null,
    // Implementation for adding listeners
    addListener(listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any): void {      
    },
    // Implementation for removing listeners
    removeListener(listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any): void {      
    },
    // Implementation for adding event listeners
    addEventListener: function<K extends keyof MediaQueryListEventMap>(
      type: K,
      listener: (this: MediaQueryList, ev: MediaQueryListEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions
    ): void {
      
    },
    // Implementation for removing event listeners
    removeEventListener: function<K extends keyof MediaQueryListEventMap>(
      type: K,
      listener: (this: MediaQueryList, ev: MediaQueryListEventMap[K]) => any,
      options?: boolean | EventListenerOptions
    ): void {
      
    },
    dispatchEvent: function(event: Event): boolean {
      return false;
    }
  } as MediaQueryList;
};
