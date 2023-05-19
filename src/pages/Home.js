import logo from './../logo.svg';
import './../App.css';
import ButtonBases from '../components/ButtonBases';

const Home = () => {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <ButtonBases />
      </header>
    </div>
  );
}

export default Home;
