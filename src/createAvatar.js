import avatar from "./avatar.jpg";
import style from './index.scss';

function createAvatar() {
    const img = new Image();
    img.src = avatar;
    img.classList.add(style.avatar);

    const root = document.getElementById('root');
    root.append(img);
}
export default createAvatar;
