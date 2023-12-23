import headerStyle from "./index.module.less"
import icon from '../../assets/take_notes.png'

const Hearder=()=>{
    return (
        <div className={headerStyle.hearder}>
            <img src={icon}  />
            <span>笔记</span>
        </div>
    )
}
export default Hearder