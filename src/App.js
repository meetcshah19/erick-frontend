// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import io from 'socket.io-client';
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
const socket = io();
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router socket={socket}/>
    </ThemeProvider>
  );
}
