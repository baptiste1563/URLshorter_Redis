import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [inputValue, setInputValue] = useState('');
    const [displayValue, setDisplayValue] = useState();
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleButtonClick = async () => {
      
      const response = await fetch('/api/shorter', {
        method: 'POST',
        
        body: JSON.stringify({ url : inputValue }),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
      
      const data = await response.json();
      console.log(data);

      if (!response.ok)
      {
        throw new Error(`Error! status: ${response.status}`);

      }
      console.log("je suis passé par la");
      const obj = JSON.stringify(data.shortUrl);
      const newstra = obj.slice(1, -1);
      
      setDisplayValue(newstra);
    };


  return (
    <>
      <h1>shortUrl</h1>
      <input type="url" value={inputValue} onChange={handleInputChange}/>
      <button onClick={handleButtonClick}>Afficher la valeur</button>
      <div>La valeur est : {displayValue}</div>
      <a href={displayValue} > test</a>
    </>
  )
}
