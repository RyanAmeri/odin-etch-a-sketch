const containerHeight = 960;
const containerWidth = 960;
const container = document.getElementById("container");
let gridNum = 16;
let bgColor = "white";
let ptColor = getRandomColor();
let ptRandom = true;
let rdGrid = false;
let borderSize = 1;

drawContainer(container, containerHeight, containerWidth, gridNum);
drawGrid(container, gridNum, bgColor, ptColor);  

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
            drawContainer(container, containerHeight, containerWidth, gridNum);
            drawGrid(container, gridNum, bgColor, ptColor);   
        }
    }
    else {
        alert("That is not a number");
    }
});

const bgColorPicker = document.getElementById("bgcolor");
bgColorPicker.addEventListener('change', (e) => {
    bgColor = bgColorPicker.value;
    clearContainer(container);
    drawContainer(container, containerHeight, containerWidth, gridNum);
    drawGrid(container, gridNum, bgColor, ptColor);   
});


const clearButton = document.getElementById("clear");
clearButton.addEventListener('click', (e) => {
    clearContainer(container);
    drawContainer(container, containerHeight, containerWidth, gridNum);
    drawGrid(container, gridNum, bgColor, ptColor);   
});




//Set pointer color (change the value of ptRandom if it is not random)
const pointerColor = document.getElementById("ptcolor");
pointerColor.addEventListener('change', (e) => {
    if (pointerColor.value !== 'random'){
        ptRandom = false;
        ptColor = pointerColor.value;
    }
    else {
        ptRandom = true;
        ptColor = getRandomColor();
    }
    clearContainer(container);
    drawContainer(container, containerHeight, containerWidth, gridNum);
    drawGrid(container, gridNum, bgColor, ptColor);   
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
    drawContainer(container, containerHeight, containerWidth, gridNum);
    drawGrid(container, gridNum, bgColor, ptColor);   
});

const borderSizePicker = document.getElementById("bordersize");
borderSizePicker.addEventListener('change', (e) => {
    borderSize = borderSizePicker.value;
    clearContainer(container);
    drawContainer(container, containerHeight, containerWidth, gridNum);
    drawGrid(container, gridNum, bgColor, ptColor);   
});

function clearContainer(container){
    container.innerHTML = "";

}
 
 function drawContainer(container, containerHeight, containerWidth, gridNum){
    
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

 function drawGrid(container, gridNum, bgColor, ptColor){
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

