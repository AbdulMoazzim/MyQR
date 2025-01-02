const urlInput = document.querySelector("#url") as HTMLInputElement;
const generateButton = document.querySelector("#generate") as HTMLButtonElement;
const qrCode = document.querySelector("#qr") as HTMLImageElement;
const downloadButton = document.querySelector("#download") as HTMLButtonElement;
const error = document.querySelector("#error") as HTMLDivElement;
const darkbtn = document.querySelector('#darkMode') as HTMLImageElement;
const navElement = document.body.querySelector("nav");
const mainElement = document.body.querySelector("main");
const main = mainElement ? mainElement.children : null;
const Btn = document.querySelectorAll('.btn');


const pattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/;

urlInput.addEventListener("click", () => {  
    urlInput.value = "";
    qrCode.src = "";
    qrCode.style.visibility = "hidden";
    error.style.display = "none";
});
generateButton.addEventListener("click", () => {
    const url = urlInput.value;

    if (!pattern.test(url)) {
        error.style.display = "block";
        return;
    }
    else {
        fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`)
            .then((res) => res.blob())
            .then((blob) => {
                qrCode.style.visibility = "visible";
                qrCode.src = URL.createObjectURL(blob);
        });
    }
});

downloadButton.addEventListener("click", () => {    
    const a = document.createElement("a");
    a.href = qrCode.src;
    a.download = "qrcode.png";
    a.click();
});




darkbtn.addEventListener('click', () => {
    if (localStorage.getItem('dark') === 'on') {    
        DarkModeOff();
    } else {
        DarkModeOn();
    }
});

function DarkModeOn() {
    darkbtn.src = '../Images/bright.svg';
    localStorage.setItem('dark', 'on');
    document.body.classList.add('dark');
    navElement?.classList.add('grey');
    urlInput.classList.add('urlDark');
    if (main) {
        Array.from(main).forEach(child => {
            child.classList.add('dark')
        });
    }
    Btn.forEach((child) => {
        child.classList.add('grey');     
        child.classList.remove('green');     
    });
}
function DarkModeOff() {
    darkbtn.src = '../Images/dark.svg';
    localStorage.setItem('dark', 'off');
    navElement?.classList.remove('grey');
    urlInput.classList.remove('urlDark');
    if (main) {
        Array.from(main).forEach(child => {
            child.classList.remove('dark')
        });
    }
    Btn.forEach((child) => {
        child.classList.remove('grey');     
        child.classList.add('green');     
    });
    document.body.classList.remove('dark');

}
if (localStorage.getItem('dark') === 'on') {
    DarkModeOn();
} else {
    DarkModeOff();
}