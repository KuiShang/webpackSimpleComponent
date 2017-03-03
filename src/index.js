/*import Button from './components/button';
 const button = new Button('baidu.com');
 console.log(button);
 console.log(2222222222222);
 button.render('#myplugin');*/
import'./styles.scss';

if (document.querySelectorAll('#myplugin').length) {
    require.ensure([], () => {
        const Button = require('./components/button').default;
        const button = new Button('google.com');

        button.render('#myplugin');
    }, 'button')
}



if (document.querySelectorAll('h1').length) {
    require.ensure([], () => {
        const Header = require('./components/header').default;

        new Header().render('h1');
    }, 'header');
}
