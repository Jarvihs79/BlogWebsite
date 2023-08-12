import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Learn from './components/learn/Learn';
import Trending from './components/trending/Trending';
import About from './components/about/About';
import BlogPage from './components/display-posts/posts/BlogList';

function App() {
  return (
    <div>
     <Header/>
     <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/learn' element={<Learn/>}/>
      <Route path='/trending' element={<Trending/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/blog/:id' element={<BlogPage/>} />
     </Routes>
    </div>
  );
}

export default App;
