import React, {useEffect, useState} from 'react';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import {Button, Fab} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';

import {useDispatch, useSelector} from "react-redux";
import {
    isOpenPopUp,
    removeToStack,
    setAddressBar,
    setCurrentDir
} from "../Redux/filesReducer";

import AddressBar from "./AddressBar";
import {ReducersType} from "../Redux/store";

const ControlBar: React.FC = () => {

    const [disable, setDisable] = useState(true);

    const dirStack = useSelector((state: ReducersType) => state.files.dirStack);
    const files = useSelector((state: ReducersType) => state.files.files);
    const currentDir = useSelector((state: ReducersType) => state.files.currentDir);

    const dispatch = useDispatch();

    useEffect(() => {
        currentDir === `0` ? setDisable(true) : setDisable(false)
    }, [currentDir]);

    const handlerUpDir = (): void => {
        const currentDirFile = files.filter(el => currentDir === el.id);
        if (currentDirFile.length !== 0) {
            const parentDir = files.filter(el => currentDirFile[0].parentId === el.id);
            if (parentDir.length === 0) {
                dispatch(setAddressBar(``));
                dispatch(setCurrentDir(`0`));
            } else {
                dispatch(setAddressBar(parentDir[0].path));
                dispatch(setCurrentDir(parentDir[0].id));

            }
        }


    };

    const handlerBack = (): void => {
        const dirStackCopy = [...dirStack];
        const dirStackElem:any = dirStackCopy.pop();
        dispatch(removeToStack());

        if (!!dirStackElem) {
            dispatch(setCurrentDir(dirStackElem.id));
            dispatch(setAddressBar(dirStackElem.path));

        }  else {
            dispatch(setCurrentDir('0'));
            dispatch(setAddressBar(``))
        }
    };

    const handlerClick = () => {
        dispatch(isOpenPopUp(true))
    };


    return (
        <div className="control-bar__wrap">
            <AppBar position={"sticky"}>
                <div className={`app-bar`}>
                    <div className={`button-control`}>

                        <Button
                            color={`inherit`}
                            onClick={handlerUpDir}
                            disabled={disable}
                        >
                            <ArrowUpwardIcon className={`icon`}/>
                            <span>На уровень выше</span>
                        </Button>

                        <Button
                            color={`inherit`}
                            onClick={handlerBack}
                        >
                            <ArrowBackIcon className={`icon`}/>
                        </Button>

                    </div>

                    <div>
                        <AddressBar/>
                    </div>

                </div>
            </AppBar>
            <div className={`add-button`} onClick={handlerClick}>
                <Fab color="primary" aria-label="add">
                    <AddIcon/>
                </Fab>
            </div>

        </div>
    );
};

export default ControlBar;
