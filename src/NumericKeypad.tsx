import './NumericKeypad.css';

interface NumericKeypadProps {
  onKeyPress: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  allowOperators?: boolean;
}

export const NumericKeypad = ({ onKeyPress, onDelete, onEnter, allowOperators = false }: NumericKeypadProps) => {
  const numberButtons = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];
  const operatorButtons = ['+', '-'];

  return (
    <div className="numeric-keypad">
      <div className="keypad-grid">
        {numberButtons.map((num) => (
          <button
            key={num}
            className="keypad-button number-button"
            onClick={() => onKeyPress(num)}
          >
            {num}
          </button>
        ))}

        <button
          className="keypad-button delete-button"
          onClick={onDelete}
        >
          ⌫
        </button>

        <button
          className="keypad-button number-button"
          onClick={() => onKeyPress('0')}
        >
          0
        </button>

        <button
          className="keypad-button enter-button"
          onClick={onEnter}
        >
          ✓
        </button>

        {allowOperators && (
          <div className="operator-buttons">
            {operatorButtons.map((op) => (
              <button
                key={op}
                className="keypad-button operator-button"
                onClick={() => onKeyPress(op)}
              >
                {op}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
