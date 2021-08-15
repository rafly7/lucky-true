export function ResultNameWinner({listWinner, index}) {
  const splitNameWinner = listWinner[listWinner.length-index-1].result
  return (
    splitNameWinner.map((val, index) => (
      <div key={index} style={{marginBottom: '10px',marginInlineEnd: '10px', borderRadius: '10px', backgroundColor: '#fb9300', display: 'inline-flex', flexWrap: 'wrap', flexDirection: 'column', paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingRight: '1.25rem', paddingLeft: '1.25rem'}}>
        <div style={{ display: 'inline', flexDirection: 'column', flexWrap: 'wrap'}}>
          <p style={{fontWeight: 'bold', color: 'white', display: 'inline', flexDirection: 'column', fontSize: '25px', flexWrap: 'wrap'}}>{val}</p>
        </div>
      </div>
      // <p key={index} style={{fontSize: '25px', letterSpacing: '0.5px', borderRadius: '10px' ,backgroundColor: '#fb9300', display: 'inline-flex', paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingRight: '1.25rem', paddingLeft: '1.25rem', flexWrap: 'wrap', flexDirection: 'column', margin: '3px', color: 'white', fontWeight: 'bold'}}>{val}</p>
    ))
  )
}

export function AfterNameWinner({listWinner, index}) {
  const splitNameWinner = listWinner[listWinner.length-index-1].result
  return (
    splitNameWinner.map((val, index) => (
      <p key={index} style={{letterSpacing: '0.5px', borderRadius: '10px' ,backgroundColor: '#3498db', display: 'inline-flex', paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingRight: '1.25rem', paddingLeft: '1.25rem', flexWrap: 'wrap', flexDirection: 'column', margin: '3px', color: 'white', fontWeight: 'bold'}}>{val}</p>
    ))
  )
}