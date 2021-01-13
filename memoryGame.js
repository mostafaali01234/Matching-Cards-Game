let gameBody = document.querySelector(".game"),
    blocksNum = 20;

    //------------------    Create 20 cards    -----------------

    for(let i = 1; i <= blocksNum; i++){

        // Create each block with it's face and back
        let block = document.createElement('div'),
        front = document.createElement('div'),
        back = document.createElement('div'),
        contentBack = document.createElement('p');
        // contentFront = document.createElement('p');
        block.classList.add("block");
        front.classList.add("front");
        back.classList.add("back");
        block.classList.add(i);

        // adding the numbers from 1 to 20 to the block
        if( i <= 10 ){
            contentBack.textContent = i;
        }else{
            contentBack.textContent = i - 10;
        }
        
        // adding the front & back to the block
        // and the block to the body
        back.appendChild(contentBack);
        block.appendChild(front);
        block.appendChild(back);
        // front.appendChild(contentFront);
        gameBody.appendChild(block);
    }  

//  ---------------- Shuffle the blocks randomly ------------------------
let oldList = document.querySelector("section.game");

for (let i = oldList.children.length; i >= 0; i--) {
    oldList.appendChild(oldList.children[Math.random() * i | 0]);
}

//  ---------------- Setting up the variables for onclick Function ------------------------
let block = document.querySelectorAll("div.block"),
    blockFront = document.querySelector("div.front"),
    blockBack = document.querySelector("div.back"),
    wrongTries = 0,
    wrongText = document.querySelector(".score span");
    wrongText.textContent = wrongTries;

//console.log(block);

//------------------    onclick function    -----------------
for(let i = 0; i < blocksNum; i++){
    // setTimeout(() => {   }, 500);
    block[i].onclick = function(){
        if( block[i].style.transform == 'rotateY(180deg)'){
            //  Do Nothing
        } else {
            block[i].style.transform = 'rotateY(180deg)';
            setTimeout(() => {  flipCheck(block[i], i); }, 500);
        }
    }
}

let Checkstack = [],
    classStack = [];
    
 //------------------    check if 2 block not match backflip the blocks    -----------------
function flipCheck(selectedBlock, index){

    Checkstack.push(selectedBlock.textContent);
    classStack.push(index);

    //console.log(classStack);
    if(Checkstack.length == 1) return;

    else if(Checkstack.length == 2){

        if(Checkstack[0] === Checkstack[1]){
            //console.log('right');
            Checkstack = [];
            classStack = [];

        }else {
            
            //console.log('wrong');
            block[classStack[0] ].style.transform = 'none';    

            block[classStack[1] ].style.transform = 'none';

            Checkstack = [];
            classStack = [];
            wrongTries++;
            wrongText.textContent = wrongTries;
        }
    }
}
