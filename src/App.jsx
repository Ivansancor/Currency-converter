import { useState, useEffect } from 'react'
import './App.css'

import ConversionRow from "./ConversionRow"

// ?access_key=${import.meta.env.VITE_API_KEY}

function App() {

  const [currencies, setCurrencies] = useState({});
  const [currencySymbols, setCurrencySymbols] = useState([])
  const [currentBaseCurrency, setCurrentBaseCurrency] = useState("EUR")
  const [currentGoalCurrency, setCurrentGoalCurrency] = useState("USD")
  const [exchangeRatesForCurrentBase, setExchangeRatesForCurrentBase] = useState({})

  const [amount, setAmount] = useState(1)
  const [calculatedAmount, setCalculatedAmount] = useState(0)


// useEffect(()=> {
//   fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${import.meta.env.VITE_API_KEY}&base=${currentBaseCurrency}`)
//   .then(res => res.json())
//   .then(data => console.log(data))
// }, [])

  useEffect(() => {
    const result = amount * exchangeRatesForCurrentBase[currentGoalCurrency]
    // console.log(amount)
    // THIS IS UNDEFINED WHEN CURRENTGOALCURRENCY IS EURO console.log(exchangeRatesForCurrentBase[currentGoalCurrency])
    // console.log(result)
    setCalculatedAmount(result.toFixed(4))
  }, [amount, currentGoalCurrency, exchangeRatesForCurrentBase])

  useEffect(() => async function getCurrencies() {
    const res = await fetch("https://www.frankfurter.app/currencies");
    if (!res.ok) {
      throw new Error("Failed to fetch currencies.")
    }
    const data = await res.json();
    setCurrencies(data);
    setCurrencySymbols(Object.keys(data));
  }, [])

  useEffect(() => async function getExchangeRates() {
    const res = await fetch(`https://www.frankfurter.app/latest?from=${currentBaseCurrency}`);
    if (!res.ok) {
      throw new Error("Failed to fetch exchange rates.")
    }
    const data = await res.json();
    setExchangeRatesForCurrentBase(data.rates);
  }, [currentBaseCurrency])

  function handleBaseCurrency(e){
    setCurrentBaseCurrency(e.target.value)
  }
  function handleGoalCurrency(e){
    setCurrentGoalCurrency(e.target.value)
  }
  function handleAmountChange(e) {
    setAmount(e.target.value)
  }

  return (
    <main>
      <h1>Currency converter</h1>
      <div className="info">
        <p>1 {currentBaseCurrency} equals...</p>
        <p>{exchangeRatesForCurrentBase[currentGoalCurrency]} {currentGoalCurrency}</p>
      </div>

      <div>
        <ConversionRow current={currentBaseCurrency} currencies={currencySymbols} onChange={handleBaseCurrency} amount={amount} onChangeInput={handleAmountChange}/>
        <ConversionRow current={currentGoalCurrency} currencies={currencySymbols} onChange={handleGoalCurrency} amount={calculatedAmount}/>
      </div>

    </main>
  )
}

export default App
