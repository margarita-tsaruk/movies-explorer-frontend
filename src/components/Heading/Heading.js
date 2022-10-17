import './Heading.css';

function Heading( { heading } ) {
  return (
    <div className="heading-container">
      <h2 className="heading">{heading}</h2>
    </div>
  )
}

export default Heading;