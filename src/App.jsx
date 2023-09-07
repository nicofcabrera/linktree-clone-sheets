import { useEffect, useState } from 'react'
// import axios from 'axios';
import Papa  from 'papaparse'
import './App.css'

function App() {
  const [label, setLabel] = useState([]) ;

 const fetchData = async () => {
  try {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSyAVBY-XCZmYp8DSqKFlktqTNgHCUEg7SZHc4LYDOjqYe5drUtjvLMVoNDWZM9iDKisKP2--ubvtfw/pub?gid=0&single=true&output=csv'); // Reemplaza con el enlace de descarga directa del CSV
    const text = await response.text();
    
    const parsed = await new Promise ((resolve,reject) => {
      Papa.parse(text, {
        header: true, // Si la primera fila contiene encabezados de columna
        complete: resolve,
        error: reject
      });
    })

    // console.log(parse);
    setLabel(parsed.data)
   
  } catch (error) {
    // Manejar errores aquí
    console.error('Error al obtener el archivo CSV', error);
  }
 }

 useEffect(()=>{
  fetchData()
 },[])

  return (
    <>
      <h1>Hola World</h1>
      {
        label.map(res => (
          <article key={res.label}>
            <p>{res.label}</p>
            <p>{res.url}</p>
          </article>
        ))
      } 
    </>
  )
}

export default App
