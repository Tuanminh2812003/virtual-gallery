import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';

const piecesData = [
  { id: 1, image: '/game/image1.png', x: 400, y: 0, correctPosition: { x: 0, y: 100 } },
  { id: 2, image: '/game/image2.jfif', x: 500, y: 0, correctPosition: { x: 200, y: 0 } },
  { id: 3, image: '/game/image3.png', x: 400, y: 100, correctPosition: { x: 200, y: 100 } },
  { id: 4, image: '/game/image4.png', x: 500, y: 100, correctPosition: { x: 100, y: 200 } },
  { id: 5, image: '/game/image5.png', x: 400, y: 200, correctPosition: { x: 100, y: 0 } },
  { id: 6, image: '/game/image6.png', x: 500, y: 200, correctPosition: { x: 100, y: 100 } },
  { id: 7, image: '/game/image7.png', x: 400, y: 300, correctPosition: { x: 0, y: 0 } },
  { id: 8, image: '/game/image8.png', x: 500, y: 300, correctPosition: { x: 200, y: 200 } },
  { id: 9, image: '/game/image9.png', x: 450, y: 400, correctPosition: { x: 0, y: 200 } },
];

const PuzzlePiece = ({ id, image, x, y }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PIECE',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        width: 100,
        height: 100,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        position: 'absolute',
        top: y,
        left: x,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    />
  );
};

const PuzzleBoard = ({ pieces, setPieces, setIsComplete }) => {
  const [, drop] = useDrop(() => ({
    accept: 'PIECE',
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();

      if (clientOffset) {
        const boardRect = document.getElementById('puzzle-board').getBoundingClientRect();
        const cellSize = 100;
        const offsetX = clientOffset.x - boardRect.left;
        const offsetY = clientOffset.y - boardRect.top;

        const col = Math.floor(offsetX / cellSize) * cellSize;
        const row = Math.floor(offsetY / cellSize) * cellSize;

        setPieces((prevPieces) => {
          return prevPieces.map((piece) => {
            if (piece.id === item.id) {
              if (col === piece.correctPosition.x && row === piece.correctPosition.y) {
                return { ...piece, x: col, y: row, isCorrect: true };
              } else {
                return { ...piece, isCorrect: false };
              }
            }
            return piece;
          });
        });
      }
    },
  }));

  useEffect(() => {
    const allCorrect = pieces.every((piece) => piece.isCorrect);
    setIsComplete(allCorrect);
  }, [pieces, setIsComplete]);

  const renderGrid = () => {
    const rows = 3;
    const cols = 3;
    const grid = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        grid.push(
          <div
            key={`${row}-${col}`}
            style={{
              width: 100,
              height: 100,
              border: '1px solid #ccc',
              position: 'absolute',
              top: row * 100,
              left: col * 100,
              boxSizing: 'border-box',
            }}
          />
        );
      }
    }
    return grid;
  };

  return (
    <div
      id="puzzle-board"
      ref={drop}
      style={{
        width: 300,
        height: 300,
        position: 'relative',
        backgroundColor: '#f5f5f5',
        margin: 'auto',
      }}
    >
      {renderGrid()}
      {pieces.map((piece) => (
        <PuzzlePiece
          key={piece.id}
          id={piece.id}
          image={piece.image}
          x={piece.x}
          y={piece.y}
        />
      ))}
    </div>
  );
};

const PuzzleGame = ({ onComplete }) => {
  const [pieces, setPieces] = useState(
    piecesData.map((piece) => ({ ...piece, isCorrect: false }))
  );
  const [isComplete, setIsComplete] = useState(false);
  const [countdown, setCountdown] = useState(6); // Đếm ngược từ 6 giây

  useEffect(() => {
    if (isComplete) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        onComplete(); // Gọi callback để tắt pop-up sau 6 giây
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isComplete, onComplete]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2>Trò chơi ghép hình</h2>
        <div>Kéo các mảnh ghép để tạo hình hoàn chỉnh</div>
        <PuzzleBoard pieces={pieces} setPieces={setPieces} setIsComplete={setIsComplete} />
        {isComplete && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
              zIndex: 1000,
            }}
          >
            <h2>Ghép hình thành công</h2>
            <div>Màn hình sẽ quay lại không gian trong vòng {countdown} giây.</div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default PuzzleGame;
