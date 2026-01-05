import './NumericKeypad.css';

interface NumericKeypadProps {
  onKeyPress: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  allowOperators?: boolean;
}

export const NumericKeypad = ({ onKeyPress, onDelete, onEnter, allowOperators = false }: NumericKeypadProps) => {
  return (
    <div className="numeric-keypad">
      <div className="keypad-grid">
        {/* Řádek 1: prázdné, prázdné, prázdné, mínus */}
        <div className="empty-cell"></div>
        <div className="empty-cell"></div>
        <div className="empty-cell"></div>
        <button
          className="keypad-button operator-button"
          onClick={() => onKeyPress('-')}
          disabled={!allowOperators}
        >
          −
        </button>

        {/* Řádek 2: 7, 8, 9, plus */}
        <button className="keypad-button number-button" onClick={() => onKeyPress('7')}>7</button>
        <button className="keypad-button number-button" onClick={() => onKeyPress('8')}>8</button>
        <button className="keypad-button number-button" onClick={() => onKeyPress('9')}>9</button>
        <button
          className="keypad-button operator-button"
          onClick={() => onKeyPress('+')}
          disabled={!allowOperators}
        >
          +
        </button>

        {/* Řádek 3: 4, 5, 6, del */}
        <button className="keypad-button number-button" onClick={() => onKeyPress('4')}>4</button>
        <button className="keypad-button number-button" onClick={() => onKeyPress('5')}>5</button>
        <button className="keypad-button number-button" onClick={() => onKeyPress('6')}>6</button>
        <button className="keypad-button delete-button" onClick={onDelete}>⌫</button>

        {/* Řádek 4: 1, 2, 3, enter (začíná) */}
        <button className="keypad-button number-button" onClick={() => onKeyPress('1')}>1</button>
        <button className="keypad-button number-button" onClick={() => onKeyPress('2')}>2</button>
        <button className="keypad-button number-button" onClick={() => onKeyPress('3')}>3</button>
        <button className="keypad-button enter-button" onClick={onEnter}>✓</button>

        {/* Řádek 5: prázdné, 0, prázdné, enter (pokračuje) */}
        <div className="empty-cell"></div>
        <button className="keypad-button number-button zero-button" onClick={() => onKeyPress('0')}>0</button>
        <div className="empty-cell"></div>
      </div>
    </div>
  );
};
