import React from 'react';
import ReactDOM from "react-dom";
import Mapp from './js/components/Mapp';

document.addEventListener("DOMContentLoaded", function (event) {
    const wrapper = document.getElementById("app");
    wrapper ? ReactDOM.render(< Mapp />, wrapper) : false;
});