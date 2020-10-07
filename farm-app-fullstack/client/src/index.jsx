import React from 'react'
import ReactDOM from 'react-dom'
import FarmApp from './components/FarmApp.jsx'

const App = (props)=>{
  return (
	  <div>
	  	<FarmApp />
	  </div>
	)
}

const appContainer = document.querySelector('#app');
ReactDOM.render(<App/>, appContainer);
