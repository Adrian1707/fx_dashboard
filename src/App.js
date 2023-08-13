import * as React from 'react';
import { Dashboard } from "./Dashboard";

export function App() {
  return(
    <div className="container my-24 mx-auto md:px-6">
      <h1 className="mb-12 text-6xl text-center text-emerald-600 bold underline">
        FX
      </h1>
      <Dashboard />
    </div>
  )
}
