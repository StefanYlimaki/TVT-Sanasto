export const checkIfCorrect = (round) => {
  if(round.answer.id === round.question.id){
    return true
  }
  return false

}
