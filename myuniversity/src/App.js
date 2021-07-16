import logo from './logo.svg';
import './App.css';
import  Header from './components/header.jsx';
import  Home from './components/home.jsx';
import Footer from './components/footer.jsx';
function App() {
  return (
    <div id="main-wrapper">
          <Header/>{/* n3ayt l header jsx*/}
          <Home/>
          <Footer/>
    </div>
  );
}

export default App;
