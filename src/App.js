import React, { useEffect, useState } from 'react';
import './App.css';
import { connectedAndColored, buildGraph } from './algo.js';
import ForceGraph2D from 'react-force-graph-2d';
import { AiOutlineClose } from 'react-icons/ai'

function App() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState({})
  const [connected, setConnected] = useState(undefined)
  const [colorable, setColorable] = useState(undefined)
  const [checkedInput, setCheckedInput] = useState('')
  const [sanitizedInput, setSanitizedInput] = useState('')

  useEffect(()=> {
    setCheckedInput(`Graph (${sanitizedInput}) is:`)
    setResult(connectedAndColored(sanitizedInput))
  },[sanitizedInput])

  useEffect(()=> {
    setSanitizedInput(input.replace(/-$/, '').replace(/,$/, ''))
  },[input])

  useEffect(() => {
    setColorable(result.colorable)
    setConnected(result.connected)
  }, [result])

  const emptyInputField = () => {
    setInput('')
  }

  return (
    <main className='container'>
    <section className='inputSection'>
        <p className='text'>Please enter a graph:</p>
        <form className='inputContainer'>
          <input className='input' type="text" placeholder='a-b-c' onChange={(e) => setInput(e.target.value)}
            value={input} />
          {
          input
            ? <AiOutlineClose onClick={emptyInputField} className='clearButton' />
            : ''
        }
        </form>
    </section>
    <section className='resultContainer'>
      <div className='result'>
        {
          connected !== undefined ?
            <>
              <p className='checkedInputText'> {checkedInput} {connected ? colorable ? 'Connected and Red-Blue Colorable' : 'Connected but not Red-Blue Colorable' : 'Not connected'} </p>
            </>
            : <p className='checkedInputText'> No graph entered</p>
        }
      </div>
      <div className='graphContainer'>
      <ForceGraph2D 
          graphData={buildGraph(sanitizedInput)} 
          nodeLabel="id" 
          backgroundColor="aliceblue" 
          height={350} 
          width={350} 
          nodeColor={ d => d.index % 2 === 0 ? '#0000ff' : '#ff0000'}
        />
      </div>
    </section>
    </main>
  )

}

export default App;
