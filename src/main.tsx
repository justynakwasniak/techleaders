import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./components/context/AuthContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
      <AuthProvider>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
      </AuthProvider>

);
