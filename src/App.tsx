// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "@/context/AuthContext";
// import { CartProvider } from "@/context/CartContext";
// import Index from "./pages/Index";
// import Products from "./pages/Products";
// import ProductDetails from "./pages/ProductDetails";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Dashboard from "./pages/Dashboard";
// import Impact from "./pages/Impact";
// import ProtectedRoute from "./components/ProtectedRoute";
// import NotFound from "./pages/NotFound";
//
// const queryClient = new QueryClient();
//
// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <AuthProvider>
//           <CartProvider>
//             <Routes>
//               <Route path="/" element={<Index />} />
//               <Route path="/products" element={<Products />} />
//               <Route path="/products/:id" element={<ProductDetails />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/cart" element={<Cart />} />
//               <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
//               <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//               <Route path="/impact" element={<Impact />} />
//               {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </CartProvider>
//         </AuthProvider>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );
//
// export default App;

import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;