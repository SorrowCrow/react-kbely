import React from "react";

const SelectComponent = ({ setPersons, persons }) => {
    const items = [];
    for (let x = 1; x <= persons; x++) {
        items.push(
            <div className="h-p flex align-center" onClick={setPersons.bind(this, x)}>
                {x} Osoby
                {x > 1 ? <p>(+100,- Kč)</p> : null}
            </div>
        );
    }
    return [items];
};
export { SelectComponent };
