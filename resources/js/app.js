

require('./bootstrap');
import ReactDOM from 'react-dom';
import PostProduct from './components/index';


if (document.getElementById('app')) {
    ReactDOM.render(<PostProduct />, document.getElementById('app'));
}
// if (document.getElementById('app1')) {
//     ReactDOM.render(<Add_Product />, document.getElementById('app1'));
// }