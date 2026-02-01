import { Toaster } from "sonner";
import { Navbar } from './components/layout/Navbar';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './app/HomePage';
import { RoomsPage } from './app/rooms/RoomsPage';
import { RoomId } from './app/rooms/RoomId';
import LoginPage from './app/login/LoginPage';
import RootLayout from './app/Layout';
import RegisterPage from './app/register/RegisterPage';
import FindBookingPage from './app/find-booking/FindbookingPage';
import AdminPage from "./app/admin/AdminPage";
import AboutPage from "./app/about/AboutPage";
import { ServicesPage } from "./app/service/ServicesPage";
import ContactPage from "./app/contact/ContactPage";
import MyBookingsPage from "./app/my-bookings/MybookingPage";
import NotFound from "./app/NotFound";
import { ThemeToggle } from "./components/theme/ThemeToggle";

function App() {

  return (
  <>
      <div className='min-h-screen flex flex-col'>
        <Routes>
          <Route path="/404" element={<NotFound />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <RootLayout>
                  <main className='flex-1'>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/rooms" element={<RoomsPage />} />
                      <Route path="/rooms/:id" element={<RoomId />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/find-booking" element={<FindBookingPage />} />
                      <Route path="/my-bookings" element={<MyBookingsPage />} />    
                      <Route path="/services" element={<ServicesPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </RootLayout>
              </>
            }
          />
            <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Toaster position='top-right' richColors />
        <ThemeToggle />
      </div>
    </>
  )
}

export default App
