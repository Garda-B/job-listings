import { useEffect, useState } from 'react'
import './App.css'
import data from '../data.json'
import images from './images.js'
import remove from './images/icon-remove.svg'

function App() {

  const [searchTerm, setsearchTerm] = useState([])
  const [filtered, setFiltered] = useState(data)

  useEffect(() => {

    const searchresults = data.map((item) => [item.level, item.role, ...item.languages, ...item.tools])

    const union = searchresults.map((innerArray, index) => {
      if (searchTerm.every(element => innerArray.includes(element))) {
        return index;
      }
    }).filter(item => item !== undefined)


    const filtereddata = data.filter((object, index) => union.includes(index))
    setFiltered(filtereddata)


  }, [searchTerm])


  const handleTag = (e) => {

    if (searchTerm.some((x) => x == e.target.innerHTML)) { null } else { setsearchTerm([...searchTerm, e.target.innerHTML]) }

  }

  const handleRemove = (e) => {

    const filteredsearc = searchTerm.filter((x) => x !== e.target.id)
    setsearchTerm(filteredsearc)

  }


  return (
    <>

      <header className='header'></header>

      <main className='wrapper'>

        {searchTerm.length > 0 ?
          <div className='clickedtags'>
            {searchTerm.map((term, i) =>
              <div key={i}><p>{term}</p>
                <div className='remove'><img alt={term} onClick={(e) => handleRemove(e)} id={term} src={remove}></img></div>
              </div>)}
            <div onClick={() => setsearchTerm([])} className='clear'>Clear</div>
          </div> : null}

        {filtered.map((job, i) =>


          <div className={`listing ${job.featured ? "featuredborder" : ""}`} key={job.id}>
            <div className='leftside'><img src={images[job.company.toLowerCase().replace(/\./g, "").replace(/ /g, "").replace(/-/g, "")]} alt={job.company}></img>
              <div className='maininfo'>

                <div className='company'><p>{job.company}</p>
                  {job.new && <div className='new'>NEW!</div>}
                  {job.featured && <div className='featured'>FEATURED</div>}


                </div>

                <div className='job'>{job.position}</div>
                <div className='info'>
                  <div>{job.postedAt}</div><div className='dot'></div>
                  <div>{job.contract}</div><div className='dot'></div>
                  <div>{job.location}</div>
                </div>
              </div>
            </div>

            <div className='tags'>
              <button onClick={(e) => handleTag(e)} className='tagitems'>{job.role}</button>
              <button onClick={(e) => handleTag(e)} className='tagitems'>{job.level}</button>
              <button onClick={(e) => handleTag(e)} className='tagitems'>{job.languages[0]}</button>
              {job.languages[1] && <button onClick={(e) => handleTag(e)} className='tagitems'>{job.languages[1]}</button>}
              {job.languages[2] && <button onClick={(e) => handleTag(e)} className='tagitems'>{job.languages[2]}</button>}
              {job.tools[0] && <button onClick={(e) => handleTag(e)} className='tagitems'>{job.tools[0]}</button>}
              {job.tools[1] && <button onClick={(e) => handleTag(e)} className='tagitems'>{job.tools[1]}</button>}


            </div>


          </div>


        )}</main>



    </>
  )
}

export default App
