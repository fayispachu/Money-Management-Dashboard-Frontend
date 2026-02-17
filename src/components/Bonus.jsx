import React from "react";

function Bonus() {
  return (
    <div className="bg-neutral-900 rounded-lg px-3 py-2 shadow-md">
      <h3 className="text-neutral-500 text-xs font-medium">
        Bonus
      </h3>

      <h1 className="text-base font-semibold text-white mt-1">
        120 USD
      </h1>

      <p className="text-[11px] text-emerald-500 mt-0.5">
        +12% from last month
      </p>
    </div>
  );
}

export default Bonus;
