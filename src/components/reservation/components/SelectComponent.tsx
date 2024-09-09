import { FC, MouseEvent } from "react";

const SelectComponent: FC<{ setPersons: (persons: number, e: MouseEvent<Element>) => void; persons: number }> = ({ setPersons, persons }) => {
  const items = [];
  for (let x = 1; x <= persons; x++) {
    items.push(
      <div className="h-p flex align-center" onClick={(e) => setPersons(x, e)}>
        {x} Osoby
        {x > 1 && <p>(+100,- Kč)</p>}
      </div>
    );
  }
  return [items];
};
export { SelectComponent };
