import avatar from './avatar.jpg';
import './index.scss';

const img = new Image();
img.src = avatar;
img.classList.add('avatar');

const root = document.getElementById('root');
root.append(img);



