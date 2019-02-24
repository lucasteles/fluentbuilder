function randomInt(qtdMin: number, qtdMax?: number): number 
{
    const rand = qtdMax 
            ?  Math.random() * (qtdMax - qtdMin) + qtdMin
            :  (Math.random() * qtdMin) 

    return Math.floor(rand)
}

export default randomInt