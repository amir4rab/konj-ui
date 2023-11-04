/** @jsxImportSource preact */

import { Switch } from "@konj-org/preact-ui";

const label = "Privacy protection";

export const SwitchDemo = () => {
  return (
    <div className="flex gap-2 not-prose items-center align-middle ">
      <p>{label}</p>
      <Switch id="privacyQ" label={label} />
    </div>
  );
};
