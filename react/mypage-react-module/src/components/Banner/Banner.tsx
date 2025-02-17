import { useEffect, useState } from 'react'
import { Button, OutlinedInput } from '@mui/material'
import { css } from '@emotion/react'

const Banner = (props: any) => {
  const [counter, setCounter] = useState(0)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if(props.store){
      const counterSub = props.store.counter.subscribe((value: any) => {
        setCounter(value)
      })
      const userSub = props.store.user.subscribe((value: any) => {
        setUser(value)
      })

      return () => {
        counterSub.unsubscribe()
        userSub.unsubscribe()
      }
    }
  }, [])

  return (
    <div>
      <OutlinedInput placeholder='Search' />
      <Button variant='contained' css={css`
        margin-top: 10px;
        display: block;
      `}>Click me kajakjakjakjaka hello world xin chao</Button>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '300px',
        backgroundImage: 'url(\'https://via.placeholder.com/800x300\')',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          flexDirection: 'column',
        }}>
          <h2>Child react module</h2>
          <br/>
          Banner Text23234 - Count: {counter}
          <br />
          User: {user}
        </div>
        <button
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
          onClick={() => props.store.incrementCounter()}
        >
          Increment Count
        </button>
        <button
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
          onClick={() => props.store.setUser('John Doe from module')}
        >
          Set User
        </button>
      </div>
    </div>
  )
}

export default Banner
