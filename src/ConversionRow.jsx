export default function ConversionRow( { current, currencies, onChange, onChangeInput, amount }) {
    const currencyElems = currencies.map(currency => <option key={currency} 
            value={currency}
            >{currency}
        </option>)
    return (
        <div className="row">
            <label>
                <input type="number" min="1" placeholder='0' name="amount" value={amount} onChange={onChangeInput}></input>
            </label>

            <select name="currency-list"
                value={current}
                onChange={onChange}>
                {currencyElems}
            </select>
        </div>
    )
}