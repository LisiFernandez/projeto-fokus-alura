const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const inicarouPausarBt = document.querySelector('#start-pause span')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('sons/luna-rise-part-one.mp3')
const musicaPlay = new Audio('sons/play.wav')
const musicaTempoFinalizado = new Audio('sons/beep.mp3')
const musicaPausar = new Audio('sons/beep.mp3')
musica.loop = true
const iconePlay = document.querySelector('#start-pause span')
const tempoNatela = document.querySelector('#timer')


musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
            musica.play()
        } else {
            musica.pause()
        }
}

)




focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto( 'descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()

    botoes.forEach(function (contexto) {
    contexto.classList.remove('active')
    })
    
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)

    switch(contexto) {
        case"foco":
        titulo.innerHTML = "Otimize sua produtividade,<br> <strong >mergulhe no que importa.</strong>"
            break;
        case"descanso-curto":
        titulo.innerHTML = "Que tal dar uma respirada? <strong class=app__title-strong>Faça uma pausa curta!</strong>"
            break;
        case "descanso-longo":
            titulo.innerHTML = "Hora de voltar à superfície.<strong class=app__title-strong> Faça uma pausa longa.</strong>"
        default:
            break;

    }

}
let tempoDecorridoEmSegundos = 1500
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar()
        musicaTempoFinalizado.play()

        alert('tempo finalizado')
        return
    }

    tempoDecorridoEmSegundos -= 1
    mostrarTempo()

}

startPauseBt.addEventListener( 'click', iniciarouPausar)
let intervalorId = null

function iniciarouPausar(){
    if(intervalorId){
        zerar()

        return
    }
    musicaPlay.play()
    intervalorId = setInterval(contagemRegressiva, 1000)
    inicarouPausarBt.textContent = 'pausar'
    //iconePlay.setAttribute('src', '/imagens/play_arrow.png')
}
function zerar() {
    clearInterval(intervalorId)
    inicarouPausarBt.textContent = 'começar'
    //iconePlay.setAttribute('src', '/imagens/pause.png')

    intervalorId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNatela.innerHTML = tempoFormatado
}


mostrarTempo()