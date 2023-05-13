// import e from 'cors';
import { useEffect, useState } from 'react';
import { AiOutlineEnter } from 'react-icons/ai';

// AiOutlineEnter

function App() {
  const [message, setMessage] = useState(null)
  const [value, setValue] = useState(null)
  const [prevChats, setPrevChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)

  const createNewChat = () => {
    setMessage(null)
    setValue('')
    setCurrentTitle(null)
  }

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
  }

  // const clearInput = (e) => {
  //   e.preventDefault(e)
  //   setValue(null, e)
  // }

  const getMessages = async () => {
    const options = {
      method: 'Post',
      body: JSON.stringify({
        message: value
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }
    try {
      // e.preventDefault()
      const response = await fetch('http://localhost:8000/answers', options)
      const data = await response.json()

      console.log(data)
      setMessage(data?.choices[0].message)
    } catch (error) {
      console.error(error)
    }
  }

  const askQuestion = (e) => {
    e.preventDefault(e)
    getMessages()
    // clearInput(e)
    // setValue('')
  }



  useEffect(() => {
    // console.log(currentTitle, value, message)
    // console.log(currentTitle)
    if (!currentTitle && value && message) {
      setCurrentTitle(value)
    }

    if (currentTitle && value, message) {
      setPrevChats(prevMessage => (
        [...prevMessage,
        {
          title: currentTitle,
          role: 'user',
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content
        }
        ]
      ))
    }

  }, [message, currentTitle])

  const currentChat = prevChats.filter(prevChats => prevChats.title === currentTitle)

  const uniqueTitles = Array.from(new Set(prevChats.map(prevChat => prevChat.title)))

  // console.log(message)
  // console.log(value)
  // console.log(prevChats)
  // console.log(uniqueTitles)
  return (
    <div className="app">

      <section className="side-bar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
        <nav>
          <a target="_blank" href='https://jcashleyportfolio.netlify.com'>created by JC</a>
        </nav>
      </section>


      <section className="main">
        {/* <h1></h1> */}
        {!currentTitle && <h1>CloneGPT</h1>}
        <h1>{currentTitle}</h1>
        <ul className="feed">
          {currentChat.map((chatMesssage, index) => <li key={index}>
            <p className='role'>{chatMesssage.role}</p>
            <p className='message'>{chatMesssage.content}</p>
          </li>)}
        </ul>
        <div className="bottom-section">
          <form onSubmit={(e) => askQuestion(e)} className="input-container">
            <input type="text"
              value={value}
              placeholder={value}
              onChange={(e) => setValue(e.target.value)

              }
            />
            <button id="submit" onClick={(e) => askQuestion(e)}><AiOutlineEnter /></button>
          </form>
          <p className="info">Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT Mar 23 Version</p>

        </div>
      </section >

    </div >
  )
}

export default App
