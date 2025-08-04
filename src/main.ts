import { render, h } from 'preact'
import './index.css'
import App from './App'

const appElement = document.getElementById('app')
if (appElement) {
    render(h(App, {}), appElement)
}