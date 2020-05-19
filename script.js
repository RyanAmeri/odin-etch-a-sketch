const containerHeight = 960;
const containerWidth = 960;
const container = document.getElementById("container");
let gridNum = 16;
let bgColor = "#FFFFFF";
let ptColor = getRandomColor();
let ptRandom = true;
let ptDarken = false;
let rdGrid = false;
let borderSize = 1;

drawContainer();
drawGrid();  

//Ask for a new grid size and create a new grid based on that size
const newButton = document.getElementById("new");
newButton.addEventListener('click', (e) => {
    let tempGrid = prompt("Please enter grid size between 1 and 128", "16");
    tempGrid = parseInt(tempGrid);

    if (Number.isInteger(tempGrid)) {
        if (tempGrid > 128 || tempGrid < 1){
            alert("That number is too small or too big");
        }
        else {
            gridNum = tempGrid;
            clearContainer(container);
            drawContainer();
            drawGrid();   
        }
    }
    else {
        alert("That is not a number");
    }
});

const bgColorPicker = document.getElementById("bgcolor");
bgColorPicker.addEventListener('change', (e) => {
    bgColor = bgColorPicker.value;
    if (ptDarken){
        ptColor = pSBC(-0.1, bgColor);
    }
    clearContainer(container);
    drawContainer();
    drawGrid();   
});


const clearButton = document.getElementById("clear");
clearButton.addEventListener('click', (e) => {
    clearContainer(container);
    drawContainer();
    drawGrid();   
});




//Set pointer color (change the value of ptRandom if it is not random)
const pointerColor = document.getElementById("ptcolor");
pointerColor.addEventListener('change', (e) => {
    if (pointerColor.value === 'random'){
        ptRandom = true;
        ptDarken = false;
        ptColor = getRandomColor();
    }
    else if (pointerColor.value === 'darken'){
        ptDarken = true;
        ptRandom = false;
        ptColor = pSBC(-0.1, bgColor);

    }
    else {
        ptDarken = false;
        ptRandom = false;
        ptColor = pointerColor.value;
    }
    clearContainer(container);
    drawContainer();
    drawGrid();   
});


//Check if Random Grid checkbox is ticked and set RdGrid accordingly
const randomGrid = document.getElementById("rdgrid");
randomGrid.addEventListener('change', (e) => {
    if (randomGrid.checked){
        rdGrid = true;
        bgColorPicker.disabled = true;
    }
    else {
        rdGrid = false;
        bgColorPicker.disabled = false;
    }
    clearContainer(container);
    drawContainer();
    drawGrid();   
});

const borderSizePicker = document.getElementById("bordersize");
borderSizePicker.addEventListener('change', (e) => {
    borderSize = borderSizePicker.value;
    clearContainer(container);
    drawContainer();
    drawGrid();   
});

function clearContainer(container){
    container.innerHTML = "";

}
 
 function drawContainer(){
    
    const containerHeightString = containerHeight + "px";
    const containerWidthString = containerWidth + "px";
    const borderSizeString = borderSize + "px";
    let gridText = "";
    for (let i=0; i < gridNum; i++){
        gridText += "1fr ";
    }
    container.style.height = containerHeightString;
    container.style.width = containerWidthString;
    container.style.border = "1px solid black";
    container.style.backgroundColor = "black";
    container.style.display = "grid";
    container.style.gridTemplateColumns = gridText;
    container.style.gridTemplateRows = gridText;
    container.style.gridColumnGap = borderSizeString;
    container.style.gridRowGap = borderSizeString;
 }

 function drawGrid(){
    let grid = [];
    
    for (let i = 0; i < gridNum * gridNum; i++){
        
        grid[i] = document.createElement("div");
        grid[i].className = "cell";
        if (rdGrid){
            bgColor = getRandomColor();
        }
        grid[i].style.backgroundColor = bgColor;
        grid[i].addEventListener("mouseenter", () =>{
        if (ptRandom) {
            ptColor = getRandomColor();
        }

        if (ptDarken){
            ptColor = pSBC(-0.1, grid[i].style.backgroundColor);
            
        }

        grid[i].style.backgroundColor = ptColor;
        grid[i].style.cursor = "cell";
        });
        grid[i].addEventListener("mouseleave", () =>{
            grid[i].style.cursor = "default";
        });
        container.appendChild(grid[i]);
    }
 }

 function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

// function from https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
// Version 4.0
const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}