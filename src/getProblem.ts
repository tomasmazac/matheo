export type Operator = '+' | '-';
export type MissingPart = 'operand1' | 'operator' | 'operand2' | 'result';

export interface Problem {
  operand1: number;
  operator: Operator;
  operand2: number;
  result: number;
  missingPart: MissingPart;
}

export const getProblem = (): Problem => {
  // Generování náhodného operátoru
  const operator: Operator = Math.random() > 0.5 ? '+' : '-';

  let operand1: number;
  let operand2: number;

  // Generování operandů (1-10)
  if (operator === '+') {
    operand1 = Math.floor(Math.random() * 10) + 1;
    operand2 = Math.floor(Math.random() * 10) + 1;
  } else {
    // U odčítání zajistíme, že výsledek není záporný
    operand1 = Math.floor(Math.random() * 10) + 1;
    operand2 = Math.floor(Math.random() * operand1) + 1;
  }

  const result = operator === '+' ? operand1 + operand2 : operand1 - operand2;

  // Náhodně vybrat, co bude chybět
  const missingOptions: MissingPart[] = ['operand1', 'operator', 'operand2', 'result'];
  const missingPart = missingOptions[Math.floor(Math.random() * missingOptions.length)];

  return {
    operand1,
    operator,
    operand2,
    result,
    missingPart,
  };
}
