import { Toaster } from 'react-hot-toast';

import MainRoutes from "./Routes/Main.Routes"

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <MainRoutes />
    </>
  )
}

export default App
