import './index-95f76a9b.js';
import { A as ActiveRouter } from './active-router-a7f8e8f8.js';
import './match-path-760e1797.js';
import './location-utils-fea12957.js';

function injectHistory(Component) {
    ActiveRouter.injectProps(Component, ['history', 'location']);
}
