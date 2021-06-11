

require('./bootstrap');
import ReactDOM from 'react-dom';
import Index from './components/index';


if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
// if (document.getElementById('app1')) {
//     ReactDOM.render(<Add_Product />, document.getElementById('app1'));
// }