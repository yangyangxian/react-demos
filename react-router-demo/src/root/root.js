import React from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import Blog from './routes/blog'
import Data from './routes/data'
import Photo from './routes/photo'

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>);
  }
}

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Blog</Link></li>
        <li><Link to='/photos'>Photos</Link></li>
        <li><Link to='/data'>Data</Link></li>
      </ul>
    </nav>
  </header>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Blog}/>
      <Route path='/photos' component={Photo}/>
      <Route path='/data' component={Data}/>
    </Switch>
  </main>
)