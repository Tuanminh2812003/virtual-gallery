import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';

// Dữ liệu mảnh ghép ban đầu
const piecesData = [
  { id: 1, image: '/game/image1.png', x: 400, y: 0 },
  { id: 2, image: '/game/image2.jfif', x: 500, y: 0 },
  { id: 3, image: '/game/image3.png', x: 400, y: 100 },
  { id: 4, image: '/game/image4.png', x: 500, y: 100 },
  { id: 5, image: '/game/image5.png', x: 400, y: 200 },
  { id: 6, image: '/game/image6.png', x: 500, y: 200 },
  { id: 7, image: '/game/image7.png', x: 400, y: 300 },
  { id: 8, image: '/game/image8.png', x: 500, y: 300 },
  { id: 9, image: '/game/image9.png', x: 450, y: 400 },
];

// Mảnh ghép có thể kéo được
const PuzzlePiece = ({ id, image, x, y, movePiece }) => {
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

// Bảng nơi người dùng có thể thả mảnh ghép vào
const PuzzleBoard = ({ pieces, setPieces }) => {
  const [, drop] = useDrop(() => ({
    accept: 'PIECE',
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();

      if (clientOffset) {
        // Lấy vị trí của bảng
        const boardRect = document.getElementById('puzzle-board').getBoundingClientRect();

        // Tính toán vị trí mới của mảnh ghép
        const cellSize = 100; // Kích thước mỗi ô
        const offsetX = clientOffset.x - boardRect.left;
        const offsetY = clientOffset.y - boardRect.top;

        const col = Math.floor(offsetX / cellSize);
        const row = Math.floor(offsetY / cellSize);

        // Tính tọa độ chính xác của mảnh ghép trong bảng
        const newX = col * cellSize;
        const newY = row * cellSize;

        // Cập nhật lại vị trí của mảnh ghép trong state
        setPieces((prevPieces) =>
          prevPieces.map((piece) =>
            piece.id === item.id
              ? {
                  ...piece,
                  x: newX,
                  y: newY,
                }
              : piece
          )
        );
      }
    },
  }));

  // Vẽ bảng chơi
  const renderGrid = () => {
    const rows = 3; // 3 hàng
    const cols = 3; // 3 cột
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

const PuzzleGame = () => {
  const [pieces, setPieces] = useState(piecesData);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2>Trò chơi xếp hình</h2>
        <PuzzleBoard pieces={pieces} setPieces={setPieces} />
      </div>
    </DndProvider>
  );
};

export default PuzzleGame;
