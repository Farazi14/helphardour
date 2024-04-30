import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import  Dashboard  from "./components/Dashboard";  // using the Dashboard component after converting to functional component
import  Login from "./components/Login"; 
import  ViewTicket  from "./components/ViewTicket"; // Importing ViewTicket component

const AppRoutes = [
  {
    index: true,
    element: <Login />
   },
   {
    path: '/dashboard',
    element: <Dashboard />
   },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/viewticket/:ticketId',   // Define a route parameter for the ticket ID
    element: <ViewTicket />
  }
];

export default AppRoutes;
