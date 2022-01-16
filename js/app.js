//El DOMContentLoaded es llança quan s'ha acabat de carregar el document HTML per complet sense tenir en compte les imatges i stylesheets.
document.addEventListener('DOMContentLoaded', function () {
    let score = 0;
    let timeLeft = 119;
    let cont = 1;
    const grid = document.getElementById("gridJuego");


    let divCountDown = document.getElementById("divStartGame");
    let btnStart = document.getElementById("btnStartGame");

    const colorsBorder = ["blue", "red", "white", "aqua", "purple"];
    let btnStartBorder = setInterval(()=>{
        let rand = Math.floor(Math.random() * parseInt(colorsBorder.length - 1));
        let color = colorsBorder[rand];
        btnStart.style.borderColor = color;
    }, 400);

    btnStart.addEventListener('click', startCountDown);

    function startCountDown(){
        let timerCountdown = 3;
        let countDownDone = false;

        clearInterval(btnStartBorder);

        btnStart.style.display = "none";
        document.getElementById("titleGame").style.display = "none";
        let countDownText = document.getElementById("timerStartGame");
        countDownText.style.display = "block";

        let countDown = setInterval(()=>{
            timerCountdown--;

            if(timerCountdown >= 0){
                countDownText.innerHTML = timerCountdown;
            }

            if(timerCountdown === 0){
                countDownText.innerHTML = "BUENA SUERTE!";
                countDownDone = true;
            }

            if(countDownDone){     
                clearInterval(countDown);
                divCountDown.style.display = "none";
                countDownText.style.display = "none";
                startGame();
            }

        }, 1000);
        
    }


    const btnBack = document.getElementById("btnHome");
    const btnBack2 = document.getElementById("btnHome2");
    btnBack2.addEventListener("click", backGamesScreen);
    btnBack.addEventListener("click", backGamesScreen);

    function backGamesScreen(){
        location.href="#";
    }


    

    function startGame(){
        let score = 0;
        let fraseComida = false;
        let contLetras = 0;

        document.body.style.background = "url(./media/img/dsx.jpg) no-repeat center center fixed";  
        document.body.style.backgroundSize = "cover";
        document.getElementById("gameContainer").style.display = "block";
        //Obtenim la referència de la nostre grid per poder treballar directament amb la const definida:
        
        

        grid.querySelectorAll('*').forEach(element => {
                element.remove();
            });
        //Sounds
        const gameOverSound = new Audio('./media/sounds/gameover.mp3');
        const chompSound = new Audio ('./media/sounds/chomp.mp3');
        const gameWinSound = new Audio ('./media/sounds/gameWinSound.wav');

        const textF = "FLEXIBILITAT: Es treballa amb una visió global del projecte. Això permet fer adaptacions fàcilment. S'entén el treball en grups com un avantatge, i això fa augmentar el talent de l'equip.";
        const textR = "RESPONSABILITAT: Es coneixen els objectius amb precisió i es treballa de manera continuada i intensiva. Es fan autoavaluacions metòdiques de la gestió del treball atent a indicacions pròpies o externes.";
        const textA = "AUTONOMIA: Quan s'ha de prendre una decisió i es disposa d'indicadors clars que la reforcin es desenvolupa una proposta i es du a terme. Sap gestionar el temps i els moments. S'entenen els errors com a aprenentatges.";
        const textS = "SOCIABILITAT: Es comunica intensivament tant en el temps i espai acadèmic com a fora d'ell. Dona i rep ajuda per igual. Hi ha comunicació amb la resta de l'equip que ajuda al procés d'aprenentatge.";
        const textE = "EVOLUCIÓ: Es treballa de manera constant, completant els fulls de ruta amb esperit crític. Hi ha preocupació entenent el sentit de cada tasca. Es detecta perocupació per extendre els coneixements més enllà dels proposats, buscant sorprendre.";
        let timeOver = false;

        // Definim el color de l'anell com a verd per defecte.
        document.getElementById("base-timer-path-remaining").style.color = "green";
        
        //Anem a definir el layout de la nostre grid i el contingut que tindrà en cada posició.
        let files = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 3, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 7, 1],
            [1, 1, 1, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 6, 0, 0, 6, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 6, 0, 0, 0, 0, 0, 6, 0, 8, 0, 0, 6, 0, 0, 0, 0, 0, 6, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 6, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 6, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [5, 5, 5, 5, 5, 5, 6, 0, 0, 4, 1, 5, 5, 5, 4, 4, 5, 5, 5, 1, 4, 0, 0, 6, 5, 5, 5, 5, 5, 5],
            [1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 5, 5, 5, 4, 4, 5, 5, 5, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 5, 5, 5, 5, 5, 5, 5, 5, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 6, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 6, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 6, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 6, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 9, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 10, 0, 0, 1],
            [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 6, 0, 0, 1, 1, 0, 0, 6, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
            [1, 0, 0, 6, 0, 0, 0, 1, 1, 0, 1, 1, 1, 6, 0, 0, 6, 1, 1, 1, 0, 1, 1, 0, 0, 0, 6, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ]

        //Un cop definit el contingut de la grid, per que quedi més clar:
        //0 - Caselles amb boletes petites 
        //1 - Murs
        //2 - Terreny dels enemics
        //3 - Caselles amb boles grans (Lletres de la FRASE)
        //4 - Caselles sense boles

        //Creem un array sense elements on guardarem tots els elements del nostre div grid.
        let elements = []

        //Un cop tenim tot això, podem començar a dibuixar la nostre grid i renderitzar-la amb la següent funció:
        function dibuixarGridBidimensional() {
            for (let i = 0; i < files.length; i++) {
                const arrayFila = [];
                for (let y = 0; y < files[i].length; y++) {
                    const quadrat = document.createElement('div');

                    if (files[i][y] === 0) {
                        quadrat.classList.add('small-dots');
                    
                    } else if (files[i][y] === 1) {
                        //Casos en els que estiguem dins de la grid, per dintre de la primera i última fila i columna.
                        if (y > 0 && y < (files[i].length - 1) && i > 0 && i < (files.length - 1)) {
                            if (files[i][y - 1] === 1 && files[i][y + 1] === 1 && files[i - 1][y] === 1 && files[i + 1][y] !== 1) {
                                quadrat.classList.add('wall', 'bot');

                            } else if (files[i][y - 1] === 1 && files[i][y + 1] === 1 && files[i + 1][y] === 1 && files[i - 1][y] !== 1) {
                                quadrat.classList.add('wall', 'top');

                            } else if (files[i][y - 1] !== 1 && files[i][y + 1] === 1 && files[i + 1][y] === 1 && files[i - 1][y] === 1) {
                                quadrat.classList.add('wall', 'left');

                            } else if (files[i][y - 1] === 1 && files[i][y + 1] !== 1 && files[i + 1][y] === 1 && files[i - 1][y] === 1) {
                                quadrat.classList.add('wall', 'right');

                            } else if (files[i][y - 1] !== 1 && files[i][y + 1] === 1 && files[i - 1][y] !== 1 && files[i + 1][y] === 1) {
                                quadrat.classList.add('wall', 'left', 'top');

                            } else if (files[i][y - 1] === 1 && files[i][y + 1] !== 1 && files[i - 1][y] !== 1 && files[i + 1][y] === 1) {
                                quadrat.classList.add('wall', 'right', 'top');

                            } else if (files[i][y - 1] == !1 && files[i][y + 1] === 1 && files[i - 1][y] === 1 && files[i + 1][y] !== 1) {
                                quadrat.classList.add('wall', 'left', 'bot');

                            } else if (files[i][y - 1] === 1 && files[i][y + 1] !== 1 && files[i - 1][y] === 1 && files[i + 1][y] !== 1) {
                                quadrat.classList.add('wall', 'right', 'bot');
                            } else if (files[i][y - 1] !== 1 && files[i][y + 1] !== 1 && files[i - 1][y] === 1 && files[i + 1][y] === 1) {
                                quadrat.classList.add('wall', 'right', 'left');
                            } else if (files[i][y - 1] === 1 && files[i][y + 1] === 1 && files[i - 1][y] !== 1 && files[i + 1][y] !== 1) {
                                quadrat.classList.add('wall', 'top', 'bot');
                            } else if (files[i][y - 1] !== 1 && files[i][y + 1] === 1 && files[i - 1][y] === 1 && files[i + 1][y] !== 1) {
                                quadrat.classList.add('wall', 'left', 'bot');
                            } else if (files[i][y - 1] === 1 && files[i][y + 1] !== 1 && files[i - 1][y] !== 1 && files[i + 1][y] !== 1) {
                                quadrat.classList.add('wall', 'right', 'bot', 'top');
                            } else if (files[i][y - 1] !== 1 && files[i][y + 1] === 1 && files[i - 1][y] !== 1 && files[i + 1][y] !== 1) {
                                quadrat.classList.add('wall', 'left', 'bot', 'top');
                            } else {
                                quadrat.classList.add('wall');
                            }
                            //Cas d'estar a l'última fila.
                        } else if (y >= 0 && y < files[i].length && i == (files.length - 1)) {
                            if (files[i][y - 1] === 1 && files[i][y + 1] === 1 && files[i - 1][y] !== 1) {
                                quadrat.classList.add('wall', 'top');
                            } else {
                                quadrat.classList.add('wall');
                            }
                            //Cas d'estar a la primera fila
                        } else if (y >= 0 && y < files[i].length && i == 0) {
                            if (files[i][y - 1] === 1 && files[i][y + 1] === 1 && files[i + 1][y] !== 1) {
                                quadrat.classList.add('wall', 'bot');
                            } else {
                                quadrat.classList.add('wall');
                            }


                            //Cas d'estar a la primera columna
                        } else if (y == 0 && i > 0 && i < files.length) {
                            if (files[i][y + 1] !== 1 && files[i + 1][y] === 1 && files[i - 1][y] === 1) {
                                quadrat.classList.add('wall', 'right');
                            } else if (files[i + 1][y] !== 1 && files[i - 1][y] === 1) {
                                quadrat.classList.add('wall', 'bot');
                            } else if (files[i + 1][y] === 1 && files[i - 1][y] !== 1) {
                                quadrat.classList.add('wall', 'top');
                            } else {
                                quadrat.classList.add('wall');
                            }
                            //Cas d'estar a la última columna
                        } else if (y  < files[i].length && i > 0 && i < files.length) {
                            if (files[i][y - 1] !== 1 && files[i + 1][y] === 1 && files[i - 1][y] === 1) {
                                quadrat.classList.add('wall', 'left');
                            } else if (files[i + 1][y] !== 1 && files[i - 1][y] === 1) {
                                quadrat.classList.add('wall', 'bot');
                            } else if (files[i + 1][y] === 1 && files[i - 1][y] !== 1) {
                                quadrat.classList.add('wall', 'top');
                            } else {
                                quadrat.classList.add('wall');
                            }
                        }
                    } else if(files[i][y] === 2){
                        quadrat.classList.add('enemy-territory');
                    } else if (files[i][y] === 3) {
                        quadrat.classList.add('F', 'big-dots');
                    }else if(files[i][y] === 5){
                        quadrat.classList.add('no-enemies');
                    }else if(files[i][y] === 6){
                        quadrat.classList.add('small-dots');
                        if(files[i][y + 1] === 0){
                            quadrat.classList.add('intersection-right');
                        }
                        if(files[i][y - 1] === 0){
                            quadrat.classList.add('intersection-left');
                        }
                        if(files[i + 1][y] === 0){
                            quadrat.classList.add('intersection-bot');
                        }
                        if(files[i - 1][y] === 0){
                            quadrat.classList.add('intersection-top');
                        }
                    }else if(files[i][y] === 7){
                        quadrat.classList.add('R', 'big-dots');
                    }else if(files[i][y] === 8){
                        quadrat.classList.add('A', 'big-dots');
                    }else if(files[i][y] === 9){
                        quadrat.classList.add('S', 'big-dots');
                    }else if(files[i][y] === 10){
                        quadrat.classList.add('E', 'big-dots');
                    }
                    
                    arrayFila.push(quadrat);
                    grid.appendChild(quadrat);
                }
                //Un cop iterada la fila sencera, guardem els divs creats en el nostre array on guardem els elements. 
                elements.push(arrayFila);

            }
        }

    

        dibuixarGridBidimensional();
        
        const last2KeysPressed = [];

        let posicioY = (17);
        let posicioX = (15);
        elements[posicioY][posicioX].className = 'character';
        

        //Funció per moure el nostre caracter.
        function moveCharacter(moves){ 
            let moveCorrect = false;
            
            if(moves.length > 0){
                move = moves[0];

                elements[posicioY][posicioX].classList.remove('character');

                switch (move) {
                    case 37:
                        if(posicioX == 0 && posicioY == 13){
                            posicioX = 30;
                        }
                        if(!elements[posicioY][posicioX - 1].classList.contains('wall') && !elements[posicioY][posicioX - 1].classList.contains('enemy-territory')){
                            posicioX--;
                            
                                                                        
                        }
                        break;
                    case 38: 
                        if(!elements[posicioY - 1][posicioX].classList.contains('wall') && !elements[posicioY - 1][posicioX].classList.contains('enemy-territory')){
                            posicioY--;  
                            
                        }
                        break;
                    case 39:
                        if(posicioX == 29 && posicioY == 13){
                            posicioX = 0;
                        }
                        if(!elements[posicioY][posicioX + 1].classList.contains('wall') && !elements[posicioY][posicioX + 1].classList.contains('enemy-territory')){
                            posicioX++;  
                            
                        }
                        break;
                    case 40:
                        if(!elements[posicioY + 1][posicioX].classList.contains('wall') && !elements[posicioY + 1][posicioX].classList.contains('enemy-territory')){
                            posicioY++;
                            
                        }
                        break;
                    default:
                        break;
                }

                if(checkScore(posicioY, posicioX)){
                    document.getElementById('score').innerHTML = score;
                }

                if(elements[posicioY][posicioX].classList.contains('no-enemies')){
                    elements[posicioY][posicioX].classList.add('character');
                    
                }else if(elements[posicioY][posicioX].classList.contains('small-dots') || 
                        elements[posicioY][posicioX].classList.contains('big-dots')){
                    elements[posicioY][posicioX].className = 'character';

                }else if(elements[posicioY][posicioX].classList.contains('enemy')){
                    elements[posicioY][posicioX].classList.add('character');

                }else{
                    elements[posicioY][posicioX].className = 'character';
                }

                checkGameEnd();


                if(move == 37){
                    document.querySelector('.character').style.transform='rotate(180deg)';
                    elements[posicioY][posicioX + 1].style.transform = null;
                }else if(move == 38){
                    document.querySelector('.character').style.transform='rotate(270deg)';
                    elements[posicioY - 1][posicioX].style.transform = null;
                }else if(move == 39){
                    document.querySelector('.character').style.transform='rotate(0deg)';
                    elements[posicioY][posicioX - 1].style.transform = null;
                }else if(move == 40){
                    document.querySelector('.character').style.transform='rotate(90deg)';
                    elements[posicioY + 1][posicioX].style.transform = null;
                }

                    
                
                if(moves.length > 1){
                    moveCorrect = trySecondMove(moves[1], posicioX, posicioY);
                }

                

                if(moveCorrect){
                    moves[0] = moves[1];
                    moves.pop();
                }

            }
                    
        }

        //Comprovem si el segon moviment es pot realitzar o hi ha un mur/territori enemic.
        function trySecondMove(key2, posicioX, posicioY){
            let moveDone = false;
            switch (key2) {
                case 37:
                    if(!elements[posicioY][posicioX - 1].classList.contains('wall') && !elements[posicioY][posicioX - 1].classList.contains('enemy-territory')){
                        posicioX--;
                        moveDone = true;
                        
                    }
                    break;
                case 38: 
                    if(!elements[posicioY - 1][posicioX].classList.contains('wall') && !elements[posicioY - 1][posicioX].classList.contains('enemy-territory')){
                        posicioY--;
                        moveDone = true;
                    }
                    break;
                case 39:
                    if(!elements[posicioY][posicioX + 1].classList.contains('wall') && !elements[posicioY][posicioX + 1].classList.contains('enemy-territory')){
                        posicioX++;
                        moveDone = true;
                    }
                    break;
                case 40:
                    if(!elements[posicioY + 1][posicioX].classList.contains('wall') && !elements[posicioY + 1][posicioX].classList.contains('enemy-territory')){
                        posicioY++;
                        moveDone = true;
                    }
                    break;
                default:
                    break;
            }
            return moveDone;
        }

        //Sumem la puntuació 
        function checkScore(posicioY, posicioX){
            let isDot = false;
            if(elements[posicioY][posicioX].classList.contains('small-dots')){
                score++;
                isDot  = true;
            }else if(elements[posicioY][posicioX].classList.contains('big-dots')){
                score = score + 5;
                isDot = true;

                contLetras++;
                if(contLetras == 5){
                    fraseComida = true;
                }

                if(elements[posicioY][posicioX].classList.contains('F')){
                    document.getElementById("f").style.color = "red";
                    showTextFrase('f');
                }else if(elements[posicioY][posicioX].classList.contains('R')){
                    document.getElementById("r").style.color = "red";
                    showTextFrase('r');
                }else if(elements[posicioY][posicioX].classList.contains('A')){
                    document.getElementById("a").style.color = "red";
                    showTextFrase('a');
                }else if(elements[posicioY][posicioX].classList.contains('S')){
                    document.getElementById("s").style.color = "red";
                    showTextFrase('s');
                }else if(elements[posicioY][posicioX].classList.contains('E')){
                    document.getElementById("e").style.color = "red";
                    showTextFrase('e');
                }
            }
            checkGameEnd();

            // console.log(score);
            return isDot;
        }

        //Event listener que s'activarà quan apretem una tecla.
        document.addEventListener('keydown', saveLastMoves);

        //Funció per guardar els 2 últims moviments (l'actual i el que es vol fer a continuació)
        function saveLastMoves(key){
            let move = key.keyCode;
            if(move >= 37 && move <= 40){
                if(last2KeysPressed.length <= 1){
                    last2KeysPressed.push(move);
                    // console.log("Key pressed: " + move);
                }else{
                    last2KeysPressed.pop();
                    last2KeysPressed.push(move);
                    // console.log("Key substituida per " + move);
                }
            }
            
            // console.log(last2KeysPressed);
        }

        //Interval per moure el nostre personatge.
        let myVar = setInterval(function() {moveCharacter(last2KeysPressed)}, 150);


        //Creem una classe pels enemics 
        class Ghost{
            constructor(className, IndexYRespawn, IndexXRespawn, speed){
                this.className = className;
                this.IndexXRespawn = IndexXRespawn;
                this.IndexYRespawn = IndexYRespawn;
                this.speed = speed;
                this.currentIndexX = IndexXRespawn;
                this.currentIndexY = IndexYRespawn;
                this.timerId = NaN;
                this.isScared = false;
                this.outOfHouse = false;
            }
        }
        // const enemies = [
        //     new Ghost('enemy1', 13, 14,500)
        // ];

        const enemies = [
            new Ghost('enemy1', 13, 14, 500),
            new Ghost('enemy2', 14, 14, 550),
            new Ghost('enemy3', 13, 15, 600),
            new Ghost('enemy4', 14, 15, 400)   
        ];

        //Dibuixem els enemics. Els hi donem la classe que contingui el nom que li hem donat i la classe 'enemy' per poder localitzar-lo en cas de
        //haver de consultar si hi ha hagut colisió amb un enemic.
        enemies.forEach(enemy => {
            elements[enemy.IndexYRespawn][enemy.IndexXRespawn].classList.add(enemy.className);
            elements[enemy.IndexYRespawn][enemy.IndexXRespawn].classList.add('enemy');
        });

        enemies.forEach(enemy => moveEnemy(enemy));
        // enemies.forEach(enemy => moveToRandom(enemy));

        //Creem funció per moure els enemics (de manera random)
        function moveEnemy(enemy){
            let firstYPosition = enemy.currentIndexY;
            let firstXPosition = enemy.currentIndexX;
            

            const directionsXorY = [1, 2];
            const directions = [-1, +1];
            //Agafem un número random de l'array de possibles direccions (Com només tenim 2 possibilitats per la X i per la Y, l'array és de 2 elements).
            //Amb el math.floor arrodonim per evitar problemes.
            let directionYorX = directionsXorY[Math.floor(Math.random() * directionsXorY.length)];
            let direction = directions[Math.floor(Math.random() * directions.length)];
            enemy.timerId = setInterval(function(){
                //Direm que si el número que hem obtingut de manera random és 1, intentarem moure l'eix Y de l'enemic.
                if(directionYorX === 1){
                    if(!elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.contains('wall') &&
                    !elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.contains('enemy') && 
                    !elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.contains('no-enemies')){

                        elements[enemy.currentIndexY][enemy.currentIndexX].classList.remove(enemy.className, 'enemy');
                        
                        if(elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.contains('small-dots')){
                            elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.remove('small-dots');
                            elements[enemy.currentIndexY + direction][enemy.currentIndexX].className = 'small-dots-again';
                            
            
                        }else if (elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.contains('big-dots')){
                                elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.remove('big-dots');
                                elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.add('big-dots-again');
                            
                                if(elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.contains('F')){
                                    elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.remove('F');
                                    elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.add('F-again');
                                }else if(elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.contains('R')){
                                    elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.remove('R');
                                    elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.add('R-again');
                                }else if(elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.contains('A')){
                                    elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.remove('A');
                                    elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.add('A-again');
                                }else if(elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.contains('S')){
                                    elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.remove('S');
                                    elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.add('S-again');
                                }else if(elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.contains('E')){
                                    elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.remove('E');
                                    elements[enemy.currentIndexY + direction][enemy.currentIndexX].classList.add('E-again');
                                }
                        }

                        enemy.currentIndexY += direction;
                        
                        elements[enemy.currentIndexY][enemy.currentIndexX].style.transform = null;
                        

                        elements[enemy.currentIndexY][enemy.currentIndexX].classList.add(enemy.className, 'enemy');
                        
                        if(direction === +1){
                            if(elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.contains('small-dots-again') &&
                            !elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.contains('wall')){
                                elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.remove('small-dots-again');
                                elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.add('small-dots');
                            }else if (elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.contains('big-dots-again') && 
                            !elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.contains('wall')){
                                if(elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.contains('big-dots-again')){
                                    elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.remove('big-dots-again');
                                    elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.add('big-dots');
                                }

                                if(elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.contains('F-again')){
                                    elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.remove('F-again');
                                    elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.add('F');
                                }else if(elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.contains('R-again')){
                                    elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.remove('R-again');
                                    elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.add('R');
                                }else if(elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.contains('A-again')){
                                    elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.remove('A-again');
                                    elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.add('A');
                                }else if(elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.contains('S-again')){
                                    elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.remove('S-again');
                                    elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.add('S');
                                }else if(elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.contains('E-again')){
                                    elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.remove('E-again');
                                    elements[enemy.currentIndexY - 1][enemy.currentIndexX].classList.add('E');
                                }
                            }
                        }else{
                            if(elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.contains('small-dots-again') &&
                            !elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.contains('wall')){
                                elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.remove('small-dots-again')
                                elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.add('small-dots');
                            }else if (elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.contains('big-dots-again') &&
                            !elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.contains('wall')){
                                if(elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.contains('big-dots-again')){
                                    elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.remove('big-dots-again');
                                    elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.add('big-dots');

                                    if(elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.contains('F-again')){
                                        elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.remove('F-again');
                                        elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.add('F');
                                    }else if(elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.contains('R-again')){
                                        elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.remove('R-again');
                                        elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.add('R');
                                    }else if(elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.contains('A-again')){
                                        elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.remove('A-again');
                                        elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.add('A');
                                    }else if(elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.contains('S-again')){
                                        elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.remove('S-again');
                                        elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.add('S');
                                    }else if(elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.contains('E-again')){
                                        elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.remove('E-again');
                                        elements[enemy.currentIndexY + 1][enemy.currentIndexX].classList.add('E');
                                    }
                                }
                            }
                        }
                        
                    //Si no es pot moure en la direcció que hem obtingut, tornem a buscar una nova direcció.
                    }else{
                        directionYorX = directionsXorY[Math.floor(Math.random() * directionsXorY.length)];
                        direction = directions[Math.floor(Math.random() * directions.length)];
                    }

                //En cas contrari intentarem moure l'eix X.
                }else{
                    if(!elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.contains('wall') &&
                    !elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.contains('enemy') &&
                    !elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.contains('no-enemies')){

                        elements[enemy.currentIndexY][enemy.currentIndexX].classList.remove(enemy.className, 'enemy'); 
                            
                        if(elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.contains('small-dots')){
                            elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.remove('small-dots');
                            elements[enemy.currentIndexY][enemy.currentIndexX + direction].className = 'small-dots-again';
                            
            
                        }else if (elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.contains('big-dots')){
                                elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.remove('big-dots');
                                elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.add('big-dots-again');
                            
                                if(elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.contains('F')){
                                    elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.remove('F');
                                    elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.add('F-again');
                                }else if(elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.contains('R')){
                                    elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.remove('R');
                                    elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.add('R-again');
                                }else if(elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.contains('A')){
                                    elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.remove('A');
                                    elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.add('A-again');
                                }else if(elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.contains('S')){
                                    elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.remove('S');
                                    elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.add('S-again');
                                }else if(elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.contains('E')){
                                    elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.remove('E');
                                    elements[enemy.currentIndexY][enemy.currentIndexX + direction].classList.add('E-again');
                                }
                        }
                        
                        enemy.currentIndexX += direction;
                        elements[enemy.currentIndexY][enemy.currentIndexX].style.transform = null;
                        
                    

                        elements[enemy.currentIndexY][enemy.currentIndexX].classList.add(enemy.className, 'enemy');

                        if(direction === +1){
                            if(elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.contains('small-dots-again') &&
                            !elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.contains('wall')){
                                elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.remove('small-dots-again');
                                elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.add('small-dots');
                            }else if (elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.contains('big-dots-again') && 
                            !elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.contains('wall')){
                                if(elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.contains('big-dots-again')){
                                    elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.remove('big-dots-again');
                                    elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.add('big-dots');

                                    if(elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.contains('F-again')){
                                        elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.remove('F-again');
                                        elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.add('F');
                                    }else if(elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.contains('R-again')){
                                        elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.remove('R-again');
                                        elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.add('R');
                                    }else if(elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.contains('A-again')){
                                        elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.remove('A-again');
                                        elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.add('A');
                                    }else if(elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.contains('S-again')){
                                        elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.remove('S-again');
                                        elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.add('S');
                                    }else if(elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.contains('E-again')){
                                        elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.remove('E-again');
                                        elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.add('E');
                                    }
                                }
                            }
                        }else{
                            if(elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.contains('small-dots-again') &&
                            !elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.contains('wall')){
                                elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.remove('small-dots-again');
                                elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.add('small-dots');
                            }else if (elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.contains('big-dots-again') &&
                            !elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.contains('wall')){
                                if(elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.contains('big-dots-again')){
                                    elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.remove('big-dots-again');
                                    elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.add('big-dots');

                                    if(elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.contains('F-again')){
                                        elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.remove('F-again');
                                        elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.add('F');
                                    }else if(elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.contains('R-again')){
                                        elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.remove('R-again');
                                        elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.add('R');
                                    }else if(elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.contains('A-again')){
                                        elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.remove('A-again');
                                        elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.add('A');
                                    }else if(elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.contains('S-again')){
                                        elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.remove('S-again');
                                        elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.add('S');
                                    }else if(elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.contains('E-again')){
                                        elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.remove('E-again');
                                        elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.add('E');
                                    }
                                }
                            }
                        }
                    }else{
                        directionYorX = directionsXorY[Math.floor(Math.random() * directionsXorY.length)];
                        direction = directions[Math.floor(Math.random() * directions.length)];
                    }
                }
                
                checkGameEnd();
                elements[enemy.currentIndexY][enemy.currentIndexX].style.transform = null; 
                //Volem que l'enemic es mogui tant rapid com la seva velocitat sigui.
            }, enemy.speed);
        }

        //Funció per comprovar si el personatge ha estat menjat per un enemic.
        function checkGameOver(){
            if(timeOver){
                // console.log(elements[posicioY][posicioX].style.transform = null);
                enemies.forEach(enemy => clearInterval(enemy.timerId));
                //Fem que el nostre personatge no es pugui moure.
                clearInterval(myVar); 
                clearInterval(gameON); 
                clearInterval(timer);
                document.removeEventListener('keydown', saveLastMoves);
                gameOverSound.play();
                openModal();
            }else{
                if(elements[posicioY][posicioX].classList.contains('enemy') && elements[posicioY][posicioX].classList.contains('character') &&
                !elements[posicioY][posicioX].classList.contains('scared-enemy')){
                    //Fem que els enemics no es moguin mes        
                    // elements[posicioY][posicioX].style.transform = null;
                    enemies.forEach(enemy => clearInterval(enemy.timerId));
                    //Fem que el nostre personatge no es pugui moure.
                    clearInterval(myVar); 
                    clearInterval(gameON); 
                    clearInterval(timer);
                    document.removeEventListener('keydown', saveLastMoves);
                    gameOverSound.play();
                    openModal(); 
                }
            }
            
        }

        function checkGameWin(){
            if(score === 280){
                // console.log("POSICIO Y FINAL: " + posicioY);
                // console.log("POSICIO X FINAL: " + posicioX);
                score += timeLeft;
                elements[posicioY][posicioX].style.transform = null;
                enemies.forEach(enemy => clearInterval(enemy.timerId));
                //Fem que el nostre personatge no es pugui moure.
                // console.log("YOU WON");
                clearInterval(myVar); 
                clearInterval(gameON); 
                document.removeEventListener('keydown', saveLastMoves);
                gameWinSound.play();
                clearInterval(timer);
                setTimeout(function(){
                    openModal();
                }, 1000);
                
            }
        }

        function checkGameEnd(){
            let textFinal = "";
            let juegoTerminado = false;

            if(fraseComida){
                
                textFinal = "YOU WON!";
                if(timeOver){
                    gameWinSound.play();
                    juegoTerminado = true;
                    stopMovement();
                    

                }else if(score === 280){
                    gameWinSound.play();
                    juegoTerminado = true;
                    score += timeLeft;
                    console.log(score);
                    elements[posicioY][posicioX].style.transform = null;
                    stopMovement();
                    
                    
                }else if(elements[posicioY][posicioX].classList.contains('enemy') && elements[posicioY][posicioX].classList.contains('character') &&
                !elements[posicioY][posicioX].classList.contains('scared-enemy')){
                    gameWinSound.play();
                    juegoTerminado = true;
                    //Fem que els enemics no es moguin mes        
                    stopMovement();
                }

                if(juegoTerminado){
                    console.log("JUEGO TERMINADO");
                    // insertGameUser();
                    setTimeout(function(){
                        openModal(textFinal);
                    }, 1000);
                }

            }else{
                textFinal = "GAME OVER";
                if(timeOver){
                    // console.log(elements[posicioY][posicioX].style.transform = null);
                    stopMovement();
                    gameOverSound.play();
                    openModal(textFinal);
                }else{
                    if(elements[posicioY][posicioX].classList.contains('enemy') && elements[posicioY][posicioX].classList.contains('character') &&
                    !elements[posicioY][posicioX].classList.contains('scared-enemy')){
                        //Fem que els enemics no es moguin mes        
                        stopMovement();
                        gameOverSound.play();
                        openModal(textFinal); 
                    }
                }
            }
        }

        function stopMovement(){
            enemies.forEach(enemy => clearInterval(enemy.timerId));
            //Fem que el nostre personatge no es pugui moure.
            clearInterval(myVar); 
            clearInterval(gameON); 
            clearInterval(timer);
            document.removeEventListener('keydown', saveLastMoves);
        }

        // function insertGameUser() {
        //     const opciones = {
        //         method: 'POST',
        //         body: JSON.stringify({action: 'updateUserGame', score: score})
        //     }
        //     fetch('./php_librarys/bd.php', opciones)
            
        // }


        function openModal(textFinal){
            let modal = document.getElementById("myModal");
           

            document.getElementById("textFinal").innerHTML = textFinal;
            document.getElementById("lastScore").innerHTML = "Your score is: " + score;
            // showRanking();
            modal.style.display = "block"; 
            btnBack.style.display = "none";  
        
        }

        // function showRanking(){
        //     let tablaRanking = document.getElementById("ranking");
        //     tablaRanking.innerHTML = "";
        //     const opcion = {
        //         method: 'POST',
        //         body: JSON.stringify({action: 'selectScores'})
        //     }

                        
        //     fetch('./php_librarys/bd.php', opcion)
        //     .then(respuesta => respuesta.json())
        //     .then(resultado => {
                
        //         cont = 1; 
        //         resultado.forEach(user => {
                    
        //             tablaRanking.innerHTML += `
        //             <tr>
        //                 <th>${cont}</th>
        //                 <th>${user.nickname}</th>
        //                 <th>${user.score}</th>
        //             </tr>`
        //             cont++;
        //         });
        //     });

        // }


        function moveToRandom(enemy){
            let maxX = 29;
            let maxY = 27;

            let pointX = Math.floor(Math.random() * maxX);
            let pointY = Math.floor(Math.random() * maxY);

            let firstYPosition = enemy.currentIndexY;
            let firstXPosition = enemy.currentIndexX;

            if(!elements[pointY][pointX].classList.contains('wall') 
            && !elements[pointY][pointX].classList.contains('no-enemies') 
            && !elements[pointY][pointX].classList.contains('enemy-territory')){
                if(Math.abs((pointX - firstXPosition)) >= Math.abs((pointY - firstYPosition))){
                    if(firstXPosition < pointX){
                        if(!elements[firstYPosition][firstYPosition + 1].classList.contains('wall') 
                        && !elements[firstYPosition][firstYPosition + 1].classList.contains('no-enemies') 
                        && !elements[firstYPosition][firstYPosition + 1].classList.contains('enemy-territory')){
        
                        elements[enemy.currentIndexY][enemy.currentIndexX].classList.remove(enemy.className, 'enemy');
                        
                        if(elements[enemy.currentIndexY][enemy.currentIndexX  + 1].classList.contains('small-dots')){
                            elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.remove('small-dots');
                            elements[enemy.currentIndexY][enemy.currentIndexX + 1].className = 'small-dots-again';
                            
            
                        }else if (elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.contains('big-dots')){
                                elements[enemy.currentIndexY][enemy.currentIndexX + 1].classList.remove('big-dots');
                                elements[enemy.currentIndexY][enemy.currentIndexX + 1].className = 'big-dots-again';
                        }

                        enemy.currentIndexX += 1;
                        
                        elements[enemy.currentIndexY][enemy.currentIndexX].style.transform = null;
                        

                        elements[enemy.currentIndexY][enemy.currentIndexX].classList.add(enemy.className, 'enemy');
                        
                        
                        if(elements[enemy.currentIndexY][enemy.currentIndexX].classList.contains('small-dots-again') &&
                        !elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.contains('wall')){

                            elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.add('small-dots');

                        }else if (elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.contains('big-dots-again') && 
                        !elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.contains('wall')){

                            if(elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.contains('big-dots-again')){

                                elements[enemy.currentIndexY][enemy.currentIndexX - 1].classList.remove('big-dots-again');
                                elements[enemy.currentIndexY][enemy.currentIndexX - 1].className = 'big-dots';
                            }
                        }
        
        
                        }else{
                            pointX = Math.floor(Math.random() * maxX); 
                        }

                    }else if(firstXPosition > pointX){
                        if(!elements[firstYPosition][firstYPosition - 1].classList.contains('wall') 
                        && !elements[firstYPosition][firstYPosition - 1].classList.contains('no-enemies') 
                        && !elements[firstYPosition][firstYPosition - 1].classList.contains('enemy-territory')){
        
                            //Movem l'enemic
        
        
                        }else{
                            pointX = Math.floor(Math.random() * maxX); 
                        }

                    }else{

                    }         
        
                }else{
                    if(firstYPosition < pointY){
                        if(!elements[firstYPosition + 1][firstYPosition].classList.contains('wall') 
                        && !elements[firstYPosition + 1][firstYPosition].classList.contains('no-enemies') 
                        && !elements[firstYPosition + 1][firstYPosition].classList.contains('enemy-territory')){
        
                            //Movem l'enemic
        
        
                        }else{
                            pointY = Math.floor(Math.random() * maxY); 
                        }

                    }else if(firstXPosition > pointX){
                        if(!elements[firstYPosition - 1][firstYPosition].classList.contains('wall') 
                        && !elements[firstYPosition - 1][firstYPosition].classList.contains('no-enemies') 
                        && !elements[firstYPosition - 1][firstYPosition].classList.contains('enemy-territory')){
        
                            //Movem l'enemic
        
        
                        }else{
                            pointY = Math.floor(Math.random() * maxY); 
                        }

                    }else{

                    }
                }
                


            }else{
                pointX = Math.floor(Math.random() * maxX);
                pointY = Math.floor(Math.random() * maxY);
            }
        }

        
        //Timer del joc
        
        let timer = setInterval(function(){
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timeLeft -= 1;
            // console.log(minutes + ':' + seconds);
            if(seconds < 10){
                if(minutes < 1){
                    document.getElementById("base-timer-label").innerHTML = '0' + minutes + " : " + '0' + seconds;
                }else{
                    document.getElementById("base-timer-label").innerHTML = minutes + " : " + '0' + seconds;
                }
                
            }else{
                document.getElementById("base-timer-label").innerHTML = minutes + " : " + seconds;
            }

            //Canviem el color de l'anell segons el temps restant
            if(timeLeft === 60){
                document.getElementById("base-timer-path-remaining").style.color = "yellow";
            }else if(timeLeft === 20){
                document.getElementById("base-timer-path-remaining").style.color = "red";
            }else if(timeLeft < 0){
                timeOver = true;
            }

            setCircleDasharray();
            
        }, 1000);
        
        function calculateTimeFraction() {
            return timeLeft / 119;
        }
            
        // Hem d'anar canviant el valor del dashArray segons passa el temps.
        //283 és la longitud del nostre anell (2 * pi * radi)
        function setCircleDasharray() {
            let fraccioTempsRestant =  calculateTimeFraction();
            const circleDasharray = (fraccioTempsRestant * 283); //Anem modificant la fracció de temps a mesura que ens quedem sense temps.
            document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", (circleDasharray + ' 283')); //Amb l'atribut stroke-dasharray definim el traç de la figura que volem dibuixar.
        }



        //Loop per anar comprovant si hem perdut.
        function gameLoop(){
            checkGameEnd();

        }

        let gameON = setInterval(gameLoop, 1000/75);

    

        function showTextFrase(lletra){
            switch (lletra) {
                case 'f':
                    document.getElementById("textFrase").innerHTML= textF;
                    break;
                case 'r':
                    document.getElementById("textFrase").innerHTML= textR;
                    break;
                case 'a':
                    document.getElementById("textFrase").innerHTML= textA;
                    break;
                case 's':
                    document.getElementById("textFrase").innerHTML= textS;
                    break;
                case 'e':
                    document.getElementById("textFrase").innerHTML= textE;
                    break;
            }
        }




        let btnPlayAgain = document.getElementById("btnPlayAgain");
        
        btnPlayAgain.addEventListener("click", restartGame);

        function restartGame(){
            // removeEventListener("click", restartGame);
            // let modal = document.getElementById("myModal");

            // grid.querySelectorAll('*').forEach(element => {
            //     element.remove();
            // });

            // console.log(grid.childElementCount);
            // modal.style.display = "none";
            // document.getElementById("gameContainer").style.display = "none";
            // document.getElementById("timerStartGame").style.display = "block";
            // score = 0;
            // startCountDown();

            location.reload();
        }



    }

});