export {}

declare global {
  interface Window {
    // Chatbase is a dynamic widget that provides an API via window.chatbase
    // We keep this as `any` because the embed generates runtime methods.
    chatbase?: any
  }
}
