export function ResultNameWinner({listWinner, index}) {
  const splitNameWinner = listWinner[listWinner.length-index-1].result.split(' ')
  return (
    splitNameWinner.map((val, index) => (
      <p key={index} style={{borderRadius: '10px' ,backgroundColor: '#f1c40f', display: 'inline-flex', paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingRight: '1.25rem', paddingLeft: '1.25rem', flexWrap: 'wrap', flexDirection: 'column', margin: '3px', color: 'white'}}>{val}</p>
    ))
  )
}