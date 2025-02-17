import { useEffect, useState } from "react";

export function Button({
  store
}: ButtonProps) {

  const [counter, setCounter] = useState(0);
  const [user, setUser] = useState('');

  useEffect(() => {
    if(store){
      const counterSub = store.counter.subscribe((value: any) => {
        setCounter(value);
      });
      const userSub = store.user.subscribe((value: any) => {
        setUser(value);
      });

      return () => {
        counterSub.unsubscribe();
        userSub.unsubscribe();
      }
    }
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '300px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'yellow',
    }}>
      <h2>Child web component</h2>
      <div>
        Counter: {counter}
        <br />
        User: {user}
      </div>
      <button style={{ backgroundColor: 'cyan', padding: '10px', cursor: 'pointer', }} onClick={() => store.incrementCounter()}>Increment Counter</button>
      <button style={{ backgroundColor: 'cyan', padding: '10px', cursor: 'pointer', }} onClick={() => store.setUser('John Doe from web component')}>Set User</button>
    </div>
  );
}

export type ButtonProps = {
  label?: string;
  variant?: 'primary' | 'secondary';
  onClick?: (event: ButtonClickEvent) => void;
  store?: any;
};

export interface ButtonClickEvent extends CustomEvent {
  detail: {
    event: React.MouseEvent;
  };
}
