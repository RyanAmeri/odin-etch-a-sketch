const containerHeight = 960;
const containerWidth = 960;
const container = document.getElementById("container");
let gridNum = 16;
let bgColor = "blue";

drawContainer(container, containerHeight, containerWidth, gridNum);
drawGrid(container, gridNum, bgColor);  

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
            drawGrid(container, gridNum, bgColor);   
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
    drawGrid(container, gridNum, bgColor);   
});


const clearButton = document.getElementById("clear");
clearButton.addEventListener('click', (e) => {
    clearContainer(container);
    drawContainer(container, containerHeight, containerWidth, gridNum);
    drawGrid(container, gridNum, bgColor);   
});

function clearContainer(container){
    container.innerHTML = "";

}


 
 function drawContainer(container, containerHeight, containerWidth, gridNum){
    
    const containerHeightString = containerHeight + "px";
    const containerWidthString = containerWidth + "px";
    let gridText = "";
    for (let i=0; i < gridNum; i++){
        gridText += "1fr ";
    }

    container.style.height = containerHeightString;
    container.style.width = containerWidthString;
    container.style.border = "1px solid black";
    container.style.backgroundColor = "yellow";
    container.style.display = "grid";
    container.style.gridTemplateColumns = gridText;
    container.style.gridTemplateRows = gridText;
    container.style.gridColumnGap = "1px";
    container.style.gridRowGap = "1px";
 }

 function drawGrid(container, gridNum, bgColor){
    let grid = [];

    for (let i = 0; i < gridNum * gridNum; i++){
        grid[i] = document.createElement("div");
        grid[i].className = "cell";
        grid[i].style.backgroundColor = bgColor;
        grid[i].addEventListener("mouseenter", () =>{
            grid[i].style.backgroundColor = getRandomColor();
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

