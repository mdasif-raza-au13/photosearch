import Search from "./components/Search"
import DefaultImg from "./components/DefaultImg"
import SearchImg from "./components/SearchImg"
import { useState } from "react"
import { SearchContext } from './context/SearchContext'

function App() {

  const [value, setValue] = useState('')
  return (
    <>
      <SearchContext.Provider value={{ value, setValue }}>
        <Search />
        {value ? <SearchImg /> : <DefaultImg />}
      </SearchContext.Provider>
    </>
  );
}

export default App;
