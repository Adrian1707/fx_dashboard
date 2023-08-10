import * as React from 'react';
const { useState } = React;
import { FxRate } from "./FxRate";

export function Dashboard() {

  return(
    <div>
      <div className="grid gap-6 lg:grid-cols-3">
        <FxRate />
        <FxRate />
        <FxRate />
      </div>
    </div>
  )
}
