console.log('Tic Tac Toe Running');

jQuery(function($) {
    // Use a single array to hold all moves. This keeps 'state' in one place.
    var moves = [];
    var curPlayer = 'X';
    var moveCntr = 0;
    // All game winning combinations
    var winCombos = [[0, 1, 2],[0, 4, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[2, 4, 6],[3, 4, 5],[6, 7, 8]];

    // Set height so we have a true square
    var btnWidth = $(".game-box").outerWidth( true );
    // Add 6px to fill any gaps at diff screen heights between rows
    $('.inPlayBtn').outerHeight(btnWidth);

    // Display Message
    $('#msgBox').text(curPlayer + "'s Turn"); 

    
    function tictactoe(e) {
        var elemClicked = parseInt(e.target.id);
        
        // isNaN is used just in case a non-number gets through
        if (!isNaN(elemClicked)) {
            moves[elemClicked] = curPlayer;
            $('#' + elemClicked).text(curPlayer).attr('disabled', 'disabled');
            
            if (checkForWin(curPlayer)) {
                winner(curPlayer);
            }
            
            if (moveCntr === 8) {
                drawGame();
            }
            
            moveCntr++;
            curPlayer = curPlayer === "X" ? "O" : "X";
            $('#msgBox').text(curPlayer + "'s Turn");        }
        } // tictactoe
        
    // Add a single Event Listener to entire .playingSurface 
    // div not individual buttons. This is more efficient than
    // adding a large number or event listeners.
    $('#playingSurface').on('click', tictactoe); 
    
    function checkForWin(player) {
        function checkCombo(combo) {
            var j = 0;
            while (j < combo.length) {
                if (moves[combo[j]] !== player) {
                    return false;
                }
                if (j === 2) {
                    return true;
                }
                j++;
            }
            return false;
        }  // checkCombo

        for (var i = 0;i < winCombos.length;i++) {
            var combo = winCombos[i];
            if (checkCombo(combo)) {
                return true;
            }
        }

        return false;
    } // checkForWin

    function drawGame() {
        $('.modalMsg').text('Draw Game!!!');
        
        // Trigger the hidden modal box
        $('#hiddenModalBtn').trigger('click');
        // Turn off eventlistner 
        $('#playingSurface').off('click', tictactoe);
    }

    function winner(player) {
        var message = player + ' you won!!!';
        $('#msgBox').text(message);
        $('.modalMsg').text(message);
        
        // Trigger the hidden modal box        
        $('#hiddenModalBtn').trigger('click');
        // Turn off eventlistner
        $('#playingSurface').off('click', tictactoe);
    }   

    function newGame() {
        // Resets for a new game
        moves = [];
        curPlayer = 'X';
        moveCntr = 0;

        for(var k = 0;k < 9;k++) {
            $('#' + k).text(k + 1).removeAttr('disabled');
        }

        $('#msgBox').text(curPlayer + "'s Turn");

        // We now need to close the modal
        $('.modalClose').trigger('click');
        // Reset click listner
        $('#playingSurface').on('click', tictactoe);
    }

    // Start a new game
    $('.newGame').on('click',newGame);
       
}); // jQuery
