import Contributor from "./Contributor"

const Contributors = ({ contributors }) => {
  return (
    <>
    { 
        contributors.map( (elem, i) => ( <Contributor key={i} contributor={elem} /> ))
    }
    </>
  )
}

export default Contributors
