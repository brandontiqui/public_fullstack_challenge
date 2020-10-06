import React from 'react'
import ReactDOM from 'react-dom'

const App = (props)=>{
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}

const appContainer = document.querySelector('#app');
ReactDOM.render(<App/>, appContainer);