import bot from "./assets/bot.svg"
import user from "./assets/user.svg"


const form: HTMLFormElement = document.querySelector("form")
const chatContainer: HTMLElement = document.querySelector("#chat_container")

let loadInterval: number;

function loader(element: HTMLElement): void {
    element.textContent = "" //bot atextarea

    //bot thinking text
    loadInterval = setInterval(() => {
        element.textContent += ".";
        if (element.textContent === "....") element.textContent = ""
    }, 300)
}

//bot typing
function typeText(element: HTMLElement, text: string): void {
    let index = 0  //current pen area

    let inteval = setInterval(() => {
        if (index < text.length) { //check if all message is written or not
            element.innerHTML += text.charAt(index)
            index++ //increment the pen area
        } else {
            clearInterval(inteval) //stop writing
        }
    }, 20)
}

//generate unique id for each output
function generateUniqueId(): string {
    const timestamp = Date.now() //current date in number
    const randomNumber = Math.random() //generate random number from 0 to 1
    const hexadecimalString = randomNumber.toString(16) //convert random number into hexcode

    return `id-${timestamp}-${hexadecimalString}` //return the random id
}

//chat area background and message
function chatStripe(isAi: boolean, value: string | FormDataEntryValue, uniqueId: string) {
    return (
        `
    <div class="wrapper ${isAi && 'ai'}">
    <div class="chat">
    <div class="profile">
    <img src="${isAi ? bot : user}"
    alt="${isAi ? bot : user}"
    /> 
    </div>
    <div class="message" id="${uniqueId}">${value}</div>
    </div>
    </div>
    `
    )
}

//submiting 
const handleSubmit = async (e: Event): Promise<void> => {
    e.preventDefault();

    const data = new FormData(form)

    //user's chatstripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'), "");
    form.reset()

    //bot's chatstripe
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

    chatContainer.scrollTop = chatContainer.scrollHeight;

    const messageDiv: HTMLElement = document.getElementById(uniqueId)
    loader(messageDiv) //send the loaded message

    //fetch data from server -> bot's response
    const response = await fetch('http://localhost:5000', {
        //requesting methonds
        method: "POST", headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        })
    },)
    clearInterval(loadInterval);
    messageDiv.innerHTML = " "

    //get the reponse
    if (response.ok) {
        const data = await response.json()
        const parsedData = data.bot.trim()
        typeText(messageDiv, parsedData) //start typing
    } else {
        const err = await response.text()
        messageDiv.innerHTML = "Something went wrong!"
        // alert(err)
    }

}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keypress', (e: KeyboardEvent) => {
    if (e.keyCode === 13) handleSubmit(e)
})