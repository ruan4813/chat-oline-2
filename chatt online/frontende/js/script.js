// login elementos

const login = document.querySelector(".login")
const loginFomr = document.querySelector(".login-form")
const loginInput = document.querySelector(".login-input")



//chat elementos 
const chat = document.querySelector(".chat")
const chatInput = document.querySelector(".chat-input")
const chatForm = document.querySelector(".chat-form")
const chatMensagem = document.querySelector(".chat-mensagem")


const colors = [
    "cadetblue",
    "chartreuse" ,
    "rebeccapurple ",
    "blueviolet",
  "yellowgreen",
   "magenta" ,
    "midnightblue"
]

const user = { id: "", name: "", color: "" }

let websoket 

const createMessegeSelfElemnet = (content) => {
    const div = document.createElement("div")

    div.classList.add("mensagem-self")
    div.innerHTML = content

    return div
}

const createMessegeOtherfElemnet = (content, sender, senderColor) => {
    const div = document.createElement("div")
    const span = document.createElement("span")

    div.classList.add("mensagem-other")

    div.classList.add("mensagem-self")
    span.classList.add("mensagem-sender")
    span.style.color = senderColor

    div.appendChild(span)

    span.innerHTML = sender
    div.innerHTML += content

    return div
}

const getRandomColors = () =>{
    const randomindex = Math.floor(Math.random() * colors.length)
    return colors[randomindex]
}

const scrollScreen = () => {
    window.scrollTo({
        top:document.body.scrollHeight,
        behavior: "smooth"
    })
}

const processMesseng = ({data}) => {
    const {useid, Username, userColor, content} = JSON.parse(data)

    const message = useid ==user.id 
    ? createMessegeSelfElemnet(content) :
    createMessegeOtherfElemnet(content, Username, userColor)

    chatMensagem.appendChild(message)

    scrollScreen()
}

const handlelogin = (event) => {
    event.preventDefault()

    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = getRandomColors()
    
    login.style.display = "none"
    chat.style.display = "flex"

    websoket = new WebSocket("ws://localhost:8080")
    websoket.onmessage = processMesseng

}

const sendMensege = (event) => {
    event.preventDefault()

    const message = {
        useid: user.id,
        Username: user.name,
        userColor: user.color,
        content: chatInput.value
    }

    websoket.send(JSON.stringify(message))

    chatInput.value = ""
    
}

loginFomr.addEventListener("submit", handlelogin)

chatForm.addEventListener("submit", sendMensege)