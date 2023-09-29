//C:\react\demo-project\src\App.js
import { BrowserRouter, Routes, Route} from 'react-router-dom'; //npm i react-router-dom --save
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import ListUser from './components/ListUser';
import ViewBookings from './components/ViewBookings';
// App.js or index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Register from './components/Authentication/Register/Register';
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import Collections from './components/Collections/Collections';
import CollectionForm from './components/Collections/CollectionForm/CollectionForm';

function App() {
  return (
    <div className="container">
      <div className="App">
        <BrowserRouter>
          {/* <Link to="user/create" className="btn btn-success">Add New User</Link> */}
          <Sidebar />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/collection' element={<Collections/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/list-user" element={<ListUser />} />
            <Route path="/user/create" element={<CreateUser />} />
            <Route path="/user/:id/edit" element={<EditUser />} />
            <Route path="/bookings" element={<ViewBookings />} />
            <Route path='/add-collection' element={<CollectionForm/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
