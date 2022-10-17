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
    <section>
        <p className='text'>Please enter a graph:</p>
        <form className='formContainer'>
        <div className='searchForm__inputContainer'>
          <input className='input' type="text" placeholder='a-b-c' onChange={(e) => setInput(e.target.value)}
            value={input} />
          {
          input
            ? <AiOutlineClose onClick={emptyInputField} className='searchForm__x' />
            : ''
        }
        </div>
        </form>
    </section>
    <section>
      <div className='result'>
        {
          connected !== undefined ?
            <>
              <p className='checkedInputText'> {checkedInput} {connected ? 'Connected' : 'Not connected'} {colorable ? 'and Red-Blue Colorable' : 'but not Red-Blue Colorable'} </p>
            </>
            : <p className='checkedInputText'> Please submit a graph </p>
        }
      </div>
      <ForceGraph2D 
          graphData={buildGraph(sanitizedInput)} 
          nodeLabel="id" 
          backgroundColor="aliceblue" 
          height={300} 
          width={500} 
          nodeColor={ d => d.index % 2 === 0 ? '#0000ff' : '#ff0000' }
        />
    </section>
    </main>
  )

}

export default App;
