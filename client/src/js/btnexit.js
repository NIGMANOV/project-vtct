export default function btnExit() {
    const btnExit = document.getElementById('header__btn')
    if(btnExit){
        btnExit.addEventListener('click', (e) => {
            e.preventDefault()
            window.location.href = './authorization.html'
        })
    }    
}
