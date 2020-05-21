import { decode, encode } from 'base-64';
import React from 'react';
import Navigator from './routes/LoginStack';
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }



export default function App() {

  return (
    <Navigator />
  );
}


