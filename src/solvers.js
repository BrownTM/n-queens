/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var solution = [];
  var step = 0;

  for (var i = 0; i < n; ++i) {
    var arr = [];
    for (var col = 0; col < n; ++col) {
      arr[col] = 0;
      if (col === step) {
        arr[col] = 1;
      }
    }
    solution.push(arr);
    ++step;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var result = function(n) {
    if (n === 1) {
      return 1;
    }
    return n * result(n - 1);
  };
  var solutionCount = result(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n});

  var solutions = function(row) {
    if (row === n) {
      return function() {
        return board.rows().map(function(row) {
          return row.slice();
        });
      };
    }
    for (var col = 0; col < n; ++col) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        var result = solutions(row + 1);
        if (result) {
          return result;
        }
      }
      board.togglePiece(row, col);
    }
  };
  solutions(0);

  var solution = board.rows();
  if (n === 1) {
    solution = [[1]];
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n});

  if (n === 2 || n === 3) {
    return solutionCount;
  }

  var solutions = function(row) {
    if (row === n) {
      return ++solutionCount;
    }
    for (var col = 0; col < n; ++col) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        solutions(row + 1);
      }
      board.togglePiece(row, col);
    }
  };
  solutions(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
