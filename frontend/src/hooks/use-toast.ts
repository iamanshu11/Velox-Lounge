"use client";
import * as React from "react";
import type { ToastProps } from "@/components/ui/toast";

type ToasterToast = ToastProps & { id: string; title?: React.ReactNode; description?: React.ReactNode };
type Action =
  | { type: "ADD";    toast: ToasterToast }
  | { type: "DISMISS"; toastId?: string }
  | { type: "REMOVE";  toastId?: string };
interface State { toasts: ToasterToast[] }

let count = 0;
const genId = () => (++count).toString();
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
const listeners: Array<(s: State) => void> = [];
let memoryState: State = { toasts: [] };

function addToRemoveQueue(id: string) {
  if (toastTimeouts.has(id)) return;
  const t = setTimeout(() => { toastTimeouts.delete(id); dispatch({ type: "REMOVE", toastId: id }); }, 4000);
  toastTimeouts.set(id, t);
}

function reducer(state: State, action: Action): State {
  if (action.type === "ADD")     return { toasts: [action.toast, ...state.toasts].slice(0, 5) };
  if (action.type === "DISMISS") {
    (action.toastId ? [action.toastId] : state.toasts.map(t => t.id)).forEach(addToRemoveQueue);
    return { toasts: state.toasts.map(t => t.id === action.toastId || !action.toastId ? { ...t, open: false } : t) };
  }
  if (action.type === "REMOVE")  return { toasts: action.toastId ? state.toasts.filter(t => t.id !== action.toastId) : [] };
  return state;
}

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach(l => l(memoryState));
}

export function toast(props: Omit<ToasterToast, "id">) {
  const id = genId();
  dispatch({ type: "ADD", toast: { ...props, id, open: true, onOpenChange: (open) => { if (!open) dispatch({ type: "DISMISS", toastId: id }); } } });
  return { id, dismiss: () => dispatch({ type: "DISMISS", toastId: id }) };
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => { const i = listeners.indexOf(setState); if (i > -1) listeners.splice(i, 1); };
  }, []);
  return { ...state, toast, dismiss: (id?: string) => dispatch({ type: "DISMISS", toastId: id }) };
}
