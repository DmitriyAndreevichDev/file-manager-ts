import React, {useState} from "react";


import {Button, Dialog, DialogTitle, Input} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {addFile, isOpenPopUp} from "../../Redux/filesReducer";
import {ReducersType} from "../../Redux/store";


const PopUp: React.FC = () => {

    const [name, setName] = useState(``);


    const PopUp = useSelector((state: ReducersType) => state.files.isOpenPopUp);
    const currentDir = useSelector((state: ReducersType) => state.files.currentDir);
    const files = useSelector((state: ReducersType) => state.files.files);


    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.currentTarget.value)
    };


    const handlerClick = (type: `txt` | `dir`) => {
        const parentPath = files.filter(el => currentDir === el.id);
        const overlap = files.filter(el => name === el.name);
        const createPath = parentPath.length === 0 ? name : parentPath[0].path + "/" + name;

        if (overlap.length === 0) {
            if (!!name) {
                type === 'dir' ?
                    dispatch(addFile(currentDir, name, type, ``, `${createPath}`)) :
                    dispatch(addFile(currentDir, name, type, `text`, ``));
                dispatch(isOpenPopUp(false));
                setName(``);
            } else {
                alert(`Введите значение`);

            }
        } else {
            alert(`Запрещено повторение имён`);
        }
    };


    return (
        <div className="popUp">
            <Dialog open={PopUp}>
                <div className={`popup__content`}>

                    <DialogTitle id="simple-dialog-title">Create</DialogTitle>
                    <Input onChange={handleChange} value={name} placeholder={`Введите имя`}/>


                    <Button
                        onClick={() => {
                            handlerClick(`dir`)
                        }}
                    >
                        Создать папку
                    </Button>
                    <Button
                        onClick={() => {
                            handlerClick(`txt`)
                        }}
                    >
                        Создать файл
                    </Button>
                    <Button color="secondary"
                            variant="contained"
                            onClick={() => {
                                dispatch(isOpenPopUp(false))
                            }}
                    >
                        Закрыть
                    </Button>

                </div>

            </Dialog>

        </div>
    );
};


export default PopUp;