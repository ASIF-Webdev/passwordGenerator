import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let password = ""
    let string ="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"

    if(numberAllowed) string += "0123456789"
    if(charAllowed) string += "!@#$%^&*()-_{}[]',<>/?;:"

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length + 1)
      password += string.charAt(char)
    }

    setPassword(password)

  }, [length, numberAllowed, charAllowed, setPassword])

  const cpoyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed,passwordGenerator])

  return (
    <div className='w-full h-screen bg-slate-900 absolute'>
      <div className='bg-slate-700 max-w-md rounded-lg mx-auto px-4 py-3 my-8 text-orange-500 w-full'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button className='outline-none bg-blue-900 text-white px-3 py-0.5 shrink-0'
            onClick={cpoyPasswordToClipBoard}
          >copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range" 
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>

          <div>
            <input 
              type="checkbox" 
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div>
            <input 
              type="checkbox" 
              defaultChecked={charAllowed}
              id='charAllowed'
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="charAllowed">Numbers</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
