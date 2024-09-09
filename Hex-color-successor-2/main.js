 // Global variable for the toast message
let toastDiv = null;

window.onload = () => {
    main();
}

function main(){
    let root = document.getElementById('root');
    let btn = document.getElementById('my-btn');
    let form = document.getElementById('output');
    let form2 = document.getElementById('output-2');
    let copy = document.getElementById("copy");
    let copy2=document.getElementById('copy-2')

    btn.addEventListener('click', function(){
        let color = generateColorDecimal()
        let bgColor = hexColorGenerator(color);
        let rgbColor = getRGBColor(color)
        root.style.backgroundColor = bgColor;
        form.value = bgColor.substring(1);
        form2.value=rgbColor
    });

    copy.addEventListener('click', function(){
        window.navigator.clipboard.writeText(`#${form.value}`);
        if (toastDiv != null){
            toastDiv.remove();
            toastDiv = null;
        }
        if (isValidHex(form.value)){
            getToastMessage(`#${form.value} Copied`);
        } else {
            alert('Invalid Color Code')
        }
    });

    copy2.addEventListener('click', function(){
        window.navigator.clipboard.writeText(hexToRgb(form2.value));
        if (toastDiv != null){
            toastDiv.remove();
            toastDiv = null;
        }
        if (isValidHex(form.value)){
            getToastMessage(`${form2.value} Copied`);
        } else {
            alert('Invalid Color Code')
        }
    });


    form.addEventListener('keyup',function(e){
        let color = e.target.value
        if (color){
            form.value=color.toUpperCase()
            if (isValidHex(color)){
                root.style.backgroundColor=`#${color}`
                form2.value = hexToRgb(color)
            }
        }
    })
}

function hexColorGenerator({red,green,blue}){
    //const {red,green,blue} = generateColorDecimal()
    const getTwoCode =(value) => {
        const hex = value.toString(16)
        return hex.length==1? `0${hex}` : hex
    }

    return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`.toUpperCase();
}
function generateColorDecimal(){
        let red = Math.floor(Math.random() * 255);
        let green = Math.floor(Math.random() * 255);
        let blue = Math.floor(Math.random() * 255);

    return {
            red:red,
            green:green,
            blue:blue
    }
}

// create a rgba color generator


function getRGBColor({red,green,blue}){
    //const {red,green,blue} = generateColorDecimal()
    return `rgb(${red},${green},${blue})`
}


// create a function for change hex to rgb code

function hexToRgb(hex){
    let red = parseInt(hex.slice(0,2),16);
    let green = parseInt(hex.slice(2,4),16);
    let blue = parseInt(hex.slice(4,6),16);
    return `rgb(${red},${green},${blue})`
}





function getToastMessage(msg){
    toastDiv = document.createElement("div");
    toastDiv.innerText = msg;
    toastDiv.className = 'toast-message toast-message-slide-in';
    document.body.appendChild(toastDiv);
    toastDiv.addEventListener('click', function(){
        toastDiv.classList.remove('toast-message-slide-in');
        toastDiv.classList.add('toast-message-slide-out');
        toastDiv.addEventListener('animationend', function(){
            toastDiv.remove();
            toastDiv = null;
        });
    });
}


function isValidHex(color){
    if (color.length != 6) return false
    return /^[0-9a-fA-F]{6}$/i.test(color);
}