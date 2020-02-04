
    var grid = []; // final map to construct the grid
    var gridRows, gridColumns, context, count = 0, mushroomsEaten = 0;
    // To keep track of position of mario
    var marioPosition = {
        x: 0,
        y: 0
    }

    var defaultSize = {
        width: 40,
        height: 40
    }

    window.onload = function(){
        var canvas = document.getElementById('gCanvas');
        context = canvas.getContext('2d');
        gridRows = prompt('Please enter number of rows');
        gridColumns = prompt('Please enter number of columns');
        generateGrid(gridRows, gridColumns);
    }

    /**
     * 
     * @param {*} gridRows 
     * @param {*} gridColumns 
     * generate the random grid for placing the mushrooms and mario
     */
    function generateGrid(gridRows, gridColumns){
        grid = [];

        var tmpArr = [] // Temporary 1-dimensional array to hold all values

        // Fill temporary array with "1"s
        for (var i = 0; i < gridRows * gridColumns - gridRows; i = i+1) {
            tmpArr.push(1);
        }

        // Insert "0"s at random indexes in the temporary array
        var i =0;
        while(i< gridRows){
            var index = Math.round(Math.random() * (tmpArr.length + 1));
            if(index !== 0){
                tmpArr.splice(index, 0, 0);
                i = i+1;
            }
        }

        // Split temporary array into separate arrays and insert them into the final array
        for (var i = 0; i < gridRows; i += 1) {
            var row = tmpArr.slice(i * gridColumns, (i + 1) * gridColumns);
            grid.push(row);
        }
        //put the 1st position for mario
        grid[0][0] = 2;
        //render the canvas
        drawCanvas();
    }

    /**
     * Grid position with 0 --> mushroom
     * Grid position with 1 --> normal path
     * Gris position with 2 --> mario
     */
    function drawCanvas(){
        context.clearRect(0,0,1200,600);
        for(let row=0; row<grid.length; row++){
            for(let col=0; col< grid[row].length; col++){
                let x = col*defaultSize.width;
                let y = row*defaultSize.height;
                if(grid[row][col] === 2){
                    
                    var mario = new Image;
                    mario.onload = function() {
                        context.drawImage(mario,x,y,defaultSize.width, defaultSize.height);
                    }
                    mario.src = "mario.png";
                }else if(grid[row][col] === 0){
                    
                    var mushroom = new Image;
                    mushroom.onload = function() {
                    context.drawImage(mushroom,x,y, defaultSize.width, defaultSize.height);
                    }
                    mushroom.src = "mushroom-green.jpg";
                
                }else if(grid[row][col] === 1){
                    context.rect(x, y, defaultSize.width, defaultSize.height);
                    context.stroke();
                }
                
            }
        }
    }
    /**
     * Check for the arrow key events and take the action
     */
    document.onkeydown = function(event){
        if(mushroomsEaten === parseInt(gridRows)){
            alert("All mushrooms eaten in "+count +" steps.")
        }
        
        if(event.keyCode === 37){
            //left
            if(marioPosition.y > 0){
                if(grid[marioPosition.x][marioPosition.y-1] === 0){
                    mushroomsEaten++;
                }
                grid[marioPosition.x][marioPosition.y] = 1;
                marioPosition.y = marioPosition.y - 1;
                grid[marioPosition.x][marioPosition.y] = 2;
                count++;
                //re-render the canvas
                drawCanvas();
            }
        }else if(event.keyCode === 38){
            //up
            if(marioPosition.x > 0){
                if(grid[marioPosition.x - 1][marioPosition.y] === 0){
                    mushroomsEaten++;
                }
                grid[marioPosition.x][marioPosition.y] = 1;
                marioPosition.x = marioPosition.x - 1;
                grid[marioPosition.x][marioPosition.y] = 2;
                count++;
                //re-render the canvas
                drawCanvas();
            }
            
        }else if(event.keyCode === 39){
            //right
            if(marioPosition.y < grid[0].length - 1){
                if(grid[marioPosition.x][marioPosition.y+1] === 0){
                    mushroomsEaten++;
                }
                grid[marioPosition.x][marioPosition.y] = 1;
                marioPosition.y = marioPosition.y +1;
                grid[marioPosition.x][marioPosition.y] = 2;
                count++;
                //re-render the canvas
                drawCanvas();
            }
            
        }else if(event.keyCode === 40){
            //down
            if(marioPosition.x < grid.length - 1){
                if(grid[marioPosition.x+1][marioPosition.y] === 0){
                    mushroomsEaten++;
                }
                grid[marioPosition.x][marioPosition.y] = 1;
                marioPosition.x = marioPosition.x +1;
                grid[marioPosition.x][marioPosition.y] = 2;
                count++;
                //re-render the canvas
                drawCanvas();
            }
        }
    }


