let darkBtn = document.querySelector('#darkMode') as HTMLImageElement;
let children = document.body.children;
let icon = document.querySelector('#icon') as HTMLImageElement;
let btn = document.querySelectorAll('.btn');


darkBtn.addEventListener('click', ()=>{
    if (localStorage.getItem('dark') === 'on') {
        darkmodeOFF();
    } else {
       darkmodeON();
    }
});
function darkmodeON() {
    darkBtn.src = 'Images/bright.svg';
    localStorage.setItem('dark', 'on');
    document.body.classList.add('dark');
    Array.from(children).forEach(child => {
        if (child.tagName.toLowerCase() !== "script") {
            child.tagName.toLowerCase() === "main" ? child.classList.add('dark') : child.classList.add('grey');
        }
    });
    btn.forEach((child) => {
        child.classList.add('grey');     
        child.classList.remove('green');     
    });
    if (icon !== null) {
        icon.src = 'Images/githublight.svg';
    }
}
function darkmodeOFF() {
    darkBtn.src = 'Images/dark.svg';
    localStorage.setItem('dark', 'off');
    Array.from(children).forEach(child => {
        if (child.tagName.toLowerCase() !== "script") {
            child.tagName.toLowerCase() === "main" ? child.classList.remove('dark') : child.classList.remove('grey');
        }
    });
    btn.forEach((child) => {
        child.classList.remove('grey');     
        child.classList.add('green');     
    });
    document.body.classList.remove('dark');
    if (icon !== null) {
        icon.src = 'Images/githubdark.svg';
    }
}

if (localStorage.getItem('dark') === 'on') {
    darkmodeON();
} else {
   darkmodeOFF();
}