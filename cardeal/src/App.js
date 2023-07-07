import React, { useState } from 'react';
import './App.css';

// Signup form
function Signup({ onSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup({ email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

// Login form
function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// adding car details
function AddCar({ onAddCar }) {
  const [car, setCar] = useState({
    image: '',
    title: '',
    description: '',
    specifications: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCar(car);
    setCar({
      image: '',
      title: '',
      description: '',
      specifications: '',
    });
  };

  return (
    <div className="form-container">
      <h2>Add Second-Hand Car Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Image URL:</label>
          <input type="text" name="image" value={car.image} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" value={car.title} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={car.description} onChange={handleInputChange} required></textarea>
        </div>
        <div className="form-group">
          <label>Specifications (5 bullet points):</label>
          <textarea
            name="specifications"
            value={car.specifications}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}

// displaying car details
function CarDetails({ cars, onDeleteCar }) {
  const handleDeleteCar = (carId) => {
    onDeleteCar(carId);
  };

  return (
    <div>
      <h2>Car Details</h2>
      {cars.map((car) => (
        <div key={car.id} className="car-card">
          <img src={car.image} alt={car.title} />
          <h3>{car.title}</h3>
          <p>{car.description}</p>
          <ul>
            {car.specifications.split('\n').map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
          <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [cars, setCars] = useState([]);

  const handleSignup = (userData) => {
    // signup  
    console.log('Signup:', userData);
  };

  const handleLogin = (userData) => {
    // login  
    console.log('Login:', userData);
    setUser(userData);
    setLoggedIn(true);
  };

  const handleAddCar = (carData) => {
    // car addition  
    console.log('Add Car:', carData);
    setCars((prevCars) => [
      ...prevCars,
      {
        id: Date.now(),
        ...carData,
      },
    ]);
  };

  const handleDeleteCar = (carId) => {
    // car deletion 
    console.log('Delete Car:', carId);
    setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
  };

  return (
    <div className="App">
      {loggedIn ? (
        <div>
          <h1>Welcome, {user.email}!</h1>
          <AddCar onAddCar={handleAddCar} />
          <CarDetails cars={cars} onDeleteCar={handleDeleteCar} />
        </div>
      ) : (
        <div>
          <Signup onSignup={handleSignup} />
          <Login onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
}

export default App;
