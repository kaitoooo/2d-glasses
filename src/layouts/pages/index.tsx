import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import Loading from '../components/sections/Loading';
import Mv from '../components/sections/Mv';
import '../../assets/styles/style.scss';
import '../../assets/scripts/app';
import picturefill from 'picturefill';
picturefill();

export class Index extends Component {
    render(): React.ReactNode {
        return (
            <>
                <Loading />
                <Mv />
            </>
        );
    }
}
const container = document.getElementById('app');
// Create a root.
const root = ReactDOM.createRoot(container);
// Initial render
root.render(<Index />);
